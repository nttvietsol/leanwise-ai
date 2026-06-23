import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { COMPLIANCE_RESULTS } from '~/lib/metrics';

/* Landing-page proof components: stat banner, scale anchors, comparison
   table, before/after, quote rotator, resources teaser. */

/** The four headline compliance metrics as a 4-cell grid. Shared by the Home
    and Product pages so the markup never diverges. */
export function ResultsGrid() {
  return (
    <div className="lw-results-grid lw-reveal">
      {COMPLIANCE_RESULTS.map((r) => (
        <div key={r.lbl} className="lw-results-cell">
          <div className="lbl">{r.lbl.toUpperCase()}</div>
          <div className="num">
            <span className="a">{r.num}</span>
            <span className="unit">{r.unit}</span>
          </div>
          <div className="desc">{r.desc}</div>
        </div>
      ))}
    </div>
  );
}

export function CompactStatBanner() {
  const stats = [
    { num: '75', unit: '%', lbl: 'Faster audit cycle' },
    { num: '99.2', unit: '%', lbl: 'Match accuracy' },
    { num: '0', unit: '', lbl: 'Failed audits · Q1' },
    { num: '$48K', unit: '', lbl: 'Saved · plant / quarter' },
  ];
  return (
    <div className="lw-statbanner">
      <div className="lw-container">
        <div className="row">
          <span className="lbl">RESULTS · Q1 2026 · 3 PLANTS</span>
          <div className="grid">
            {stats.map((s) => (
              <div key={s.lbl} className="cell">
                <span className="num">
                  <span className="a">{s.num}</span>
                  <span className="unit">{s.unit}</span>
                </span>
                <span className="cap">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScaleAnchors() {
  const anchors = [
    { x: 6, lbl: '1 audit cycle', sub: '6 hrs senior QE time', est: '$480' },
    { x: 24, lbl: '1 plant · 1 month', sub: '~24 hrs / 4 cycles', est: '$1.9K' },
    { x: 290, lbl: '1 plant · 12 months', sub: '~290 hrs', est: '$23K' },
    {
      x: 1160,
      lbl: '4 plants · annualized',
      sub: '~1,160 hrs of paperwork',
      est: '$92K',
      big: true,
    },
  ];
  const max = Math.log10(anchors[anchors.length - 1].x + 10);
  return (
    <div className="lw-scale">
      <div className="lw-scale-head">
        <div>
          <h3>
            Hours senior engineers <em>burn</em> on manual audits.
          </h3>
          <p>
            One IKEA-supplier plant. One year. Below: each anchor is a real cost
            we measured at four HCMC plants in Q1 2026.
          </p>
        </div>
        <span className="meta">SOURCE · Q1 2026 INTERNAL · n=4 PLANTS</span>
      </div>

      <div className="lw-scale-track">
        <div className="lw-scale-bar">
          <div className="fill"></div>
          {anchors.map((a, i) => {
            const left = (Math.log10(a.x + 10) / max) * 100;
            return (
              <div
                key={i}
                className={`tick ${a.big ? 'big' : ''}`}
                style={{ left: `${left}%` }}
              >
                <span className="dot"></span>
                <div className="card">
                  <span className="x">{a.x}h</span>
                  <span className="lbl">{a.lbl}</span>
                  <span className="sub">{a.sub}</span>
                  <span className="est">≈ {a.est}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="lw-scale-axis">
          <span>0 hrs</span>
          <span>~50</span>
          <span>~250</span>
          <span>~1,200 hrs</span>
        </div>
      </div>

      <div className="lw-scale-foot">
        <div>
          <span className="k">$92K</span>
          <span className="lbl">
            Annual labor burn · 4-plant fleet · re-keyed compliance work
          </span>
        </div>
        <div>
          <span className="k">3 min</span>
          <span className="lbl">
            What LeanWise replaces a 6-hour audit cycle with
          </span>
        </div>
        <div>
          <span className="k">99.2%</span>
          <span className="lbl">
            Match accuracy on CONNECT v18 spec semantic checks
          </span>
        </div>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  const rows = [
    { dim: 'Audit cycle time', a: '4–6 hrs', b: '2–3 hrs', c: '1–2 hrs', d: '2–3 min' },
    { dim: 'Knowledge retention', a: '✗', b: '◐', c: '◐', d: '✓' },
    { dim: 'IKEA CONNECT compliance', a: 'Manual', b: 'Manual', c: 'Custom build', d: 'Native' },
    { dim: 'Time-to-insight', a: 'End-of-day', b: 'Daily batch', c: 'Hourly poll', d: 'Real-time' },
    { dim: 'Setup time', a: '0', b: '6–12 mo', c: '3–6 mo', d: '< 2 weeks' },
    { dim: 'VI ↔ EN bilingual', a: '✗', b: '✗', c: 'Add-on', d: 'Native' },
  ];
  const cols = [
    { key: 'a', name: 'Spreadsheets', sub: 'The default' },
    { key: 'b', name: 'ERP module', sub: 'SAP / Oracle' },
    { key: 'c', name: 'MES + add-ons', sub: 'Custom-built' },
    { key: 'd', name: 'LeanWise AI', sub: 'Out of box', us: true },
  ];
  return (
    <div className="lw-compare">
      <table>
        <thead>
          <tr>
            <th className="dim">
              <span>DIMENSION</span>
            </th>
            {cols.map((c) => (
              <th key={c.key} className={c.us ? 'us' : ''}>
                <span className="n">{c.name}</span>
                <span className="s">{c.sub}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="dim">{r.dim}</td>
              <td>{r.a}</td>
              <td>{r.b}</td>
              <td>{r.c}</td>
              <td className="us">{r.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lw-compare-foot">
        ✓ native · ◐ partial · ✗ not supported · benchmarks measured Q1 2026
        against 4 IKEA-supplier plants in HCMC · third-party validation pending Q3
        2026.
      </div>
    </div>
  );
}

type FlowStep = { lbl: string; t: string };

function FlowTrack({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="track">
      {steps.map((s, i) => (
        <div
          key={i}
          className="seg"
          style={{ flex: parseInt(s.t) }}
          title={`${s.lbl} · ${s.t}`}
        >
          <span className="t">{s.t}</span>
          <span className="lbl">{s.lbl}</span>
        </div>
      ))}
    </div>
  );
}

export function BeforeAfter() {
  const manual: FlowStep[] = [
    { lbl: 'Print TSS', t: '15m' },
    { lbl: 'Fetch CONNECT spec', t: '20m' },
    { lbl: 'Cross-check by hand', t: '180m' },
    { lbl: 'Log discrepancies', t: '45m' },
    { lbl: 'Rework + re-check', t: '60m' },
    { lbl: 'Email approvals', t: '40m' },
    { lbl: 'Compile audit report', t: '30m' },
    { lbl: 'File + archive', t: '10m' },
  ];
  const auto: FlowStep[] = [
    { lbl: 'Drop documents', t: '30s' },
    { lbl: 'AI cross-reference', t: '120s' },
    { lbl: 'Review + export', t: '17s' },
  ];
  return (
    <div className="lw-bafter">
      <div className="row manual">
        <div className="head">
          <span className="tag">BEFORE · MANUAL</span>
          <span className="total">6 h 0 min · per audit cycle</span>
        </div>
        <FlowTrack steps={manual} />
      </div>
      <div className="row auto">
        <div className="head">
          <span className="tag">AFTER · LEANWISE</span>
          <span className="total">
            <em>2 m 47 s</em> · same cycle
          </span>
        </div>
        <FlowTrack steps={auto} />
      </div>
      <div className="lw-bafter-delta">
        <span className="d">−128×</span>
        <span className="l">
          faster · per audit cycle · zero quality regression
        </span>
      </div>
    </div>
  );
}

const QUOTES = [
  {
    text: 'We replaced a 6-hour manual audit with a 3-minute AI check. Zero failed CONNECT audits this quarter — and our quality team finally gets to do quality work.',
    name: 'Pham Quoc Anh',
    role: 'HEAD OF QUALITY · TALIMEX · HCMC',
    logo: '/assets/Talimex-logo.png',
  },
  {
    text: 'Before LeanWise, every shift change burned 40 minutes on handover paperwork. Now the next supervisor sees a live decision feed the moment they badge in.',
    name: 'Nguyen Thi Mai',
    role: 'PLANT MANAGER · CPC · BINH DUONG',
    logo: '/assets/cpc-logo.png',
  },
  {
    text: 'When our senior QE retired, ten years of tribal knowledge would have walked out with him. LeanWise SOP captured 80% of it in three weeks of guided sessions.',
    name: 'Tran Van Hieu',
    role: 'OPERATIONS DIRECTOR · NGOC SON · DONG NAI',
    logo: '/assets/ngoc-son-logo.png',
  },
];

export function QuoteRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % QUOTES.length), 8000);
    return () => clearInterval(id);
  }, []);
  const q = QUOTES[i];
  return (
    <div className="lw-quoterot">
      <div className="lw-quote" key={i}>
        <p className="text">{q.text}</p>
        <div className="who">
          <span className="av"></span>
          <div>
            <div className="name">{q.name}</div>
            <div className="role">{q.role}</div>
          </div>
          <img src={q.logo} className="logo" alt="" />
        </div>
      </div>
      <div className="lw-quoterot-dots" role="tablist">
        {QUOTES.map((quote, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === i}
            className={idx === i ? 'on' : ''}
            onClick={() => setI(idx)}
          >
            <span className="bar">
              <span
                className="fill"
                style={{ animationPlayState: idx === i ? 'running' : 'paused' }}
              ></span>
            </span>
            <span className="cap">
              {quote.name.split(' ').slice(-1)[0]} ·{' '}
              {quote.role.split(' · ')[1]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

type TeaserItem = {
  kind: string;
  tag: string;
  title: string;
  date: string;
  slug?: string; // a blog post slug; otherwise links to /resources
};

const TEASER_ITEMS: TeaserItem[] = [
  {
    kind: 'ESSAY',
    tag: 'Lean ops',
    title: 'The 6-hour audit is a choice, not a constraint',
    date: 'MAY 2026',
    slug: 'the-auditor-doesnt-care',
  },
  {
    kind: 'GUIDE',
    tag: 'Playbook',
    title: 'A field guide to AI in IKEA-supplier compliance',
    date: 'APR 2026',
  },
  {
    kind: 'METHOD',
    tag: 'Audit',
    title: 'Mistake-proofing for paper-based plants',
    date: 'APR 2026',
    slug: 'mistake-proofing-for-paper-based-plants',
  },
  {
    kind: 'RESEARCH',
    tag: 'Benchmark',
    title: 'Q1 2026 fleet benchmarks: OEE, defects, throughput',
    date: 'MAR 2026',
  },
];

function TeaserCardInner({ it }: { it: TeaserItem }) {
  return (
    <>
      <div className="meta">
        <span className="kind">{it.kind}</span>
        <span className="date">{it.date}</span>
      </div>
      <h3>{it.title}</h3>
      <span className="tag">
        {it.tag} <span className="arrow">→</span>
      </span>
    </>
  );
}

export function ResourcesTeaser() {
  return (
    <section className="lw-restease">
      <div className="lw-container">
        <div className="lw-restease-head">
          <div>
            <div className="lw-eyebrow">Field notes</div>
            <h2 className="lw-h2">From the floor.</h2>
          </div>
          <Link to="/resources" className="lw-btn lw-btn-link">
            All resources <span className="arrow">→</span>
          </Link>
        </div>
        <div className="lw-restease-grid">
          {TEASER_ITEMS.map((it) =>
            it.slug ? (
              <Link
                key={it.title}
                to="/blog/$slug"
                params={{ slug: it.slug }}
                className="lw-restease-card"
              >
                <TeaserCardInner it={it} />
              </Link>
            ) : (
              <Link
                key={it.title}
                to="/resources"
                className="lw-restease-card"
              >
                <TeaserCardInner it={it} />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
