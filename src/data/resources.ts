export type ResourceItem = {
  slug: string;
  type: 'Ebook' | 'Infographic' | 'Template' | 'Checklist' | 'Worksheet';
  title: string;
  desc: string;
  cat: 'IKEA CONNECT' | 'Lean' | 'AI';
  pages: string;
  hue: number;
  gated: boolean;
};

export const RESOURCES: ResourceItem[] = [
  {
    slug: 'connect-playbook',
    type: 'Ebook',
    title: 'The CONNECT Compliance Playbook',
    desc:
      "32 pages — every IKEA CONNECT pitfall we've seen across 3,000+ documents, with the playbook to avoid them.",
    cat: 'IKEA CONNECT',
    pages: '32 pages · PDF',
    hue: 180,
    gated: true,
  },
  {
    slug: 'tss-tree',
    type: 'Infographic',
    title: 'TSS Mismatch Decision Tree',
    desc:
      'A one-page visual to triage TSS gaps before you submit. Print and tape to the wall.',
    cat: 'IKEA CONNECT',
    pages: '1 page · PDF',
    hue: 30,
    gated: true,
  },
  {
    slug: 'sop-template',
    type: 'Template',
    title: 'SOP Visual Builder Starter',
    desc:
      'A free SOP template to convert text-based work instructions into visual ones — works in any tool.',
    cat: 'Lean',
    pages: '8 pages · DOCX',
    hue: 280,
    gated: true,
  },
  {
    slug: 'ai-roi',
    type: 'Ebook',
    title: 'AI ROI for Mid-Size Manufacturers',
    desc:
      'A pragmatic framework to estimate the financial return of AI initiatives in your factory.',
    cat: 'AI',
    pages: '24 pages · PDF',
    hue: 140,
    gated: true,
  },
  {
    slug: 'lean-checklist',
    type: 'Checklist',
    title: 'The 30-Minute Lean Self-Audit',
    desc:
      'A quick checklist for plant managers to identify the top 3 sources of waste in their line.',
    cat: 'Lean',
    pages: '4 pages · PDF',
    hue: 220,
    gated: false,
  },
  {
    slug: 'audit-prep',
    type: 'Worksheet',
    title: 'IKEA Audit Prep Worksheet',
    desc:
      'A structured prep doc for the week before an IKEA audit — checked by real CONNECT leaders.',
    cat: 'IKEA CONNECT',
    pages: '6 pages · PDF',
    hue: 200,
    gated: true,
  },
];

export const RES_CATS = ['All', 'IKEA CONNECT', 'Lean', 'AI'] as const;
export const RES_TYPES = [
  'All types',
  'Ebook',
  'Infographic',
  'Template',
  'Checklist',
  'Worksheet',
] as const;
