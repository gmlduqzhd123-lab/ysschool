import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, CalendarDays, Layers3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const title = '2026. 학생 성장을 위한 수업-평가-기록';
const sourceUrl = 'https://padlet.com/gmlduqzhd12/2026-g1lklclbxwve0dgg';
const description = '개념기반 탐구학습과 PBL, AI 활용 국어·독서 수업, 수업과 평가를 돕는 에듀테크, 교육과정 참고자료, 학생 작가 프로젝트를 모은 연수자료 안내입니다.';

export const metadata: Metadata = {
  title: `${title} | 엽쌤스쿨`,
  description,
  alternates: { canonical: '/training/student-growth-2026' },
};

// Source: the owner-provided 23-page Padlet PDF export.
// Preserve source headings and contributor attribution. Do not publish the PDF,
// participant identities, surveys, unidentified attachments or third-party files.
const sections = [
  {
    id: 'handouts',
    title: '연수교안/교재',
    category: '연수 안내',
    pages: '1–2쪽',
    text: '강의 자료 바로가기와 김희엽 강의 교안을 안내하는 영역입니다. 실제 교안은 원본 패들렛의 해당 게시물에서 확인할 수 있습니다.',
    items: ['강의 자료 바로가기', '강의 교안(김희엽)'],
  },
  {
    id: 'classroom-cases',
    title: '수업 사례 모음(김희엽)',
    category: '독서인문 · AI활용',
    pages: '2–3쪽',
    text: '개념기반 탐구학습, 5학년 독서 단원의 PBL, AI 활용 국어·독서 수업과 공개수업 지도안으로 구성되어 있습니다.',
    items: ['개념기반 탐구학습 모형 적용 수업 사례', 'PBL 기반 학생주도성키움수업 – 5학년 독서 단원', 'AI를 활용한 국어(독서) 수업 사례', 'AI와 미네르바 토론을 활용한 국어(독서)수업 사례', '에듀테크 및 AI 활용 공개 수업 지도안'],
  },
  {
    id: 'edutech',
    title: '수업과 평가를 돕는 에듀테크(1)·(2)',
    category: '에듀테크 · AI활용',
    pages: '3–11쪽',
    text: '글쓰기, 과제 수합, 학생 작품 공유, 퀴즈, 생성형 AI, 자료 요약과 콘텐츠 제작 등 수업·평가에 연결할 도구를 소개합니다.',
    items: ['글쓰기·피드백: 자작자작, 키위티&키위런, 라이팅 젤, 끄적끄적 아지트, 레서, 크리드', '과제 수합·공유·퀴즈: 트라이디스, 패들렛, 블루캣(Blooket), 패들렛 아케이드', '시각 자료·콘텐츠 제작: 캔바, 미리캔버스, 투닝, 냅킨 AI, 수노(Suno), 감마(Gamma), 브루(VREW)', '생성형 AI·자료 정리: 뤼튼, LEWIS AI, Get gpt, Chat gpt, Notebook LM, POE, 릴리스 AI, Felo AI, 우리아이AI', '링크·자료 모음: 숏. 한국, 비틀리, 에듀테크 도서관'],
  },
  {
    id: 'teacher-ideas',
    title: '수업과 평가를 돕는 에듀테크 활용 방안 나눔',
    category: '연수 참여자 아이디어',
    pages: '11–13쪽',
    text: '연수에서 작성한 수업 적용 아이디어를 익명으로 요약했습니다. 제안된 활동과 실제 실행 경험이 함께 있으므로, 검증된 수업 성과로 제시하지 않습니다.',
    items: ['강사 작성 예시: 5학년 기행문을 익명으로 공유하고 댓글·공감과 AI 피드백 연결', '참여자 제안: 초안과 여러 차례 고쳐 쓴 글을 비교하는 글쓰기 프로젝트', '참여자 제안: 학급·학교 문집 제작 후 전시와 작가 인터뷰로 확장', '참여자 의견: AI 분석은 교사의 판단으로 보완하고, 학생의 기기 조작 어려움도 함께 고려'],
  },
  {
    id: 'curriculum',
    title: '2022. 개정 교육과정',
    category: '교육과정 참고자료',
    pages: '13–15쪽',
    text: '학년군별 성취기준, 범교과 주제 적용 자료, 학교 자율시간 설계 관련 자료를 모은 영역입니다.',
    items: ['1~2학년군 성취기준: 엑셀·한글 파일', '3~4학년군·5~6학년군 성취기준: 한글 파일', '범교과 주제 적용 자료', '학교 자율시간 설계 관련 자료'],
  },
  {
    id: 'student-authors',
    title: '학생 작가 프로젝트',
    category: '독서인문',
    pages: '15–17쪽',
    text: '학생 작가 프로젝트 관련 도서와 부크크 원고 서식을 소개합니다. 이 페이지에는 도서명과 자료 구성을 안내하며, 원고 파일을 다시 게시하지 않습니다.',
    items: ['우리들의 눈물 상자', '안심하고 읽는 94가지 이야기', '아무도 모르는 5학년의 속마음', '해를 담은 아이', 'AI와 함께 그린 꿈의 조각', '부크크 원고 서식 모음'],
  },
  {
    id: 'related-collections',
    title: '선물 꾸러미',
    category: '관련 연수자료 모음',
    pages: '17–18쪽',
    text: '다른 주제의 연수 패들렛으로 연결되는 영역입니다. 연결된 게시판의 본문과 공개 여부는 별도로 확인해야 합니다.',
    items: ['학생 주도성 키움 수업을 위한 에듀테크 활용 방안', '독서인문교육의 모든 것', '깊이 있는 학습을 위한 수업과 평가 설계', '학생 작가 워크북 제작의 실제'],
  },
  {
    id: 'references',
    title: '기타 자료',
    category: '탐구학습 · 학생 주도성',
    pages: '18–21쪽',
    text: '국어과 탐구 수업, 질문기반 PBL, 교육과정 총론과 학습자 주도성 관련 참고자료입니다. IB 연구학교 출처 자료는 강사 직접 제작 자료와 구분합니다.',
    items: ['학생 탐구 중심 국어 수업 지도안 예시 자료', '학생주도성 키움 수업을 위한 질문기반 PBL 수업(3학년 국어)', '국어과 수업 방안·개념기반 탐구학습 관련 지도안', '교육과정 총론·2022 개정 교육과정 반영 국어 수업 설계', '학습자 주도성 함양을 위한 교수학습설계 방안·미래 학습 전략'],
  },
  {
    id: 'contributor-cases',
    title: '수업 사례 모음(김나래)',
    category: '별도 강사 수업 사례',
    pages: '21–23쪽',
    text: '김나래 강사의 교과 수업 사례입니다. 작성자 표기를 유지하며, 같은 영역의 출판사 교과서 파일은 이 홈페이지에 재업로드하지 않습니다.',
    items: ['6학년 비와 비율 수업 사례', '3학년 곱셈 수업 사례', '3학년 나눗셈 수업 사례', '6학년 문학 수업 사례'],
  },
] as const;

