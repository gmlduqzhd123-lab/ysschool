/**
 * Unified text sanitization and simplification utility for all resources, materials, and training archives.
 */

export function cleanHtmlText(str: string): string {
  if (!str) return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export function formatDisplayTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  let t = cleanHtmlText(rawTitle);
  // 언더바 다중 치환
  t = t.replace(/_{2,}/g, ' ');
  // 괄호 안의 파일 확장자 노이즈 제거 (예: (PPTX), (HWP), (PDF), (Excel) 등)
  t = t.replace(/\s*\((pptx|ppt|hwp|pdf|docx|doc|xlsx|xls|zip|mp4|avi|png|jpg|jpeg|mkv|ent|excel)\)/gi, '');
  // 제목 끝의 확장자 제거
  t = t.replace(/\.(pptx|ppt|hwp|pdf|docx|doc|xlsx|xls|zip|mp4|avi|png|jpg|jpeg|mkv|ent)$/i, '');
  // 괄호 안에 공백만 남은 것 제거
  t = t.replace(/\(\s*\)/g, '');
  // 공백 정규화
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

export function formatDisplayDesc(rawDesc: string, title: string = '', fileType?: string): string {
  let d = cleanHtmlText(rawDesc || '');
  
  // 언더바 및 공백 정규화
  d = d.replace(/_{2,}/g, ' ');
  d = d.replace(/\s+/g, ' ').trim();

  // 기계적인 반복 문구이거나 비어있거나 제목과 동일한 경우 스마트 맞춤 설명 생성
  if (!d || d.includes('원본 자료 다운로드 및 열람 링크입니다') || d.trim() === title.trim()) {
    const ft = (fileType || '').toLowerCase();
    const tLower = title.toLowerCase();
    
    if (tLower.includes('출판') || tLower.includes('이야기') || tLower.includes('모둠') || /<[^>]+>/.test(title)) {
      return '학생들의 진솔한 삶과 상상력이 담긴 자작자작 출판 도서 원고입니다.';
    }
    if (ft === 'hwp' || tLower.includes('활동지') || tLower.includes('서식')) {
      return '수업과 학생 지도에 바로 활용할 수 있는 한글(HWP) 활동지 원본 서식입니다.';
    }
    if (ft === 'pptx' || ft === 'ppt' || tLower.includes('슬라이드') || tLower.includes('교안')) {
      return '교실 수업 및 연수에서 상영할 수 있는 프레젠테이션 교안 슬라이드입니다.';
    }
    if (ft === 'pdf' || tLower.includes('가이드')) {
      return '출력 배부 및 태블릿 열람에 최적화된 PDF 가이드 문서입니다.';
    }
    if (ft === 'video' || tLower.includes('영상')) {
      return '생생한 교실 수업 현장과 활동 시연을 담은 교육용 영상입니다.';
    }
    if (ft === 'zip' || tLower.includes('패키지')) {
      return '지도안과 학습지가 모두 포함된 통합 수업 패키지 파일입니다.';
    }
    return '교육 현장에서 검증된 수업 및 연구 참고 자료입니다.';
  }

  return d;
}
