import { NextRequest, NextResponse } from 'next/server';
import { contentStoreConfigured, isAdminRequest, isSameOrigin } from '@/lib/server/adminSession';
import { uploadTrainingFile } from '@/lib/server/supabaseRest';

const MAX_FILE_BYTES = 4 * 1024 * 1024;
// Extension → Content-Type stored in the public bucket. Never trust the browser-supplied type,
// otherwise e.g. an HTML/SVG payload could be served as an executable page from storage.
const ALLOWED_EXTENSIONS = new Map<string, string>([
  ['pdf', 'application/pdf'],
  ['ppt', 'application/vnd.ms-powerpoint'],
  ['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  ['doc', 'application/msword'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['hwp', 'application/x-hwp'],
  ['hwpx', 'application/hwp+zip'],
  ['xls', 'application/vnd.ms-excel'],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['webp', 'image/webp'],
  ['txt', 'text/plain; charset=utf-8'],
  ['zip', 'application/zip'],
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

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: '업로드 요청 형식이 올바르지 않습니다.' }, { status: 400 });
  }
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '업로드할 파일이 없습니다.' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const contentType = ALLOWED_EXTENSIONS.get(ext);
  if (!contentType) {
    return NextResponse.json({ error: '허용되지 않는 파일 형식입니다.' }, { status: 400 });
  }
  if (file.size <= 0 || file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: '파일은 4MB 이하만 업로드할 수 있습니다.' }, { status: 400 });
  }

  try {
    const uploaded = await uploadTrainingFile(file, contentType);
    return NextResponse.json({ ...uploaded, fileType: ext });
  } catch (error) {
    console.error('training upload failed', error);
    return NextResponse.json({ error: '파일 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
