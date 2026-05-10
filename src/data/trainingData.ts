// ========== 연수 자료 데이터 ==========

export interface TrainingMaterial {
  id: number;
  title: string;
  description: string;
  category: '에듀테크' | 'AI활용' | '독서인문' | '기타';
  date: string;          // 등록일 (예: '2025-03-15')
  link?: string;         // 외부 링크 (구글 드라이브, 유튜브 등)
  fileUrl?: string;      // 직접 파일 URL (/files/xxx.pdf 등)
  fileType?: string;     // 파일 유형 (pdf, pptx, hwp 등)
  thumbnail?: string;    // 썸네일 이미지 URL
}

export const trainingData: TrainingMaterial[] = [];
