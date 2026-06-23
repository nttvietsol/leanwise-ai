import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * The standalone demo page was folded into /contact during the v2 re-port.
 * Kept as a permanent redirect so existing inbound links and indexed URLs
 * resolve instead of 404ing.
 */
export const Route = createFileRoute('/get-a-demo')({
  beforeLoad: () => {
    throw redirect({ to: '/contact', statusCode: 301 });
  },
});
