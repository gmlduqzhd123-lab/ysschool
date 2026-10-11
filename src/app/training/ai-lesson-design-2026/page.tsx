import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft, ArrowUpRight, BookOpen, CalendarDays,
  Sparkles, Download, Layers3, ExternalLink, Gamepad2, FileText, CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const title = '2026. AI 활용 수업 설계 역량강화(기본) 직무연수';
const sourceUrl = 'https://padlet.com/gmlduqzhd12/2026-ai-2-_-_-oo03v5bufuah2kf5';
const description = '수업에 바로 쓰는 디지털 도구 레시피! Padlet, Padlet TA, Canva를 활용한 2026년 전라남도교육청교육연수원 초등 2기 직무연수 통합 교안 및 실습 자료 모음입니다.';

export const metadata: Metadata = {
  title: `${title} | 엽쌤스쿨`,
  description,
  alternates: { canonical: '/training/ai-lesson-design-2026' },
};

const handouts = [
  {
    title: '강의 원고 슬라이드',
    desc: '김희엽 강사의 AI 활용 수업 설계 직무연수 전체 공식 강의 슬라이드 원고입니다.',
    link: 'https://www.canva.com/design/DAHATnWxynM/6sGD30My6vm35asakuXXRA/edit?ui=eyJBIjp7fX0',
    type: 'canva',
    badge: 'Canva 공식 원고',
  },
  {
    title: '캔바 교안 (기본편 70쪽)',
    desc: '수업에 바로 쓰는 캔바 기초부터 고급 활용까지 상세 가이드 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964460',
    type: 'pdf',
    badge: 'PDF 다운로드',
  },
  {
    title: '캔바 교안 (수업사례편 24쪽)',
    desc: '실제 교과별 수업 적용 디자인 및 학생 활동 실천 사례집 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964461',
    type: 'pdf',
    badge: 'PDF 다운로드',
  },
  {
    title: '패들렛 교안 (Padlet TA 포함)',
    desc: '패들렛 기본 기능과 Padlet Teacher Assistant AI 활용법 총정리 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964462',
    type: 'pdf',
    badge: 'PDF 다운로드',
  },
  {
    title: '전체 연수 종합 교안',
    desc: '연수 전 과정을 한 권으로 정리한 2026. 2. 5. 최종 종합 연수자료집',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3778091573',
    type: 'pdf',
    badge: '최종 종합본',
  },
  {
    title: '연수 과정 안내 및 운영 계획서',
    desc: '2026 AI 활용 수업 설계 역량강화 직무연수 운영 계획 및 시간표',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964426',
    type: 'hwp',
    badge: 'HWP 한글파일',
  },
];

const padletTaTools = [
  {
    title: 'Padlet TA 공식 포털',
    desc: '교사의 수업 설계, 자료 제작, 학생 평가를 돕는 AI 교사 비서 도구함',
    link: 'https://ta.padlet.com/',
    tag: '공식 포털',
  },
  {
    title: '4학년 사회 수업 설계 예시',
    desc: '패들렛 TA의 다양한 기능을 연계 활용하도록 프롬프트로 기획된 수업안',
    link: 'https://ta.padlet.com/lesson-plan/Vxjd8OJajD',
    tag: '수업설계',
  },
  {
    title: '수업 활동 아이디어 생성기',
    desc: '단원 및 학습 주제에 맞춘 다채로운 학생 주도적 수업 활동 발굴',
    link: 'https://ta.padlet.com/class-activities/ZRKMgbx5jA',
    tag: '활동 아이디어',
  },
  {
    title: '수행평가 루브릭 (기준표) 제작기',
    desc: '성취기준에 기반한 단계별(상/중/하) 평가 척도 및 피드백 루브릭 생성',
    link: 'https://ta.padlet.com/rubric/3ZjOgDOZjO',
    tag: '평가 기준표',
  },
  {
    title: '텍스트 난이도 조정기',
    desc: '어려운 뉴스 기사나 원문 텍스트를 초등 4학년 맞춤 눈높이로 자동 재작성',
    link: 'https://ta.padlet.com/text-leveler/ZbKRd7mPjy',
    tag: '문해력 도구',
  },
  {
    title: 'ChatGPT 수업설계 구성 도우미',
    desc: '초등 수업 설계 및 지도안 작성에 최적화된 맞춤형 커스텀 GPT',
    link: 'https://chatgpt.com/g/g-S0sHqcIV0-d2-sueobseolgyeguseong-doumi',
    tag: 'Custom GPT',
  },
  {
    title: '멀티미디어 프레젠테이션 (도덕)',
    desc: '4학년 도덕 디지털 예절 학습용 인터랙티브 슬라이드 (Google Slides)',
    link: 'https://docs.google.com/presentation/d/1azwqpA3n2cmyW79w3-lTnGigNg7QjG3LJ0Ll8sASk3U/edit?usp=sharing',
    tag: '수업 슬라이드',
  },
  {
    title: '4학년 분수의 덧셈과 뺄셈 워크시트',
    desc: 'Padlet TA로 즉시 생성한 맞춤형 수학 형성평가 학습지 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964421',
    tag: '수학 워크시트 PDF',
  },
  {
    title: '4학년 물질의 상태와 변화 읽기 지문',
    desc: 'Padlet TA로 제작한 과학 교과 융합 문해력 독해 지문 학습지 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964443',
    tag: '과학 읽기지문 PDF',
  },
  {
    title: '만다라 트레이싱 시트 & 도안',
    desc: '미술 및 집중력 향상용 따라 그리기 학습 활동지 PDF',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/oo03v5bufuah2kf5/wish/3775964444',
    tag: '미술 활동지 PDF',
  },
];

