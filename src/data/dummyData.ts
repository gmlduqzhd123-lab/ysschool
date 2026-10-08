export interface NavChild {
  name: string;
  href: string;
  description?: string;
  badge?: string;
  iconName?: string;
}

export interface NavItem {
  name: string;
  href?: string;          // 직접 링크 (드롭다운이 없는 경우)
  children?: NavChild[];  // 드롭다운 메뉴
  highlight?: boolean;    // 강조 버튼 스타일 (e.g. 연수 의뢰)
}

export const navLinks: NavItem[] = [
  {
    name: '수업·학습 자료',
    children: [
      {
        name: '100종 배움게임',
        href: '/showcase',
        description: '국·수·사·과 교실 수업용 무설치 웹게임',
        iconName: 'Gamepad2',
        badge: '100종',
      },
      {
        name: '엽쌤 개발 웹앱 모음',
        href: '/showcase#yscode',
        description: '교직·수업·여가를 아우르는 19종 바이브코딩 웹앱',
        iconName: 'Code2',
        badge: '19종',
      },
      {
        name: '에듀테크 도구함',
        href: '/tools',
        description: '자작자작, 투닝 등 교실 추천 에듀테크 모음',
        iconName: 'Wrench',
      },
      {
        name: 'AI 프롬프트 놀이터',
        href: '/playground',
        description: '학생·교사용 생성형 AI 실습 게임',
        iconName: 'Bot',
        badge: 'AI',
      },
    ],
  },
  {
    name: '연수·연구 자료',
    children: [
      {
        name: '연수 강의안·자료실',
        href: '/training',
        description: 'AI·디지털선도·독서인문 연수 PPT 및 자료',
        iconName: 'FileText',
      },
      {
        name: '에듀테크 나눔 서재',
        href: '/library',
        description: '바쁜 선생님을 위한 핵심 노하우 & 실천 가이드',
        iconName: 'BookOpen',
      },
      {
        name: '교육 이야기·블로그',
        href: '/blog',
        description: '디지털 수업 성찰과 에듀테크 교육 칼럼',
        iconName: 'PenTool',
      },
    ],
  },
  {
    name: '엽쌤 소개',
    children: [
      {
        name: '프로필 & 발자취',
        href: '/portfolio',
        description: '약력, 교육 철학, 수상 및 연구대회 실적',
        iconName: 'User',
      },
      {
        name: '출간 도서',
        href: '/portfolio#publications',
        description: '독서미션으로 끝장내기 등 집필 도서 목록',
        iconName: 'Book',
      },
      {
        name: '아카펠라 활동',
        href: '/portfolio#acappella',
        description: '교사 아카펠라 그룹 아카라카 공연 영상',
        iconName: 'Music',
      },
    ],
  },
  {
    name: '연수 의뢰',
    href: '/#contact',
    highlight: true,
  },
];

export const skillsData = [
  {
    title: 'Top-tier Educator',
    description: '수업혁신사례연구대회 전국 2등급(교육부장관표창) 및 전남교육청 우수강사, 수많은 컨설팅과 연수를 진행하는 현직 초등 교사입니다.',
    icon: 'GraduationCap',
  },
  {
    title: 'Edutech & AI Leader',
    description: 'AI 중점학교 및 디지털 선도학교 주무를 맡고 있으며, AIDT 강사 및 에듀테크 현장 지원단으로 미래 교육을 이끌고 있습니다.',
    icon: 'Laptop',
  },
  {
    title: 'Author & Creator',
    description: '고학년 독서인문교육, 독서미션으로 끝장내기 및 부크크(Bookk) 학생 출판 프로젝트 등 총 14권의 책을 집필·지도한 작가이며, 전남초등아카펠라연구회 아카라카 바리톤, 테너, 보컬퍼커션으로도 활동하는 교육 크리에이터입니다.',
    icon: 'PenTool',
  },
];

