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
  {
    id: 3,
    title: '교육용 테트리스 🧱',
    description: '학생들과 함께 즐기는 교육용 테트리스! 논리적 사고력과 공간 지각 능력을 키워보세요.',
    thumbnail: 'https://images.unsplash.com/photo-1640955014216-75201056c829?auto=format&fit=crop&q=80&w=600',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    appUrl: '/apps/tetris.html',
  },
  {
    id: 4,
    title: '가상 악력 측정기 💪',
    description: '10초 안에 스페이스바를 얼마나 빠르게 연타할 수 있을까? 6학년 평균을 돌파해보세요!',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    appUrl: '/apps/grip-test.html',
  },
];

// ========== 에듀테크 갤러리 데이터 ==========
export type GalleryCategory = 'suno' | 'canva' | 'notebook' | 'padlet';

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

export interface PadletItem {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
}

export const padletData: PadletItem[] = [];

