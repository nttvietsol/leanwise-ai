export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cat: string;
  author: string;
  initials: string;
  date: string;
  read: string;
  feat?: boolean;
  hue: number;
  lang: Array<'EN' | 'VI'>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'connect-tss-mistakes',
    title: 'The 7 most expensive TSS mismatches we see in IKEA submissions',
    excerpt:
      "After processing 3,000+ documents we kept seeing the same mistakes. Here's the playbook to catch them before the auditor does.",
    cat: 'IKEA CONNECT Tips',
    author: 'Truong Xuan Truong',
    initials: 'TX',
    date: 'Apr 22, 2026',
    read: '8 min read',
    feat: true,
    hue: 180,
    lang: ['EN', 'VI'],
  },
  {
    slug: 'lean-ai-not-replacement',
    title: "AI doesn't replace Lean. It compresses the feedback loop.",
    excerpt:
      'A short essay on why we built LeanWise around Lean principles instead of pitching AI as a magic wand.',
    cat: 'Lean Manufacturing',
    author: 'Truong Xuan Truong',
    initials: 'TX',
    date: 'Apr 12, 2026',
    read: '5 min read',
    hue: 220,
    lang: ['EN'],
  },
  {
    slug: 'sedo-camping-case-study',
    title: 'Case study: SEDO Camping cut document review from 1 day to 45 min',
    excerpt:
      'How a Vietnamese supplier replaced spreadsheet-driven CONNECT review with an automated workflow.',
    cat: 'Case Studies',
    author: 'Nguyen Thanh Trung',
    initials: 'NT',
    date: 'Apr 02, 2026',
    read: '6 min read',
    hue: 30,
    lang: ['EN', 'VI'],
  },
  {
    slug: 'why-checklists-fail',
    title: 'Why checklists fail under deadline pressure (and what to do instead)',
    excerpt:
      "Manual SOPs collapse exactly when you need them most. The fix isn't more discipline — it's better tooling.",
    cat: 'Lean Manufacturing',
    author: 'Truong Xuan Truong',
    initials: 'TX',
    date: 'Mar 24, 2026',
    read: '7 min read',
    hue: 280,
    lang: ['EN'],
  },
  {
    slug: 'ai-quality-2026',
    title: 'AI in factory quality — what actually works in 2026',
    excerpt:
      "A grounded look at where AI moves the needle in quality, and where it's still hype.",
    cat: 'AI in Manufacturing',
    author: 'Nguyen Thanh Trung',
    initials: 'NT',
    date: 'Mar 18, 2026',
    read: '9 min read',
    hue: 140,
    lang: ['EN', 'VI'],
  },
  {
    slug: 'launching-leanwise',
    title: 'Why we started LeanWise AI',
    excerpt:
      "Two engineers. 25 years between us in IKEA factories. One frustration that wouldn't go away.",
    cat: 'Company Updates',
    author: 'LeanWise Team',
    initials: 'LW',
    date: 'Mar 02, 2026',
    read: '4 min read',
    hue: 200,
    lang: ['EN', 'VI'],
  },
];

export const BLOG_CATS = [
  'All',
  'Lean Manufacturing',
  'IKEA CONNECT Tips',
  'AI in Manufacturing',
  'Case Studies',
  'Company Updates',
] as const;
