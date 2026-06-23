/* Live Validation Panel — the hero artifact.
   A document-validation console: a real compliance document (test report) is
   read, fields are extracted and checked against the live IKEA CONNECT TSS spec,
   each resolving to a confidence score and a Pass / Review / Fail stamp.

   Deterministic by design. Rows animate in once via staggered CSS delays (no
   random walk, no flicker) — a compliance buyer needs the numbers to read as
   reproducible, not as a live-jittering dashboard. SSR-safe: rows render in the
   markup and the CSS animation plays on first paint; reduced-motion shows them
   resolved. */

/* Confidence-chip state (color ramp) vs the verdict stamp. A field can read
   high-but-not-certain ('signal') yet still pass the spec, so the two are
   independent — the stamp never takes the 'signal' value. */
type ConfState = 'pass' | 'signal' | 'review' | 'fail';
type StampState = 'pass' | 'review' | 'fail';

type Row = {
  field: string;
  src: string;
  conf: number;
  state: ConfState;
  stamp: StampState;
};

/* One audited document's extracted fields. Confidence drives the chip state;
   the stamp is the validation verdict against the spec. */
const ROWS: Row[] = [
  { field: 'Rated static load', src: 'TR · §4.2 · p.6', conf: 99.4, state: 'pass', stamp: 'pass' },
  { field: 'Formaldehyde emission', src: 'TR · §7.1 · p.11', conf: 98.1, state: 'pass', stamp: 'pass' },
  { field: 'Surface coating · VOC', src: 'SDS · §3 · p.2', conf: 91.7, state: 'signal', stamp: 'pass' },
  { field: 'Recycled content claim', src: 'GRS · cert. p.1', conf: 72.3, state: 'review', stamp: 'review' },
  { field: 'Edge banding adhesive', src: 'DS · annex B', conf: 54.8, state: 'fail', stamp: 'fail' },
];

function FileGlyph() {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" aria-hidden="true">
      <path
        d="M1 1.5A.5.5 0 0 1 1.5 1h6L12 4.5v8a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M7.5 1v3.5H12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function LiveValidation() {
  return (
    <div className="lw-validate" role="img" aria-label="Compliance document validation: 42 fields checked against the IKEA CONNECT TSS spec — 39 pass, 2 review, 1 fail, mean confidence 96.2%.">
      <header className="lw-validate-h">
        <span className="file">
          <FileGlyph />
          <span className="name">TR-2026-TALIMEX-0142.pdf</span>
        </span>
        <span className="spec">CONNECT TSS · 2026.1 · run #1142</span>
      </header>

      <div className="lw-validate-body" aria-hidden="true">
        {ROWS.map((r) => (
          <div key={r.field} className="lw-validate-row">
            <span className="field">
              {r.field}
              <span className="src">{r.src}</span>
            </span>
            <span className="lw-conf" data-state={r.state}>
              {r.conf.toFixed(1)}% {r.state}
            </span>
            <span className={`lw-stamp ${r.stamp}`}>{r.stamp}</span>
          </div>
        ))}
      </div>

      <footer className="lw-validate-foot">
        <span className="summary">
          <b>42</b> fields
          <span className="ok">39 pass</span>
          <span className="rv">2 review</span>
          <span className="fl">1 fail</span>
        </span>
        <span className="mean">mean confidence 96.2%</span>
      </footer>
    </div>
  );
}