export const eduResourcesData = [
  {
    id: 1,
    title: '인디스쿨 엽쌤스쿨 교육자료',
    description: '전국 초등교사 커뮤니티 인디스쿨에 공유된 엽쌤의 다양하고 혁신적인 수업 자료들을 확인해보세요.',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    tags: ['#인디스쿨', '#수업자료', '#초등교육'],
    link: 'https://indischool.com/@user359088',
  },
  {
    id: 2,
    title: '아카펠라 아카라카 (유튜브)',
    description: '전남초등아카펠라연구회 소속으로 활동하는 아카펠라 그룹 아카라카의 다채로운 공연 영상과 소식을 만나보세요.',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800',
    tags: ['#아카펠라', '#아카라카', '#보컬퍼커션'],
    link: 'https://youtube.com/@acappellaakaraka',
  },
  {
    id: 3,
    title: '엽쌤스쿨 (유튜브 채널)',
    description: '수업 노하우, 에듀테크 활용법, 교육 관련 브이로그 등 엽쌤의 다채로운 영상 콘텐츠가 업로드됩니다.',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800',
    tags: ['#유튜브', '#에듀테크', '#수업노하우'],
    link: 'https://www.youtube.com/@yeopssam',
  },
  {
    id: 4,
    title: '발명영재교육 및 창의융합 프로젝트',
    description: '발명영재교육센터 영재 강사로서 진행한 인문발명, 실습 및 대한민국 창의력 챔피언 대회 지도 노하우.',
    thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=800',
    tags: ['#발명교육', '#영재교육', '#창의융합'],
    link: 'https://www.jne.go.kr/inventedu/main/main.do',
  },
];

export const awardsData = [
  {
    id: 10,
    title: '수업혁신사례 연구대회 전국 2등급',
    date: '2024. 11. 10.',
    image: '/images/awards/award_10.webp',
  },
  {
    id: 1,
    title: '제23회 전남학생발명 공모전 지도교사상 (교육감표창)',
    date: '2024. 09. 13.',
    image: '/images/awards/award_1.webp',
  },
  {
    id: 11,
    title: '자연관찰탐구대회 우수 지도 표창',
    date: '2024. 07. 20.',
    image: '/images/awards/award_11.webp',
  },
  {
    id: 9,
    title: '글로컬 미래교육 박람회 유공교원 (교육감표창)',
    date: '2024. 06. 15.',
    image: '/images/awards/award_9.webp',
  },
  {
    id: 2,
    title: '독서인문교육 활성화 기여 표창 (교육감표창)',
    date: '2023. 12. 31.',
    image: '/images/awards/award_2.webp',
  },
  {
    id: 4,
    title: '제22회 전남 학생 발명 공모전 우수 지도 표창 (교육감표창)',
    date: '2023. 12. 29.',
    image: '/images/awards/award_4.webp',
  },
  {
    id: 5,
    title: '제20회 예스24 어린이 독후감 대회 우수 지도교사상',
    date: '2023. 11. 25.',
    image: '/images/awards/award_5.webp',
  },
  {
    id: 7,
    title: '2023 독서인문교육 실천사례 연구대회 2등급 (교육감표창)',
    date: '2023. 11. 23.',
    image: '/images/awards/award_7.webp',
  },
  {
    id: 3,
    title: '제23회 불조심 어린이마당 탁월 지도상',
    date: '2023. 10. 26.',
    image: '/images/awards/award_3.webp',
  },
  {
    id: 6,
    title: '제25회 전국학생통계활용대회 은상 (통계청장상)',
    date: '2023. 09. 01.',
    image: '/images/awards/award_6.webp',
  },
  {
    id: 8,
    title: '초등 1급 정교사 자격연수 모범 표창 (전라남도교육연수원장)',
    date: '2023. 01. 31.',
    image: '/images/awards/award_8.webp',
  },
];

