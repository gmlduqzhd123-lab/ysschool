import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isAdminRequest, isSameOrigin } from '@/lib/server/adminSession';
import { readJsonObject, requiredText, validIsoDate } from '@/lib/server/contentValidation';
import { supabaseRest } from '@/lib/server/supabaseRest';

const TYPES = new Set(['training', 'lecture', 'performance', 'consulting']);

interface ScheduleRow {
  id: number;
  date: string;
  title: string;
  location: string;
  time: string;
  target: string;
  type: string;
  created_at: string;
}

function toClient(row: ScheduleRow) {
  return {
    id: row.id,
    date: row.date,
    title: row.title,
    location: row.location,
    time: row.time,
    target: row.target,
    type: row.type,
    source: 'shared' as const,
  };
}

export async function GET() {
  if (!contentStoreConfigured()) {
    return NextResponse.json({ configured: false, items: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const rows = await supabaseRest<ScheduleRow[]>(
      'schedule_events?select=id,date,title,location,time,target,type,created_at&order=date.asc,time.asc',
    );
    return NextResponse.json(
      { configured: true, items: rows.map(toClient) },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('schedule list failed', error);
    return NextResponse.json({ configured: true, items: [], error: '공유 일정을 불러오지 못했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: '허용되지 않은 요청입니다.' }, { status: 403 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: '관리자 로그인이 필요합니다.' }, { status: 401 });
  }
  if (!contentStoreConfigured()) {
    return NextResponse.json({ error: '공유 저장소가 아직 연결되지 않았습니다.' }, { status: 503 });
  }

  const body = await readJsonObject(request);
  const date = validIsoDate(body.date);
  const title = requiredText(body.title, 120);
  const location = requiredText(body.location, 120);
  const time = requiredText(body.time, 60);
  const target = requiredText(body.target, 120);
  const type = requiredText(body.type, 20);

  if (!date || !title || !location || !time || !target || !type || !TYPES.has(type)) {
    return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
  }

  try {
    const rows = await supabaseRest<ScheduleRow[]>(
      'schedule_events',
      { method: 'POST', body: JSON.stringify({ date, title, location, time, target, type }) },
      'return=representation',
    );
    return NextResponse.json({ item: toClient(rows[0]) }, { status: 201 });
  } catch (error) {
    console.error('schedule create failed', error);
    return NextResponse.json({ error: '일정을 저장하지 못했습니다.' }, { status: 500 });
  }
}
