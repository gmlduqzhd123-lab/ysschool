'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Download, ExternalLink, Tag,
  FileText, Sparkles, BookOpen, Layers3, FolderPlus,
  CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { teachingMaterialsData, type TeachingMaterial } from '@/data/teachingMaterialsData';

const categories = ['전체', '국어·독서', '인문·토론', '에듀테크·AI', '예체능·통합', '학급·프로젝트'] as const;

export default function TeachingMaterialsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = teachingMaterialsData.filter((item) => {
    const matchCat = selectedCategory === '전체' || item.subject === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.grade && item.grade.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const getFormatBadge = (fileType?: string) => {
    switch (fileType) {
      case 'hwp':
        return { label: '한글 HWP', bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' };
      case 'pdf':
        return { label: '문서 PDF', bg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' };
      case 'pptx':
        return { label: '슬라이드 PPT', bg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' };
      case 'canva':
        return { label: 'Canva 교안', bg: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300' };
      case 'padlet':
        return { label: 'Padlet 보드', bg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' };
      case 'zip':
        return { label: '압축 ZIP', bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' };
      default:
        return { label: '바로가기', bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-sky/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span className="text-sm font-semibold text-emerald-200">YeopSSam Classroom Materials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            엽쌤 제작 수업 자료실
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed break-keep">
            현직 초등교사 엽쌤이 교실에서 학생들과 함께 직접 실천하고 검증한 국어, 독서, 인문, 에듀테크 수업 지도안, 활동지(HWP/PDF), 패들렛 수업 보드 아카이브입니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 교실 현장 검증 자료
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Download className="w-4 h-4 text-sky-400" /> 한글(HWP) & PDF 원본 다운로드
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers3 className="w-4 h-4 text-purple-400" /> 교과·학년별 체계적 분류
            </span>
          </div>
        </div>
      </section>

      {/* Info Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                선생님의 수업 자료가 계속 업데이트됩니다
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                한글 파일(HWP), PDF 활동지, Canva 교안, Padlet 링크를 주시면 AI가 자동으로 분류하여 이곳에 정리·탑재합니다.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              현재 {teachingMaterialsData.length}종 수록 중
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div className="sticky top-16 lg:top-[4.5rem] z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="수업 자료, 단원, 학년 검색 (예: 5학년, 독서, 관악기, 루브릭)..."
                aria-label="수업 자료 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm border border-transparent focus:border-brand-sky focus:outline-none transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-navy dark:bg-brand-sky dark:text-slate-900 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === '전체' && <Filter className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, idx) => {
                const format = getFormatBadge(item.fileType);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-sky hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <Tag className="w-3 h-3 text-brand-sky" />
                          {item.subject}
                        </span>
                        {item.grade && (
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {item.grade}
                          </span>
                        )}
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ml-auto ${format.bg}`}>
                          {item.badge || format.label}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-navy dark:group-hover:text-brand-sky transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-brand-navy hover:bg-brand-sky hover:text-slate-950 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {format.label} 파일 다운로드
                        </a>
                      )}
                      {item.linkUrl && (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          수업 자료/보드 바로가기
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                일치하는 수업 자료가 없습니다
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                다른 검색어를 입력하시거나 다른 과목 카테고리를 선택해 보세요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
