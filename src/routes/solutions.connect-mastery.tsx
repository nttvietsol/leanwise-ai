import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * CONNECT Mastery was promoted to the primary `/product` page in the
 * compliance-led redesign. Kept as a permanent redirect so existing inbound
 * links and indexed URLs resolve instead of 404ing.
 */
export const Route = createFileRoute('/solutions/connect-mastery')({
  beforeLoad: () => {
    throw redirect({ to: '/product', statusCode: 301 });
  },
});
