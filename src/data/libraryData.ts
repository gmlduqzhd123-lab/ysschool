// ========== 에듀테크 나눔 서재 데이터 ==========

export interface LibraryItem {
  id: number;
  title: string;
  tool: string;
  toolColor: string;   // 배지 색상 클래스
  content: string;      // 마크다운 형태의 상세 노하우
}

export const libraryData: LibraryItem[] = [
  {
    id: 1,
    tool: 'Antigravity & Cursor AI',
    toolColor: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    title: '프롬프트 몇 줄로 학급용 미니 웹앱 뚝딱 만들기',
    content: `AI 코딩 도구를 활용하면 코딩 경험이 없어도 학급 운영에 유용한 미니 웹앱을 빠르게 만들 수 있습니다.

🎯 핵심 프롬프트 작성법
• "초등학교 교실에서 사용할 랜덤 메뉴 추천기를 만들어줘"처럼 목적과 대상을 명확히 설명하세요.
• "HTML, CSS, JavaScript만 사용해서 하나의 파일로 만들어줘"라고 기술 제약을 걸면 배포가 간편합니다.
• "버튼을 누르면 룰렛이 돌아가는 애니메이션을 넣어줘"처럼 구체적인 동작을 묘사하세요.

💡 실전 팁
• Cursor AI에서는 Cmd+K로 인라인 편집이 가능해 세부 수정이 빠릅니다.
• Antigravity는 대화형으로 진행되므로, 한 번에 다 요청하지 말고 단계별로 기능을 추가하세요.
• 완성된 파일을 학교 NAS나 GitHub Pages에 올리면 학생들이 QR코드로 바로 접속할 수 있습니다.

⚠️ 주의사항
• 학생 개인정보가 포함되지 않도록 주의하세요.
• 생성된 코드는 반드시 직접 실행해보고 검증한 후 사용하세요.`,
  },
  {
    id: 2,
    tool: 'NotebookLM',
    toolColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    title: '교과서·연수 PDF로 나만의 수업 요약 봇 & 퀴즈 생성기 만들기',
    content: `Google NotebookLM에 교과서나 연수 자료를 업로드하면, AI가 내용을 분석해 질문에 답해주는 맞춤형 봇이 됩니다.

🎯 활용 단계
1단계: NotebookLM(notebooklm.google.com)에 접속하여 새 노트북을 생성합니다.
2단계: 교과서 PDF, 연수 자료, 교육과정 문서 등을 소스로 업로드합니다. (최대 50개)
3단계: "이 자료에서 5학년 수학 핵심 개념 10가지를 요약해줘"처럼 질문합니다.

💡 수업 활용 아이디어
• "이 단원에서 형성평가 문제 5개를 O/X 형태로 만들어줘"
• "학부모 가정통신문용으로 이번 주 학습 내용을 쉽게 요약해줘"
• "이 내용을 초등학생 눈높이로 비유를 들어 설명해줘"

🌟 오디오 요약 기능
• NotebookLM의 '오디오 개요' 기능을 사용하면 팟캐스트 형태로 요약본을 생성할 수 있어요.
• 출퇴근길에 연수 자료를 귀로 복습할 수 있습니다!`,
  },
  {
    id: 3,
    tool: 'Suno AI & Canva',
    toolColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
    title: '수업용 타이머 BGM 작곡 & Canva로 학급 안내장 디자인하기',
    content: `Suno AI로 세상에 하나뿐인 수업 BGM을 만들고, Canva로 전문 디자이너급 안내장을 제작할 수 있습니다.

🎵 Suno AI 음악 만들기
• suno.com에 접속 후 "cheerful elementary school timer music, 3 minutes, no lyrics"처럼 영어로 프롬프트를 작성합니다.
• 장르(pop, lo-fi, classical)와 분위기(cheerful, calm, exciting)를 구체적으로 지정하세요.
• "30 second countdown with increasing tempo"로 타이머에 딱 맞는 BGM을 만들 수 있어요.

🎨 Canva 활용 팁
• Canva에서 "학교 안내장"을 검색하면 수백 개의 무료 템플릿이 나옵니다.
• Magic Design 기능: 텍스트만 입력하면 AI가 자동으로 레이아웃을 잡아줍니다.
• 학급 로고나 마스코트를 AI 이미지 생성기로 만들어 넣으면 더 특별해져요.

📌 저작권 안내
• Suno AI 무료 플랜: 비상업적 교육 목적으로 사용 가능
• Canva 교육용 계정: edu 이메일로 가입하면 프리미엄 기능 무료!`,
  },
  {
    id: 4,
    tool: 'Claude Code',
    toolColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    title: '바이브 코딩 동아리에서 학생 눈높이로 에러 설명하기',
    content: `Claude Code를 활용하면 초등학생들이 코딩하다 만나는 에러 메시지를 쉽고 재미있게 설명해줄 수 있습니다.

🎯 마법의 프롬프트 템플릿
"너는 초등학교 6학년 학생에게 코딩을 가르치는 다정한 선생님이야.
아래의 에러 메시지를 읽고:
1) 무엇이 잘못됐는지 일상생활 비유로 설명해줘
2) 어떻게 고치면 되는지 단계별로 알려줘
3) 비슷한 실수를 예방하는 팁도 하나 알려줘"

💡 실전 활용 예시
• SyntaxError → "문장 끝에 마침표를 빼먹은 것과 같아요! 코드도 규칙이 있거든요."
• IndentationError → "줄 맞추기가 안 된 거예요. 교과서에서 문단 들여쓰기처럼요!"
• NameError → "친구 이름을 잘못 불러서 대답을 못 하는 상황이에요."

🌟 동아리 운영 팁
• 학생이 에러를 직접 Claude에게 물어보게 하면 자기주도 학습 효과가 커져요.
• "이 코드가 하는 일을 만화 대사처럼 설명해줘"로 코드 리딩 연습도 가능합니다.
• 매 수업 끝에 "오늘 배운 것을 3줄로 요약해줘"를 루틴으로 만들어 보세요.`,
  },
];
