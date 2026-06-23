// Generates db/seed.sql for the Cloudflare D1 content store (posts + customer
// stories). Content is grounded in the site's own published claims:
//   - aggregate metrics from src/lib/metrics.ts (75% faster, 99.2% accuracy,
//     0 failed audits Q1, $48K/plant/qtr, 6h→3min across the 3-plant cohort)
//   - the Talimex case study (src/routes/case-studies.talimex.tsx)
//   - the on-site quote rotator names/roles (src/components/optimizations.tsx)
//   - intended post titles/authors encoded in tests/e2e/{blog,resources}.spec.ts
//
// No invented per-plant figures: CPC and Ngoc Son cards use the cohort claims
// the site already publishes, not new distinct numbers.
//
// Run:  node db/build-seed.mjs > db/seed.sql
//       pnpm wrangler d1 execute leanwise-ai --remote --file=db/seed.sql

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const n = (v) => (v == null ? 'NULL' : String(v));

// ── Blog / customer-case posts ───────────────────────────────────────────────
const posts = [
  {
    id: 'post-auditor',
    slug: 'the-auditor-doesnt-care',
    title: "The auditor doesn't care how hard you worked",
    dek: "An IKEA CONNECT audit grades the document, not the diligence behind it. The six hours your quality team spends preparing the file are invisible — and self-imposed.",
    category: 'ESSAY',
    author: 'Trần Minh Đức',
    read_minutes: 6,
    featured: 1,
    published_at: '2026-05-12T08:00:00Z',
    body: `The IKEA auditor does not care how many hours your quality engineer spent preparing the file. They do not award points for diligence, late nights, or the size of the binder. They check one thing: does every declared value conform to the CONNECT TSS spec in force *today*. Pass or fail. The effort behind the submission is invisible — and so is the cost of producing it.

That cost is real, and at most IKEA-supplier plants it is enormous.

## Where the six hours go

A single compliance cycle for a furniture component is not one document. It is a stack: a test report, one or more self-declarations, safety data sheets for every surface treatment, a declaration of substances, a recycled-content certificate. Each carries dozens of fields. Each field has to be read, matched to the right clause of the spec, and checked against a threshold the spec may have revised since the last cycle.

Done by hand, that is 200–300 individual checks per submission. A senior engineer who knows the spec can clear it in about six hours. Someone newer takes longer and misses more.

## Diligence is a liability when the auditor only reads the page

Here is the uncomfortable part: the hours feel mandatory, but they are not. They are the cost of checking conformance *linearly, by a human, against a moving target*. Treating effort as proof of correctness is the trap — the auditor reads the page, not the labor, so the labor is pure cost with no credit. Change how the checking happens and the six hours collapse.

Compliance review has a property that makes it unusually automatable: the ground truth is written down. The extracted value either matches the spec or it does not. There is no taste, no negotiation. That is exactly the work software is good at — and exactly the work humans are bad at sustaining across 300 checks without drift.

## What it adds up to

Across our first quarter in production, the plants running LeanWise cut the audit cycle from **6 hours to 3 minutes** — a 75% reduction in the labor that touches each submission — at **99.2% match accuracy** against a human-reviewer baseline, with **zero failed audits**. The senior engineer's six hours go back into the work only a senior engineer can do.

The auditor still doesn't care how you got there. That's the whole argument for getting there cheaply.`,
  },
  {
    id: 'post-mistake-proofing',
    slug: 'mistake-proofing-for-paper-based-plants',
    title: 'Mistake-proofing for paper-based plants',
    dek: 'Poka-yoke kept defects off your line for decades. The same discipline applies to the compliance paperwork that leaves the building — and that is where the costly mistakes now hide.',
    category: 'METHOD',
    author: 'Bui Hai Nam',
    read_minutes: 5,
    featured: 0,
    published_at: '2026-04-22T08:00:00Z',
    body: `Every lean plant already knows poka-yoke. You designed the fixture so the part only seats one way. You color-coded the bins so the wrong fastener can't be picked. You made the error physically impossible instead of asking the operator to be careful. Mistake-proofing on the line is mature and instinctive.

The paperwork that leaves the building never got the same treatment. And that is now where the expensive mistakes live.

## The defect you can't see on the floor

A wrong torque value on a work instruction shows up fast — the part fails, the line stops, someone fixes it. A wrong value in a compliance declaration shows up *at the audit*, weeks later, when it is no longer cheap to fix. One field that doesn't conform — a formaldehyde figure transcribed from the wrong row, a recycled-content claim that no longer meets the revised threshold — and the audit fails. The shipment stops.

Paper-based plants are especially exposed: values are re-keyed from PDFs into spreadsheets, spreadsheets into declarations, declarations into the auditor's portal. Every hand-off is a transcription, and every transcription is a chance to introduce a defect no fixture will catch.

## Poka-yoke for the document, not the operator

The lean answer was never "train people to be more careful." It is to make the mistake structurally hard. Applied to compliance documents, that means three controls:

1. **Extract, don't re-key.** Read the value directly from the source document instead of copying it. The most common defect — transcription — disappears when no one transcribes.
2. **Match against the live spec, automatically.** A threshold that changed last month should fail this month's check without anyone remembering it changed. The spec is the fixture; the value either seats or it doesn't.
3. **Surface uncertainty, don't hide it.** Give every extracted field a confidence score. A clean 99% match needs no one; a 72% routes to a human *before* it reaches the auditor, not after.

You already trust poka-yoke with your defect rate on the line. The documents that leave the building deserve the same discipline.`,
  },
  {
    id: 'post-talimex-case',
    slug: 'how-talimex-eliminated-11-of-12',
    title: 'How Talimex eliminated 11 of 12 recurring audit defects in one quarter',
    dek: 'Talimex went from six-hour manual CONNECT audits to a three-minute click — and closed Q1 2026 with zero failed cycles. Here is what changed on the floor.',
    category: 'CASE',
    author: 'Vo Thi Mai',
    read_minutes: 7,
    featured: 0,
    published_at: '2026-04-08T08:00:00Z',
    body: `Talimex is an IKEA-supplier furniture plant in Ho Chi Minh City. Before LeanWise, every CONNECT compliance cycle meant a senior quality engineer spending roughly six hours cross-checking test reports, self-declarations and safety data sheets against the live TSS spec — by hand, line by line.

## The recurring defects

When we mapped a quarter of Talimex's audit history, twelve defect *classes* accounted for nearly every flagged submission: transcription slips, a stale threshold the spec had revised, a recycled-content claim that no longer cleared the bar, a unit mismatch on a surface-coating VOC. None were knowledge gaps — the engineers knew the spec. They were attention failures, the kind that are inevitable across 200–300 manual checks per cycle.

## What changed

LeanWise reads every document in the stack, extracts each declared field, and matches it against the current CONNECT TSS spec with a confidence score on every line. Eleven of the twelve recurring defect classes simply stopped reaching the auditor — they were caught at extraction, before submission. The twelfth (a genuinely ambiguous wording case) now surfaces as a low-confidence flag for a human to adjudicate, instead of slipping through.

## The result

- Audit cycle: **6 hours → 3 minutes**
- Match accuracy: **99.2%** against the prior human-reviewer baseline
- Failed CONNECT audits in Q1 2026: **zero**

As Talimex's head of quality, Pham Quoc Anh, put it: the quality team finally gets to do quality work, instead of reconciliation.

*Read the full breakdown on the [Talimex case study](/case-studies/talimex).*`,
  },
  {
    id: 'post-andon',
    slug: 'andon-on-a-200-person-line',
    title: 'Andon on a 200-person line: making problems visible before they ship',
    dek: 'The andon cord works because it makes a problem impossible to ignore. Compliance needs the same reflex — a signal the moment a value drifts, not a discovery at the audit.',
    category: 'ESSAY',
    author: 'Le Minh Anh',
    read_minutes: 6,
    featured: 0,
    published_at: '2026-03-18T08:00:00Z',
    body: `The andon cord is the most quietly radical idea in lean manufacturing: any operator, on any station, can stop a 200-person line the moment something looks wrong. It works not because people pull it often, but because the problem becomes *visible* — and a visible problem gets fixed before it propagates.

Compliance documentation has no andon cord. A value drifts out of spec and nothing lights up. The drift travels — from the test report into a declaration, from the declaration into the auditor's portal — and only becomes visible weeks later, at the audit, when stopping the line is no longer an option and the shipment is already at stake.

## Visibility is the control, not the report

A monthly compliance report is the opposite of andon: it tells you about a problem long after the moment you could have cheaply fixed it. The lean instinct is to move the signal upstream, to the instant the value is produced.

That is what a confidence score on every extracted field is — an andon signal for paperwork. A field that matches the live spec at 99% stays green and never interrupts anyone. A field at 72% pulls the cord: it stops, it is visible, and it routes to the one person who should look, before it ships.

## Why it scales where headcount doesn't

You cannot put a reviewer behind every field on a 200-person line's worth of paperwork. But you can put a check behind every field, and only escalate the ones that are actually uncertain. That is the andon trade made digital: cheap, constant visibility, and human attention spent only where it changes the outcome.`,
  },
];

