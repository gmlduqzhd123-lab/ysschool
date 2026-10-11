// ========== 엽쌤 제작 수업 자료 데이터베이스 ==========

export interface TeachingMaterial {
  id: number;
  title: string;
  description: string;
  subject: '국어·독서' | '인문·토론' | '에듀테크·AI' | '예체능·통합' | '학급·프로젝트';
  grade?: string;          // 권장 학년 (예: '초등 3~4학년', '전학년', '초등 5학년')
  fileType?: 'hwp' | 'pdf' | 'pptx' | 'zip' | 'canva' | 'padlet' | 'link';
  fileUrl?: string;        // 파일 다운로드 URL
  linkUrl?: string;        // 웹/Canva/Padlet 링크
  date: string;            // 등록/제작일 (YYYY-MM-DD)
  badge?: string;
}

export const teachingMaterialsData: TeachingMaterial[] = [
  {
    "id": 1,
    "title": "개념기반 탐구학습 국어과 수업 지도안",
    "description": "2022 개정 교육과정에 맞춘 개념기반 탐구학습 모형 적용 국어과 교수·학습 과정안",
    "subject": "국어·독서",
    "grade": "초등 4~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/2a15810057952972c28a6e1efd0f2373/_____________________________.pdf",
    "date": "2026-02-05",
    "badge": "지도안 PDF"
  },
  {
    "id": 2,
    "title": "PBL 기반 학생주도성 키움 수업 (5학년 독서 단원)",
    "description": "프로젝트 기반 학습(PBL)을 적용하여 학생 스스로 탐구하고 질문하는 5학년 1학기 독서 단원 수업안",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/1be6f2c95af95bbcbe2324616ff5b10e/2025_________________1__5_________3_.pdf",
    "date": "2026-01-20",
    "badge": "수업안 PDF"
  },
  {
    "id": 3,
    "title": "질문기반 PBL 국어 수업 지도안 (3학년)",
    "description": "학생들의 자발적인 호기심과 질문을 중심으로 전개하는 3학년 1학기 질문기반 PBL 수업 과정안",
    "subject": "국어·독서",
    "grade": "초등 3학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/94d70cda08196345a6599c4dace091b1/2025_______________________3_____1_.hwp",
    "date": "2026-01-15",
    "badge": "한글 HWP"
  },
  {
    "id": 4,
    "title": "AI와 미네르바 토론을 활용한 국어·독서 수업 사례",
    "description": "생성형 AI와 온라인 미네르바 토론 기법을 융합하여 깊이 있는 텍스트 분석과 생각을 나누는 독서 수업",
    "subject": "인문·토론",
    "grade": "초등 5~6학년",
    "fileType": "pptx",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/930d31162cbe34999d74f3dc2f1684d5/___________________.pptx",
    "date": "2026-02-05",
    "badge": "발표 PPTX"
  },
  {
    "id": 5,
    "title": "미네르바 토론 수업 모형 지도안 및 루브릭",
    "description": "초등 교실 맞춤형 미네르바 토론 단계별 활동 절차 및 객관적 다면 평가 루브릭 양식",
    "subject": "인문·토론",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/3d0feee6132d73fefc66ec567fc3d64c/__________________.pdf",
    "date": "2026-01-20",
    "badge": "루브릭 PDF"
  },
  {
    "id": 6,
    "title": "한 학기 한 권 읽기 슬로리딩 활동지 패키지",
    "description": "교실에서 온작품을 함께 깊이 읽으며 질문 카드, 인물 분석, 삶과 연결하기 활동을 수행하는 워크시트 모음",
    "subject": "국어·독서",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/eb334999d74f3dc2f1684d51be6f2c95/slow_reading_worksheet_package.hwp",
    "date": "2025-11-10",
    "badge": "활동지 HWP"
  },
  {
    "id": 7,
    "title": "학생 작가 출판 프로젝트: 자작자작 책 만들기 지도안",
    "description": "기획, 초고 쓰기, 퇴고, 삽화 생성(AI/수작업), 출판 등록까지 이어지는 한 학기 학생 작가 출판 워크북",
    "subject": "학급·프로젝트",
    "grade": "초등 4~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/563e4612d91986927dafc95fc9f6ee52/____________________.pdf",
    "date": "2025-10-18",
    "badge": "가이드 PDF"
  },
  {
    "id": 8,
    "title": "생성형 AI 활용 우리 학교 교가 만들기 수업안",
    "description": "Suno AI와 작사를 결합하여 우리 반만의 특색 있는 학급가 및 교가를 함께 창작하는 음악·정보 융합 수업",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "pptx",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/7b003a27e7dcae42ff3fae39b9866ad7/Suno_AI_________________.pptx",
    "date": "2025-12-05",
    "badge": "수업 PPTX"
  },
  {
    "id": 9,
    "title": "북트레일러 영상 제작 프로젝트 워크시트",
    "description": "읽은 책의 핵심 갈등과 감동을 영상 기획 콘티로 옮기고 디지털 기기로 트레일러 영상을 제작하는 수업 활동지",
    "subject": "예체능·통합",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/a12b9c3d4e5f6a7b8c9d0e1f2a3b4c5d/book_trailer_storyboard_template.hwp",
    "date": "2025-10-30",
    "badge": "활동지 HWP"
  },
  {
    "id": 10,
    "title": "캔바(Canva) 활용 학급 디자인 & 시각자료 제작 템플릿",
    "description": "교실 게시판, 학생 활동 결과물 카드뉴스, 발표용 인포그래픽을 손쉽게 만드는 Canva 템플릿 링크집",
    "subject": "에듀테크·AI",
    "grade": "초등 전학년",
    "fileType": "canva",
    "linkUrl": "https://www.canva.com",
    "date": "2025-11-20",
    "badge": "Canva 링크"
  },
  {
    "id": 11,
    "title": "초등 아카펠라 하모니 교실 음악 지도안 (관악기/발성 연계)",
    "description": "화음의 즐거움을 깨닫고 급우 간 유대감을 높이는 초등 아카펠라 및 파트별 합창 지도안",
    "subject": "예체능·통합",
    "grade": "초등 4~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/0656fb33276eb13b5bf5a19000a6e3ce/____________________________.pdf",
    "date": "2025-09-15",
    "badge": "지도안 PDF"
  },
  {
    "id": 12,
    "title": "학급 자율 동아리 & 학생 주도 공간 혁신 프로젝트",
    "description": "학생들이 직접 교실 환경과 쉼터를 기획하고 자율적으로 운영하는 학급 자치 프로젝트 워크북",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6/student_led_space_project.hwp",
    "date": "2025-08-25",
    "badge": "워크북 HWP"
  },
  {
    "id": 13,
    "title": "디지털 시민성 및 올바른 AI 윤리 교육 수업자료",
    "description": "생성형 AI 사용 시 저작권, 초상권, 딥페이크 위험을 알고 바르게 활용하는 4차시 연속 인성·디지털 수업",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/e6c92e74288b835e5d3257850a58ad0c/______________________.pdf",
    "date": "2026-01-10",
    "badge": "교재 PDF"
  },
  {
    "id": 14,
    "title": "온라인 협업 도구(Padlet) 활용 글쓰기 피드백 수업",
    "description": "실시간 패들렛 보드를 활용하여 짝 피드백, 갤러리 워크, 별점 평가를 진행하는 상호 협력 수업안",
    "subject": "인문·토론",
    "grade": "초등 3~6학년",
    "fileType": "padlet",
    "linkUrl": "https://padlet.com/gmlduqzhd12",
    "date": "2025-11-05",
    "badge": "Padlet 링크"
  },
  {
    "id": 15,
    "title": "그림책 철학 하브루타 질문 수업 지도안",
    "description": "짧은 그림책 한 권으로 깊은 철학적 질문(정의, 우정, 공정 등)을 이끌어내는 질문 카드 및 지도안",
    "subject": "국어·독서",
    "grade": "초등 전학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/195b05a76985fe6220b33c0490b4fe7e/2026_________________1__5_________3_.pdf",
    "date": "2026-02-01",
    "badge": "수업안 PDF"
  },
  {
    "id": 16,
    "title": "회복적 생활교육 아침 열기 모닝 미팅 활동지",
    "description": "매일 아침 서로의 감정을 확인하고 존중의 약속을 나누는 서클 대화 질문 카드 및 활동지",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/f1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6/morning_meeting_circle_cards.hwp",
    "date": "2025-09-01",
    "badge": "활동지 HWP"
  },
  {
    "id": 17,
    "title": "글로컬(Glo-CAL) 지역 연계 프로젝트 학습 설계안",
    "description": "우리 고장 여수의 해양 생태계와 역사 인물을 탐구하고 글로벌 환경 문제와 연결하는 융합 프로젝트",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/0dfe49e4a59bb95048c32c2f6e3026b1/_______PBL_______5___.pdf",
    "date": "2025-10-15",
    "badge": "설계안 PDF"
  },
  {
    "id": 18,
    "title": "퀴즈앤 & 블룸버그 게이미피케이션 형성평가 문항집",
    "description": "단원 마무리 형성평가를 게임처럼 흥미진진하게 진행할 수 있는 웹 기반 퀴즈 문항 설계표",
    "subject": "에듀테크·AI",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9b5d3c1a7e2f4b6d8a0c2e4f6a8b0d2e/gamified_quiz_rubric_template.hwp",
    "date": "2026-01-15",
    "badge": "지도안 HWP"
  },
  {
    "id": 19,
    "title": "자작자작, 우리들의 이야기 (학생 출판 도서 전문 PDF)",
    "description": "여수한려초등학교 학생들이 직접 쓴 글과 삶의 고백을 한 권으로 엮어 출판한 도서 전체 전문 PDF 파일",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/e97c0f0525b318f48d60a22bbbbb80f9/____________________.pdf",
    "date": "2025-10-16",
    "badge": "도서전문 PDF"
  },
  {
    "id": 20,
    "title": "여수의(義) 사랑, 우리들의 이야기 2 (출판 도서 전문 PDF)",
    "description": "여수의 역사, 인물, 지역 사랑과 아이들의 성장을 담아 출판한 글로-CAL 학생 작가 프로젝트 2호 도서 전문 PDF",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/865b0deca9f957e063d4b7c24915f8c4/____________________2_______.pdf",
    "date": "2025-10-16",
    "badge": "도서전문 PDF"
  },
  {
    "id": 21,
    "title": "우리들의 눈물 상자 (출판 도서 전체 전문 PDF)",
    "description": "마음속 눈물과 슬픔을 솔직하게 털어놓고 서로를 위로하며 탄생한 여수한려초 대표 학생 출간작 전문 PDF 파일",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/47ac49ae3714df640b001c4b7fd317d2/________________.pdf",
    "date": "2025-10-16",
    "badge": "도서전문 PDF"
  },
  {
    "id": 22,
    "title": "우리가 만든 글로-CAL 도서 갤러리 보드",
    "description": "여수한려초 학생 작가 20명의 도서 표지, 삽화, 글쓰기 원고 전편을 감상할 수 있는 출판 기념 패들렛 갤러리",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "padlet",
    "linkUrl": "https://padlet.com/gmlduqzhd12/cal-3oyq9pefl8tr5ti5",
    "date": "2025-10-16",
    "badge": "Padlet 갤러리"
  },
  {
    "id": 23,
    "title": "2024학년도 1차 독서인문 선도교실 공개수업 지도안",
    "description": "지역 역사 및 인문 고전을 연계한 5학년 1차 독서인문 선도교실 정규 공개수업 세부 지도안",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/598d1ab16426dbd668bf6ad7a81f057f/2024_____________________2_____1__5______.hwp",
    "badge": "지도안 HWP",
    "date": "2025-06-12"
  },
  {
    "id": 24,
    "title": "2024학년도 2차 독서인문 선도교실 공개수업 지도안",
    "description": "생성형 AI와 토론 기법을 결합하여 학생 주도적 독서 몰입을 이끄는 5학년 2차 공개수업 지도안",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/003750cf4585160c2f76dff80669e329/2024____________2______________________________5______.hwp",
    "badge": "지도안 HWP",
    "date": "2025-10-24"
  },
  {
    "id": 25,
    "title": "2024. 대한민국 글로컬 미래교실 박람회 공개수업 지도안",
    "description": "글로컬 미래교육박람회 현장에서 직접 시연 및 공개한 에듀테크 기반 혁신 미래교실 수업 지도안",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/f67aa9e59256ebc1cbe2eeafd1b9574a/___________________________.hwp",
    "badge": "박람회 지도안",
    "date": "2025-05-30"
  },
  {
    "id": 26,
    "title": "에듀테크 및 AI 활용 공개 수업 지도안 모음집",
    "description": "수업 현장에 즉시 적용할 수 있는 다양한 에듀테크 및 생성형 AI 도구 융합 공개수업 지도안 압축 패키지",
    "subject": "에듀테크·AI",
    "grade": "초등 전학년",
    "fileType": "zip",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/bf3124e0e17ffdfe379a58f855b8f72c/____________.zip",
    "badge": "지도안 패키지",
    "date": "2025-09-15"
  },
  {
    "id": 27,
    "title": "질문이 있는 PBL 수업 설계 (5학년)",
    "description": "학생들의 호기심 유발 질문으로 시작하여 문제 해결까지 도달하는 5학년 1학기 PBL 프로젝트 수업안",
    "subject": "인문·토론",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/0dfe49e4a59bb95048c32c2f6e3026b1/_______PBL_______5___.hwp",
    "badge": "PBL 지도안",
    "date": "2025-04-18"
  },
  {
    "id": 28,
    "title": "소나기 뒷 이야기 쓰기 수업 활동지 (6학년)",
    "description": "황순원의 단편소설 소나기를 감상하고 인물의 심리를 고려하여 상상력 넘치는 결말을 짓는 국어 활동지",
    "subject": "국어·독서",
    "grade": "초등 6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/d30a55a4673aee4990f1efada9fa4f05/_2____1__________________________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-07-02"
  },
  {
    "id": 29,
    "title": "속담 활용 글짓기 수업 활동지 (6학년)",
    "description": "상황에 알맞은 속담의 의미를 탐구하고 실제 생활 속 에피소드와 결합하여 맛깔스러운 글을 완성하는 수업지",
    "subject": "국어·독서",
    "grade": "초등 6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/634a05d70c4670e7cbb74c09399787bd/_2____3_________________________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-07-08"
  },
  {
    "id": 30,
    "title": "관용표현 활용 영화 감상문 작성 활동지 (6학년)",
    "description": "영화나 문학 작품 속 명장면을 관용표현을 활용하여 비판적이고 개성 있게 표현하는 글쓰기 워크시트",
    "subject": "국어·독서",
    "grade": "초등 6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/3fccff7f38717ab1e85830e054deddfd/_2____7______________________________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-07-15"
  },
  {
    "id": 31,
    "title": "설명하는 글쓰기 단계별 지도안 1 & 2 (5학년)",
    "description": "설명 대상의 특징을 객관적인 사실과 짜임새 있는 구조로 전달하는 5학년 국어 설명문 완성 활동지",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/9b0e67583587bc443e1376e5b7413a89/_3_____2______________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-09-05"
  },
  {
    "id": 32,
    "title": "나도 드라마 작가! 대본 창작 수업 활동지 (5학년)",
    "description": "이야기의 갈등 구조와 대사, 지문을 직접 구성하여 한 편의 연극·드라마 대본을 창작해보는 국어 워크시트",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/d909b2dbcc5448a011b816787dc93c18/_4_____3______________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-09-12"
  },
  {
    "id": 33,
    "title": "경험과 상상이 담긴 글쓰기 활동지 (5학년)",
    "description": "자신의 실제 경험에 풍부한 상상력을 덧입혀 독창적인 산문을 완성하는 5학년 창작 글쓰기 지도 자료",
    "subject": "국어·독서",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/10a0dc2ccd498e3527568147e5930275/_4____1______________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-09-20"
  },
  {
    "id": 34,
    "title": "글쓰기 대회 되돌아보기 및 루브릭 상호평가지",
    "description": "엽쌤스쿨 학급 글쓰기 대회 출품작을 읽고 동료 피드백과 자기 성찰을 이끄는 체계적 루브릭 평가표",
    "subject": "국어·독서",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/1a61594f2a68b2bf850488f0686e6d41/__2____________________.hwp",
    "badge": "평가지 HWP",
    "date": "2025-10-02"
  },
  {
    "id": 35,
    "title": "논리적 설득을 위한 논설문 쓰기 워크시트 (6학년)",
    "description": "주장과 타당한 근거를 세우고 서론-본론-결론의 삼단 구성을 체득하는 6학년 논설문 완성 활동지",
    "subject": "국어·독서",
    "grade": "초등 6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/45b243d00d833c2b6681ceb662c38d5e/_8___________________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-10-15"
  },
  {
    "id": 36,
    "title": "생각을 돋우는 찬반 토의·토론 수업 활동지",
    "description": "논제 분석, 입론서 작성, 반론 및 최종 변론까지 토론의 모든 과정을 한눈에 안내하는 토의·토론 워크시트",
    "subject": "인문·토론",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/e80507697b5bccc123c72bef3737cc58/___vs_________.hwp",
    "badge": "토론 활동지",
    "date": "2025-10-20"
  },
  {
    "id": 37,
    "title": "문해력 진단 및 기초 어휘력 측정 평가 도구",
    "description": "초등 고학년 학생들의 문맥 추론력, 사실적 이해, 비판적 어휘 구사력을 종합 점검하는 문해력 평가 서식",
    "subject": "국어·독서",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/7b493a579ede592ed77577447c4b0eda/____________.hwp",
    "badge": "평가 도구 HWP",
    "date": "2025-05-10"
  },
  {
    "id": 38,
    "title": "나의 인생 도서 프레젠테이션 발표 활동지",
    "description": "가장 깊은 감명을 준 인생 책을 선정하고 주인공과의 가상 대화 및 추천 이유를 구조화하는 독서 활동지",
    "subject": "국어·독서",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/1010fee0372e652ba69d0d11b19b1ab5/____________1__________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-06-25"
  },
  {
    "id": 39,
    "title": "공익 광고 및 포스터 제작 프로젝트 활동지",
    "description": "사회적 문제(환경, 바른 언어, 배려)를 파악하고 시각적 카피와 슬로건을 디자인하는 미디어 융합 수업지",
    "subject": "예체능·통합",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/bd09dcb8b4b2746d72dc4da2bf84ebcc/_______________.hwp",
    "badge": "활동지 HWP",
    "date": "2025-08-30"
  },
  {
    "id": 40,
    "title": "자신감 쑥쑥! 학급 발표 대전 활동 서식",
    "description": "자신의 생각을 논리정연하게 말하고 청중과 소통하는 역량을 기르는 스피치·발표 프로젝트 평가 양식",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/eb9ba58d0d0c4c5f2323fcd865e5d3b6/_1______________.hwp",
    "badge": "활동 서식 HWP",
    "date": "2025-09-18"
  },
  {
    "id": 41,
    "title": "스토리텔링 영상 공모전 기획 콘티 및 활동지",
    "description": "시나리오 작성부터 컷별 콘티 스케치, 스마트 기기 영상 촬영 및 편집 체크리스트를 담은 미디어 워크북",
    "subject": "예체능·통합",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/8d8268ca035832616347d955e67914df/_2_________________.hwp",
    "badge": "콘티 활동지",
    "date": "2025-10-10"
  },
  {
    "id": 42,
    "title": "2025. 글로-CAL 프로젝트 기반 수업 종합 계획서",
    "description": "여수 지역의 역사와 생태, 문화를 탐구하고 글로컬 세계시민 의식을 함양하는 연간 PBL 프로젝트 운영 계획서",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/6ceeac4186b1811481f66cace73f3e01/2025____________________________.hwp",
    "badge": "PBL 계획서",
    "date": "2025-03-10"
  },
  {
    "id": 43,
    "title": "한려 Summer 프로젝트 안내장 및 활동 계획서",
    "description": "여름방학 및 여름 계절학기를 맞이하여 디지털 도구와 탐구 미션을 접목한 한려초 특색 융합 프로젝트 계획서",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/49cfb1b9f9697ac8d34789f181c9a393/2025_______________Summer___________________.hwp",
    "badge": "안내장 HWP",
    "date": "2025-07-15"
  },
  {
    "id": 44,
    "title": "학생 출판 도서 원고: 아무도 모르는 5학년의 속마음",
    "description": "초등학교 5학년 아이들의 솔직 담백한 고민과 학교생활 속 비밀을 담아낸 학생 창작 도서 전체 원고 파일",
    "subject": "학급·프로젝트",
    "grade": "초등 5학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/351f8681b9ccac2a7d87f4ce3df83ab1/________5_______.hwp",
    "badge": "도서원고 HWP",
    "date": "2025-11-20"
  },
  {
    "id": 45,
    "title": "학생 출판 도서 원고: AI와 함께 그린 꿈의 조각",
    "description": "생성형 AI를 프롬프트로 활용하여 시와 짧은 소설, 그림을 직접 짓고 엮어낸 미래지향적 학생 창작 원고",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d0c8559517c02b39f90a67ed6cb2490a/AI__________________.hwp",
    "badge": "도서원고 HWP",
    "date": "2025-11-25"
  },
  {
    "id": 46,
    "title": "학생 출판 도서 원고: 해를 담은 아이",
    "description": "여수의 햇살과 바다를 닮은 아이들의 가슴 따뜻한 동시와 일기, 산문을 수록한 학생 작가 출간 원고",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "hwp",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d8d8e128b2f579f68063341732d456c4/_____________.hwp",
    "badge": "도서원고 HWP",
    "date": "2025-11-28"
  },
  {
    "id": 47,
    "title": "생성형 AI를 활용한 독서인문교육 꿀팁 연수 교안",
    "description": "ChatGPT, 클로드 등 생성형 AI를 교실 독서 수업에 쉽게 접목할 수 있는 실전 노하우와 예시 프롬프트 교안",
    "subject": "에듀테크·AI",
    "grade": "초등 전학년",
    "fileType": "pptx",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/9ed07d5e29a40f2090d6a26d70ff8b26/AI____________.pptx",
    "badge": "연수 PPT",
    "date": "2025-08-20"
  },
  {
    "id": 48,
    "title": "AI를 활용한 국어·독서 수업 우수 실천 사례집",
    "description": "생성형 AI를 활용하여 시 쓰기, 책 표지 만들기, 질문 생성 등 국어 교과에 녹여낸 생생한 수업 실천 PPT",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "pptx",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/8427831cb6a7082e948906ccafbfa95f/AI_______2.pptx",
    "badge": "사례 PPT",
    "date": "2025-09-10"
  },
  {
    "id": 49,
    "title": "눈물 상자 프로젝트 감정 치유 수업 PPT",
    "description": "마음속 눈물과 슬픔을 표현하고 공감하며 자존감을 회복하는 정서 함양 프로젝트 공개수업 프레젠테이션",
    "subject": "학급·프로젝트",
    "grade": "초등 5~6학년",
    "fileType": "pptx",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/c664013afa9715ef13bb9134442b5883/PPT.pptx",
    "badge": "수업 PPT",
    "date": "2025-10-16"
  },
  {
    "id": 50,
    "title": "2024. 창의융합인재양성 프로젝트 성과발표회 모음집",
    "description": "여수발명교육센터 인문팀과 함께한 생성형 AI 융합 발명 및 창의 탐구 프로젝트 성과물 발표 자료집",
    "subject": "에듀테크·AI",
    "grade": "초등 5~6학년",
    "fileType": "pdf",
    "fileUrl": "https://padlet-uploads.storage.googleapis.com/1745856714/159fc63a7f1890f0fd7b7658dc04fdf0/________AI__________________________.pdf",
    "badge": "성과집 PDF",
    "date": "2024-12-11"
  },
  {
    "id": 51,
    "title": "내가 꿈꾸는 미래 탄소 중립 도시 (오토드로우 수업 보드)",
    "description": "구글 오토드로우(AutoDraw) AI 드로잉 툴을 활용하여 학생들이 직접 디자인한 미래 친환경 여수 도시 설계관",
    "subject": "에듀테크·AI",
    "grade": "초등 4~6학년",
    "fileType": "padlet",
    "linkUrl": "https://padlet.com/gmlduqzhd12/padlet-7wjm2iivaw642ox9",
    "badge": "Padlet 수업보드",
    "date": "2025-06-20"
  },
  {
    "id": 52,
    "title": "여수義 사랑 미래 인재 기르기 연구학교 마스터보드",
    "description": "여수교육지원청 지정 독서인문교육 연구학교 운영 계획, 공개수업 지도안, 활동집, 출판 도서 총망라 패들렛",
    "subject": "학급·프로젝트",
    "grade": "초등 전학년",
    "fileType": "padlet",
    "linkUrl": "https://padlet.com/gmlduqzhd12/cal-gud9zkrdhfyo8jjd",
    "badge": "연구학교 패들렛",
    "date": "2025-11-30"
  }
];