const interactiveGames = [
  {
    title: '메모리 타일 (카드 뒤집기 게임)',
    desc: '같은 개념의 카드 짝을 맞춰 기억력을 높이는 직관적인 배움게임',
    link: 'https://ta.padlet.com/memory-tiles/zqrv2wObr1/play',
  },
  {
    title: '플래시카드 (낱말 복습)',
    desc: '핵심 어휘와 개념 정의를 카드 앞뒤로 넘기며 1:1 암기 점검',
    link: 'https://ta.padlet.com/flashcards/mVraVb6Vj1/play',
  },
  {
    title: '개념 매칭 게임 (Matching)',
    desc: '질문과 정답, 용어와 뜻을 선으로 연결하는 스피드 매칭 활동',
    link: 'https://ta.padlet.com/matching/zVKZg3qlrm/play',
  },
  {
    title: '스피드 객관식 퀴즈 (Multiple Choice)',
    desc: '실시간 피드백과 함께 개념 이해도를 점검하는 4지선다형 퀴즈',
    link: 'https://ta.padlet.com/multiple-choice/3ZjOgAxEjO/play',
  },
  {
    title: '빈칸 채우기 (Fill in the blank)',
    desc: '문장 속 주요 단어를 직접 채워 넣으며 문맥 이해도 완성',
    link: 'https://ta.padlet.com/fill-in-the-blank/e8jYgBg2KA/play',
  },
  {
    title: '분류 & 정렬 게임 (Sorting)',
    desc: '제시된 개념들을 올바른 범주와 카테고리로 드래그하여 분류',
    link: 'https://ta.padlet.com/sorting/60Km419Wp7/play',
  },
  {
    title: '순서 정하기 (Sequencing)',
    desc: '사건의 흐름, 역사적 사건, 이야기 전개 순서를 올바르게 배치',
    link: 'https://ta.padlet.com/sequencing/9LKlmlg0rD/play',
  },
  {
    title: '블루킷 (Blooket) 게임 세트',
    desc: '게이미피케이션 기반 학급 전원 참여형 실시간 퀴즈 배틀',
    link: 'https://dashboard.blooket.com/my-sets',
  },
];

const classroomCases = [
  {
    subject: '1학년 국어',
    title: '1학년 국어 말놀이 & 그림 글쓰기',
    desc: '패들렛 보드를 활용한 저학년 그림일기 및 생각 나눔 수업',
    link: 'https://padlet.com/hallyoes/1-1-2d8nr25dwc9rqm7',
  },
  {
    subject: '4학년 미술',
    title: '4학년 미술 디지털 작품 갤러리',
    desc: '학생들이 직접 만든 디지털 미술 작품을 전시하고 상호 피드백 나눔',
    link: 'https://padlet.com/hallyoes/padlet-6yyu009vtjcd5pvu',
  },
  {
    subject: '5학년 음악',
    title: '우아한 서양 관악기 탐색 수업 (Canva)',
    desc: '관악기의 음색과 구조를 오디오/비주얼 인터랙티브 슬라이드로 학습',
    link: 'https://www.canva.com/design/DAG6aArg6YU/spHiX-EVoW-XZOPiH-4tmQ/edit',
  },
  {
    subject: '음악 융합',
    title: '나만의 음악 만들기 (Singscape)',
    desc: 'AI 및 디지털 사운드 도구를 활용해 학생 고유의 노래 창작',
    link: 'https://padlet.com/hallyoes/singscape-964kl9mbc7bs4ivl',
  },
];

