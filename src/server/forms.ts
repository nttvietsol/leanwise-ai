import { createServerFn } from '@tanstack/react-start';
import { env } from 'cloudflare:workers';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendInput = {
  subject: string;
  bodyText: string;
  replyTo?: string;
};

/**
 * Send a form-notification email through Cloudflare Email Sending (the
 * `send_email` binding `MAIL` in wrangler.jsonc), using its structured
 * builder API — no MIME assembly, no API keys. Requires the MAIL_FROM domain
 * to be onboarded to Email Sending (see the Deployment notes in CLAUDE.md).
 *
 * Under `vite dev` (`import.meta.env.DEV`) the send is skipped and logged, so
 * the e2e suite can exercise the success-state UI without delivering real mail.
 * To test real delivery, deploy and submit a form against the live Worker.
 */
async function sendEmail(input: SendInput): Promise<void> {
  if (import.meta.env.DEV) {
    console.log('[forms] Email (dev — not sent):', input);
    return;
  }

  const from = env.MAIL_FROM;
  const to = env.MAIL_TO;
  if (!env.MAIL || !from || !to) {
    console.log('[forms] Email not sent (MAIL binding not configured):', input);
    return;
  }

  await env.MAIL.send({
    from: { email: from, name: 'LeanWise AI' },
    to,
    subject: input.subject,
    text: input.bodyText,
    replyTo: input.replyTo,
  });
}

/* ─────────── Demo request ─────────── */
export const submitDemo = createServerFn({ method: 'POST' })
  .inputValidator(
    (d: {
      name: string;
      company: string;
      email: string;
      phone?: string;
      interest?: string;
      message?: string;
    }) => {
      if (!d.name?.trim()) throw new Error('Name is required');
      if (!d.company?.trim()) throw new Error('Company is required');
      if (!d.email || !EMAIL_RE.test(d.email))
        throw new Error('Valid work email is required');
      return d;
    },
  )
  .handler(async ({ data }) => {
    await sendEmail({
      subject: `[Demo Request] ${data.name} — ${data.company}`,
      replyTo: `${data.name} <${data.email}>`,
      bodyText:
        `New demo request from leanwise.ai\n\n` +
        `Name:     ${data.name}\n` +
        `Company:  ${data.company}\n` +
        `Email:    ${data.email}\n` +
        `Phone:    ${data.phone || '—'}\n` +
        `Interest: ${data.interest || '—'}\n\n` +
        `Notes:\n${data.message || '—'}\n`,
    });
    return { ok: true };
  });

