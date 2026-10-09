'use client';

/**
 * EdutechLibrary - 에듀테크 나눔 서재 페이지
 * 1. AI 도구 활용 실전 노하우 (16종 아코디언 가이드)
 * 2. 교실 추천 에듀테크 도구함 (14종 검증 도구 모음)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, Sparkles, Wrench, ArrowRight, Bot } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccordionItem from '@/components/AccordionItem';
import EduToolsSection from '@/components/EduToolsSection';
import { libraryData } from '@/data/libraryData';
import { eduToolsList } from '@/data/eduToolsData';

type LibraryTab = 'knowhow' | 'tools';

export default function EdutechLibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('knowhow');
  const [openId, setOpenId] = useState<number | null>(null);

  // URL 해시(#tools 등)에 따라 활성 탭 자동 전환
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (
        hash === 'tools' ||
        hash === 'toolkit' ||
        hash === 'edutools' ||
        hash === 'edutech-tools'
      ) {
        setActiveTab('tools');
      } else if (
        hash === 'knowhow' ||
        hash === 'ai' ||
        hash === 'guide' ||
        hash === 'library'
      ) {
        setActiveTab('knowhow');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const handleTabChange = (tab: LibraryTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.history.replaceState(
        null,
        '',
        tab === 'tools' ? '#tools' : '#knowhow',
      );
    }
  };

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0f1d3d 0%, #1a2f5e 50%, #0c1a38 100%)',
        }}
      >
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
          >
            <Library className="h-4 w-4 text-violet-300" />
            <span className="text-sm font-semibold text-violet-200">
              Edutech Library &amp; Toolkit
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            에듀테크 나눔 서재
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep"
          >
            바쁜 선생님들을 위한{' '}
            <strong className="text-violet-300 font-extrabold">
              AI 도구 활용 노하우
            </strong>
            와{' '}
            <strong className="text-amber-300 font-extrabold">
              교실 검증 추천 에듀테크 도구함
            </strong>
            을 한곳에 모았습니다.
          </motion.p>

          {/* 서재 내부 탭 전환 스위처 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-8 sm:mt-10 flex justify-center w-full px-2 sm:px-0"
          >
            <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-md sm:max-w-none p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl gap-1.5 sm:gap-1">
              <button
                type="button"
                onClick={() => handleTabChange('knowhow')}
                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 cursor-pointer w-full sm:w-auto ${
                  activeTab === 'knowhow'
                    ? 'bg-white text-slate-900 shadow-lg scale-[1.01] sm:scale-[1.02]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'knowhow' ? 'text-violet-600' : 'text-slate-300'
                  }`}
                />
                <span>AI 도구 활용 노하우</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                    activeTab === 'knowhow'
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {libraryData.length}종
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleTabChange('tools')}
                className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-200 cursor-pointer w-full sm:w-auto ${
                  activeTab === 'tools'
                    ? 'bg-white text-slate-900 shadow-lg scale-[1.01] sm:scale-[1.02]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Wrench
                  className={`w-4 h-4 shrink-0 ${
                    activeTab === 'tools' ? 'text-amber-600' : 'text-slate-300'
                  }`}
                />
                <span>추천 에듀테크 도구함</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                    activeTab === 'tools'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {eduToolsList.length}종
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'knowhow' ? (
            /* 탭 1: AI 도구 활용 실전 노하우 (아코디언) */
            <motion.div
              key="knowhow-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-3xl mx-auto"
            >
              {/* 소개 헤더 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    AI 도구 실전 활용 노하우
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-xs font-extrabold">
                    {libraryData.length}개
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  각 카드를 클릭하면 상세 프롬프트 및 주의사항이 펼쳐집니다.
                </p>
              </div>

              {/* 아코디언 목록 */}
              <div className="flex flex-col gap-4">
                {libraryData.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  >
                    <AccordionItem
                      item={item}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* 노하우 탭 하단 도구함 유도 배너 */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900/60 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      수업에 바로 쓰는 14가지 추천 에듀테크 도구함
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      자작자작, 투닝, 캔바, 띵커벨 등 검증된 교실 툴 모아보기
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('tools')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <span>도구함 탭 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* 탭 2: 교실 추천 에듀테크 도구함 (이동된 자료) */
            <motion.div
              key="tools-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <EduToolsSection />

              {/* 도구함 탭 하단 노하우 유도 배너 */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900/60 border border-violet-200/80 dark:border-violet-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      AI 도구 200% 활용하는 실전 프롬프트 &amp; 노하우
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      NotebookLM, Cursor, Suno, Gamma 등 현장 교사 실전 팁 모음
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('knowhow')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <span>노하우 탭 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 하단 공통 CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center bg-gradient-to-r from-slate-100 to-slate-200/60 dark:from-slate-900 dark:to-slate-800/60 rounded-3xl p-8 border border-slate-200 dark:border-slate-800"
        >
          <p className="text-2xl mb-2">💡</p>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            더 많은 교육 콘텐츠가 궁금하신가요?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
            새로운 에듀테크 도구와 AI 활용 팁, 100종 배움게임을 만나보세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              100종 배움게임 둘러보기
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 transition-all shadow-sm"
            >
              <Bot className="w-4 h-4 text-sky-500" />
              AI 프롬프트 놀이터
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