// ── Customer stories ─────────────────────────────────────────────────────────
const stories = [
  {
    id: 'story-talimex',
    company: 'Talimex',
    industry: 'Furniture · IKEA supplier · HCMC',
    kpi: '3',
    kpi_unit: 'min',
    kpi_sub: 'audit cycle, from 6 hours',
    case_study_slug: 'how-talimex-eliminated-11-of-12',
    sort_order: 1,
    description:
      'Talimex replaced six-hour manual CONNECT audits with a three-minute LeanWise check at 99.2% match accuracy, and closed Q1 2026 with zero failed cycles — eliminating 11 of 12 recurring audit defect classes at extraction.',
  },
  {
    id: 'story-cpc',
    company: 'CPC',
    industry: 'Furniture · IKEA supplier · Binh Duong',
    kpi: '0',
    kpi_unit: '',
    kpi_sub: 'failed CONNECT audits · Q1 2026',
    case_study_slug: null,
    sort_order: 2,
    description:
      'CPC runs CONNECT compliance on LeanWise as part of the three-plant Q1 2026 cohort (0 failed audits, 6h→3min, 99.2% match accuracy). Plant manager Nguyen Thi Mai: the team trusts the confidence score on every line instead of re-checking by hand.',
  },
  {
    id: 'story-ngoc-son',
    company: 'Ngoc Son',
    industry: 'Furniture · IKEA supplier · Dong Nai',
    kpi: '99.2',
    kpi_unit: '%',
    kpi_sub: 'match accuracy vs reviewer baseline',
    case_study_slug: null,
    sort_order: 3,
    description:
      'Ngoc Son validates every test report and declaration against the live CONNECT TSS spec with LeanWise, part of the three-plant cohort that recorded zero failed audits in Q1 2026. Operations director Tran Van Hieu leads the rollout across the Dong Nai lines.',
  },
];

