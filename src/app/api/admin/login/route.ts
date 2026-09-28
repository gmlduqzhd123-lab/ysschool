import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE,
  adminAuthConfigured,
  contentStoreConfigured,
  createAdminSessionToken,
  isSameOrigin,
  verifyAdminPassword,
} from '@/lib/server/adminSession';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: '허용되지 않은 요청입니다.' }, { status: 403 });
  }

  if (!adminAuthConfigured()) {
    return NextResponse.json(
      {
        error: '관리자 인증 환경변수가 아직 설정되지 않았습니다.',
        authConfigured: false,
        contentStoreConfigured: contentStoreConfigured(),
      },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: '관리자 세션을 만들 수 없습니다.' }, { status: 500 });
  }

  const response = NextResponse.json({
    ok: true,
    authConfigured: true,
    contentStoreConfigured: contentStoreConfigured(),
  });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
