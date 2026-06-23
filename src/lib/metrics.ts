/* Compliance proof metrics — the four headline results, shared by the Home and
   Product pages so the numbers can never drift between them. Measured Q1 2026
   across 3 IKEA-supplier plants (see the footnote on the Home results section). */
export type ResultStat = { num: string; unit: string; lbl: string; desc: string };

export const COMPLIANCE_RESULTS: ResultStat[] = [
  { num: '75', unit: '%', lbl: 'Faster audit cycle', desc: '6h → 3min, measured' },
  { num: '99.2', unit: '%', lbl: 'Match accuracy', desc: 'vs human reviewer baseline' },
  { num: '0', unit: '', lbl: 'Failed audits Q1', desc: 'across 3 plants' },
  { num: '$48K', unit: '', lbl: 'Avg cost saved', desc: 'per plant per quarter' },
];
