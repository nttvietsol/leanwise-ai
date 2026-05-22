import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * The blog index merged into /resources during the v2 re-port. Permanent
 * redirect so /blog and indexed links resolve instead of 404ing.
 */
export const Route = createFileRoute('/blog/')({
  beforeLoad: () => {
    throw redirect({ to: '/resources', statusCode: 301 });
  },
});