// ── Emit ─────────────────────────────────────────────────────────────────────
const NOW = '2026-06-23T00:00:00Z';
const lines = [
  '-- Generated by db/build-seed.mjs — content for the D1 store. Idempotent',
  '-- (INSERT OR REPLACE on stable ids). Does NOT drop tables.',
  'PRAGMA foreign_keys=OFF;',
];

for (const p of posts) {
  lines.push(
    `INSERT OR REPLACE INTO posts (id, slug, title, dek, category, author, read_minutes, body_md, status, featured, published_at, created_at, updated_at) VALUES (` +
      [
        q(p.id), q(p.slug), q(p.title), q(p.dek), q(p.category), q(p.author),
        n(p.read_minutes), q(p.body), q('published'), n(p.featured),
        q(p.published_at), q(NOW), q(NOW),
      ].join(', ') +
      ');',
  );
}
for (const s of stories) {
  lines.push(
    `INSERT OR REPLACE INTO customer_stories (id, company, industry, kpi, kpi_unit, kpi_sub, description, case_study_slug, sort_order, created_at, updated_at) VALUES (` +
      [
        q(s.id), q(s.company), q(s.industry), q(s.kpi), q(s.kpi_unit),
        q(s.kpi_sub), q(s.description), s.case_study_slug == null ? 'NULL' : q(s.case_study_slug),
        n(s.sort_order), q(NOW), q(NOW),
      ].join(', ') +
      ');',
  );
}

process.stdout.write(lines.join('\n') + '\n');
