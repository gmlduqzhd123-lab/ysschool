import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft, ArrowUpRight, BookOpen, CalendarDays,
  Sparkles, Download, Layers3, ExternalLink, FileSpreadsheet, FileText, CheckCircle2, ClipboardList
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const title = '2026. 학교교육과정 설계의 모든 것';
const sourceUrl = 'https://padlet.com/gmlduqzhd12/2026-xe2ch83qupo2ue1y';
const description = '학교 비전 수립부터 교육공동체 설문, 시수 편제표 작성, 새학년 집중준비기간 운영까지! 2026학년도 학교교육과정 편성을 완벽하게 돕는 원스톱 실무 서식 & 교안 아카이브입니다.';

export const metadata: Metadata = {
  title: `${title} | 엽쌤스쿨`,
  description,
  alternates: { canonical: '/training/school-curriculum-2026' },
};

const guideItems = [
  {
    title: '2026 학교교육과정 설계 공식 연수 교안',
    desc: '학교교육과정 설계의 단계별 핵심 원리와 실무 노하우를 담은 공식 발표 슬라이드',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882888',
    type: 'pptx',
    badge: '공식 연수 PPTX',
  },
  {
    title: '학교교육과정 쉽게 따라하기 가이드북',
    desc: '처음 교육과정 업무를 맡은 선생님도 순서대로 따라할 수 있는 단계별 상세 안내서',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882827',
    type: 'pdf',
    badge: '가이드 PDF',
  },
  {
    title: '학교교육과정 쉽게 따라하기 편집 서식',
    desc: '학교 실정에 맞게 수정하고 인쇄할 수 있는 편집 가능한 한글 문서 원본',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882863',
    type: 'hwp',
    badge: '편집용 HWP',
  },
  {
    title: '교육과정 되돌아보기 운영 PPT',
    desc: '학년말 다모임 및 교육과정 반성 주간에 학부모·교원과 함께 공유하는 발표 PPT',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882886',
    type: 'pptx',
    badge: '운영 PPTX',
  },
  {
    title: '학교교육과정 일관성 점검 실습지',
    desc: '학교 비전-교육목표-핵심역량-교육중점 간의 유기적 일관성을 진단하는 실습 서식',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882871',
    type: 'hwp',
    badge: '실습 서식 HWP',
  },
  {
    title: '학교교육과정 간소화 틀 예시',
    desc: '불필요한 문구를 덜어내고 꼭 필요한 핵심 활동 위주로 정리한 슬림화 교육계획 틀',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882883',
    type: 'hwp',
    badge: '간소화 HWP',
  },
];

const surveyItems = [
  {
    target: '교원용 설문',
    title: '교원 교육과정 반성 및 희망 설문지',
    hwpUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882850',
    googleFormUrl: 'https://docs.google.com/forms/d/1PT3h_FMqBGodwIbs-QsL4OCVpfrxz_QkRvpzHBa1aKs/copy',
    desc: '교과 시수, 평가, 업무 분장, 희망 연수 등 한 해 교육활동 평가 및 새 학년 의견 수렴',
  },
  {
    target: '학부모용 설문',
    title: '학부모 교육 만족도 및 요구 설문지',
    hwpUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882852',
    googleFormUrl: 'https://docs.google.com/forms/d/1NUcLsB_g7H7REX_H-M0VaSUz5Mr5jvsCZnrV-zt0RQ0/copy',
    desc: '학부모 상담, 방과후, 학교 행사, 인성 및 기본 생활습관에 관한 학부모 의견 조사',
  },
  {
    target: '학생용 설문',
    title: '학생 교육활동 만족도 및 희망 설문지',
    hwpUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882853',
    googleFormUrl: 'https://docs.google.com/forms/d/1398eHu--rpWoRn82dfodM0XnKvE6U7EwlI6N_ok_keM/copy',
    desc: '수업 참여도, 동아리, 학교 급식 및 환경, 학생 자치활동에 대한 학생 눈높이 설문',
  },
];

const timetableItems = [
  {
    title: '2026 달력 기반 학사일정 계산기',
    desc: '2026학년도 법정 수업일수(190일 이상) 및 학기별 수업일수를 자동 계산하는 달력 서식',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882862',
    type: 'xlsx',
    badge: '엑셀 계산기',
  },
  {
    title: '시수편성 점검표',
    desc: '학년군별 기준 시수 및 학교자율시간 확보에 따른 시수 증감 오차를 즉시 검증',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882861',
    type: 'xlsx',
    badge: '시수 검증표',
  },
  {
    title: '연간 학사일정 및 시수 편제표 작성 양식',
    desc: '교과별 주당 시수, 창체 시수, 학교자율시간을 한눈에 정리하는 표준 편제표',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882858',
    type: 'hwp',
    badge: '편제표 HWP',
  },
  {
    title: '학교교육과정 톺아보기 작성 예시 모음',
    desc: '타 학교 우수 사례 2종을 참고하여 학교 고유의 특색있는 교육과정 뼈대 수립',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882859',
    type: 'hwp',
    badge: '실제 사례 HWP',
  },
];

const preparationItems = [
  {
    title: '새학년 집중준비기간 도움자료',
    desc: '새 학년 2월 워크숍 및 집중준비기간 기획을 위한 교육청 공식 안내 매뉴얼',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882876',
    badge: '도움자료 PDF',
  },
  {
    title: '새학년 집중준비기간 운영 안내 (3일형)',
    desc: '3일 일정으로 알차게 진행하는 워크숍 세부 시간표 및 분과별 협의 계획서',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882878',
    badge: '3일형 HWP',
  },
  {
    title: '새학년 집중준비기간 3일 운영 예시안',
    desc: '실제 학교에서 3일간 진행했던 구체적인 일정표, 분과활동, 퍼실리테이션 서식',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882877',
    badge: '3일 운영예시',
  },
  {
    title: '새학년 집중준비기간 1일형 (공사 등 단축형)',
    desc: '석면 공사나 시설 개선 등으로 단축 운영 시 하루 만에 끝내는 집중 협의안',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882882',
    badge: '단축형 HWP',
  },
];

