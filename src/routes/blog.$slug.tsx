import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Catch-all for legacy blog article slugs. The static route
 * `/blog/the-auditor-doesnt-care` takes precedence for the one live article;
 * any other slug redirects to the Resources index instead of 404ing.
 */
export const Route = createFileRoute('/blog/$slug')({
  beforeLoad: () => {
    throw redirect({ to: '/resources', statusCode: 301 });
  },
});
