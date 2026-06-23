<!-- DRAFTS — each block maps to one row in D1 `customer_stories`.
     Fields: company, industry, kpi, kpi_unit, kpi_sub, description,
     case_study_slug (optional), sort_order.
     ONLY Talimex is grounded in real repo data (case-studies.talimex.tsx).
     CPC / Ngoc Son / Sedo KPIs are [VERIFY] — replace with real numbers or cut. -->

---
## 1. Talimex  (grounded — real)

- company: Talimex
- industry: Furniture · IKEA supplier · HCMC
- kpi: 3
- kpi_unit: min
- kpi_sub: audit cycle, down from 6 hours
- case_study_slug: (link to the existing static case study at /case-studies/talimex,
  or publish it as a CASE post and reference its slug)
- sort_order: 1
- description: >
  Talimex ran CONNECT compliance audits by hand — six hours of an engineer
  cross-checking test reports, declarations and SDS files against the spec, every
  cycle. With LeanWise the same audit set resolves in three minutes at 99% match
  accuracy, and Talimex closed Q1 2026 with zero failed CONNECT cycles.

---
## 2. CPC  (placeholder — needs real data)

- company: CPC
- industry: [VERIFY — e.g. Furniture · IKEA supplier · HCMC]
- kpi: [VERIFY]
- kpi_unit: [VERIFY]
- kpi_sub: [VERIFY]
- sort_order: 2
- description: >
  [VERIFY] Draft scaffold only — supply CPC's real before/after numbers and a
  one-paragraph outcome, in the same shape as Talimex above. Do not publish with
  invented figures.

---
## 3. Ngoc Son  (placeholder — needs real data)

- company: Ngoc Son
- industry: [VERIFY]
- kpi: [VERIFY]
- kpi_unit: [VERIFY]
- kpi_sub: [VERIFY]
- sort_order: 3
- description: >
  [VERIFY] Draft scaffold only — supply Ngoc Son's real numbers and outcome.

---
## 4. Sedo  (placeholder — needs real data)

- company: Sedo
- industry: [VERIFY]
- kpi: [VERIFY]
- kpi_unit: [VERIFY]
- kpi_sub: [VERIFY]
- sort_order: 4
- description: >
  [VERIFY] Draft scaffold only — supply Sedo's real numbers and outcome.

---
### Reconcile before publishing
The aggregate metrics in `src/lib/metrics.ts` say results were measured across
**3 plants**, but four plant logos/stories appear on the site. Decide whether the
fourth plant is a live customer with publishable numbers or should be dropped from
the grid, so the per-plant rows don't contradict the "0 failed audits across 3
plants" footnote.
