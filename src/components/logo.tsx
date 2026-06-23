import { Link } from '@tanstack/react-router';

/** v2 industrial wordmark — graphite tile + "LeanWise.AI" with amber dot. */
export function Logo() {
  return (
    <Link to="/" className="lw-logo">
      <span className="mark">L</span>
      <span>
        LeanWise<span className="dot">.</span>AI
      </span>
    </Link>
  );
}
