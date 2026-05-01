import { createServerFn } from '@tanstack/react-start';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SendInput = {
  subject: string;
  bodyText: string;
  replyTo?: string;
};

/**
 * Read an env var across runtimes:
 *  - Cloudflare Workers: globalThis.process.env is provided by `nodejs_compat`
 *    for `vars` declared in wrangler.jsonc; secrets land there too via the
 *    `@cloudflare/vite-plugin` adapter.
 *  - Node dev: process.env directly.
 *  - Browser: never reached for server-only code paths.
 */
function envVar(key: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proc = (globalThis as any).process as
    | { env?: Record<string, string | undefined> }
    | undefined;
  return proc?.env?.[key];
}

async function sendEmail(input: SendInput): Promise<void> {
  const apiKey = envVar('RESEND_API_KEY');
  const from = envVar('RESEND_FROM');
  const to = envVar('RESEND_TO');

  if (!apiKey || !from || !to) {
    // Dev fallback: log to server console; production should be configured.
    console.log('[forms] Email not sent (RESEND_* not configured):', input);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      text: input.bodyText,
      reply_to: input.replyTo,
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Email send failed: ${res.status} ${t}`);
  }
}

/* ─────────── Contact form ─────────── */
export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator(
    (d: { name: string; email: string; subject?: string; message: string }) => {
      if (!d.name?.trim()) throw new Error('Name is required');
      if (!d.email || !EMAIL_RE.test(d.email)) throw new Error('Valid email is required');
      if (!d.message?.trim()) throw new Error('Message is required');
      return d;
    },
  )
  .handler(async ({ data }) => {
    await sendEmail({
      subject: `[Contact] ${data.subject?.trim() || `Message from ${data.name}`}`,
      replyTo: `${data.name} <${data.email}>`,
      bodyText:
        `New contact message from leanwise.ai\n\n` +
        `Name:    ${data.name}\n` +
        `Email:   ${data.email}\n` +
        `Subject: ${data.subject || '—'}\n\n` +
        `Message:\n${data.message}\n`,
    });
    return { ok: true };
  });

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

/* ─────────── Waitlist ─────────── */
export const joinWaitlist = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string; company?: string; product?: string }) => {
    if (!d.email || !EMAIL_RE.test(d.email)) throw new Error('Valid email is required');
    return d;
  })
  .handler(async ({ data }) => {
    await sendEmail({
      subject: `[Waitlist] ${data.product || 'Product'} — ${data.email}`,
      bodyText:
        `New waitlist signup\n\n` +
        `Email:   ${data.email}\n` +
        `Company: ${data.company || '—'}\n` +
        `Product: ${data.product || '—'}\n`,
    });
    return { ok: true };
  });

/* ─────────── Newsletter ─────────── */
export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string }) => {
    if (!d.email || !EMAIL_RE.test(d.email)) throw new Error('Valid email is required');
    return d;
  })
  .handler(async ({ data }) => {
    await sendEmail({
      subject: `[Newsletter] New subscriber — ${data.email}`,
      bodyText: `New newsletter subscription: ${data.email}\n`,
    });
    return { ok: true };
  });

/* ─────────── Resource gate (lead capture) ─────────── */
export const requestResource = createServerFn({ method: 'POST' })
  .inputValidator((d: { email: string; name?: string; resourceSlug: string }) => {
    if (!d.email || !EMAIL_RE.test(d.email)) throw new Error('Valid email is required');
    if (!d.resourceSlug) throw new Error('Resource slug is required');
    return d;
  })
  .handler(async ({ data }) => {
    await sendEmail({
      subject: `[Resource] ${data.resourceSlug} — ${data.email}`,
      bodyText:
        `Resource request\n\n` +
        `Resource: ${data.resourceSlug}\n` +
        `Name:     ${data.name || '—'}\n` +
        `Email:    ${data.email}\n`,
    });
    return { ok: true };
  });
