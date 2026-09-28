import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isSameOrigin } from '@/lib/server/adminSession';
import { optionalText, requiredText } from '@/lib/server/contentValidation';
import { supabaseRest } from '@/lib/server/supabaseRest';

interface GuestbookRow {
  id: number;
  name: string;
  affiliation: string | null;
  message: string;
  created_at: string;
  client_hash?: string;
}

function toClient(row: GuestbookRow) {
  return {
    id: row.id,
    name: row.name,
    affiliation: row.affiliation || '',
    message: row.message,
    date: new Date(row.created_at).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }),
    source: 'shared' as const,
  };
}

function clientHash(request: NextRequest) {
  const secret = process.env.YSSCHOOL_SESSION_SECRET;
  if (!secret) return null;
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwarded || request.headers.get('x-real-ip') || 'unknown';
  return createHash('sha256').update(`${secret}:${ip}`).digest('hex');
}

export async function GET() {
  if (!contentStoreConfigured()) {
    return NextResponse.json({ configured: false, items: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const rows = await supabaseRest<GuestbookRow[]>(
      'guestbook_entries?select=id,name,affiliation,message,created_at&order=created_at.desc&limit=20',
    );
    return NextResponse.json(
      { configured: true, items: rows.map(toClient) },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('guestbook list failed', error);
    return NextResponse.json({ configured: true, items: [], error: '방명록을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: '허용되지 않은 요청입니다.' }, { status: 403 });
  }
  if (!contentStoreConfigured()) {
    return NextResponse.json({ error: '공유 방명록이 아직 연결되지 않았습니다.' }, { status: 503 });
  }

  const hash = clientHash(request);
  if (!hash) {
    return NextResponse.json({ error: '방명록 보호 설정이 아직 완료되지 않았습니다.' }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  if (body.website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const name = requiredText(body.name, 20);
  const affiliation = body.affiliation ? optionalText(body.affiliation, 30) : null;
  const message = requiredText(body.message, 300);

  if (!name || !message) {
    return NextResponse.json({ error: '이름과 메시지를 확인해주세요.' }, { status: 400 });
  }

  try {
    const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
    const recent = await supabaseRest<Array<{ id: number }>>(
      `guestbook_entries?select=id&client_hash=eq.${hash}&created_at=gte.${encodeURIComponent(oneMinuteAgo)}&limit=1`,
    );

    if (recent.length > 0) {
      return NextResponse.json({ error: '잠시 후 다시 작성해주세요.' }, { status: 429 });
    }

    const rows = await supabaseRest<GuestbookRow[]>(
      'guestbook_entries',
      {
        method: 'POST',
        body: JSON.stringify({
          name,
          affiliation,
          message,
          client_hash: hash,
        }),
      },
      'return=representation',
    );

    return NextResponse.json({ item: toClient(rows[0]) }, { status: 201 });
  } catch (error) {
    console.error('guestbook create failed', error);
    return NextResponse.json({ error: '방명록을 저장하지 못했습니다.' }, { status: 500 });
  }
}
