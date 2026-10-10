'use client';

/**
 * EdutechLibrary - 에듀테크 나눔 서재 페이지
 * 1. AI 도구 활용 실전 노하우 (16종 아코디언 가이드)
 * 2. 교실 추천 에듀테크 도구함 (14종 검증 도구 모음)
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Sparkles,
  Wrench,
  ArrowRight,
  Bot,
  Search,
  X,
  ChevronsUpDown,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AccordionItem from '@/components/AccordionItem';
import EduToolsSection from '@/components/EduToolsSection';
import { libraryData } from '@/data/libraryData';
import { eduToolsList } from '@/data/eduToolsData';

type LibraryTab = 'knowhow' | 'tools';

const KNOWHOW_CATEGORIES = [
  '전체',
  '수업자료',
  '학급경영·평가',
  '코딩·체험',
  '영상·음성',
  '연구·검색',
] as const;

export default function EdutechLibraryPage() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('knowhow');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [openedIds, setOpenedIds] = useState<number[]>([]);

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
    setOpenedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // 필터링된 노하우 목록
  const filteredLibrary = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return libraryData.filter((item) => {
      const matchCategory =
        selectedCategory === '전체' || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!query) return true;
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchTool = item.tool.toLowerCase().includes(query);
      const matchContent = item.content.toLowerCase().includes(query);
      const matchCatText = item.category?.toLowerCase().includes(query) ?? false;
      return matchTitle || matchTool || matchContent || matchCatText;
    });
  }, [searchQuery, selectedCategory]);

  const allFilteredOpen =
    filteredLibrary.length > 0 &&
    filteredLibrary.every((item) => openedIds.includes(item.id));

  const toggleAllFiltered = () => {
    if (allFilteredOpen) {
      // 현재 필터된 항목들 접기
      const filteredSet = new Set(filteredLibrary.map((item) => item.id));
      setOpenedIds((prev) => prev.filter((id) => !filteredSet.has(id)));
    } else {
      // 현재 필터된 항목들 모두 펼치기
      const currentFilteredIds = filteredLibrary.map((item) => item.id);
      setOpenedIds((prev) => Array.from(new Set([...prev, ...currentFilteredIds])));
    }
  };

  // 카테고리별 개수 카운팅
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 전체: libraryData.length };
    libraryData.forEach((item) => {
      if (item.category) {
        counts[item.category] = (counts[item.category] || 0) + 1;
      }
    });
    return counts;
  }, []);

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
              AI 도구 활용 노하우 20종
            </strong>
            과{' '}
            <strong className="text-amber-300 font-extrabold">
              교실 검증 추천 에듀테크 도구함 20종
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
            /* 탭 1: AI 도구 활용 실전 노하우 (아코디언 & 검색 & 필터 목록화) */
            <motion.div
              key="knowhow-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
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
                    총 {libraryData.length}종
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  교실 수업과 학급 운영에 즉시 적용 가능한 검증된 실전 팁 모음입니다.
                </p>
              </div>

              {/* 검색 및 필터 컨트롤 바 */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                {/* 실시간 검색창 */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="도구 이름, 활용 키워드, 프롬프트 내용 검색 (예: 퀴즈, 루브릭, Canva, 음악)"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      aria-label="검색어 지우기"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 카테고리 필터 칩 */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 inline-flex items-center gap-1">
                    <Filter className="w-3 h-3" /> 분류:
                  </span>
                  {KNOWHOW_CATEGORIES.map((cat) => {
                    const count = categoryCounts[cat] || 0;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-violet-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>{cat}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSelected
                              ? 'bg-violet-700 text-violet-100'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 컨트롤 하단 상태 및 전체 펼치기/접기 */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    검색 결과:{' '}
                    <strong className="text-violet-600 dark:text-violet-400 font-extrabold">
                      {filteredLibrary.length}
                    </strong>
                    건
                    {(searchQuery || selectedCategory !== '전체') && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('전체');
                        }}
                        className="ml-3 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                      >
                        필터 초기화
                      </button>
                    )}
                  </div>

                  {filteredLibrary.length > 0 && (
                    <button
                      type="button"
                      onClick={toggleAllFiltered}
                      className="inline-flex items-center gap-1 font-bold text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
                    >
                      <ChevronsUpDown className="w-3.5 h-3.5" />
                      <span>{allFilteredOpen ? '모두 접기' : '모두 펼치기'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 아코디언 목록 */}
              {filteredLibrary.length > 0 ? (
                <div className="flex flex-col gap-3.5">
                  {filteredLibrary.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.25 }}
                    >
                      <AccordionItem
                        item={item}
                        isOpen={openedIds.includes(item.id)}
                        onToggle={() => handleToggle(item.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-3xl mb-2">🔍</p>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    검색 조건에 맞는 노하우가 없습니다.
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('전체');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-all cursor-pointer"
                  >
                    전체 목록 보기
                  </button>
                </div>
              )}

              {/* 노하우 탭 하단 도구함 유도 배너 */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900/60 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      수업에 바로 쓰는 20가지 추천 에듀테크 도구함
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      자작자작, 투닝, 캔바, 띵커벨, 퀴즐렛, 엔트리 등 검증된 교실 툴 모아보기
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('tools')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <span>도구함 탭 보기 ({eduToolsList.length}종)</span>
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
                      AI 도구 200% 활용하는 20가지 실전 프롬프트 &amp; 노하우
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      NotebookLM, Cursor, Suno, Gamma, Perplexity, Teachable Machine 등 현장 실전 팁 모음
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange('knowhow')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs shadow-sm hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  <span>노하우 탭 보기 ({libraryData.length}종)</span>
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
