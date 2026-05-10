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

export const sunoData: SunoItem[] = [];

export const canvaData: CanvaItem[] = [];

export const notebookData: NotebookItem[] = [];

