import { useEffect, useRef, useState } from 'react';

/* Scroll-driven How-It-Works + the three audit stage frames. */

function UploadStage() {
  return (
    <div className="sf-upload">
      <div className="doc"></div>
      <div className="lbl">DROP FILES HERE</div>
      <div className="sub">PDF · DOCX · XLSX up to 50 MB · batch supported</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginTop: 16,
          flexWrap: 'wrap',
        }}
      >
        {['NSF-026-TSS.pdf', 'TestPlan-2026-Q2.xlsx', 'CONNECT-spec-v18.pdf'].map(
          (f) => (
            <span
              key={f}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                padding: '4px 10px',
                background: 'var(--paper-2)',
                border: '1px solid var(--line)',
                borderRadius: 100,
                color: 'var(--ink-3)',
              }}
            >
              {f}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function ProcessStage({ active }: { active: boolean }) {
  const [pct, setPct] = useState([100, 100, 64, 0]);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setPct([100, 100, 100, 100]);
      return;
    }
    setPct([100, 100, 0, 0]);
    const id = setInterval(() => {
      setPct((p) => {
        const next = [...p];
        if (next[2] < 100) next[2] = Math.min(100, next[2] + 6);
        else if (next[3] < 100) next[3] = Math.min(100, next[3] + 4);
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, [active]);
  const rows = [
    { n: 'Parsing 14 source documents', p: pct[0] },
    { n: 'Extracting 248 requirements', p: pct[1] },
    { n: 'Semantic matching · CONNECT v18', p: pct[2] },
    { n: 'Generating compliance report', p: pct[3] },
  ];
  return (
    <div className="sf-process">
      {rows.map((r, i) => {
        const done = r.p >= 100;
        return (
          <div key={i} className={`row ${done ? '' : 'pending'}`}>
            <span className="check">{done ? '✓' : '◐'}</span>
            <span className="name">{r.n}</span>
            <span className="pct">{r.p}%</span>
          </div>
        );
      })}
    </div>
  );
}

export function ResultStage() {
  return (
    <div className="sf-result">
      <div className="top">
        <span className="pass">● PASS · 247/248</span>
        <span className="meta">2m 47s · audit ID 2026-Q2-1142</span>
      </div>
      <div className="grid">
        <div className="item">
          <div className="l">Documents</div>
          <div className="v">14 files · 248 requirements</div>
        </div>
        <div className="item">
          <div className="l">CONNECT spec</div>
          <div className="v">v18 · current</div>
        </div>
        <div className="item">
          <div className="l">Mismatches</div>
          <div className="v" style={{ color: 'var(--amber-2)' }}>
            1 minor · auto-flagged
          </div>
        </div>
        <div className="item">
          <div className="l">Confidence</div>
          <div className="v">99.2%</div>
        </div>
      </div>
      <div className="summary">
        <b>Ready to ship.</b> 247 requirements verified. 1 ambiguity in TSS§4.2 —
        likely a wording mismatch, not a defect. Reviewer noted, not blocking.
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: '01',
    title: 'Upload your factory documents',
    body: 'Drop test plans, TSS files, and CONNECT specs into the secure portal. Drag-and-drop, batch supported, no IT involvement needed.',
  },
  {
    n: '02',
    title: 'AI cross-references in real time',
    body: 'Our AI reads, understands, and matches every requirement against the latest IKEA CONNECT spec — semantic matching, not keyword search. Typically under 3 minutes.',
  },
  {
    n: '03',
    title: 'Review, decide, export',
    body: 'Get a clear pass/fail report with specific discrepancies highlighted. Export as PDF, sync to your QMS, or trigger a re-check after fixes.',
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lw-howit-grid">
      <div>
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            ref={(el) => {
              stepsRef.current[i] = el;
            }}
            data-idx={i}
            className={`lw-howit-step ${active === i ? 'active' : ''}`}
            onClick={() => setActive(i)}
            style={{ minHeight: '40vh' }}
          >
            <span className="n">
              STEP {s.n} / {String(STEPS.length).padStart(2, '0')}
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="lw-howit-stage">
        <header className="lw-console-h">
          <div className="left">
            <div
              className="lights"
              style={{ display: 'inline-flex', gap: 6, marginRight: 8 }}
            >
              <i style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}></i>
              <i style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}></i>
              <i style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}></i>
            </div>
            <span style={{ color: 'var(--ink-3)' }}>
              app.leanwise.ai/connect/audit
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              color: 'var(--ink-4)',
            }}
          >
            STEP {STEPS[active].n} / 03
          </div>
        </header>
        <div className="stage-body">
          <div className={`stage-frame ${active === 0 ? 'active' : ''}`}>
            <UploadStage />
          </div>
          <div className={`stage-frame ${active === 1 ? 'active' : ''}`}>
            <ProcessStage active={active === 1} />
          </div>
          <div className={`stage-frame ${active === 2 ? 'active' : ''}`}>
            <ResultStage />
          </div>
        </div>
      </div>
    </div>
  );
}
