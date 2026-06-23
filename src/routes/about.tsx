import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * `/about` was renamed `/company` in the compliance-led redesign. Kept as a
 * permanent redirect so existing inbound links and indexed URLs resolve.
 */
export const Route = createFileRoute('/about')({
  beforeLoad: () => {
    throw redirect({ to: '/company', statusCode: 301 });
  },
});