export const mediaData = [
  {
    id: 1,
    title: '[2022 창의융합인재양성] 우리지역 미래 수송 기술 디자인',
    thumbnail: 'https://img.youtube.com/vi/p6AU3CxfsK4/maxresdefault.jpg',
    url: 'https://youtu.be/p6AU3CxfsK4',
    duration: 'YouTube',
  },
  {
    id: 2,
    title: '글로컬 미래교실 국어과 수업 소개 영상(조선미, 김희엽)',
    thumbnail: 'https://img.youtube.com/vi/h0qWm-Ucwgs/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=h0qWm-Ucwgs',
    duration: 'YouTube',
  },
  {
    id: 3,
    title: '제20회 예스24 어린이 독후감 대회 시상식',
    thumbnail: 'https://img.youtube.com/vi/6cLMzs7Evk4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=6cLMzs7Evk4',
    duration: 'YouTube',
  },
  {
    id: 4,
    title: '[나는 선생님입니다] EP.3 여수한려초 김희엽 선생님',
    thumbnail: 'https://img.youtube.com/vi/Lx2b_nWgYSg/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Lx2b_nWgYSg&t=15s',
    duration: 'YouTube',
  },
  {
    id: 5,
    title: '제23회 불조심 어린이마당 시상식',
    thumbnail: 'https://img.youtube.com/vi/LMKwGQjb5D4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=LMKwGQjb5D4',
    duration: 'YouTube',
  },
  {
    id: 6,
    title: '제25회 전국학생통계활용대회 초등부 은상 (안심초등학교)',
    thumbnail: 'https://img.youtube.com/vi/iLN9jfrhii4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=iLN9jfrhii4',
    duration: 'YouTube',
  },
  {
    id: 7,
    title: '제23회 불조심어린이마당 불조심 어린이상 전남 안심초등학교',
    thumbnail: 'https://img.youtube.com/vi/OqUSvovKbaw/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OqUSvovKbaw',
    duration: 'YouTube',
  },
];

export const pressData = [
  {
    id: 1,
    title: '예스24 어린이 독후감 대회 우수 지도교사',
    description: '나도 작가 프로젝트 등 학생 저자 육성에 힘쓴 결과, YES24 어린이 독후감 대회에서 전국 단위 우수 지도교사상(전국 1위)을 수상했습니다.',
    image: 'https://image.yes24.com/images/chyes24/b/a/d/a/bada6de10e8c9403ed87d4f101f832cc.jpg',
    techStack: ['YES24', '독후감대회', '지도교사상'],
    link: 'https://zdnet.co.kr/view/?no=20231030093845',
  },
  {
    id: 2,
    title: '대한민국 창의력 챔피언 대회 석권',
    description: '2023년 대한민국 창의력 챔피언 대회 및 2024년 대회를 석권하며 창의융합인재 양성에 기여한 지도 활동이 소개되었습니다.',
    image: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80&w=1200',
    techStack: ['창의력대회', '창의융합', '언론보도'],
    link: 'https://blog.naver.com/tukung2/223128607018',
  },
  {
    id: 3,
    title: '전남 여수교육지원청, 디지털 수업역량 연수',
    description: 'KENTEC 미래 교육 전문 강사 및 에듀테크 현장 지원단으로서 교사들의 에듀테크 활용 능력과 AI 기반 수업 역량을 강화하기 위한 연수를 운영했습니다.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    techStack: ['에듀테크', '디지털선도', 'KENTEC'],
    link: 'https://www.jnedu.kr/news/articleView.html?idxno=78170',
  },
  {
    id: 4,
    title: '글로컬 미래교육 박람회 미래교실 공개수업',
    description: '2024 글로컬 미래교육 박람회에서 미래교실 공동 공개수업(국어과)을 진행하며 새로운 교육 패러다임을 제시했습니다.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    techStack: ['글로컬미래교육', '공개수업', '언론보도'],
    link: 'https://www.ihopenews.com/news/articleView.html?idxno=236215',
  },
  {
    id: 5,
    title: '독서인문선도교실 우수 사례',
    description: '지역 역사와 연계한 글로-CAL 프로젝트 등 독서인문 선도교실 선도교사로서 학생 주도형 독서인문교육을 실천한 사례가 보도되었습니다.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200',
    techStack: ['독서인문', '선도교실', '우수사례'],
    link: 'https://www.jnedu.kr/news/articleView.html?idxno=87043',
  },
  {
    id: 6,
    title: '불조심어린이마당 전남 1위 및 통계활용대회 은상 수상',
    description: '제 23회 불조심어린이마당 전남 1위 및 제 25회 전국학생통계활용대회 은상 등 학생 지도에 힘쓴 성과가 기사화되었습니다.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    techStack: ['불조심마당', '통계대회', '지도상'],
    link: 'https://www.eduyonhap.com/news/view.php?no=76732',
  }
];

