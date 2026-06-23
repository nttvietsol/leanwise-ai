import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/**
 * Render post Markdown to an HTML string for `dangerouslySetInnerHTML`.
 * Content is authored only by Cloudflare-Access-gated admins, so the input
 * is trusted; revisit with a sanitizer if untrusted authors are ever added.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}