export default function AiLessonDesignTrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Link
          href="/training"
          className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-600 hover:text-brand-navy dark:text-slate-300 dark:hover:text-brand-sky"
        >
          <ArrowLeft className="h-4 w-4" /> 연수 자료실로 돌아가기
        </Link>

        {/* Hero Header */}
        <header className="rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 p-6 text-white shadow-xl sm:p-10 border border-indigo-800/40">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> 2026 직무연수
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 px-3.5 py-1.5 text-xs font-bold text-sky-200">
              전라남도교육연수원 초등 2기
            </span>
          </div>

          <h1 className="max-w-4xl break-keep text-3xl font-black leading-snug sm:text-4xl text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl break-keep text-base leading-relaxed text-indigo-100 sm:text-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-indigo-200">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-emerald-400" /> 연수일: <time dateTime="2026-02-05">2026. 2. 5.</time>
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-sky-400" /> 강사: 여수한려초 교사 김희엽
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-purple-400" /> 총 49개 실습 및 교안 자료
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-950 hover:bg-indigo-50 shadow-md transition-all"
            >
              원본 패들렛 열기 <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#handouts"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20 transition-all"
            >
              교안 및 자료 받기
            </a>
          </div>
        </header>

        {/* Quick Nav Anchor */}
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'handouts', label: '📖 강의 교안 & 원고', count: '6종' },
            { id: 'padlet-ta', label: '🤖 Padlet TA 도구', count: '10종' },
            { id: 'games', label: '🎮 인터랙티브 게임', count: '8종' },
            { id: 'cases', label: '🏫 교실 수업 사례', count: '4종' },
          ].map((nav) => (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-sky hover:shadow-md transition-all group"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-sky">
                {nav.label}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {nav.count}
              </span>
            </a>
          ))}
        </div>

        {/* Section 1: Handouts */}
        <section id="handouts" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">강의 교안 및 공식 원고</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">연수 출강 및 복습에 필요한 슬라이드와 PDF 교안 모음</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {handouts.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-2">
                    {item.badge}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> 슬라이드 원고 열기
                    </a>
                  )}
                  {item.downloadUrl && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> 교안 다운로드
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Padlet TA & AI Tools */}
        <section id="padlet-ta" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Padlet TA 및 AI 수업 설계 도구</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">AI 교사 비서를 활용한 수업안 작성, 활동 아이디어, 루브릭 및 형성평가지</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {padletTaTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
                    {tool.tag}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {tool.desc}
                  </p>
                </div>
                <div>
                  {tool.link && (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> 도구 바로가기
                    </a>
                  )}
                  {tool.downloadUrl && (
                    <a
                      href={tool.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> 학습지 다운로드
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Arcade Games */}
        <section id="games" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">인터랙티브 아케이드 배움게임</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">교실에서 학생들과 바로 실습하고 플레이할 수 있는 8종 학습 게임</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interactiveGames.map((game, idx) => (
              <a
                key={idx}
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/60 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300 flex items-center justify-center mb-3 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-1 leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {game.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span>게임 시작하기</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Section 4: Classroom Cases */}
        <section id="cases" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">교실 수업 실천 사례</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">국어, 미술, 음악 교과에 실제로 적용하여 운영한 학생 활동 패들렛 & 캔바 보드</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {classroomCases.map((cs, idx) => (
              <a
                key={idx}
                href={cs.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-sky hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 mb-2">
                    {cs.subject}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-brand-sky mb-2 leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {cs.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-navy dark:text-brand-sky">
                  <span>실제 수업 보드 열람</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Source Note Footer */}
        <aside className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 text-sm leading-relaxed text-indigo-950 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-indigo-200">
          <h3 className="font-bold mb-1">자료 출처 및 안내</h3>
          <p>
            본 페이지는 전라남도교육청교육연수원 2026 직무연수에서 김희엽 강사가 제작 및 공유한 Padlet 보드의 핵심 교안, 실습 도구, 배움게임을 교육 목적으로 체계화한 디지털 아카이브입니다.
          </p>
          <div className="mt-3">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              출처: 원본 패들렛 보드 바로가기 (새 창)
            </a>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