export const devLabsData: Array<{
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
  category: string;
  buttonText?: string;
  target?: '_self' | '_blank';
}> = [
  {
    id: 0,
    title: '엽쌤스쿨 배움게임월드',
    description: '초등학생들이 국어, 수학, 사회, 과학, 영어, 안전, 디지털 리터러시를 게임처럼 즐기며 배울 수 있는 100개의 HTML 학습 게임 모음입니다.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    techStack: ['HTML5', 'Vanilla JS', 'Gamification', 'EduTech'],
    link: '/learning-games-all/index.html',
    category: '미니게임',
    buttonText: '100개 학습게임 시작하기',
    target: '_self'
  },
  {
    id: 1,
    title: '여수한려초등학교 수영부 관리 어플리케이션 (HALLYO SWIM)',
    description: '수영부 학생 선수들의 효율적인 훈련 기록, 경기 영상 분석 및 소통을 위해 직접 기획·개발한 모바일 최적화 웹 애플리케이션입니다.\n\n개인별 기록 변화 추이 시각화 및 학부모와의 실시간 공유 기능을 통해 학생들의 체계적인 성장을 지원합니다.',
    image: '/images/new_media/media__1778425795314.jpg',
    techStack: ['Next.js', 'PWA', 'Supabase', 'Data Viz'],
    link: 'https://hallyo.vercel.app/login',
    category: '웹앱'
  },
  {
    id: 2,
    title: '매쓰 서바이벌 (Math Survival)',
    description: '초등 수학 연산 능력을 재미있게 기를 수 있는 미니 게임형 학습 도구입니다. 학생들이 흥미를 잃지 않고 꾸준히 연산 연습을 할 수 있도록 게임화(Gamification) 요소를 적극 적용했습니다.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    techStack: ['HTML5', 'Vanilla JS', 'Canvas API'],
    link: '/math_survival.html',
    category: '미니게임',
    target: '_blank'
  }
];

export interface PublicationBook {
  id: number;
  title: string;
  author: string;
  price: string;
  description: string;
  cover: string;
  link: string;
  bookNo?: string;
  goodsNo?: string;
  isbn?: string;
  category?: string;
}

