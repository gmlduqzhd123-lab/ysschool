import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isAdminRequest, isSameOrigin } from '@/lib/server/adminSession';
import { optionalHttpUrl, optionalText, requiredText, validIsoDate } from '@/lib/server/contentValidation';
import { supabaseRest } from '@/lib/server/supabaseRest';

const CATEGORIES = new Set(['에듀테크', 'AI활용', '독서인문', '기타']);

interface TrainingRow {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  link: string | null;
  file_url: string | null;
  file_type: string | null;
  thumbnail: string | null;
  created_at: string;
}

function toClient(row: TrainingRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    date: row.date,
    link: row.link || undefined,
    fileUrl: row.file_url || undefined,
    fileType: row.file_type || undefined,
    thumbnail: row.thumbnail || undefined,
    source: 'shared' as const,
  };
}

export async function GET() {
  if (!contentStoreConfigured()) {
    return NextResponse.json({ configured: false, items: [] }, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const rows = await supabaseRest<TrainingRow[]>(
      'training_materials?select=id,title,description,category,date,link,file_url,file_type,thumbnail,created_at&order=date.desc,created_at.desc',
    );
    return NextResponse.json(
      { configured: true, items: rows.map(toClient) },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('training list failed', error);
    return NextResponse.json({ configured: true, items: [], error: '공유 자료를 불러오지 못했습니다.' }, { status: 500 });
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

  const body = await request.json().catch(() => ({}));
  const title = requiredText(body.title, 120);
  const description = requiredText(body.description, 1000);
  const category = requiredText(body.category, 20);
  const date = validIsoDate(body.date);
  const link = body.link ? optionalHttpUrl(body.link) : null;
  const fileUrl = body.fileUrl ? optionalHttpUrl(body.fileUrl) : null;
  const fileType = body.fileType ? optionalText(body.fileType, 20) : null;
  const thumbnail = body.thumbnail ? optionalHttpUrl(body.thumbnail) : null;

  if (!title || !description || !category || !CATEGORIES.has(category) || !date) {
    return NextResponse.json({ error: '입력값을 확인해주세요.' }, { status: 400 });
  }
  if ((body.link && !link) || (body.fileUrl && !fileUrl) || (body.thumbnail && !thumbnail)) {
    return NextResponse.json({ error: '링크 주소 형식을 확인해주세요.' }, { status: 400 });
  }

  try {
    const rows = await supabaseRest<TrainingRow[]>(
      'training_materials',
      {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          category,
          date,
          link,
          file_url: fileUrl,
          file_type: fileType,
          thumbnail,
        }),
      },
      'return=representation',
    );
    return NextResponse.json({ item: toClient(rows[0]) }, { status: 201 });
  } catch (error) {
    console.error('training create failed', error);
    return NextResponse.json({ error: '공유 자료를 저장하지 못했습니다.' }, { status: 500 });
  }
}
