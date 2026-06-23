# LeanWise AI — Website

Production marketing site for [leanwise.ai](https://leanwise.ai).

Built with **[TanStack Start](https://tanstack.com/start)** (React 19, TypeScript, Vite). Deploys to **Cloudflare Workers** with static assets on the edge.

## Stack

- **Framework:** TanStack Start (file-based routing, SSR, server functions)
- **Runtime:** Cloudflare Workers (edge SSR + static assets)
- **Styling:** Plain CSS (custom design system, no UI lib)
- **i18n:** Custom hook with EN/VI string tables (localStorage persistence)
- **Forms:** TanStack Start server functions (Resend or Cloudflare Email Workers)
- **CMS (planned):** Headless (Sanity / Payload) — blog posts currently live in `src/data/`

## Getting started

```bash
# Install
pnpm install   # or npm / bun / yarn

# Develop
pnpm dev       # → http://localhost:3000

# Type check
pnpm lint

# Build
pnpm build

# Preview the prod build locally
pnpm start
```

## Deployment — Cloudflare Workers

```bash
# One-time auth
npx wrangler login

# Deploy
pnpm deploy
```

Form submissions email through **Cloudflare Email Sending** (`send_email` binding, no API keys). Requires the Workers paid plan and the `MAIL_FROM` domain onboarded to Email Sending — see `wrangler.jsonc`.

For local Worker testing, copy `.env.example` to `.dev.vars` and run `npx wrangler dev`.

## Project structure

```
src/
├── routes/             # File-based routes
│   ├── __root.tsx      # Layout: nav + footer
│   ├── index.tsx       # Home
│   ├── about.tsx
│   ├── contact.tsx
│   ├── get-a-demo.tsx
│   ├── blog.tsx        # /blog
│   ├── blog.$slug.tsx  # /blog/<slug>
│   ├── resources.tsx
│   └── solutions/
│       ├── connect-mastery.tsx
│       ├── sop-mastery.tsx
│       └── operations-mastery.tsx
├── components/         # Shared UI (Nav, Footer, FinalCTA, etc.)
├── i18n/               # EN/VI strings + useI18n hook
├── data/               # Static content (blog posts, resources)
├── server/             # Server functions (forms, newsletter)
├── styles/             # Global CSS
└── router.tsx          # Router setup
```

## Adding content

### New blog post

Edit `src/data/blog-posts.ts` and append a new post object. The route `/blog/<slug>` resolves automatically.

> When the headless CMS is wired in, this file becomes a fallback / fixture only.

### New resource (ebook / infographic)

Edit `src/data/resources.ts` and add the entry. Place the downloadable PDF in `public/downloads/`.

### New language

Edit `src/i18n/strings.ts`, add the language key alongside `en` and `vi`, and the `LangToggle` will pick it up.

## Bilingual notes

- Default language is **English**; user choice persists in `localStorage`
- Vietnamese strings live in `src/i18n/strings.ts`
- The toggle is in the header and the footer

## Tests

Real tests, no mocks. Two layers:

- **Unit (Vitest)** — pure logic (`src/i18n/strings.ts` translate fallback, email regex used by `src/server/forms.ts`).
- **E2E (Playwright)** — drives a real browser against a real running server (the dev server by default; or a deployed URL via `BASE_URL`). Covers every page, every form, every CTA path, the EN/VI toggle, blog filtering + search, the resource gate modal, the newsletter, SEO meta, sitemap and robots.

```bash
# Everything (unit + e2e against vite dev)
pnpm test

# Just unit
pnpm test:unit

# Just e2e (boots vite dev for you)
pnpm test:e2e

# E2E against the deployed Worker
pnpm test:e2e:remote
```

Test layout:

```
tests/
├── unit/
│   ├── i18n.test.ts
│   └── validators.test.ts
└── e2e/
    ├── home.spec.ts
    ├── about.spec.ts
    ├── connect-mastery.spec.ts
    ├── sop-and-ops-mastery.spec.ts
    ├── contact.spec.ts
    ├── get-a-demo.spec.ts
    ├── blog.spec.ts
    ├── resources.spec.ts
    ├── nav.spec.ts
    ├── i18n.spec.ts
    ├── seo.spec.ts
    └── newsletter.spec.ts
```

## License

© 2026 LeanWise AI. All rights reserved.
