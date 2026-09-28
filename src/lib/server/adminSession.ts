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

export function createAdminSessionToken() {
  if (!adminAuthConfigured()) return null;
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token || !adminAuthConfigured()) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expiresAt = Number(payload);
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
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}
