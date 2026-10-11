// ========== 패들렛 연수 & 교육과정 자료 통합 데이터베이스 ==========
// 자동 추출 및 정제: 총 6개 직무연수 및 교육과정 패들렛 (223개 자료)

export interface TrainingMaterial {
  id: number;
  title: string;
  description: string;
  category: '에듀테크' | 'AI활용' | '독서인문' | '기타';
  date: string;          // 등록일 (예: '2026-08-05')
  link?: string;         // 외부 링크 (Canva, Google Drive, 웹사이트 등)
  fileUrl?: string;      // 직접 파일 URL (PDF, HWP, PPTX 등)
  fileType?: string;     // 파일 유형 (pdf, pptx, hwp, xlsx, zip 등)
  thumbnail?: string;    // 썸네일 이미지 URL
}

export const trainingData: TrainingMaterial[] = [
  {
    "id": 1,
    "title": "학교교육과정 일관성 점검하기",
    "description": "(좋), (아), (해) 의견을 반영한 학교교육활동 슬림화하기 학교 비전-교육목표-핵심역량-교육중점 간 일관성 살펴보기",
    "category": "에듀테크",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882823"
  },
  {
    "id": 2,
    "title": "교육공동체 의견 수렴 양식 슬림화!!",
    "description": "작년에 실시했던 우리 학교 설문 문항 점검(교육계획 부록 참고) - 우리 학교 실정에 맞는 문항인가? - 의미없는 질문이 설문이 있지 않은가? 설문 문항 슬림화하기!!! - 예시안에서 필요한 질문 추려서 우리학교에 맞는 설문완성!!",
    "category": "독서인문",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882824"
  },
  {
    "id": 3,
    "title": "교육공동체 의견 수렴을 위한 설문 추천 문항 공유",
    "description": "학교별로 작성한 설문지 양식을 공유하거나, \"추천하는 문항\"이 있으면 올려주세요. (교사용, 학생용, 학부모용 셋 중에 하나만 올려도 좋습니다.)",
    "category": "기타",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882825"
  },
  {
    "id": 4,
    "title": "학교교육과정 쉽게 따라하기",
    "description": "학교교육과정 쉽게 따라하기 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/ce0166efad1994da262fc653c6fab90a/2026______________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 5,
    "title": "교수평 현장지원자료",
    "description": "교수평 현장지원자료 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/84d53aa991e26395f7c481fa8da59aac/_____001__1_.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/84d53aa991e26395f7c481fa8da59aac/_____001__1_.jpg"
  },
  {
    "id": 6,
    "title": "2022개정교육과정 총론",
    "description": "2022개정교육과정 총론 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9cc814129e52a3b5eaa081b8ddb4cc29/_____________2022___.hwp",
    "fileType": "hwp"
  },
  {
    "id": 7,
    "title": "설문지 다운로드(구글 폼)",
    "description": "[교원용] https://docs.google.com/forms/d/1PT3h_FMqBGodwIbs-QsL4OCVpfrxz_QkRvpzHBa1aKs/copy [학부모용] https://docs.google.com/forms/d/1NUcLsB_g7H7REX_H-M0...",
    "category": "기타",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882831"
  },
  {
    "id": 8,
    "title": "2022개정교육과정 총론 해설(초등학교)",
    "description": "2022개정교육과정 총론 해설(초등학교) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/724a8684b06e06c1562341b8aba1abe3/2022___________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 9,
    "title": "전라남도 초등학교 교육과정",
    "description": "전라남도 초등학교 교육과정 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/576ffa2618d99527a3919b2287f8466b/_______________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 10,
    "title": "학교교육과정 설계 흐름도",
    "description": "학교교육과정 설계 흐름도 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9179a5b3922a98f5d07b4ed46f69689e/2026_____________________.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9179a5b3922a98f5d07b4ed46f69689e/2026_____________________.jpg"
  },
  {
    "id": 11,
    "title": "OO초 학교교육과정 설계 계획",
    "description": "OO초 학교교육과정 설계 계획 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/5c69fdac1912742fdf767ac63c4e06a0/OO______________.hwpx",
    "fileType": "hwp"
  },
  {
    "id": 12,
    "title": "교육과정 되돌아보기 일정",
    "description": "교육과정 되돌아보기 일정 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/24d24316f55631148a2386155de47350/____.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/24d24316f55631148a2386155de47350/____.jpg"
  },
  {
    "id": 13,
    "title": "안건1",
    "description": "안건1 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/62a77a321fa2affe8fed4d6bc286faad/__1.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/62a77a321fa2affe8fed4d6bc286faad/__1.jpg"
  },
  {
    "id": 14,
    "title": "안건2",
    "description": "안건2 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/243043cb58407e33c36115c8a383d302/__2.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/243043cb58407e33c36115c8a383d302/__2.jpg"
  },
  {
    "id": 15,
    "title": "건의사항 사전협의내용 안내",
    "description": "건의사항 사전협의내용 안내 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/cc2302b78107715b7b4491c09f469506/image__3_.avif",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/cc2302b78107715b7b4491c09f469506/image__3_.avif"
  },
  {
    "id": 16,
    "title": "교사용 설문양식",
    "description": "교사용 설문양식 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/1a62537eb782cd322621af3c14e0f043/____2026__________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 17,
    "title": "학부모용 설문 양식",
    "description": "학부모용 설문 양식 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/4734d3117b97d070054201ff824e6436/____2026___________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 18,
    "title": "학생용 설문 양식",
    "description": "학생용 설문 양식 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d1c6db97f40a61259c28f183f0306f71/____2026__________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 19,
    "title": "연간학사일정, 편제 및 시간배당 작성예시 공유",
    "description": "학교별로 작성한 연간학사일정, 편제 및 시간배당을 공유해주세요.",
    "category": "독서인문",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882855"
  },
  {
    "id": 20,
    "title": "연간학사일정, 편제표 작성하기",
    "description": "2026학년도 수업 일수 및 학기 당 수업 시수 고민하기(2026학년도 달력 참고) 2026학년도 시수 편제 예시 자료 해석해보기 - 시주 증감된 내용 확인 - 학교자율시간 시수 확보를 위해 타교과 시수 감축 이해 우리 학교 시수표 작성하기",
    "category": "독서인문",
    "date": "2026-02-10",
    "link": "https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882856"
  },
  {
    "id": 21,
    "title": "연간학사일정 및 편제표",
    "description": "연간학사일정 및 편제표 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/cd28c6a9362c407579068748036bf602/___3________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 22,
    "title": "학교교육과정 톺아보기(예시1)",
    "description": "학교교육과정 톺아보기(예시1) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/5c42b98af333b644a4d5bd839b9bf1af/_________OO__2025.hwp",
    "fileType": "hwp"
  },
  {
    "id": 23,
    "title": "학교교육과정 톺아보기(예시2)",
    "description": "학교교육과정 톺아보기(예시2) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/1a67c75a1da6cb1bfc0141a957058886/_________OO__2025.hwp",
    "fileType": "hwp"
  },
  {
    "id": 24,
    "title": "시수편성 점검표",
    "description": "시수편성 점검표 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/32b3068d3a857a0e93e31f7faf02e042/2026____________.xlsx",
    "fileType": "xlsx"
  },
  {
    "id": 25,
    "title": "2026년 달력(학사일정 계산)",
    "description": "2026년 달력(학사일정 계산) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/0ed3738182228e86e7929961ec93350a/2026_____________.xlsx",
    "fileType": "xlsx"
  },
  {
    "id": 26,
    "title": "학교교육과정 쉽게 따라하기 한글파일",
    "description": "학교교육과정 쉽게 따라하기 한글파일 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/8d22de3a9672da5b79dd18d84ffbce40/2026______________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 27,
    "title": "학교교육과정 일관성 점검 실습지",
    "description": "학교교육과정 일관성 점검 실습지 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/832b1e69a69b22a8c80965e95a2ab436/______________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 28,
    "title": "신기초-학생용",
    "description": "신기초-학생용 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "link": "https://docs.google.com/forms/d/13aFW98Ne43dZuSj6ddb_NPAVF0W8Q3kPf3RNkVL8lt4/copy"
  },
  {
    "id": 29,
    "title": "신기초-학부모용",
    "description": "신기초-학부모용 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "link": "https://docs.google.com/forms/d/14UegmkNnjFnXVAYjRCG3UdLOMcvnG0Mok5Wjv-0jVVQ/copy"
  },
  {
    "id": 30,
    "title": "신기초-교원용",
    "description": "신기초-교원용 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "link": "https://docs.google.com/forms/d/1UemhrpCSBNsbO4gi0UcreD03NBHW1MpoS8LeFNv7dcY/copy"
  },
  {
    "id": 31,
    "title": "새학년집중준비기간 도움자료",
    "description": "새학년집중준비기간 도움자료 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/257aaccd37e259241d6e5170069175af/_5_9_2024_______________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 32,
    "title": "3일 운영 (예시)",
    "description": "3일 운영 (예시) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b0141dc8d66d3f26730fe16bf930b1d5/2000____________________3___.hwp",
    "fileType": "hwp"
  },
  {
    "id": 33,
    "title": "운영 안내(3일형)",
    "description": "운영 안내(3일형) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/5b269693b72880f8f729f4d5ec43ebd4/2000____________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 34,
    "title": "1일 운영 (예시)",
    "description": "1일 운영 (예시) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b3fa2d1bf8c5aac5bcaf291dc4e1343f/2000____________________1___.hwp",
    "fileType": "hwp"
  },
  {
    "id": 35,
    "title": "운영 안내(1일형-석면공사)",
    "description": "운영 안내(1일형-석면공사) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/edfc3956fa3594e3ca108a670edbc011/2000_____________________1________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 36,
    "title": "학교교육과정 간소화 틀(예시)",
    "description": "학교교육과정 간소화 틀(예시) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/998c61f6d1dec7a78d8b4f555e07aae7/00___2026_______.hwp",
    "fileType": "hwp"
  },
  {
    "id": 37,
    "title": "되돌아보기 결과 보고(양식)",
    "description": "되돌아보기 결과 보고(양식) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/568278e4122aac528483623d033a8096/2025____2__________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 38,
    "title": "되돌아보기 및 교육계획 설계 계획",
    "description": "되돌아보기 및 교육계획 설계 계획 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/094df7e6d180caef85783cbc58f70c8e/2025_________________00_______________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 39,
    "title": "되돌아보기 운영(PPT)",
    "description": "되돌아보기 운영(PPT) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/3556e40df5014c234053cc9533ec6f1a/2026___________.pptx",
    "fileType": "pptx"
  },
  {
    "id": 40,
    "title": "연수ppt",
    "description": "연수ppt 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-10",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/8fc5b6e2d1eb5d2cc3009449ea8a19f5/2026_______________________12_11__.pptx",
    "fileType": "pptx"
  },
  {
    "id": 41,
    "title": "패들렛 아케이드",
    "description": "별도의 가입이나 인증 없이 사용 가능 QR 코드 생성, URL 단축, 수업 설계, 퀴즈 등 오직 선생님을 위한 다양한 기능을 업데이트 하고 있음.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://arcade.padlet.com/"
  },
  {
    "id": 42,
    "title": "강의 자료 바로가기",
    "description": "숏.한국/엽쌤스쿨/성장",
    "category": "기타",
    "date": "2026-08-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/186c48ed33008b69c99e8ec9a92c5450/1ZvWA.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/186c48ed33008b69c99e8ec9a92c5450/1ZvWA.jpg"
  },
  {
    "id": 43,
    "title": "자작자작",
    "description": "부분 유료, 우리 학급 학생들이 쓴 글을 모으고 평가하며 한 권의 책을 만들기에 특화되어 있는 플랫폼. 댓글로 자작자작 아이디 올려주세요!",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://www.jajakjajak.com/room/32409?activityNo=53777&amp;subjectNo=103604"
  },
  {
    "id": 44,
    "title": "강의 교안(김희엽)",
    "description": "오늘 강의 교안입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://canva.link/hrftyqw055cely0"
  },
  {
    "id": 45,
    "title": "Get gpt",
    "description": "초등교사가 직접 만든 교사 업무에 큰 도움을 주는 생성형 AI 플랫폼임. 행발 작성에 특화되어 있음.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://getgpt.app/ko/marketplace"
  },
  {
    "id": 46,
    "title": "사전 설문",
    "description": "https://naver.me/xEXOAohU",
    "category": "기타",
    "date": "2026-08-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/390cb7aee337cb3762c4b12618ea03d2/2dRVc.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/390cb7aee337cb3762c4b12618ea03d2/2dRVc.jpg"
  },
  {
    "id": 47,
    "title": "우리들의 눈물 상자",
    "description": "우리들의 눈물 상자 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://bookk.co.kr/bookStore/6848db46e0dad5f48f236880"
  },
  {
    "id": 48,
    "title": "트라이디스",
    "description": "패들렛과 비슷한 템플릿, 학생 과제 수합 및 평가에 용이함. 학생 접근이 패들렛 보다 용이함. 회원가입 후 아이디 남겨주세요",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://trythis.co.kr/"
  },
  {
    "id": 49,
    "title": "키위티&키위런",
    "description": "현재 한 달간 무료로 사용 가능함. 추후 서버가 안정화되고 유료 기능을 사용했을 때 가장 글쓰기 교육에 특화되어 있다고 생각됨. [무료 체험 링크 아래 참조] https://nr7ac0ur4l0.typeform.com/to/pdMbWwL2?typeform-sour...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://keewi-t.korean.ai/"
  },
  {
    "id": 50,
    "title": "라이팅 젤",
    "description": "글쓰기를 어려워 하는 학생들을 대상으로 글쓰기에 대한 흥미를 이끌어 낼 수 있음.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://www.tinytingel.ai/"
  },
  {
    "id": 51,
    "title": "블루캣(Blooket)",
    "description": "전과목 퀴즈형 게임 가능, 복습 및 예습용으로 유용, 공개수업 때 활용 가능 유료 계정 아이디 yblo904046@momail.kr 비밀번호 Tomato798343!",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://www.blooket.com/"
  },
  {
    "id": 52,
    "title": "6학년 비와 비율 수업 사례",
    "description": "https://mpbs.es.jne.kr/mpbs_es/na/ntt/selectNttInfo.do?mi=114439&bbsId=114439&nttSn=1800603287",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4188629691/cc7e72e7d82c2a97773f4e39532d17cb/25_________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 53,
    "title": "학생 탐구 중심 국어 수업 지도안 예시 자료",
    "description": "학생 탐구 중심 국어 수업 지도안 예시 자료 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d0a697891552ef96335af8e92d98f5e0/2022___________________________________________4__________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 54,
    "title": "개념기반 탐구학습 모형 적용 수업 사례",
    "description": "개념기반 탐구학습 모형 적용 수업 사례 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/2a15810057952972c28a6e1efd0f2373/_____________________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 55,
    "title": "패들렛",
    "description": "학생 작품 큐레이팅, 산출물 게시 및 공유, 포트폴리오 및 서술형 평가에 유용",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/dashboard/school/hallyoes?filter=combined_recents&amp;mobile_page=CollectionsMenu"
  },
  {
    "id": 56,
    "title": "학생주도성 키움 수업을 위한 질문기반 PBL 수업(3학년 국어)",
    "description": "학생주도성 키움 수업을 위한 질문기반 PBL 수업(3학년 국어) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/94d70cda08196345a6599c4dace091b1/2025_______________________3_____1_.hwp",
    "fileType": "hwp"
  },
  {
    "id": 57,
    "title": "PBL 기반 학생주도성키움수업 - 5학년 독서 단원",
    "description": "PBL 기반 학생주도성키움수업 - 5학년 독서 단원 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/1be6f2c95af95bbcbe2324616ff5b10e/2025_________________1__5_________3_.pdf",
    "fileType": "pdf"
  },
  {
    "id": 58,
    "title": "학생주도성 키움 수업을 위한 국어과 수업 방안",
    "description": "학생주도성 키움 수업을 위한 국어과 수업 방안 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/8e98008d419946a09a02275761ee6166/______________________________________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 59,
    "title": "개념기반 탐구학습 모형 적용 지도안(2) (출처:IB 연구학교)",
    "description": "개념기반 탐구학습 모형 적용 지도안(2) (출처:IB 연구학교) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/293cf7fecb02adb357b295749bd2bafd/____IB___________.zip",
    "fileType": "zip"
  },
  {
    "id": 60,
    "title": "개념기반 탐구학습 모형 적용 지도안 (출처: IB 연구학교)",
    "description": "개념기반 탐구학습 모형 적용 지도안 (출처: IB 연구학교) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b477f59e6ba58593153fa553b1bef105/IB____________.zip",
    "fileType": "zip"
  },
  {
    "id": 61,
    "title": "Chat gpt",
    "description": "부분 유료, 현존하는 생성형 AI 중에서 가장 기능이 뛰어남. 못하는게 없으며 유료 결재해서 사용하면 삶의 질이 올라감.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://chatgpt.com/"
  },
  {
    "id": 62,
    "title": "1~2학년군 성취기준(엑셀 파일)",
    "description": "1~2학년군 성취기준(엑셀 파일) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/f5f3c108fb92ba85cbf5ca9cd2fc9acc/_2022_______________________1_2____.xlsx",
    "fileType": "xlsx"
  },
  {
    "id": 63,
    "title": "AI를 활용한 국어(독서) 수업 사례",
    "description": "AI를 활용한 국어(독서) 수업 사례 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/16214327ea94234cf97fca3eb412a6bd/____AI____________.pptx",
    "fileType": "pptx"
  },
  {
    "id": 64,
    "title": "개념기반 탐구학습 모형 적용 국어과 수업 방안",
    "description": "개념기반 탐구학습 모형 적용 국어과 수업 방안 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/1268756267c2b58ce80dfac1c957da9d/____________________2022_______________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 65,
    "title": "AI와 미네르바 토론을 활용한 국어(독서)수업 사례",
    "description": "AI와 미네르바 토론을 활용한 국어(독서)수업 사례 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/930d31162cbe34999d74f3dc2f1684d5/___________________.pptx",
    "fileType": "pptx"
  },
  {
    "id": 66,
    "title": "1~2학년군 성취기준(한글 파일)",
    "description": "1~2학년군 성취기준(한글 파일) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/93e8db413ca647d6cab04b3b7943158c/_2022_____________________1_2____.hwp",
    "fileType": "hwp"
  },
  {
    "id": 67,
    "title": "안심하고 읽는 94가지 이야기",
    "description": "https://www.yes24.com/product/goods/123253561",
    "category": "기타",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/145bc9120c6baebfabcf02ca322114e3/________94______________5______________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 68,
    "title": "에듀테크 및 AI 활용 공개 수업 지도안",
    "description": "에듀테크 및 AI를 활용한 공개 수업 지도안 모음입니다. 한글 파일이 필요하신 경우 따로 연락주세요^^",
    "category": "AI활용",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d9ba04722c249fe77e1e385a3a8a9a2b/____________.zip",
    "fileType": "zip"
  },
  {
    "id": 69,
    "title": "아무도 모르는 5학년의 속마음",
    "description": "https://www.yes24.com/product/goods/134023092",
    "category": "기타",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/60e0fc021d094808fee7e4ec184e07fb/________5_______.hwp",
    "fileType": "hwp"
  },
  {
    "id": 70,
    "title": "3~4학년군 성취기준(한글 파일)",
    "description": "3~4학년군 성취기준(한글 파일) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/6a75d21f9b7a606c55fa9edf3a797eca/2022__________________3_4____.hwp",
    "fileType": "hwp"
  },
  {
    "id": 71,
    "title": "교육과정 총론",
    "description": "교육과정 총론 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/f5bf43b9ef4bb88ad85862d3d71ffb17/___1_______________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 72,
    "title": "강의 사용 글꼴",
    "description": "압축 풀고 설치 후 사용",
    "category": "기타",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/bdc853987f21d57b8af70263070311c7/__.zip",
    "fileType": "zip"
  },
  {
    "id": 73,
    "title": "해를 담은 아이",
    "description": "https://www.yes24.com/product/goods/140283591",
    "category": "기타",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/bbdd9051941d3580df25f9ca84b8dd9a/_____________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 74,
    "title": "5~6학년군 성취기준(한글 파일)",
    "description": "5~6학년군 성취기준(한글 파일) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/78d7bd58019810e820ae1f74cea3930e/2022__________________5_6____.hwp",
    "fileType": "hwp"
  },
  {
    "id": 75,
    "title": "2022 개정 교육과정 반영 국어 수업 설계",
    "description": "2022 개정 교육과정 반영 국어 수업 설계 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/cf6e7c25dbd78a3ded97186dd3c96744/2022_________________________________.pptx",
    "fileType": "pptx"
  },
  {
    "id": 76,
    "title": "범교과 주제 적용 자료",
    "description": "범교과 주제 적용 자료 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/c8d8e1285980669be369bf1268c45438/2022________________________m.hwp",
    "fileType": "hwp"
  },
  {
    "id": 77,
    "title": "AI와 함께 그린 꿈의 조각",
    "description": "https://www.yes24.com/product/goods/138744485",
    "category": "AI활용",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/dbde9922b83a4dec98ffc85b5c1c1f8a/AI__________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 78,
    "title": "학습자 주도성 함양을 위한 교수학습설계 방안",
    "description": "학습자 주도성 함양을 위한 교수학습설계 방안 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9f56b880faf2bca7b6df5664d3308e43/________________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 79,
    "title": "부크크 원고 서식 모음",
    "description": "부크크 원고 서식 모음 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/97c97d8eb2a3e036ab666e0fa178a59b/____________.zip",
    "fileType": "zip"
  },
  {
    "id": 80,
    "title": "학습자 주도성 함양을 위한 미래 학습 전략",
    "description": "학습자 주도성 함양을 위한 미래 학습 전략 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/4e7184a85a5d53b960c90716b23221f8/____________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 81,
    "title": "학교 자율시간 설계 관련",
    "description": "학교 자율시간 설계 관련 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/bab87ec88c135c676acf329e8da0eb74/_______________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 82,
    "title": "뤼튼",
    "description": "무료, 학생 교사 모두에게 큰 도움이 됨. 웬만한 것은 다 할 수 있음.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://wrtn.ai/"
  },
  {
    "id": 83,
    "title": "캔바",
    "description": "캔바 교육용 인증 필수 1. 구글로 로그인하기 2. 설정 -&gt; 요금제 -&gt; 교육용 3. 선생님 \"인증받기\"(교사재직증명서 필요-정부24) 4. 인증 승인에 1일 정도 소요됨",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://www.canva.com/ko_kr/"
  },
  {
    "id": 84,
    "title": "미리캔버스",
    "description": "전남 메타스쿨을 활용하면 프로 기능 무료로 사용 가능함. AI 기술을 활용하여 10초만에 최대 7장의 PPT를 제작 가능함.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://www.miricanvas.com/"
  },
  {
    "id": 85,
    "title": "투닝",
    "description": "만화, 웹툰 그림 보조 도우미. 미술 수업과 융합 수업에 활용 가능성이 높음. 프로 기능은 교사만 활용 가능.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://tooning.io/"
  },
  {
    "id": 86,
    "title": "레서",
    "description": "전라남도 선생님들은 공문을 통해 신청하면 1년간 무료로 사용할 수 있음. 가장 교육과정과 연계성이 높은 국어 수업 보조 AI임.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://www.lesser.school/"
  },
  {
    "id": 87,
    "title": "LEWIS AI",
    "description": "수업 보다는 소설 창작 경험을 재미로 하고 싶을 때 일회성으로 활용할 수 있는 플랫폼.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://lewis.keytalkai.com/ko"
  },
  {
    "id": 88,
    "title": "Notebook LM",
    "description": "PDF 파일 업로드 시 자동으로 내용 요약 및 질문 생성 AI 플랫폼",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://notebooklm.google/"
  },
  {
    "id": 89,
    "title": "숏. 한국",
    "description": "URL 주소 단축, 회원가입 후 로그인 하면 무제한 생성 가능(주소 영구 보존, 무료)",
    "category": "기타",
    "date": "2026-08-05",
    "link": "https://숏.한국"
  },
  {
    "id": 90,
    "title": "크리드",
    "description": "작성한 글을 분석해주는 AI 플랫폼",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://www.kread.ai/kread/experience"
  },
  {
    "id": 91,
    "title": "냅킨 AI",
    "description": "줄글로 작성한 글을 AI 기능을 활용하여 자동으로 이미지화 해주는 사이트. 발표 수업 때 유용하게 사용 가능.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://www.napkin.ai/"
  },
  {
    "id": 92,
    "title": "수노(Suno)",
    "description": "AI 음악 제작 사이트",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://suno.com/"
  },
  {
    "id": 93,
    "title": "감마(Gamma)",
    "description": "자동 PPT 제작 AI 사이트. 10초면 원하는 PPT를 생성할 수 있음.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://gamma.app/"
  },
  {
    "id": 94,
    "title": "브루(VREW)",
    "description": "영상 편집 사이트. AI 기술을 활용하여 5분만에 2시간 분량의 영상을 편집할 수 있음.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://vrew.ai/ko/"
  },
  {
    "id": 95,
    "title": "POE",
    "description": "여행가이드 봇 https://poe.com/BotGuide2 기행문 점검 봇 https://poe.com/Travel_essayBot 수업안 작성 https://poe.com/LessonMaker2 역할극 대본 https://poe.com/StoryTimeMake...",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://poe.com/login"
  },
  {
    "id": 96,
    "title": "릴리스 AI",
    "description": "https://lilys.ai/ko/ 영상, 음성, PDF 등을 요약해주는 AI 플랫폼",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://lilys.ai/ko/"
  },
  {
    "id": 97,
    "title": "Felo AI",
    "description": "자동 마인드 맵 생성, PPT 생성 AI 플랫폼",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://felo.ai/ko/search"
  },
  {
    "id": 98,
    "title": "3학년 곱셈 수업 사례",
    "description": "수업 영상 링크: https://mpbs.es.jne.kr/mpbs_es/na/ntt/selectNttInfo.do?mi=114439&bbsId=114439&nttSn=1800213687",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4188629691/375f2f610bb5129aac989de5e6e30b59/24_________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 99,
    "title": "3학년 나눗셈 수업 사례",
    "description": "3학년 나눗셈 수업 사례 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4188629691/ec9bd2bc7727739f61c180b20066b34f/2024__________1__________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 100,
    "title": "3학년 2학기 수학 교과서 (천재 박만구)",
    "description": "3학년 2학기 수학 교과서 (천재 박만구) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4189075571/49073fbbf84f7b113726badac8b847b8/____3_2_________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 101,
    "title": "3학년 1학기 사회 교과서(천재 김정인)",
    "description": "3학년 1학기 사회 교과서(천재 김정인) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4189075571/8f8ab888ed46d3b7cb4708148019a6f2/____3_1_________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 102,
    "title": "학생 주도성 키움 수업을 위한 에듀테크 활용 방안",
    "description": "학생 주도성 키움 수업을 위한 에듀테크 활용 방안 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/2025-7picscpatfa5b2zk"
  },
  {
    "id": 103,
    "title": "독서인문교육의 모든 것",
    "description": "독서인문교육의 모든 것 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/2025-bv8b2q8avfzxcesx"
  },
  {
    "id": 104,
    "title": "깊이 있는 학습을 위한 수업과 평가 설계",
    "description": "깊이 있는 학습을 위한 수업과 평가 설계 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/2025-7hhpa6pwjxgik6mp"
  },
  {
    "id": 105,
    "title": "초등교원의 AI디지털교과서 활용 수업",
    "description": "초등교원의 AI디지털교과서 활용 수업 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/2025-ai-_-4azexnwd73y00j2"
  },
  {
    "id": 106,
    "title": "학생 작가 워크북 제작의 실제",
    "description": "학생 작가 워크북 제작의 실제 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/5-26-dzxq76ve7xrplgnh"
  },
  {
    "id": 107,
    "title": "비틀리",
    "description": "URL 주소를 줄여주고 내 마음대로 주소 설정 가능",
    "category": "기타",
    "date": "2026-08-05",
    "link": "https://app.bitly.com/bbt2/"
  },
  {
    "id": 108,
    "title": "에듀테크 도서관",
    "description": "현존하는 대부분의 에듀테크가 한 곳에 모여있습니다!",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://padlet.com/simya94/padlet-itsjf6rsbpyom635"
  },
  {
    "id": 109,
    "title": "작성 예시) 김희엽",
    "description": "에듀테크: 자작자작 5학년 1학기 국어 기행문 쓰기 단원을 자작자작을 활용하여 기행문을 익명으로 작성하고, 댓글과 공감 버튼으로 동료 평가, AI 피드백 기능으로 맞춤형 피드백을 제공할 수 있다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3755127720"
  },
  {
    "id": 110,
    "title": "사후 설문(김희엽)",
    "description": "https://m.site.naver.com/2dRVM",
    "category": "기타",
    "date": "2026-08-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/eadb25cd5125fa8deec01221130ce127/2dRVM.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/eadb25cd5125fa8deec01221130ce127/2dRVM.jpg"
  },
  {
    "id": 111,
    "title": "6학년 문학 수업 사례",
    "description": "6학년 문학 수업 사례 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/4191065690/9574be633b518519b98e44aeb6ecc37a/25__0__________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 112,
    "title": "★우리아이AI",
    "description": "초등학생도 보호자 동의없이 사용할 수 있는 생성형 AI, 회원가입과 로그인도 필요없이 바로 사용할 수 있음.",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://wooriai.use.go.kr/#infomation"
  },
  {
    "id": 113,
    "title": "끄적끄적 아지트",
    "description": "현직 초등교사 개발, 글쓰기 플랫폼, 레벨업이나 몹 키우기 같은 RPG적인 요소가 있어서 학생들이 흥미롭게 참여할 수 있음. 작성한 글을 엮어서 책으로 쉽게 출판할 수 있음.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://xn--vz0ba242ncqcba79xhwx.site/"
  },
  {
    "id": 114,
    "title": "이민석",
    "description": "에듀태크:미리캔버스 저,중학년보다는 고학년 학생들에게 적합 1. 담임 과학 시간에 안전교육을 실시할 때 포스터를 그려보게 하는 것 뿐만 아니라 미리캔버스로 과학 실험 안전 수칙을 만들어보고 꾸며보게 한다 수학 수업에서 단원이 끝나거나 학기 말에 핵심 수학 개념과 ...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999126702"
  },
  {
    "id": 115,
    "title": "목포상동초 정민주",
    "description": "에듀테크 : 자작자작 학교 문집 만들기 프로젝트를 매년 진행하는데, 이때 자작자작 프로그램을 활용하여 1학기부터 꾸준히 글을 쓰고 고치고 공유하는 연습을 하여 2학기 때 각 학급의 글을 모아 학교 문집을 만들면 좋을 것 같다. 문집으로 제작한 후 함께 읽으면서 가...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999127396"
  },
  {
    "id": 116,
    "title": "이다윤",
    "description": "에듀테크: 크리드 크리드는 학생의 글을 빠르게 분석하여 글의 구조, 표현, 맞춤법 등을 확인하고 맞춤형 피드백을 제공하는 데 도움이 됩니다. 특히 초등학교 4학년 국어 '경험을 글로 표현하기', '생각과 느낌을 글로 표현하기'와 같은 쓰기 활동에서 학생들이 자신의...",
    "category": "AI활용",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999128671"
  },
  {
    "id": 117,
    "title": "전현경",
    "description": "에듀테크: 자작자작, 끄적끄적 아지트 중학년은 아지트, 고학년은 자작자작을 사용해서 글짓기 수업을 해보고 싶다. 하나의 글이나 시를 완성하고, 자신과 친구들의 지속적인 피드백을 거쳐 4~5회차동안 발전시킨 후, 처음의 초안과 비교하는 프로젝트 수업을 진행해보고싶다...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999129471"
  },
  {
    "id": 118,
    "title": "광양동초 이다연",
    "description": "에듀테크: 부크크 아침시간을 활용하여 주제쓰기를 하곤 한다. 또, 체험학습이나 공연 관람 후에는 소감을 쓰도록 하고 있다. 이렇게 모인 토막글을 부크크로 묶어 학급 문집을 만들 수 있다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999129878"
  },
  {
    "id": 119,
    "title": "이소연",
    "description": "에듀테크: 패들렛 아케이드 5학년 1학기 사회 독도 단원을 패들렛 아케이드 게임을 활용하여 되돌아볼 수 있다. 또한, 5학년 2학기 사회 역사 부분의 큰 흐름을 패들렛 아케이드 게임을 활용하여 살펴볼 수 있다.",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999130242"
  },
  {
    "id": 120,
    "title": "이정운",
    "description": "3학년 1학기 과학, 식물의 생활단원을 패들렛 아케이드를 통해 학습한다면 게임형 학습이므로 흥미를 유발할 수 있고 단조로울 수 있는 식물 명칭이나 개념 학습을 퀴즈, 맞추기, 분류 게임 형태로 진행하여 3학년 학생들의 자발적 참여를 이끌어낼 수 있다. 또한, 단원...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999130786"
  },
  {
    "id": 121,
    "title": "이진아",
    "description": "에듀테크: 자작자작 5학년 1학기 사회 3단원 법과 도덕의 차이를 생각하고 법에 대한 개념을 학습하는 차시에서 해당 에듀테크를 활용할 수 있다. 우선 글쓰기 단계에서 글자수 조건을 제공하여 교사가 제공한 일상생활 속 사례를 보고 법과 도덕에 해다하는 이유를 스스로...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999131413"
  },
  {
    "id": 122,
    "title": "이창헌",
    "description": "에듀테크: 패들렛 아케이드 학년 과목을 설정하면 그에 맞는 다양한 게임 활동이 나온다. 아이들의 복습이나 동기 유발에 활용하기 좋은 활동이 많이 있어 정말 유용하게 활용할 수 있을 것 같다. 에듀테크: 자작자작 아이들이 글을 쓰는 경험을 많이 만들어주어 머릿속에 ...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999132081"
  },
  {
    "id": 123,
    "title": "목포서산초 이효경",
    "description": "에듀테크: 부크크 부크크로 학생들이 교과 학습 결과물을 한 권의 책으로 제작하여 출판하는 프로젝트 학습에 활용할 수 있을 것 같다. 국어에서는 동화 쓰기와 시집 만들기, 사회에서는 우리 지역 소개책 제작, 과학에서는 탐구 보고서 작성, 미술에서는 그림책 만들기 등...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999132945"
  },
  {
    "id": 124,
    "title": "이한영",
    "description": "에듀테크: 블루캣(Blooket) 수업이 끝나거나 단원이 끝난 후 학생의 이해도에 대한 평가를 할 때 사용하면 좋을 것 같다. 다양한 게임 종류가 있어 학생들이 더 흥미를 가지고 참여할 수 있을 것 같다. 비슷하게 퀴즈앤을 활용한 적이 있는데 그보다 더 많은 종류...",
    "category": "에듀테크",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999133212"
  },
  {
    "id": 125,
    "title": "윤나영",
    "description": "에듀테크: 끄적끄적 아지트 자작자작과 비슷하게 학생들의 글쓰기 능력 향상을 목적으로 사용할 수 있으며,글쓰기 후 지급되는 포인트와 온도계 시스템이 있어 학급 보상 시스템과 연결짓기 좋다. 학급 특색 활동으로 글쓰기를 사용하기에 편리하다. 징검다리 질문을 생성할 수...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999133357"
  },
  {
    "id": 126,
    "title": "이하림",
    "description": "자작자작 - 6학년 사춘기 학생들을 대상으로 자기 이야기를 써볼 수 있는 좋은 에듀테크 - 일기쓰기를 좋아하는 우리반. 자기 이야기를 일기로나마 풀어내는 우리반에게 가장 필요한 에듀테크이지 않을까. - 글쓰기 활동을 진지하고 적극적으로 하는 우리반에게 더 재밌고 ...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999134806"
  },
  {
    "id": 127,
    "title": "임윤진",
    "description": "에듀테크: 숏. 한국 과학 수업에서 실생활 예시를 찾아보는 조사 활동을 할 때, 사이트를 지정해주는 경우가 있다. 이때 숏. 한국을 사용한다면 간단한 URL 주소를 학생들에게 제공해줄 수 있을 것 같다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999134829"
  },
  {
    "id": 128,
    "title": "윤신영",
    "description": "에듀테크: 레서 5학년 학교자율시간인 '독서' 시간에서 독해력 검사와 도늘의 단어 퀴즈를 사용해 볼 수 있다. AI 가 비문학별 가장 많이 틀린 문제를 분석해 전체 공유하고 온라인으로 학생에게 개별 피드백지를 분석해주어 맞춤형 피드백을 제공할 수 있다.",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999135178"
  },
  {
    "id": 129,
    "title": "남악초 이시온",
    "description": "사용해본 에듀테크: 자작자작, 부크크 6학년 국어를 가르치며 가장 힘들었던 영역은 쓰기 영역이었다. 학생마다 수준 편차가 심하기도 하고, 교사가 일일이 피드백을 주기에 시간이 많이 소요되어 지도 방식에 관해 고민이 많았다. 그런데 자작자작을 사용해보니 학생들에게 ...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999135544"
  },
  {
    "id": 130,
    "title": "장시은",
    "description": "에듀테크:POE 과학 교과를 보면 각 단원마다 조사하는 차시가 정말 많다. 처음에는 학생들에게 무작정 찾아보라고 했지만 모두 헤매는 모습을 보고 AI를 활용하여 조사하는 것이 최선이라고 생각했다. 이 에듀테크를 통해 질문하는 방법도 배우고, AI가 알려준 답을 정...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999137185"
  },
  {
    "id": 131,
    "title": "인슬기",
    "description": "에듀테크: 자작자작 4학년 국어 프로젝트 활동으로 학급 시집 발행 예정. 4학년 1학기 원인과 결과 나타내기, 비유적 표현 등을 활용하여 개인의 경험을 바탕으로 작성한 시를 모을 것. 댓글과 공감 버튼으로 서로의 글감을 확인하고, 동료 피드백을 제공할 수 있다. ...",
    "category": "독서인문",
    "date": "2026-08-05",
    "link": "https://padlet.com/gmlduqzhd12/g1lklclbxwve0dgg/wish/3999140328"
  },
  {
    "id": 132,
    "title": "URL 단축 사이트",
    "description": "URL 단축 사이트 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://숏.한국"
  },
  {
    "id": 133,
    "title": "그리기 기능",
    "description": "그리기 기능 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b2bb390f8d73a6375ce489706926d377/drawing.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b2bb390f8d73a6375ce489706926d377/drawing.png"
  },
  {
    "id": 134,
    "title": "AI 그리기 기능",
    "description": "AI 그리기 기능 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-02-05",
    "thumbnail": "https://genai-public.padletcdn.com/disco/prod/imagen/1768830420168/sample_0.png",
    "link": "https://genai-public.padletcdn.com/disco/prod/imagen/1768830420168/sample_0.png"
  },
  {
    "id": 135,
    "title": "Padlet",
    "description": "Padlet 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/"
  },
  {
    "id": 136,
    "title": "워크시트",
    "description": "4학년 분수의 덧셈과 뺄셈",
    "category": "독서인문",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/3752c8104ff7f64ec5ec07970026dd2f/___TA_______.pdf",
    "fileType": "pdf"
  },
  {
    "id": 137,
    "title": "색칠공부 도안",
    "description": "색칠공부 도안 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/e1bc9bd3817de3da8dc28c120ab84ced/___TA_______.pdf",
    "fileType": "pdf"
  },
  {
    "id": 138,
    "title": "Youtube",
    "description": "Youtube 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://www.youtube.com/"
  },
  {
    "id": 139,
    "title": "연수 과정 안내",
    "description": "연수 과정 안내 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/985bec23dcfc183555cefab9da46daae/2026__AI_____________________________.hwp",
    "fileType": "hwp"
  },
  {
    "id": 140,
    "title": "전체 연수 안내 패들렛",
    "description": "전체 연수 안내 패들렛 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/jetida/ai-e15wak1ba2a0zhk2"
  },
  {
    "id": 141,
    "title": "오후 연수 패들렛(수업 설계)",
    "description": "오후 연수 패들렛(수업 설계) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/teachjunghyun/2026-ai-1-4ec483t51wzdc7f3"
  },
  {
    "id": 142,
    "title": "사다리게임",
    "description": "사다리게임 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://lazygyu.github.io/roulette/"
  },
  {
    "id": 143,
    "title": "메모리 타일",
    "description": "메모리 타일 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/memory-tiles/zqrv2wObr1/play"
  },
  {
    "id": 144,
    "title": "플래시카드",
    "description": "플래시카드 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/flashcards/mVraVb6Vj1/play"
  },
  {
    "id": 145,
    "title": "초등아이스크림",
    "description": "초등아이스크림 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://www.i-scream.co.kr/user/main/MainPage.do"
  },
  {
    "id": 146,
    "title": "매칭",
    "description": "매칭 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/matching/zVKZg3qlrm/play"
  },
  {
    "id": 147,
    "title": "객관식",
    "description": "객관식 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/multiple-choice/3ZjOgAxEjO/play"
  },
  {
    "id": 148,
    "title": "빈칸 채우기",
    "description": "빈칸 채우기 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/fill-in-the-blank/e8jYgBg2KA/play"
  },
  {
    "id": 149,
    "title": "정렬",
    "description": "정렬 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/sorting/60Km419Wp7/play"
  },
  {
    "id": 150,
    "title": "순서 정하기",
    "description": "순서 정하기 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/sequencing/9LKlmlg0rD/play"
  },
  {
    "id": 151,
    "title": "읽기 지문",
    "description": "4학년 물질의 상태와 변화",
    "category": "기타",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/84f0395e38b7a2373d128d7ceb117e4d/___TA__________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 152,
    "title": "트레이싱 시트",
    "description": "만다라 따라 그리기",
    "category": "독서인문",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/95e84dd165069ec28c61a8c387543ed4/___TA_________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 153,
    "title": "수업 설계",
    "description": "4학년 사회 수업 설계, 추가 프롬프트로 '패들렛 TA의 여러 기능을 활용할 수 있도록 계획'해줄 것을 입력한 결과",
    "category": "AI활용",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/lesson-plan/Vxjd8OJajD"
  },
  {
    "id": 154,
    "title": "멀티미디어 프레젠테이션",
    "description": "4학년 도덕 디지털 예절",
    "category": "기타",
    "date": "2026-02-05",
    "link": "https://docs.google.com/presentation/d/1azwqpA3n2cmyW79w3-lTnGigNg7QjG3LJ0Ll8sASk3U/edit?usp=sharing"
  },
  {
    "id": 155,
    "title": "수업 활동 아이디어",
    "description": "수업 활동 아이디어 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/class-activities/ZRKMgbx5jA"
  },
  {
    "id": 156,
    "title": "2022개정 교육과정 성취기준",
    "description": "2022개정 교육과정 성취기준 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://moduai.notion.site/2022-47cb6c83366e4458ac90d2a061f23621?source=copy_link"
  },
  {
    "id": 157,
    "title": "ChatGPT 수업설계 도우미",
    "description": "ChatGPT 수업설계 도우미 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-02-05",
    "link": "https://chatgpt.com/g/g-S0sHqcIV0-d2-sueobseolgyeguseong-doumi"
  },
  {
    "id": 158,
    "title": "기준표",
    "description": "기준표 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/rubric/3ZjOgDOZjO"
  },
  {
    "id": 159,
    "title": "텍스트 난이도 조정기",
    "description": "뉴스 기사의 문장들을 4학년 수준으로 변경",
    "category": "기타",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/text-leveler/ZbKRd7mPjy"
  },
  {
    "id": 160,
    "title": "설문조사 기능",
    "description": "설문조사 기능 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964455"
  },
  {
    "id": 161,
    "title": "지도 기능",
    "description": "지도 기능 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://google-maps-static-proxy-f80f.padlet.workers.dev/?center=Palm+Jumeirah&amp;key=AIzaSyD3kjetwpeAYF-eXThlRhc1F1EYwsQvHcY&amp;size=640x480&amp;scale=2&amp;maptype=hybrid&amp;language=ko&amp;region=KR&amp;markers="
  },
  {
    "id": 162,
    "title": "사진 앨범 기능",
    "description": "사진 앨범 기능 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/fc2ec35cbd79490816c836ecdf4b152c/KakaoTalk_20250811_031512279.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/fc2ec35cbd79490816c836ecdf4b152c/KakaoTalk_20250811_031512279.jpg"
  },
  {
    "id": 163,
    "title": "AI 음성 기능",
    "description": "AI 음성 기능 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-02-05",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/4219554270/5435a61de54be61be4af20ef4dcf3af1/175336a8_0cec_4947_9fdf_b3d7f793ad2f.mp3"
  },
  {
    "id": 164,
    "title": "샌드박스 기능",
    "description": "샌드박스 기능 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/padlets/qqj7woav70d0tjqz"
  },
  {
    "id": 165,
    "title": "캔바 교안(기본)",
    "description": "캔바 교안(기본) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/f5094b1df36882270db3127b147e2de6/4_____70___________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 166,
    "title": "캔바 교안(수업사례)",
    "description": "캔바 교안(수업사례) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/f2f7313f7ff3749804e6ad4f97563d04/3______________24_____.pdf",
    "fileType": "pdf"
  },
  {
    "id": 167,
    "title": "패들렛 교안(TA 포함)",
    "description": "패들렛 교안(TA 포함) 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/4b2541a8e7990d1d821cc3a7b3841ca8/26_2_3__AI___________________________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 168,
    "title": "Padlet TA",
    "description": "Padlet TA 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2026-02-05",
    "link": "https://ta.padlet.com/"
  },
  {
    "id": 169,
    "title": "패들렛 유료 계정",
    "description": "패들렛 유료 계정 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/jetida/student/2wZKjXd6iRdhsYah"
  },
  {
    "id": 170,
    "title": "연수일정 및 장소 2기",
    "description": "연수일정 및 장소 2기 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b6758ddf23cc371ba2b4c9fde7fa2bda/2_.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/b6758ddf23cc371ba2b4c9fde7fa2bda/2_.png"
  },
  {
    "id": 171,
    "title": "강의 원고",
    "description": "강의 원고 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://www.canva.com/design/DAHATnWxynM/6sGD30My6vm35asakuXXRA/edit?ui=eyJBIjp7fX0"
  },
  {
    "id": 172,
    "title": "블루킷(Blooket)",
    "description": "블루킷(Blooket) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://dashboard.blooket.com/my-sets"
  },
  {
    "id": 173,
    "title": "4학년 미술",
    "description": "4학년 미술 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/hallyoes/padlet-6yyu009vtjcd5pvu"
  },
  {
    "id": 174,
    "title": "나만의 음악 만들기",
    "description": "나만의 음악 만들기 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/hallyoes/singscape-964kl9mbc7bs4ivl"
  },
  {
    "id": 175,
    "title": "5학년 음악",
    "description": "우아한 서양 관악기",
    "category": "기타",
    "date": "2026-02-05",
    "link": "https://www.canva.com/design/DAG6aArg6YU/spHiX-EVoW-XZOPiH-4tmQ/edit"
  },
  {
    "id": 176,
    "title": "1학년 국어",
    "description": "1학년 국어 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "link": "https://padlet.com/hallyoes/1-1-2d8nr25dwc9rqm7"
  },
  {
    "id": 177,
    "title": "가져가세요",
    "description": "가져가세요 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-02-05",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/9d0d43822d0836af57816c9c50550f1b/2026__AI__________________2026__02__05____________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 178,
    "title": "패들렛 TA",
    "description": "교사 인증 후 무료로 모든 기능 사용 가능함. QR 코드 생성, URL 단축, 수업 설계, 퀴즈 등 오직 선생님을 위한 다양한 기능을 업데이트 하고 있음.",
    "category": "AI활용",
    "date": "2026-01-20",
    "link": "https://ta.padlet.com/?utm_source=padlet_com_production&amp;utm_medium=padlet_com_app_nav_dashboard&amp;utm_campaign=promote_ta_on_padlet_app&amp;utm_content=padlet_com_nav_desktop&amp;logged_in=true"
  },
  {
    "id": 179,
    "title": "사전 설문(김희엽)",
    "description": "https://b.tkbell.co.kr/tkboard/woi/1157090/moD1Ozem70.do?pageSeq=1888715",
    "category": "기타",
    "date": "2026-01-20",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/72fd57228364d315b9a77fd0bfe46019/qr.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/72fd57228364d315b9a77fd0bfe46019/qr.png"
  },
  {
    "id": 180,
    "title": "우리아이AI",
    "description": "초등학생도 보호자 동의없이 사용할 수 있는 생성형 AI, 회원가입과 로그인도 필요없이 바로 사용할 수 있음.",
    "category": "AI활용",
    "date": "2026-01-20",
    "link": "https://wooriai.use.go.kr/#infomation"
  },
  {
    "id": 181,
    "title": "예시) 김희엽",
    "description": "에듀테크: 자작자작 5학년 1학기 국어 기행문 쓰기 단원을 자작자작을 활용하여 기행문을 익명으로 작성하고, 댓글과 공감 버튼으로 동료 평가, AI 피드백 기능으로 맞춤형 피드백을 제공할 수 있다.",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975107"
  },
  {
    "id": 182,
    "title": "실습 링크",
    "description": "실습 링크 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2026-01-20",
    "link": "https://docs.google.com/document/d/1wzC4rOMXJRRHKXXKvYimrPSOecRPDtGLmZAHdKVdJKo/edit?usp=sharing"
  },
  {
    "id": 183,
    "title": "임성은",
    "description": "에듀테크: 트라이디스 다모임 활동을 할 때 학생들이 인증해야 하는 사진이나 영상을 항목별로 수합하기 용이하다. 별도의 가입 없이 각 교실에 비치되어 있는 태블릿을 활용하여 접속할 수 있다.",
    "category": "에듀테크",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975119"
  },
  {
    "id": 184,
    "title": "이훈민",
    "description": "에듀테크: 우리아이 Ai, 블루켓 6학년 1학기 국어 시간 &lt;정조 화성&gt; 관련된 글을 읽고, 우리아이 Ai를 이용하여 학생들이 궁금하거나 더 알고싶은 내용을 ‘정조와의 대화‘를 통해 알아봅니다. 이와 관련된 정보들을 충분히 숙지한 후 차시 마무리 활동으...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975120"
  },
  {
    "id": 185,
    "title": "이주헌",
    "description": "에듀테크: 블루캣 6학년 1학기 사회 경제 단원을 어려워하는 학생들을 위해 퀴즈형 게임으로 조금 더 쉽게 경제 단원에 접근할 수 있도록 활용할 수 있을 것 같습니다. 에듀테크: 수노 6학년 1학기 음악 뮤직비디오 만들기 수행평가 시 학생들이 수노를 활용하여 직접 ...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975121"
  },
  {
    "id": 186,
    "title": "이가은",
    "description": "에듀테크: 냅킨AI 6학년 1학기 국어 자료를 활용한 발표 수업에서 학생들이 자신이 작성한 발표 대본을 바탕으로 이미지를 생성하여 효과적으로 발표할 수 있다.",
    "category": "AI활용",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975123"
  },
  {
    "id": 187,
    "title": "이고훈",
    "description": "에듀테크: 키위런 국어 시간에 글쓰기 활동을 하면 적극적으로 참여하지만, 맞춤법을 일일이 교정해주기 어려웠는데 AI 피드백을 통해 간편하게 교정할 수 있다. 또한, 서로의 글을 쉽게 공유할 수 있고 평가에 용이할 것 같다.",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975125"
  },
  {
    "id": 188,
    "title": "유빈",
    "description": "에듀테크 : 캔바, chat gpt 6학년 1학기 국어 속담 단원을 캔바를 이용하여 속담을 사용하는 상황에 맞는 AI 네컷 그림 그리기, 속담을 사용한 학급 신문 만들기 활동을 진행할 수 있다. 캔바 교육용 계정을 활용하면 ppt 뿐만 아니라 영상까지 제작이 가능...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975128"
  },
  {
    "id": 189,
    "title": "황수민",
    "description": "에듀테크: 블루캣 전과목 전단원에 활용하기 유용하지만 특히 과학, 영어와 같이 개념과 답이 명확한 과목에서 복습에 유용해 보인다. 매 단원이 끝날 때마다 진행하여 단원 마무리에 활용하고, 학기말에 '3학년 1학기 과학 마무리'와 같은 문제를 만들어 활용한다면 학생...",
    "category": "에듀테크",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975132"
  },
  {
    "id": 190,
    "title": "이의인",
    "description": "에듀테크 : 트라이디스 / 우리아이 ai 6학년 빛의 굴절 실험에서 ar을 이용해서 실험하는 어플이 있습니다. 패들렛을 활용했을 때는 학생들 한명 한명을 체크해야하는 번거로움이 있었는데 트라이디스를 활용하면 한 눈에 과제 달성 목표를 알 수 있어서 좋을 듯 합니다...",
    "category": "AI활용",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975133"
  },
  {
    "id": 191,
    "title": "임현직",
    "description": "에듀테크: 블루캣 3학년 1학기 사회 시간 과거의 모습 학습에서 학생들이 이해하기 쉽지 않은 부분이 많고, 학습에 대한 관심과 흥미를 유발하는 게 어려웠는데, 블루캣을 활용하여 학생들이 게임을 통해 쉽게 흥미를 가지게 하고, 수업이 끝난 후 마무리 활동으로도 활용...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975134"
  },
  {
    "id": 192,
    "title": "이유선",
    "description": "에듀테크: 블루켓 과학 실험이 끝난 후 학생들이 배운 핵심내용을 점검할 때 활용, 혹은 지난 시간 배운 과학 내용을 다시 한 번 복습할 때 활용 에듀테크: 수노 과학 때 배운 내용을 확실히 기억하게 하기 위해 모둠별로 배운 내용을 노래로 만들어 발표하기",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975135"
  },
  {
    "id": 193,
    "title": "이채영",
    "description": "에듀테크: 우리아이AI 글쓰기를 하다 학생들이 맞춤법에 대해 궁금할 때 우리아이AI 초등학생을 위한 맞춤법 교육프로그램으로 궁금증을 해소할 수 있다. 또한, 상황에 맞는 속담을 바로 찾을 수 있는 기능도 있어 학생들에게 어렵게 느껴지던 속담도 쉽고 재미있게 학습할...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975137"
  },
  {
    "id": 194,
    "title": "최혜원",
    "description": "에듀테크: 우리아이ai 2학년 1학기 통합 인물에듀테크: 우리아이ai 2학년 1학기 통합 인물 단원에서 우리아이ai의 '세종대왕과의 대화' 기능을 활용하여 옛인물의 생각을 인터뷰 하듯이 알아보며 아이들의 흥미를 이끌어낼 수 있다.",
    "category": "AI활용",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975138"
  },
  {
    "id": 195,
    "title": "우현태",
    "description": "에듀테크 : 우리아이AI(뤼튼)&라이팅젤 과학 수업 중 학생들이 실험관찰에 있는 과학 글쓰기란을 비워두는 경우가 많습니다. 우리아이AI(뤼튼)을 통해 궁금한 점을 질문하고 탐색하며, 그 내용을 라이팅젤의 도움을 받아 정리하고 적으면 좋겠습니다.",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975140"
  },
  {
    "id": 196,
    "title": "오시원",
    "description": "에듀테크 : 냅킨 AI 6학년 2학기 사회 : 지구촌 문제를 해결하기 위한 노력을 발표할 때 자료를 빠르고 쉽게 만들 수 있다. 또한 국어 6단원 [효과적으로 발표해요]단원에서 매체 활용 발표 차시와 연계하여 수업할 수 있다. 에듀테크 : 브루 6학년 2학기 국어...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975142"
  },
  {
    "id": 197,
    "title": "최윤환",
    "description": "자작자작 5학년 1학기 국어 교과의 절반 이상은 글쓰기와 관련한 수업이다. 아이들이 글쓰기를 할 때 고민이 되는 부분들은 1. 글쓰기를 성의없이 하는 아이들 2. 완성된 글쓰기를 하기 전까지의 교정 과정 3. 글쓰기 후의 공유 과정이 있다. 이러한 부분을 1. 글...",
    "category": "독서인문",
    "date": "2026-01-20",
    "link": "https://padlet.com/gmlduqzhd12/jf0h4y6gp8ryzmv5/wish/3727975143"
  },
  {
    "id": 198,
    "title": "실습 링크(시간이 남으면 진행)",
    "description": "실습 링크(시간이 남으면 진행) 연수 및 교육과정 자료입니다.",
    "category": "독서인문",
    "date": "2025-08-06",
    "link": "https://docs.google.com/document/d/1wzC4rOMXJRRHKXXKvYimrPSOecRPDtGLmZAHdKVdJKo/edit?usp=sharing"
  },
  {
    "id": 199,
    "title": "강의 교안(김나래)",
    "description": "강의 교안(김나래) 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-08-06",
    "link": "https://www.miricanvas.com/v/14y2k2b"
  },
  {
    "id": 200,
    "title": "사후 설문(김나래)",
    "description": "https://naver.me/xGFKcvSS",
    "category": "기타",
    "date": "2025-08-06",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/4191065690/09a4b500467abda5419c85d64a478ce9/image.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/4191065690/09a4b500467abda5419c85d64a478ce9/image.png"
  },
  {
    "id": 201,
    "title": "PPT 활용 사진 원본",
    "description": "PPT 활용 사진 원본 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/be07692c9af9d4438adbc877162a93fc/PPT_________.zip",
    "fileType": "zip"
  },
  {
    "id": 202,
    "title": "디지털원패스",
    "description": "디지털원패스 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "link": "https://edupass.neisplus.kr/nxuiPtl/index.html"
  },
  {
    "id": 203,
    "title": "AI디지털교과서 교원 연수 포털",
    "description": "AI디지털교과서 교원 연수 포털 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2025-07-28",
    "link": "https://edu.aidtbook.kr/edu/"
  },
  {
    "id": 204,
    "title": "2022 개정교육과정 성취기준",
    "description": "성취 기준 검색 가능한 웹페이지 입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "link": "https://moduai.notion.site/2022-47cb6c83366e4458ac90d2a061f23621?source=copy_link"
  },
  {
    "id": 205,
    "title": "수업설계도우미 GPTs",
    "description": "GPTs의 도움을 받아 수업을 설계해보세요.",
    "category": "AI활용",
    "date": "2025-07-28",
    "link": "https://chatgpt.com/g/g-S0sHqcIV0-d2-sueobseolgyeguseong-doumi"
  },
  {
    "id": 206,
    "title": "평가 도구 개발 실습 도우미 GPTS",
    "description": "평가 도구 개발 실습 도우미 GPTS 연수 및 교육과정 자료입니다.",
    "category": "AI활용",
    "date": "2025-07-28",
    "link": "https://chatgpt.com/g/g-7TBkTMCbQ-f2-pyeongga-dogu-gaebal-silseub-doumi"
  },
  {
    "id": 207,
    "title": "패들렛 바로가기",
    "description": "숏.한국/엽쌤스쿨/디지털",
    "category": "에듀테크",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/09cf1b981185f754020a25586010fe18/1LJdX.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/09cf1b981185f754020a25586010fe18/1LJdX.jpg"
  },
  {
    "id": 208,
    "title": "연수 후기",
    "description": "Get gpt, 우리 아이 AI 알았는데 학교에서 아이들과 수업 시간에 활용하면 관심을 가지고 능동적으로 잘 참여할 거 같다. 블루캣 활용, 자작자작 글쓰기 등 흥미로운 내용이 많았다. 잘 활용해봐야겠다.",
    "category": "독서인문",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/ac7b1c403ec973591c6a1cae91346e09/1NcBN.jpg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/ac7b1c403ec973591c6a1cae91346e09/1NcBN.jpg"
  },
  {
    "id": 209,
    "title": "강의 PPT",
    "description": "https://www.canva.com/design/DAGt6ctmqLM/WFajlZWSIZCOcxBEoRhMgw/edit?utm_content=DAGt6ctmqLM&utm_campaign=designshare&utm_medium=link2&utm_source=s...",
    "category": "AI활용",
    "date": "2025-07-28",
    "fileUrl": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/4d412e3f24ef0486a457cceb084e708b/2025_________________________.pdf",
    "fileType": "pdf"
  },
  {
    "id": 210,
    "title": "띵커벨",
    "description": "아이스크림에서 개발한 다용도 디지털 도구 플랫폼, 교사 인증 후 무료로 사용할 수 있으며 퀴즈, 보드, 토의토론, 워크시트, 게임 등 다양한 기능을 보유하고 있음.",
    "category": "독서인문",
    "date": "2025-07-28",
    "link": "https://www.tkbell.co.kr/user/main.do"
  },
  {
    "id": 211,
    "title": "띵커벨(사전설문) 바로가기",
    "description": "https://b.tkbell.co.kr/tkboard/woi/1157090/LdyXj04ejj.do?pageSeq=1883880",
    "category": "기타",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d84d2a8d52cdac108dc350465192f164/______.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/1745856714/d84d2a8d52cdac108dc350465192f164/______.png"
  },
  {
    "id": 212,
    "title": "작성 예시(김희엽)",
    "description": "활용 도구: 우리 아이 AI 우리 아이 AI의 세종대왕과의 대화를 활용하여 우리말의 소중함을 주제로 토론하기",
    "category": "독서인문",
    "date": "2025-07-28",
    "link": "https://padlet.com/gmlduqzhd12/g5gei3haowl2fxrv/wish/3527276847"
  },
  {
    "id": 213,
    "title": "영시갱",
    "description": "1학기 아이들이 자작자작에 쓴 일기내용의 일부를 SUNO를 활용해 곡을 만들어 보았다. 일기 내용에 따라 노래가 다양하게 바뀌는게 신기했다. 다운로드도 가능해 좋은것 같다. 겟GPT를 활용하여 생기부 작성 방법이 간결하면서도 인상 깊었다.",
    "category": "독서인문",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/3630344197/d5f304b2b955090b3562300a4d9a8150/image.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/3630344197/d5f304b2b955090b3562300a4d9a8150/image.png"
  },
  {
    "id": 214,
    "title": "양세린",
    "description": "투닝의 투닝gpt 기능을 이용하여 위인과 대화를 해볼 수 있다. 사회 시간의 역사와 연계하여 그 당시의 역사 상황에 대해 질문하고 상호작용하면서 역사에 대한 이해도를 높일 수 있다./ 에듀테크 도서관의 Semantris를 통해 영어 단어를 연상하면서 게임처럼 자연...",
    "category": "독서인문",
    "date": "2025-07-28",
    "link": "https://padlet.com/gmlduqzhd12/g5gei3haowl2fxrv/wish/3527560495"
  },
  {
    "id": 215,
    "title": "안지영",
    "description": "챗gpt를 이용해서, 34학년 학생들과 노래를 부르는 장면을 이미지화 했다. 그 이후, suno를 통해 이 장면에 대한 노래를 만들도록 했다. 분위기는 따뜻하고 밝았다. 또한, 내가 관심이 있어 곧 받게 될 수업에 대한 설명을 냅킨을 통해 이미지화해봤다.",
    "category": "AI활용",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/4154648554/f48a52993de8a748aeb3801d4329e11d/_____24_7_2025_132614_chatgpt_com.jpeg",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/4154648554/f48a52993de8a748aeb3801d4329e11d/_____24_7_2025_132614_chatgpt_com.jpeg"
  },
  {
    "id": 216,
    "title": "김희연",
    "description": "나도 알지 못해서 선뜻 답변하기 어려운 질문들이 있는데 그런 질문들을 검색해보고 학생들과 함께 살펴보면 좋을 것 같다는 생각이 든다.",
    "category": "기타",
    "date": "2025-07-28",
    "link": "https://padlet.com/gmlduqzhd12/g5gei3haowl2fxrv/wish/3527571394"
  },
  {
    "id": 217,
    "title": "안지영 블루캣",
    "description": "안지영 블루캣 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "link": "https://dashboard.blooket.com/set/6881be46bafdf98f3b0d3a5f"
  },
  {
    "id": 218,
    "title": "아재개그",
    "description": "나도 이제 아조씨",
    "category": "기타",
    "date": "2025-07-28",
    "link": "https://dashboard.blooket.com/set/6881be89a6bcb161fcba780e"
  },
  {
    "id": 219,
    "title": "여름방학 퀴즈",
    "description": "여름방학 퀴즈 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "link": "https://dashboard.blooket.com/set/6881be0bbafdf98f3b0d3a59"
  },
  {
    "id": 220,
    "title": "사자성어, 속담",
    "description": "사자성어, 속담 연수 및 교육과정 자료입니다.",
    "category": "에듀테크",
    "date": "2025-07-28",
    "link": "https://dashboard.blooket.com/my-sets"
  },
  {
    "id": 221,
    "title": "오영식",
    "description": "사회 역사 수업에서 새로운 역사적 상황, 사건들은 모두 이유가 있다. 그 이유를 알기위해서는 다양한 역사적 배경 지식이 필요하다. 이 역사적 궁금증을 우리아이AI가 많은 도움을 줄 수 있을 것 같다. 사회 시간 왜요? 왜요? 하는 우리 아이들의 멋진 선생님이 되어...",
    "category": "독서인문",
    "date": "2025-07-28",
    "thumbnail": "https://padlet-uploads-usc1.storage.googleapis.com/3630344197/cd7f1ea8a6128acd9fc2b53c9edb3d87/image.png",
    "link": "https://padlet-uploads-usc1.storage.googleapis.com/3630344197/cd7f1ea8a6128acd9fc2b53c9edb3d87/image.png"
  },
  {
    "id": 222,
    "title": "우리아이 Ai",
    "description": "통합교과의 다양한 주제에 맞게 가상 인물과의 대화, 우리 고장 여행지 안내장 만들기, 체험 학습 장소 소개하기 등 학생 주도성 키움을 위한 에듀테크 활용 기회가 될 것 같습니다. 학교에서도 더욱 효용성 있는 시간이 될 거라 믿습니다.",
    "category": "독서인문",
    "date": "2025-07-28",
    "link": "https://padlet.com/gmlduqzhd12/g5gei3haowl2fxrv/wish/3527657487"
  },
  {
    "id": 223,
    "title": "유용한 사이트 소개",
    "description": "컴퓨터 파일 쉽게 찾기 https://www.voidtools.com/ko-kr/downloads/",
    "category": "기타",
    "date": "2025-07-28",
    "link": "https://www.voidtools.com/ko-kr/downloads/"
  }
];
