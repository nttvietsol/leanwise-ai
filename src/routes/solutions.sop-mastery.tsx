import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * SOP Mastery is a roadmap item (R&D, Q4 2026), not a shipped module. Its
 * standalone page was folded into the `/product` roadmap section in the
 * compliance-led redesign. Permanent redirect preserves inbound links.
 */
export const Route = createFileRoute('/solutions/sop-mastery')({
  beforeLoad: () => {
    throw redirect({ to: '/product', hash: 'roadmap', statusCode: 301 });
  },
});
