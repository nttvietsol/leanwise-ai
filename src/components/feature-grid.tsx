import type { CSSProperties } from 'react';

/**
 * The `.lw-features` block shared by every /solutions/* page — a grid of
 * numbered feature cards. Each card pairs a mono index (`num`) with a title
 * and body.
 */
export type Feature = {
  num: string;
  title: string;
  body: string;
};

/* `style` allows per-page grid overrides (e.g. a fixed column count). */
function FeatureGrid({
  items,
  style,
}: {
  items: readonly Feature[];
  style?: CSSProperties;
}) {
  return (
    <div className="lw-features lw-reveal" style={{ marginTop: 48, ...style }}>
      {items.map((f) => (
        <div key={f.num} className="lw-feature">
          <div className="num">{f.num}</div>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </div>
  );
}

export { FeatureGrid };
