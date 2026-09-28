import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isAdminRequest, isSameOrigin } from '@/lib/server/adminSession';
import { uploadTrainingFile } from '@/lib/server/supabaseRest';

const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  'pdf', 'ppt', 'pptx', 'doc', 'docx', 'hwp', 'hwpx', 'xls', 'xlsx',
  'png', 'jpg', 'jpeg', 'webp', 'txt', 'zip',
]);

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

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json({ error: '허용되지 않는 파일 형식입니다.' }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: '파일은 4MB 이하만 업로드할 수 있습니다.' }, { status: 400 });
  }

  try {
    const uploaded = await uploadTrainingFile(file);
    return NextResponse.json({ ...uploaded, fileType: ext });
  } catch (error) {
    console.error('training upload failed', error);
    return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
