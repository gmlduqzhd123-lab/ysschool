// ========== 교실 추천 에듀테크 도구함 데이터 ==========

export type EduToolItemCategory =
  | 'writing'
  | 'publishing'
  | 'creative'
  | 'ai'
  | 'collab'
  | 'quiz'
  | 'game';

export type EduToolCategory = 'all' | EduToolItemCategory;

export interface EduToolItem {
  id: string;
  name: string;
  desc: string;
  highlight: string;
  url: string;
  category: EduToolItemCategory;
  badge: string;
  size: 'sm' | 'md' | 'lg';
}

export const categoryLabels: Record<EduToolCategory, string> = {
  all: '전체',
  writing: '글쓰기',
  publishing: '출판',
  creative: '창작·디자인',
  ai: '생성형 AI',
  collab: '협업·공유',
  quiz: '형성평가·퀴즈',
  game: '게임화 러닝',
};

export const categoryColors: Record<EduToolItemCategory, string> = {
  writing: 'from-blue-500 to-cyan-400',
  publishing: 'from-emerald-500 to-teal-400',
  creative: 'from-purple-500 to-pink-400',
  ai: 'from-orange-500 to-amber-400',
  collab: 'from-indigo-500 to-blue-400',
  quiz: 'from-rose-500 to-red-400',
  game: 'from-green-500 to-lime-400',
};

export const categoryBadgeStyles: Record<
  EduToolItemCategory,
  { bg: string; text: string; border: string }
> = {
  writing: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/60',
  },
  publishing: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800/60',
  },
  creative: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800/60',
  },
  ai: {
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800/60',
  },
  collab: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800/60',
  },
  quiz: {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800/60',
  },
  game: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800/60',
  },
};

export const eduToolsList: EduToolItem[] = [
  {
    id: 'jajakjakjak',
    name: '자작자작',
    desc: 'AI 기반 단계별 글쓰기 & 맞춤 피드백 플랫폼',
    highlight: '400자 시작부터 분량 확장까지, 초등 글쓰기 능력 향상에 최적화',
    url: 'https://www.jajakjakjak.com',
    category: 'writing',
    badge: 'AI 글쓰기',
    size: 'lg',
  },
  {
    id: 'bookk',
    name: '부크크 (Bookk)',
    desc: '1인 출판 플랫폼 (정식 ISBN 발급)',
    highlight: '학급 문집, 학생 창작 동화책, 시집을 정식 종이책·전자책으로 출판',
    url: 'https://www.bookk.co.kr',
    category: 'publishing',
    badge: '학생 출판',
    size: 'lg',
  },
  {
    id: 'cread',
    name: '크리드 (Cread)',
    desc: 'AI 글쓰기 첨삭 & 구조화 피드백 도구',
    highlight: '문법, 어휘, 문장 구조를 초등학생 눈높이로 세심하게 코칭',
    url: 'https://cread.ai',
    category: 'writing',
    badge: '첨삭 지도',
    size: 'md',
  },
  {
    id: 'tooning',
    name: '투닝 (Tooning)',
    desc: 'AI 웹툰 & 일러스트 생성 에듀테크',
    highlight: '마우스 클릭 몇 번으로 캐릭터 표정과 동작을 연출하는 웹툰 창작',
    url: 'https://tooning.io',
    category: 'creative',
    badge: '웹툰 창작',
    size: 'md',
  },
  {
    id: 'canva',
    name: '캔바 (Canva)',
    desc: '교육용 무료 디자인 & 인터랙티브 프레젠테이션',
    highlight: '수업 안내장, 학습지, 카드뉴스, 인포그래픽 올인원 제작',
    url: 'https://www.canva.com',
    category: 'creative',
    badge: '교육용 무료',
    size: 'lg',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    desc: '대화형 AI 수업 기획 & 프롬프트 도우미',
    highlight: '수업 아이디어 브레인스토밍, 성취기준별 질문 및 평가 루브릭 초안 작성',
    url: 'https://chatgpt.com',
    category: 'ai',
    badge: '생성형 AI',
    size: 'lg',
  },
  {
    id: 'padlet',
    name: '패들렛 (Padlet)',
    desc: '실시간 교실 협업 & 생각 나눔 보드',
    highlight: '학생들의 의견, 사진, 링크를 한 화면에 실시간 수합하고 토의·토론',
    url: 'https://padlet.com',
    category: 'collab',
    badge: '실시간 협업',
    size: 'md',
  },
  {
    id: 'classcard',
    name: '클래스카드',
    desc: '개념 어휘 학습 & 실시간 퀴즈 배틀',
    highlight: '단원 핵심 용어 플래시카드와 세트 게임으로 단어 마스터',
    url: 'https://www.classcard.net',
    category: 'quiz',
    badge: '어휘 학습',
    size: 'sm',
  },
  {
    id: 'tkbell',
    name: '띵커벨 (Tkbell)',
    desc: '참여형 형성평가 & 보드형 교실 퀴즈',
    highlight: '모바일·태블릿으로 전원 참여하는 즉각적 피드백과 흥미진진한 퀴즈',
    url: 'https://www.tkbell.co.kr',
    category: 'quiz',
    badge: '형성평가',
    size: 'md',
  },
  {
    id: 'wrtn',
    name: '뤼튼 (Wrtn)',
    desc: '한국형 초거대 AI 학습 & 창작 포털',
    highlight: '국내 교육 및 한국어 맥락에 최적화된 다양한 교육용 AI 도구 제공',
    url: 'https://wrtn.ai',
    category: 'ai',
    badge: '한국형 AI',
    size: 'sm',
  },
  {
    id: 'kahoot',
    name: '카훗 (Kahoot)',
    desc: '게임 기반 인터랙티브 학습 퀴즈',
    highlight: '경쾌한 BGM과 순위 경쟁으로 수업 집중도를 단숨에 끌어올리는 퀴즈',
    url: 'https://kahoot.com',
    category: 'quiz',
    badge: '퀴즈 게임',
    size: 'md',
  },
  {
    id: 'miricanvas',
    name: '미리캔버스',
    desc: '한국형 템플릿 기반 그래픽 디자인 플랫폼',
    highlight: '학교 행사 현수막, 학습 자료, 포스터 템플릿 풍부',
    url: 'https://www.miricanvas.com',
    category: 'creative',
    badge: '한국형 디자인',
    size: 'sm',
  },
  {
    id: 'blooket',
    name: '블루캣 (Blooket)',
    desc: '게임화(Gamification) 기반 복습 플랫폼',
    highlight: '타워 디펜스, 골드 퀘스트 등 아케이드 게임 모드로 학생 몰입도 극대화',
    url: 'https://www.blooket.com',
    category: 'game',
    badge: '게임화 러닝',
    size: 'sm',
  },
  {
    id: 'notion',
    name: 'Notion',
    desc: '교직 올인원 학급 경영 & 생산성 도구',
    highlight: '학급 운영 일지, 수업 지도안, 연구대회 아카이브 및 포트폴리오 체계적 정리',
    url: 'https://www.notion.so',
    category: 'collab',
    badge: '학급 경영',
    size: 'md',
  },
];