const curriculumStandards = [
  {
    title: '2022 개정 교육과정 총론 원문',
    desc: '교육부 고시 2022 개정 초·중등학교 교육과정 총론 전문 한글파일',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882830',
  },
  {
    title: '2022 개정 교육과정 총론 해설 (초등학교)',
    desc: '초등학교 현장에서 바로 적용할 수 있는 총론 핵심 해설집 원문',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882834',
  },
  {
    title: '전라남도 초등학교 교육과정 편성·운영 지침',
    desc: '전라남도교육청 초등학교 교육과정 편성·운영 지침 전문',
    downloadUrl: 'https://padlet.com/gmlduqzhd12/xe2ch83qupo2ue1y/wish/3718882835',
  },
];

export default function SchoolCurriculumTrainingPage() {
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
        <header className="rounded-3xl bg-gradient-to-br from-blue-900 via-sky-900 to-slate-950 p-6 text-white shadow-xl sm:p-10 border border-sky-800/40">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 text-xs font-bold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> 2026 교육과정
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 px-3.5 py-1.5 text-xs font-bold text-sky-200">
              초등 학교교육과정 설계 실무
            </span>
          </div>

          <h1 className="max-w-4xl break-keep text-3xl font-black leading-snug sm:text-4xl text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl break-keep text-base leading-relaxed text-sky-100 sm:text-lg">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-sky-200">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-emerald-400" /> 대상: 2026학년도 학교교육과정 담당 교원
            </span>
            <span className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-sky-400" /> 자료 제작: 여수한려초 교사 김희엽
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-purple-400" /> 총 40종 서식·PPT·엑셀 계산기
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-sky-950 hover:bg-sky-50 shadow-md transition-all"
            >
              원본 패들렛 열기 <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#guides"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20 transition-all"
            >
              서식 및 교안 받기
            </a>
          </div>
        </header>

        {/* Quick Nav Anchor */}
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'guides', label: '📖 연수 PPT & 가이드', count: '6종' },
            { id: 'surveys', label: '📋 교육공동체 설문지', count: '3개 대상' },
            { id: 'timetable', label: '📊 학사일정 & 엑셀 계산기', count: '4종' },
            { id: 'preparation', label: '🏫 새학년 집중준비기간', count: '4종' },
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

        {/* Section 1: Official Guides & Slides */}
        <section id="guides" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">연수 교안 & 실무 가이드</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">학교교육과정 설계 연수 PPTX와 쉽게 따라하는 실무 가이드북 원본</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guideItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 mb-2">
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
                  <a
                    href={item.downloadUrl}
                    download
                    className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> 파일 다운로드
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Community Surveys (Google Forms + HWP) */}
        <section id="surveys" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">교육공동체 의견 수렴 설문 패키지</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">교원, 학부모, 학생용 설문지 한글파일과 즉시 복사해 사용하는 구글 폼 사본</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {surveyItems.map((sv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
                    {sv.target}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {sv.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {sv.desc}
                  </p>
                </div>
                <div className="space-y-2">
                  <a
                    href={sv.googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> 구글 폼 사본 복사하기
                  </a>
                  <a
                    href={sv.hwpUrl}
                    download
                    className="inline-flex w-full items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> 한글(HWP) 양식 받기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Timetable & Excel Calculators */}
        <section id="timetable" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">학사일정 & 시수편성 엑셀 계산기</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">2026 달력 기반 수업일수 자동 계산기와 학년군별 시수편성 검증 엑셀</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timetableItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-teal-500/60 hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 mb-2">
                    {item.badge}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div>
                  <a
                    href={item.downloadUrl}
                    download
                    className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> 파일 다운로드
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Preparation Period (새학년 집중준비기간) */}
        <section id="preparation" className="scroll-mt-24 mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">새학년 집중준비기간 운영 양식</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">2월 집중준비기간 워크숍을 성공적으로 이끄는 3일형, 1일 단축형 운영 서식</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preparationItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-2">
                    {item.badge}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div>
                  <a
                    href={item.downloadUrl}
                    download
                    className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> 서식 받기
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Curriculum Standards */}
        <section id="standards" className="scroll-mt-24 mb-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              📚 2022 개정 교육과정 총론 및 시·도 지침 원문
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {curriculumStandards.map((std, idx) => (
                <a
                  key={idx}
                  href={std.downloadUrl}
                  download
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-100 dark:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-sky mb-1">
                      {std.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {std.desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-sky-600 dark:text-sky-400">
                    <Download className="w-3.5 h-3.5" />
                    <span>한글(HWP) 다운로드</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Source Note Footer */}
        <aside className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5 text-sm leading-relaxed text-sky-950 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-200">
          <h3 className="font-bold mb-1">자료 출처 및 안내</h3>
          <p>
            본 페이지는 여수한려초 김희엽 교사가 기획·제작한 2026학년도 학교교육과정 편성 및 운영을 위한 패들렛 보드의 40개 핵심 서식, 연수 PPT, 설문지 및 시수 엑셀 계산기를 교육 현장 지원용으로 체계화한 디지털 자료실입니다.
          </p>
          <div className="mt-3">
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              출처: 2026. 학교교육과정 설계의 모든것 원본 패들렛 바로가기 (새 창)
            </a>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
