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

# Deploy (build + wrangler deploy)
pnpm deploy

# Generate Cloudflare env types
pnpm cf-typegen

# Local Worker dev (after build)
pnpm wrangler:dev

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

File-based via TanStack Router. Filenames map to URLs using **dot syntax for nesting**, not directories — `solutions.connect-mastery.tsx` → `/solutions/connect-mastery`. The `routeTree.gen.ts` file is generated on every dev/build and gitignored. The router is exposed via `getRouter()` in `src/router.tsx` (renamed from `createRouter` — TanStack Start's plugin imports `getRouter` by name from `#tanstack-router-entry`, so do not rename it).

`__root.tsx` uses both `component: RootLayout` (renders StatusBar + Nav + `<Outlet />` + Footer) **and** `shellComponent: RootDocument` (renders `<html>` shell with `<HeadContent />` + `<Scripts />`). Don't render `<Outlet />` inside the shell — it double-mounts the route tree.

### Server functions

`src/server/forms.ts` defines two form endpoints — `submitDemo` and `joinWaitlist` — via `createServerFn({ method: 'POST' }).inputValidator(...).handler(...)`. The current API is `inputValidator` (not `validator`). All emails route through `sendEmail()`, which reads `RESEND_API_KEY` / `RESEND_FROM` / `RESEND_TO` from `process.env` — works in both Node dev and Cloudflare Workers (the cf vite plugin polyfills `process.env` from wrangler `vars` + secrets). If those vars are missing it logs and returns `ok` instead of failing — that's the dev fallback so e2e tests can validate the success-state UI without sending real emails.

### Styling

The industrial design system is self-contained in `src/styles/` (originally ported from a Claude Design handoff bundle — not in this repo; `src/styles/` is now the source of truth). Tokens live in `src/styles/tokens.css` — 8 `data-palette` themes on `<html>`, with `blueprint` set as the default in `__root.tsx`. Component styles split across `chrome/site/pages/resources/optimizations.css`, all imported once in `__root.tsx`; class names are `.lw-*`.

Sections wrapped in `.lw-reveal` are hidden via CSS until the `useReveal` hook (`src/components/reveal.ts`) adds `lw-reveal-ready` to `<html>` after hydration. SSR output stays visible by default, so never rely on a `.lw-reveal` element being painted before hydration.

The site is English-only — blog and customer-story content is typed inline in the route files (`resources.tsx`, `customers.tsx`). The blog is a single static route (`blog.the-auditor-doesnt-care.tsx`); `blog.$slug.tsx`, `blog.index.tsx`, and `get-a-demo.tsx` are 301-redirect-only routes kept so legacy URLs resolve.

### Forms — accessibility contract

Every form input uses `useId()` + `htmlFor`/`id` linkage. This is load-bearing: Playwright's `getByLabel` requires it, so adding a form field without it will silently break e2e tests. The `WaitlistForm` and `ContactForm` in `src/components/forms.tsx` use `noValidate` to defer email validation to the JS code (otherwise the browser's native popup blocks the test for invalid input).

e2e tests that click JS-driven controls (tabs, form submits, the mobile-menu button) must first `await hydrated(page)` from `tests/e2e/_helpers.ts` — clicking before React hydrates does a native no-op submit/navigation and fails intermittently against the dev server.

## Reference directories (siblings, not in this repo)

- `../LeanwiseAI/` — original (v1) Claude Design output. Superseded by the v2 industrial redesign now in `src/`; useful only as historical copy reference. Don't edit.
- `../leanwiseai_website/` — old WordPress theme. Discarded; only the logo and copy were carried over.
- `../claude_design_input/leanwiseai_design_brief.md` — the brief that produced the design. Useful when adding new pages.

## Deployment notes

- Cloudflare account: `nthanhtrung198@gmail.com` (`859506ec8de58eeaeca3f6c4283b422a`).
- Wrangler is OAuth-authed locally; `wrangler whoami` confirms.
- To switch from the `*.workers.dev` subdomain to `leanwise.ai`, add a custom domain to the Worker in the Cloudflare dashboard — no code changes needed.
- Bindings (D1, KV, send_email) are stubbed in `wrangler.jsonc` comments — uncomment + provision when the blog/email features grow beyond the current static + Resend setup.
