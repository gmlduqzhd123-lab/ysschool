import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'ysschool_admin_session';
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

export function adminAuthConfigured() {
  return Boolean(process.env.YSSCHOOL_ADMIN_PASSWORD && process.env.YSSCHOOL_SESSION_SECRET);
}

export function contentStoreConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function safeDigest(value: string) {
  return createHash('sha256').update(value).digest();
}

export function verifyAdminPassword(input: string) {
  const expected = process.env.YSSCHOOL_ADMIN_PASSWORD;
  if (!expected || !input) return false;

  const inputDigest = safeDigest(input);
  const expectedDigest = safeDigest(expected);
  return timingSafeEqual(inputDigest, expectedDigest);
}

function sign(payload: string) {
  const secret = process.env.YSSCHOOL_SESSION_SECRET;
  if (!secret) return '';
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

// Bump YSSCHOOL_SESSION_VERSION (e.g. 1 → 2) in the hosting env to invalidate every issued session.
function sessionVersion() {
  return (process.env.YSSCHOOL_SESSION_VERSION || '1').replace(/[^0-9A-Za-z_-]/g, '') || '1';
}

export function createAdminSessionToken() {
  if (!adminAuthConfigured()) return null;
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = `${sessionVersion()}:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token || !adminAuthConfigured()) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const [version, expiresRaw] = payload.split(':');
  if (version !== sessionVersion()) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = sign(payload);
  if (!expected) return false;

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) return origin === new URL(request.url).origin;
  // No Origin header: fall back to Fetch Metadata when the browser provides it.
  const fetchSite = request.headers.get('sec-fetch-site');
  return !fetchSite || fetchSite === 'same-origin' || fetchSite === 'none';
}

export function clientKey(request: NextRequest) {
  const ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

// Best-effort brute-force throttle for the single admin password.
// Serverless instances don't share memory, so this limits each instance rather than globally,
// which still makes rapid guessing impractical.
const LOGIN_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_MAX_FAILURES = 5;
const loginFailures = new Map<string, { count: number; resetAt: number }>();

export function loginBlockedFor(key: string) {
  const entry = loginFailures.get(key);
  if (!entry) return 0;
  if (entry.resetAt <= Date.now()) {
    loginFailures.delete(key);
    return 0;
  }
  return entry.count >= LOGIN_MAX_FAILURES ? Math.ceil((entry.resetAt - Date.now()) / 1000) : 0;
}

export function recordLoginFailure(key: string) {
  const now = Date.now();
  const entry = loginFailures.get(key);
  if (!entry || entry.resetAt <= now) {
    loginFailures.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
  } else {
    entry.count += 1;
  }
  if (loginFailures.size > 5000) {
    for (const [k, v] of loginFailures) if (v.resetAt <= now) loginFailures.delete(k);
  }
}

export function clearLoginFailures(key: string) {
  loginFailures.delete(key);
}
