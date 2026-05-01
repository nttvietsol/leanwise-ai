import type { ReactNode } from 'react';

export function Page({ children }: { children: ReactNode }) {
  return <main className="page">{children}</main>;
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  titleClass = 'h2',
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center' | 'right';
  titleClass?: string;
}) {
  return (
    <div className={`sec-h sec-h-${align}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {title && <h2 className={titleClass}>{title}</h2>}
      {sub && (
        <p
          className="lead"
          style={{ maxWidth: 640, marginInline: align === 'center' ? 'auto' : 0 }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function Marquee({
  children,
  speed = 50,
}: {
  children: ReactNode;
  speed?: number;
}) {
  return (
    <div className="marquee">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {children}
        {children}
      </div>
    </div>
  );
}