export const publicationsData: PublicationBook[] = [
  {
    id: 1,
    title: '고학년 독서인문교육, 독서미션으로 끝장내기',
    author: '김희엽 저',
    price: '18,000원',
    description: '김희엽 저 (18,000원)',
    cover: '/images/book_cover_2.webp',
    link: 'https://www.yes24.com/Product/Search?domain=ALL&query=독서미션으로+끝장내기',
    category: '대표 저서',
  },
  {
    id: 2,
    title: '우리의 서로가 계절이 되어가는 동안',
    author: '김희엽 저',
    price: '11,000원',
    description: '김희엽 저 (11,000원)',
    cover: 'https://image.yes24.com/goods/195238634/XL',
    link: 'https://www.yes24.com/product/goods/195238634',
    bookNo: '546399',
    goodsNo: '195238634',
    isbn: '9791112260833',
    category: '교육 에세이·시',
  },
  {
    id: 3,
    title: '우리의 서로가 하루가 되어가는 동안',
    author: '김희엽 저',
    price: '12,000원',
    description: '김희엽 저 (12,000원)',
    cover: 'https://image.yes24.com/goods/193866478/XL',
    link: 'https://www.yes24.com/product/goods/193866478',
    bookNo: '525629',
    goodsNo: '193866478',
    isbn: '9791112234247',
    category: '교육 에세이·시',
  },
  {
    id: 4,
    title: '글로-CAL 프로젝트를 통한 여수義 사랑 미래 인재 기르기',
    author: '여수한려초등학교',
    price: '26,500원',
    description: '여수한려초등학교 (26,500원)',
    cover: 'https://image.yes24.com/goods/167495472/XL',
    link: 'https://www.yes24.com/product/goods/167495472',
    bookNo: '406373',
    goodsNo: '167495472',
    isbn: '9791112088741',
    category: '연구 보고서',
  },
  {
    id: 5,
    title: '삼삼반, 의(義)로운 생각 발달사',
    author: '김태성 외 18명 공저',
    price: '11,600원',
    description: '김태성 외 18명 공저 (11,600원)',
    cover: 'https://image.yes24.com/goods/195087483/XL',
    link: 'https://www.yes24.com/product/goods/195087483',
    bookNo: '419444',
    goodsNo: '195087483',
    isbn: '9791112105653',
    category: '학급 문집',
  },
  {
    id: 6,
    title: '나, 그리고 우리들의 이야기',
    author: '배성현, 정현우, 박서준, 김호종, 김지훈, 조현서, 송지혁 공저',
    price: '12,000원',
    description: '배성현 외 6명 공저 (12,000원)',
    cover: 'https://image.yes24.com/goods/165140071/XL',
    link: 'https://www.yes24.com/product/goods/165140071',
    bookNo: '400634',
    goodsNo: '165140071',
    isbn: '9791112080295',
    category: '학생 작품집',
  },
  {
    id: 7,
    title: '자작자작, 우리들의 이야기',
    author: '문에녹 외 19명 공저',
    price: '13,000원',
    description: '문에녹 외 19명 공저 (13,000원)',
    cover: 'https://image.yes24.com/goods/160462951/XL',
    link: 'https://www.yes24.com/product/goods/160462951',
    bookNo: '390987',
    goodsNo: '160462951',
    isbn: '9791112067203',
    category: '학생 작품집',
  },
  {
    id: 8,
    title: '여수의(義) 사랑, 우리들의 이야기 2',
    author: '권세연 외 71명 공저',
    price: '12,000원',
    description: '권세연 외 71명 공저 (12,000원)',
    cover: 'https://image.yes24.com/goods/155292782/XL',
    link: 'https://www.yes24.com/product/goods/155292782',
    bookNo: '389400',
    goodsNo: '155292782',
    isbn: '9791112065254',
    category: '학생 작품집',
  },
  {
    id: 9,
    title: '여수의(義) 사랑, 우리들의 이야기',
    author: '윤예서 외 38명 공저',
    price: '14,000원',
    description: '윤예서 외 38명 공저 (14,000원)',
    cover: 'https://image.yes24.com/goods/152467965/XL',
    link: 'https://www.yes24.com/product/goods/152467965',
    bookNo: '372690',
    goodsNo: '152467965',
    isbn: '9791112041500',
    category: '학생 작품집',
  },
  {
    id: 10,
    title: '우리들의 눈물 상자',
    author: '이채민 외 19명 공저 (엽쌤스쿨 제작)',
    price: '16,000원',
    description: '이채민 외 19명 공저 (16,000원)',
    cover: 'https://image.yes24.com/goods/147796751/XL',
    link: 'https://www.yes24.com/product/goods/147796751',
    bookNo: '347623',
    goodsNo: '147796751',
    isbn: '9791112006639',
    category: '학생 작품집',
  },
  {
    id: 11,
    title: '해를 담은 아이',
    author: '이해담 저',
    price: '11,000원',
    description: '이해담 저 (11,000원)',
    cover: 'https://image.yes24.com/goods/140283591/XL',
    link: 'https://www.yes24.com/product/goods/140283591',
    bookNo: '287519',
    goodsNo: '140283591',
    isbn: '9791141920319',
    category: '학생 개인 저작',
  },
  {
    id: 12,
    title: 'AI와 함께 그린 꿈의 조각',
    author: '김나희, 김연우 공저',
    price: '11,000원',
    description: '김나희, 김연우 공저 (11,000원)',
    cover: 'https://image.yes24.com/goods/138744485/XL',
    link: 'https://www.yes24.com/product/goods/138744485',
    bookNo: '277235',
    goodsNo: '138744485',
    isbn: '9791141913601',
    category: 'AI 융합 창작집',
  },
  {
    id: 13,
    title: '아무도 모르는 5학년의 속마음',
    author: '강다은 외 22인 공저',
    price: '11,900원',
    description: '강다은 외 22인 공저 (11,900원)',
    cover: 'https://image.yes24.com/goods/134023092/XL',
    link: 'https://www.yes24.com/product/goods/134023092',
    bookNo: '262571',
    goodsNo: '134023092',
    isbn: '9791141905347',
    category: '학생 작품집',
  },
  {
    id: 14,
    title: '안심하고 읽는 94가지 이야기',
    author: '안심초등학교 5학년 일동',
    price: '17,000원',
    description: '2023 안심초 5학년 나도 작가 프로젝트 (17,000원)',
    cover: 'https://image.yes24.com/goods/123253561/XL',
    link: 'https://www.yes24.com/product/goods/123253561',
    bookNo: '194068',
    goodsNo: '123253561',
    isbn: '9791141048143',
    category: '나도 작가 프로젝트',
  },
];
