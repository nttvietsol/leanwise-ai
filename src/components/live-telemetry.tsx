import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

/* Animated telemetry console — hero artifact. KPIs + alerts on a slow tick. */

function Sparkline({ values }: { values: number[] }) {
  const w = 100;
  const h = 36;
  if (!values || values.length < 2) return null;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - (v / 100) * (h - 4) - 2,
  ]);
  const path = pts
    .map((p, i) =>
      i === 0
        ? `M${p[0].toFixed(2)} ${p[1].toFixed(2)}`
        : `L${p[0].toFixed(2)} ${p[1].toFixed(2)}`,
    )
    .join(' ');
  const areaPath = `${path} L ${w} ${h} L 0 ${h} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={areaPath} className="area" />
      <path d={path} className="line" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0]} cy={last[1]} r="2.2" className="dot" />
    </svg>
  );
}

/** Gentle bounded random walk. */
function step(v: number, lo: number, hi: number, jitter: number) {
  const next = v + (Math.random() - 0.5) * jitter;
  return Math.max(lo, Math.min(hi, next));
}

type KpiSeries = { v: number; hist: number[] };
type Feed = { id: number; tag: 'alert' | 'ok' | 'info'; body: ReactNode; time: string };

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function LiveTelemetry() {
  const [tick, setTick] = useState(0);
  const [kpi, setKpi] = useState<{
    oee: KpiSeries;
    defects: KpiSeries;
    throughput: KpiSeries;
    downtime: KpiSeries;
  }>({
    oee: { v: 86.4, hist: [60, 64, 68, 72, 70, 75, 78, 82, 84, 86] },
    defects: { v: 0.42, hist: [80, 76, 72, 68, 60, 55, 48, 44, 42, 38] },
    throughput: { v: 1242, hist: [40, 48, 52, 60, 65, 72, 78, 82, 88, 92] },
    downtime: { v: 12, hist: [70, 68, 60, 56, 48, 42, 38, 34, 28, 24] },
  });
  const [feed, setFeed] = useState<Feed[]>([
    {
      id: 0,
      tag: 'alert',
      body: (
        <>
          <b>Line 2</b> trending toward downtime threshold — recommend rotating
          crew at 15:30.
        </>
      ),
      time: '14:31',
    },
    {
      id: 1,
      tag: 'ok',
      body: (
        <>
          CONNECT audit cycle completed in <b>2m 47s</b> — 0 mismatches found.
        </>
      ),
      time: '14:18',
    },
    {
      id: 2,
      tag: 'info',
      body: (
        <>
          Shift B throughput tracking <b>+4.7%</b> vs 30-day baseline.
        </>
      ),
      time: '14:06',
    },
  ]);

  useEffect(() => {
    if (reduced()) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setKpi((k) => ({
        oee: {
          v: +step(k.oee.v, 84, 90, 0.6).toFixed(1),
          hist: [
            ...k.oee.hist.slice(1),
            Math.max(
              70,
              Math.min(96, k.oee.hist[k.oee.hist.length - 1] + (Math.random() - 0.5) * 8),
            ),
          ],
        },
        defects: {
          v: +step(k.defects.v, 0.3, 0.55, 0.04).toFixed(2),
          hist: [
            ...k.defects.hist.slice(1),
            Math.max(
              20,
              Math.min(85, k.defects.hist[k.defects.hist.length - 1] + (Math.random() - 0.5) * 8),
            ),
          ],
        },
        throughput: {
          v: Math.round(step(k.throughput.v, 1200, 1300, 12)),
          hist: [
            ...k.throughput.hist.slice(1),
            Math.max(
              40,
              Math.min(
                98,
                k.throughput.hist[k.throughput.hist.length - 1] + (Math.random() - 0.5) * 8,
              ),
            ),
          ],
        },
        downtime: {
          v: Math.round(step(k.downtime.v, 8, 18, 1.5)),
          hist: [
            ...k.downtime.hist.slice(1),
            Math.max(
              20,
              Math.min(
                85,
                k.downtime.hist[k.downtime.hist.length - 1] + (Math.random() - 0.5) * 8,
              ),
            ),
          ],
        },
      }));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduced()) return;
    const seeds: { tag: Feed['tag']; body: ReactNode }[] = [
      {
        tag: 'alert',
        body: (
          <>
            <b>Line 4</b> defect rate spiked — investigating last 2 batches.
          </>
        ),
      },
      {
        tag: 'ok',
        body: (
          <>
            SOP <b>v12</b> pushed to all operators on Shift B.
          </>
        ),
      },
      {
        tag: 'info',
        body: (
          <>
            Weekly OEE rolling average: <b>86.7%</b> — best month YTD.
          </>
        ),
      },
      {
        tag: 'alert',
        body: (
          <>
            Audit cycle for <b>NSF-2026-014</b> failed pre-check — review 3 items.
          </>
        ),
      },
      {
        tag: 'ok',
        body: (
          <>
            3 plants synced. Next baseline refresh at <b>02:00</b>.
          </>
        ),
      },
    ];
    let i = 0;
    const id = setInterval(() => {
      const t = `14:${String(40 - (i % 12)).padStart(2, '0')}`;
      setFeed((f) =>
        [
          { id: Date.now(), tag: seeds[i % seeds.length].tag, body: seeds[i % seeds.length].body, time: t },
          ...f,
        ].slice(0, 3),
      );
      i++;
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="lw-telemetry">
      <header className="lw-telemetry-h">
        <div className="left">
          <div className="lights">
            <i></i>
            <i></i>
            <i></i>
          </div>
          <span className="url">app.leanwise.ai/ops</span>
        </div>
        <div className="right">
          <span className="live">STREAMING</span>
          <span>14:32 · UTC+7</span>
        </div>
      </header>

      <div className="lw-telemetry-body">
        <div className="lw-telemetry-kpi">
          <div className="lw-tile">
            <div className="lbl">
              <span>OEE</span>
              <span className="delta">▲ +2.1</span>
            </div>
            <div className="v">
              {kpi.oee.v.toFixed(1)}
              <span className="unit">%</span>
            </div>
            <div className="spark">
              <Sparkline values={kpi.oee.hist} />
            </div>
          </div>
          <div className="lw-tile alt">
            <div className="lbl">
              <span>DEFECTS</span>
              <span className="delta">▼ −0.13</span>
            </div>
            <div className="v">
              {kpi.defects.v.toFixed(2)}
              <span className="unit">%</span>
            </div>
            <div className="spark">
              <Sparkline values={kpi.defects.hist} />
            </div>
          </div>
          <div className="lw-tile cool">
            <div className="lbl">
              <span>THROUGHPUT</span>
              <span className="delta">▲ +58</span>
            </div>
            <div className="v">
              {kpi.throughput.v.toLocaleString()}
              <span className="unit">u/h</span>
            </div>
            <div className="spark">
              <Sparkline values={kpi.throughput.hist} />
            </div>
          </div>
          <div className="lw-tile warn">
            <div className="lbl">
              <span>DOWNTIME</span>
              <span className="delta">▼ −7</span>
            </div>
            <div className="v">
              {kpi.downtime.v}
              <span className="unit">min</span>
            </div>
            <div className="spark">
              <Sparkline values={kpi.downtime.hist} />
            </div>
          </div>
        </div>

        <div className="lw-feed">
          <div className="lw-feed-h">
            <span>Decision feed</span>
            <span className="live">LIVE</span>
          </div>
          <div className="lw-feed-list">
            {feed.map((f) => (
              <div key={f.id} className="lw-feed-item">
                <span className={`tag ${f.tag}`}>
                  {f.tag === 'ok' ? 'OK' : f.tag.toUpperCase()}
                </span>
                <span className="body">{f.body}</span>
                <span className="time">{f.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="lw-telemetry-foot">
        <span>3 plants · 12 lines · 248 operators</span>
        <span className="scan"></span>
        <span>FRAME · {1247 + tick}</span>
      </footer>
    </div>
  );
}
