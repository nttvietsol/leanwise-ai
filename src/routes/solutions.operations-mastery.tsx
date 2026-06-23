import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Operations Mastery is a roadmap item (research, 2027), not a shipped module.
 * Its standalone page was folded into the `/product` roadmap section in the
 * compliance-led redesign. Permanent redirect preserves inbound links.
 */
export const Route = createFileRoute('/solutions/operations-mastery')({
  beforeLoad: () => {
    throw redirect({ to: '/product', hash: 'roadmap', statusCode: 301 });
  },
});
