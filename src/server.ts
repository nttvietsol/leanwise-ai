/**
 * Cloudflare Workers entry point.
 *
 * Wraps the TanStack Start request handler in a `{ fetch }` Worker export.
 * Static assets at `/assets/*`, `/robots.txt`, `/sitemap.xml`, etc. are
 * served by the `ASSETS` binding (configured in wrangler.jsonc); any path
 * that misses falls through here for SSR.
 */
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';

const handler = createStartHandler({ handler: defaultStreamHandler });

export default {
  fetch(request: Request): Promise<Response> | Response {
    return handler(request);
  },
};
