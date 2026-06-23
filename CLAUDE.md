# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

LeanWise AI marketing website — a TanStack Start app deploying to Cloudflare Workers.
Live: https://leanwise-ai.nthanhtrung198.workers.dev

## Commands

```bash
# Develop (vite dev, port 3000)
pnpm dev

# Type-check only (no emit)
pnpm lint

# Build (vite build → dist/{client,server})
pnpm build

# Deploy (build + wrangler deploy) — use `run`; bare `pnpm deploy` hits a pnpm builtin
pnpm run deploy

# Generate Cloudflare env types
pnpm cf-typegen

# Local Worker dev (after build)
pnpm wrangler:dev

# D1 — create the (empty) schema on the LOCAL dev database
pnpm db:setup
# Same against production D1 (db/schema.sql is a destructive reset — drops + recreates)
pnpm wrangler d1 execute leanwise-ai --remote --file=db/schema.sql

# Tests
pnpm test                  # unit + e2e against vite dev
pnpm test:unit             # vitest unit only
pnpm test:e2e              # playwright e2e (boots vite dev)
pnpm test:e2e:remote       # e2e against the deployed worker
pnpm test:e2e:headed       # e2e with visible browser

# Run a single test file
npx vitest run tests/unit/validators.test.ts
npx playwright test tests/e2e/contact.spec.ts --project=chromium

# Run a single test
npx playwright test tests/e2e/contact.spec.ts:21 --project=chromium
```

## Architecture

### Two-stage build → Worker

`vite.config.ts` orchestrates two plugins that *must* coexist in this order: `tsconfigPaths()` → `tanstackStart()` → `cloudflare({ viteEnvironment: { name: 'ssr' } })` → `viteReact()`. TanStack Start emits a Node-style SSR build at `dist/server/`, but `src/server.ts` wraps `createStartHandler({ handler: defaultStreamHandler })` in a `{ fetch }` export — that is the actual Worker entry. `wrangler.jsonc` points `main` at `./src/server.ts` and `@cloudflare/vite-plugin` rewires the SSR output into a Worker bundle at `dist/server/index.js` plus a derived `dist/server/wrangler.json`. `wrangler deploy` reads the derived config, not the user-authored one.

If a request hits a static path (`/assets/*`, `/robots.txt`, `/sitemap.xml`), the `ASSETS` binding (configured with `not_found_handling: "single-page-application"`) serves it from `dist/client/`. Anything else falls through to the SSR Worker.

### Routing

