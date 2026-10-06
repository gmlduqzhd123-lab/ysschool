export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'header-glass-fix',
    title: '어두운 배경 위의 투명 헤더, 글래스모피즘으로 해결하기',
    date: '2026-08-15',
    description: '에듀테크 쇼케이스 페이지에서 헤더 메뉴가 안 보이는 문제를 발견하고, backdrop-blur 한 줄로 해결한 이야기입니다.',
  },
  {
    slug: 'edutech-library-curation',
    title: 'AI 도구 16종 노하우를 큐레이션하며 배운 것들 — 나눔 서재 제작기',
    date: '2026-08-15',
    description: '에듀테크 나눔 서재에 4개였던 노하우를 16개로 확충하며 고민한 도구 선정 기준, 콘텐츠 구조, 프롬프트 예시 전략을 공유합니다.',
  },
  {
    slug: 'homepage-ux-refactor',
    title: '홈페이지 섹션 11개를 5개로 줄인 이유 — 정보 과잉 vs 깔끔함의 줄다리기',
    date: '2026-08-10',
    description: '모든 걸 보여주고 싶은 욕심과 깔끔한 첫 인상 사이에서 고민한 UX 리팩토링 과정을 정리했습니다.',
  },
  {
    slug: 'hello-world',
    title: '에듀테크 크리에이터로서의 첫 발걸음',
    date: '2026-05-11',
    description: '엽쌤스쿨에 새로운 MDX 기반 블로그를 오픈했습니다. 앞으로 이곳에서 교육 철학과 개발 경험을 나눌 예정입니다.',
  },
];
