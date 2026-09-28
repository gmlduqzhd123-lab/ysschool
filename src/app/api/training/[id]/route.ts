import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isAdminRequest, isSameOrigin } from '@/lib/server/adminSession';
import { supabaseRest } from '@/lib/server/supabaseRest';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: '허용되지 않은 요청입니다.' }, { status: 403 });
  }
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: '관리자 로그인이 필요합니다.' }, { status: 401 });
  }
  if (!contentStoreConfigured()) {
    return NextResponse.json({ error: '공유 저장소가 아직 연결되지 않았습니다.' }, { status: 503 });
  }

  const { id } = await params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: '잘못된 자료 번호입니다.' }, { status: 400 });
  }

  try {
    await supabaseRest<void>(`training_materials?id=eq.${id}`, { method: 'DELETE' });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('training delete failed', error);
    return NextResponse.json({ error: '자료를 삭제하지 못했습니다.' }, { status: 500 });
  }
}
