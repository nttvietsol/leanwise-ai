import { Link } from '@tanstack/react-router';

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <img
      src="/assets/logo-icon.png"
      alt="LeanWise AI"
      width={size}
      height={size * (332 / 304)}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

export function LogoFull({ height = 36 }: { height?: number }) {
  return (
    <Link to="/" className="logo-link" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src="/assets/logo_leanwise.png"
        alt="LeanWise AI"
        height={height}
        style={{ height, width: 'auto', display: 'block' }}
      />
    </Link>
  );
}
