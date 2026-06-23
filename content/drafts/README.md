# Content drafts — for review before publishing

These are **drafts** generated to fill the empty production D1 content store. Nothing
here is live. Each file maps to a row in the D1 `posts` or `customer_stories` table
(`db/schema.sql`).

## What needs your verification before publishing

- **`[VERIFY]` markers** — every specific number or claim I could not ground in the
  existing repo is marked `[VERIFY]`. Replace with real data or delete.
- **Plant count: 3 vs 4.** `src/lib/metrics.ts` says results were measured across
  **3 plants**; the Home hero and trust strip say **4 IKEA-supplier plants**. The
  four logos shown are Talimex, CPC, Ngoc Son, Sedo. Reconcile this before the
  customer-stories grid (which exposes per-plant rows) goes live, or the count
  contradiction becomes visible.
- **Only Talimex has real numbers** (from `src/routes/case-studies.talimex.tsx`).
  CPC / Ngoc Son / Sedo KPIs are placeholders.

## How to publish (after review)

1. Edit these files; resolve every `[VERIFY]`.
2. Either paste each into the `/admin` console (the intended authoring path — needs
   Cloudflare Access configured first), **or** ask me to convert the approved drafts
   into an idempotent `INSERT` seed and run it against remote D1:
   `wrangler d1 execute leanwise-ai --remote --file=<seed>.sql`
3. Re-add the `slug` fields to the two Home teaser cards in
   `src/components/optimizations.tsx` once the matching posts are published.
