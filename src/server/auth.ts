/**
 * Admin authentication — Cloudflare Access.
 *
 * `/admin/*` is fronted by a Cloudflare Access self-hosted application. Access
 * authenticates the user and forwards a signed JWT in the
 * `Cf-Access-Jwt-Assertion` header; this module verifies it.
 *
 * Server-only — imported solely by `content.ts` server-function handlers.
 */
import { getRequestHeader } from '@tanstack/react-start/server';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface AdminIdentity {
  email: string;
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let jwksDomain = '';

function getJwks(teamDomain: string) {
  if (!jwks || jwksDomain !== teamDomain) {
    jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
    jwksDomain = teamDomain;
  }
  return jwks;
}

/**
 * Resolve the current admin from the Cloudflare Access JWT, or null.
 *
 * Local dev has no Access proxy in front of the Worker, so when the Access
 * vars are unset we grant a dev identity — but only under `import.meta.env.DEV`.
 * A production build with the vars unset fails closed (returns null): the admin
 * area stays locked until Access is configured in `wrangler.jsonc`.
 */
export async function getAdmin(): Promise<AdminIdentity | null> {
  const teamDomain = String(process.env.CF_ACCESS_TEAM_DOMAIN ?? '');
  const aud = String(process.env.CF_ACCESS_AUD ?? '');

  if (!teamDomain || !aud) {
    return import.meta.env.DEV ? { email: 'dev@localhost' } : null;
  }

  const token = getRequestHeader('cf-access-jwt-assertion');
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwks(teamDomain), {
      issuer: teamDomain,
      audience: aud,
    });
    return { email: typeof payload.email === 'string' ? payload.email : 'admin' };
  } catch {
    return null;
  }
}

/** Throws if the request is not an authenticated admin. */
export async function requireAdmin(): Promise<AdminIdentity> {
  const admin = await getAdmin();
  if (!admin) throw new Error('Unauthorized — admin sign-in required');
  return admin;
}
