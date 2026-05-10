// ========== 미니 웹앱 데이터 ==========
export interface MiniApp {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  appUrl: string; // public/apps/ 내 HTML 파일 경로
}

export const miniAppsData: MiniApp[] = [
  {
    id: 1,
    title: '오늘 뭐 먹지? 🍔',
    description: '점심 메뉴 고민 끝! 랜덤으로 메뉴를 추천해주는 재미있는 룰렛 웹앱입니다.',
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    appUrl: '/apps/random-menu.html',
  },
  {
    id: 2,
    title: '랜덤 조퇴 사유 뽑기 🎰',
    description: '1000가지의 기상천외한 조퇴 사유를 랜덤으로 뽑아보세요! 순전히 재미용입니다 😄',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    appUrl: '/apps/random-excuse.html',
  },
];

// ========== 에듀테크 갤러리 데이터 ==========
export type GalleryCategory = 'suno' | 'canva' | 'notebook';

export interface SunoItem {
  id: number;
  title: string;
  artist: string;
  coverArt: string;
  audioUrl: string;
  description: string;
}

export interface CanvaItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

export interface NotebookItem {
  id: number;
  title: string;
  summary: string;
  link: string;
  icon: string;
}

export const sunoData: SunoItem[] = [
  {
    id: 1,
    title: '안심초 교가 (AI 리메이크)',
    artist: 'Suno AI × 엽쌤',
    coverArt: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=400',
    audioUrl: '',
    description: 'Suno AI를 활용해 학교 교가를 현대적으로 리메이크한 프로젝트',
  },
  {
    id: 2,
    title: '우리반 응원가',
    artist: 'Suno AI × 학생들',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=400',
    audioUrl: '',
    description: '학생들이 직접 가사를 쓰고 AI로 작곡한 학급 응원가',
  },
  {
    id: 3,
    title: '독서의 즐거움',
    artist: 'Suno AI × 독서인문교육',
    coverArt: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400',
    audioUrl: '',
    description: '독서인문교육 프로젝트의 테마송으로 제작된 AI 음악',
  },
];

export const canvaData: CanvaItem[] = [
  {
    id: 1,
    title: '독서인문교육 포스터',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600',
    description: '독서인문 선도교실 홍보용 포스터',
  },
  {
    id: 2,
    title: '에듀테크 수업 안내문',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    description: 'AI 활용 수업 안내 및 학부모 소통 자료',
  },
  {
    id: 3,
    title: '아카펠라 공연 포스터',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=600',
    description: '아카라카 공연 홍보 포스터',
  },
  {
    id: 4,
    title: '창의융합 프로젝트 발표자료',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    description: '창의융합인재양성 프로젝트 결과 발표 슬라이드',
  },
];

export const notebookData: NotebookItem[] = [
  {
    id: 1,
    title: '2024 교육과정 핵심 요약',
    summary: 'NotebookLM을 활용하여 2024 개정 교육과정의 핵심 내용을 체계적으로 정리하고, 현장 적용 방안을 도출한 자료입니다.',
    link: '#',
    icon: '📋',
  },
  {
    id: 2,
    title: 'AI 활용 수업 설계 가이드',
    summary: '생성형 AI를 교실 수업에 효과적으로 통합하기 위한 단계별 가이드를 NotebookLM으로 정리한 자료입니다.',
    link: '#',
    icon: '🤖',
  },
  {
    id: 3,
    title: '독서인문교육 실천 사례 분석',
    summary: '전국 독서인문교육 우수 사례들을 AI로 분석하고 핵심 성공 요인을 추출한 연구 자료입니다.',
    link: '#',
    icon: '📚',
  },
];
