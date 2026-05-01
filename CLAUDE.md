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
npx vitest run tests/unit/i18n.test.ts
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

`__root.tsx` uses both `component: RootLayout` (renders Nav + `<Outlet />` + Footer) **and** `shellComponent: RootDocument` (renders `<html>` shell with `<HeadContent />` + `<Scripts />`). Don't render `<Outlet />` inside the shell — it double-mounts the route tree.

### Server functions

`src/server/forms.ts` defines five form endpoints via `createServerFn({ method: 'POST' }).inputValidator(...).handler(...)`. The current API is `inputValidator` (not `validator`). All emails route through `sendEmail()`, which reads `RESEND_API_KEY` / `RESEND_FROM` / `RESEND_TO` from `process.env` — works in both Node dev and Cloudflare Workers (the cf vite plugin polyfills `process.env` from wrangler `vars` + secrets). If those vars are missing it logs and returns `ok` instead of failing — that's the dev fallback so e2e tests can validate the success-state UI without sending real emails.

### i18n

EN/VI string tables in `src/i18n/strings.ts`. The `useI18n()` hook in `src/i18n/index.ts` always initializes to `'en'` on both server and client to avoid hydration mismatch, then reads `localStorage('lw.lang')` in a `useEffect` on mount and dispatches a `lw:langchange` window event on change so all consumers re-render. Adding strings: add to **both** `STRINGS.en` and `STRINGS.vi` — the unit test `tests/unit/i18n.test.ts` enforces parity.

### Static data → CMS migration path

`src/data/blog-posts.ts` and `src/data/resources.ts` are typed in-memory fixtures. They are intended to be replaced by a headless CMS (Sanity/Payload) without touching component code; keep the exported types stable.

### Forms — accessibility contract

Every form input uses `useId()` + `htmlFor`/`id` linkage. This is load-bearing: Playwright's `getByLabel` requires it, so adding a form field without it will silently break e2e tests. The `NewsletterBox` form has `noValidate` to defer email validation to the JS code (otherwise the browser's native popup blocks the test for invalid input).

## Reference directories (siblings, not in this repo)

- `../LeanwiseAI/` — original Claude Design output (HTML + Babel-in-browser JSX). Source of truth for design and copy. Don't edit.
- `../leanwiseai_website/` — old WordPress theme. Discarded; only the logo and copy were carried over.
- `../claude_design_input/leanwiseai_design_brief.md` — the brief that produced the design. Useful when adding new pages.

## Deployment notes

- Cloudflare account: `nthanhtrung198@gmail.com` (`859506ec8de58eeaeca3f6c4283b422a`).
- Wrangler is OAuth-authed locally; `wrangler whoami` confirms.
- To switch from the `*.workers.dev` subdomain to `leanwise.ai`, add a custom domain to the Worker in the Cloudflare dashboard — no code changes needed.
- Bindings (D1, KV, send_email) are stubbed in `wrangler.jsonc` comments — uncomment + provision when the blog/email features grow beyond the current static + Resend setup.