export default function StudentGrowthTrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Link href="/training" className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-600 hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-slate-300 dark:hover:text-brand-sky">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> 연수 자료실로 돌아가기
        </Link>

        <header className="rounded-3xl bg-brand-navy p-6 text-white shadow-lg sm:p-10">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100">
            <BookOpen className="h-4 w-4" aria-hidden="true" /> 연수자료 · 에듀테크
          </p>
          <h1 className="max-w-4xl break-keep text-3xl font-extrabold leading-snug sm:text-4xl">{title}</h1>
          <p className="mt-5 max-w-3xl break-keep text-base leading-relaxed text-slate-200 sm:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-sky-100">
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" aria-hidden="true" /> 자료에 표기된 연수일: <time dateTime="2026-08-05">2026. 8. 5.</time></span>
            <span className="inline-flex items-center gap-2"><Layers3 className="h-4 w-4" aria-hidden="true" /> 원문 구성에 따른 9개 자료 묶음</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-brand-navy hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4">
              원본 패들렛 열기 <ArrowUpRight className="h-5 w-5" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
            </a>
            <a href="#contents" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4">자료 구성 살펴보기</a>
          </div>
        </header>

        <div className="my-6 flex flex-wrap gap-2 text-sm">
          {['수업-평가-기록', 'AI활용', '독서인문', '개념기반 탐구학습', 'PBL', '학생 작가 프로젝트'].map((tag) => (
            <span key={tag} className="rounded-full bg-sky-50 px-3 py-1.5 font-medium text-sky-900 dark:bg-sky-950 dark:text-sky-200">{tag}</span>
          ))}
        </div>

        <nav aria-label="연수자료 목차" className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 font-bold">필요한 자료부터 찾아보세요</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`} className="flex min-h-11 items-start gap-2 rounded-lg px-3 py-2 text-sm leading-relaxed text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-slate-200 dark:hover:bg-slate-800">
                <span className="shrink-0 font-bold text-sky-700 dark:text-sky-300">{String(index + 1).padStart(2, '0')}</span>
                <span className="break-keep">{section.title}</span>
              </a>
            ))}
          </div>
        </nav>

        <section id="contents" aria-labelledby="contents-title" className="scroll-mt-24">
          <h2 id="contents-title" className="mb-5 text-2xl font-extrabold">연수자료 구성</h2>
          <div className="grid items-start gap-5 md:grid-cols-2">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-lg bg-brand-navy px-2.5 py-1.5 text-white">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sky-700 dark:text-sky-300">{section.category}</span>
                  <span className="text-slate-500 dark:text-slate-400">원문 {section.pages}</span>
                </div>
                <h3 className="break-keep text-lg font-bold leading-relaxed">{section.title}</h3>
                <p className="mt-3 break-keep text-sm leading-relaxed text-slate-600 dark:text-slate-300">{section.text}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-sky-500 dark:text-slate-200">
                  {section.items.map((item) => <li key={item} className="break-keep">{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <aside aria-labelledby="source-note-title" className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <h2 id="source-note-title" className="mb-2 font-bold">자료 출처와 이용 안내</h2>
          <p>이 안내는 「{title}」 패들렛의 PDF 내보내기 자료(23쪽)에 표시된 제목·본문·미리보기를 바탕으로 정리했습니다. 연결된 교안과 첨부파일 전체를 검토한 안내는 아닙니다.</p>
          <p className="mt-2">원본 PDF, 참여자 이름·소속, 설문, 용도를 확인하지 못한 첨부물과 출판사 교과서는 이 페이지에 게시하지 않았습니다. 다른 강사·기관의 자료는 원문에 표시된 작성자와 출처를 확인해 주세요.</p>
          <p className="mt-2">도구의 무료 이용·인증·학생 이용 조건은 작성 당시 설명과 달라질 수 있어 이 안내에는 옮기지 않았습니다. 원본 패들렛과 연결 자료의 열람 가능 여부는 각 자료의 공유 설정에 따릅니다.</p>
          <p className="mt-3"><a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">출처: 원본 연수 패들렛 (새 창)</a></p>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