File-based via TanStack Router. Filenames map to URLs using **dot syntax for nesting**, not directories — `case-studies.talimex.tsx` → `/case-studies/talimex`. The `routeTree.gen.ts` file is generated on every dev/build and gitignored. The router is exposed via `getRouter()` in `src/router.tsx` (renamed from `createRouter` — TanStack Start's plugin imports `getRouter` by name from `#tanstack-router-entry`, so do not rename it).

`__root.tsx` uses both `component: RootLayout` (renders StatusBar + Nav + `<Outlet />` + Footer) **and** `shellComponent: RootDocument` (renders `<html>` shell with `<HeadContent />` + `<Scripts />`). Don't render `<Outlet />` inside the shell — it double-mounts the route tree.

### Server functions

`src/server/forms.ts` defines the form endpoint `submitDemo` — via `createServerFn({ method: 'POST' }).inputValidator(...).handler(...)`. The current API is `inputValidator` (not `validator`). (A second `joinWaitlist` endpoint and its `WaitlistForm` were removed with the SOP/Operations waitlist pages in the compliance-led redesign.) All emails route through `sendEmail()`, which uses **Cloudflare Email Sending** via the `send_email` binding (`MAIL` in `wrangler.jsonc`) — it calls `env.MAIL.send({ from, to, subject, text })` with the structured builder API (no MIME, no API keys). `MAIL_FROM`/`MAIL_TO` are plain `vars`. Under `vite dev` (`import.meta.env.DEV`) the send is skipped and logged — the dev fallback so e2e tests can validate the success-state UI without sending real mail; real delivery happens on the deployed Worker. Email Sending prerequisites are in the Deployment notes below.

### Styling

The industrial design system is self-contained in `src/styles/` (originally ported from a Claude Design handoff bundle — not in this repo; `src/styles/` is now the source of truth). Tokens live in `src/styles/tokens.css` — a single "Conformance" palette (blueprint lineage: cool inspection-paper, deep navy ink, instrument-cyan `--amber`/signal slot) on `:root`. The 7 alternate `data-palette` themes (and the `data-palette` attribute itself) were dropped in the redesign. Component styles split across `chrome/site/pages/resources/optimizations/admin.css`, all imported once in `__root.tsx`; class names are `.lw-*`.

Sections wrapped in `.lw-reveal` are hidden via CSS until the `useReveal` hook (`src/components/reveal.ts`) adds `lw-reveal-ready` to `<html>` after hydration. SSR output stays visible by default, so never rely on a `.lw-reveal` element being painted before hydration.

The site is English-only. Blog posts and customer-story content live in Cloudflare D1, not inline — see Content store & admin below. `blog.$slug.tsx` is the live blog-post page (D1 loader). The compliance-led IA is a 5-page core — `/`, `/product`, `/company`, `/pricing`, `/customers` (plus `/contact`, `/resources`). Several routes are 301-redirect-only stubs kept so legacy/inbound URLs resolve: `solutions.connect-mastery.tsx` → `/product`, `solutions.sop-mastery.tsx` & `solutions.operations-mastery.tsx` → `/product#roadmap`, `about.tsx` → `/company`, `blog.index.tsx` → `/resources`, `get-a-demo.tsx` → `/contact`. The old `/solutions/*` module pages folded into `/product` (CONNECT) and its `#roadmap` section (SOP/Operations).

### Content store & admin

Blog posts and customer stories live in **Cloudflare D1** (`leanwise-ai` database, `DB` binding). Schema: `db/schema.sql` (the single source of truth — `DROP`s + recreates both tables, no seed data; the DB starts empty and is populated through the `/admin` console). `src/server/db.ts` is the D1 query layer — server-only, reaches bindings via `import { env } from 'cloudflare:workers'`, so never import it from client component scope. `src/server/content.ts` wraps it as `createServerFn` RPCs: public reads (`listPublishedPosts`, `getPublishedPost`, `listStories`) and admin-gated writes. Public routes (`/resources`, `/blog/$slug`, `/customers`) read via route `loader`s; post bodies are Markdown rendered with `marked` (`src/lib/markdown.ts`).

The `/admin/*` console (dashboard + post/story editors) is gated by **Cloudflare Access**. `src/server/auth.ts` verifies the `Cf-Access-Jwt-Assertion` JWT (via `jose`) against the team JWKS; every write server function calls `requireAdmin()`. Local dev has no Access proxy, so `auth.ts` grants a dev identity under `import.meta.env.DEV` — a production build with `CF_ACCESS_TEAM_DOMAIN` / `CF_ACCESS_AUD` unset **fails closed**. `RootLayout` renders no marketing chrome under `/admin`.

Gotcha: a TanStack route with a `loader` must not use `head: (ctx) => …` with the inferred `ctx` type — it forms a circular generic that silently drops loader-data typing (`useLoaderData()` becomes `undefined`). Hand-type the `head` ctx param instead (see `blog.$slug.tsx`).

### Forms — accessibility contract

Every form input uses `useId()` + `htmlFor`/`id` linkage. This is load-bearing: Playwright's `getByLabel` requires it, so adding a form field without it will silently break e2e tests. The `ContactForm` in `src/components/forms.tsx` uses `noValidate` to defer email validation to the JS code (otherwise the browser's native popup blocks the test for invalid input).

e2e tests that click JS-driven controls (tabs, form submits, the mobile-menu button) must first `await hydrated(page)` from `tests/e2e/_helpers.ts` — clicking before React hydrates does a native no-op submit/navigation and fails intermittently against the dev server.

## Reference directories (siblings, not in this repo)

- `../LeanwiseAI/` — original (v1) Claude Design output. Superseded by the v2 industrial redesign now in `src/`; useful only as historical copy reference. Don't edit.
- `../leanwiseai_website/` — old WordPress theme. Discarded; only the logo and copy were carried over.
- `../claude_design_input/leanwiseai_design_brief.md` — the brief that produced the design. Useful when adding new pages.

## Deployment notes

- Cloudflare account: `nthanhtrung198@gmail.com` (`859506ec8de58eeaeca3f6c4283b422a`).
- Wrangler is OAuth-authed locally; `wrangler whoami` confirms.
- To switch from the `*.workers.dev` subdomain to `leanwise.ai`, add a custom domain to the Worker in the Cloudflare dashboard — no code changes needed.
- **D1 + KV** are provisioned and bound in `wrangler.jsonc` (`DB`, `CACHE`).
- **Form email** — `wrangler.jsonc` binds Cloudflare **Email Sending** (`send_email` binding `MAIL`). Prerequisites: (1) the Workers **paid plan** — Email Sending is a paid feature — and (2) the `MAIL_FROM` domain onboarded to Email Sending (dashboard → Compute → Email Service → Email Sending → Onboard Domain, which adds SPF/DKIM DNS records; the domain must use Cloudflare DNS). Email Sending delivers to any recipient — no destination verification. `MAIL_TO` is currently a personal inbox for testing — switch it to `support@leanwise.ai` for production. Until the prerequisites are met, `env.MAIL.send()` rejects.
- **First-time D1 setup on production** (run once): `wrangler d1 execute leanwise-ai --remote --file=db/schema.sql`. Without this the deployed content pages have no tables to read. Note this drops + recreates the tables — don't re-run it once the production DB holds real content.
- **Admin auth** — in the Zero Trust dashboard, add a self-hosted Cloudflare Access application covering the `/admin` path, then set `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` in `wrangler.jsonc` `vars` and redeploy. Until those vars are set, `/admin` is locked in production.
