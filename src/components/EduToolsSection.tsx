'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Search,
  X,
  LayoutGrid,
  Cloud,
  Wrench,
} from 'lucide-react';
import {
  eduToolsList,
  categoryLabels,
  categoryColors,
  categoryBadgeStyles,
  EduToolCategory,
} from '@/data/eduToolsData';

interface EduToolsSectionProps {
  initialCategory?: EduToolCategory;
}

export default function EduToolsSection({
  initialCategory = 'all',
}: EduToolsSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<EduToolCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'cloud'>('grid');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const categories: EduToolCategory[] = [
    'all',
    'writing',
    'publishing',
    'creative',
    'ai',
    'collab',
    'quiz',
    'game',
  ];

  // 필터링된 도구 목록
  const filteredTools = useMemo(() => {
    return eduToolsList.filter((tool) => {
      const matchCategory =
        activeCategory === 'all' || tool.category === activeCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.highlight.toLowerCase().includes(q) ||
        tool.badge.toLowerCase().includes(q) ||
        categoryLabels[tool.category].toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // 카테고리별 도구 개수 계산
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: eduToolsList.length };
    eduToolsList.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const sizeClasses: Record<string, string> = {
    lg: 'text-base md:text-lg px-5 py-2.5',
    md: 'text-sm md:text-base px-4 py-2',
    sm: 'text-xs md:text-sm px-3 py-1.5',
  };

  return (
    <div className="w-full">
      {/* 상단 안내 & 컨트롤 영역 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Wrench className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              교실 추천 에듀테크 도구함
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-extrabold">
              {eduToolsList.length}종
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            엽쌤이 실제 교실 수업과 연구 활동에서 검증하여 매일 사용하는 추천 도구 모음입니다.
          </p>
        </div>

        {/* 뷰 모드 토글 (카드 보기 / 태그 클라우드) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>카드 보기</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cloud')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'cloud'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>클라우드 보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 검색 & 카테고리 필터 */}
      <div className="space-y-4 mb-8">
        {/* 검색 입력창 */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="도구 이름, 기능, 키워드로 검색 (예: 자작자작, 퀴즈, 웹툰)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
              aria-label="검색어 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 카테고리 칩 필터 */}
        <div
          role="toolbar"
          aria-label="에듀테크 카테고리 필터"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isSelected}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md shadow-slate-900/10 dark:shadow-white/5 scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{categoryLabels[cat]}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected
                      ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 결과 개수 표시 (검색/필터 적용 시) */}
      {(searchQuery || activeCategory !== 'all') && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
          <p>
            총 {eduToolsList.length}개 중{' '}
            <strong className="text-slate-900 dark:text-white font-bold">
              {filteredTools.length}개
            </strong>
            의 도구가 표시됩니다.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      )}

      {/* 도구 목록 렌더링 */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <Wrench className="w-10 h-10 mx-auto text-slate-400 mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            검색 조건에 맞는 도구가 없습니다
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            다른 검색어를 입력하시거나 카테고리를 전체로 변경해 보세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 cursor-pointer"
          >
            전체 도구 보기
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* 1) 카드 그리드 모드 */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool, idx) => {
            const badgeStyle = categoryBadgeStyles[tool.category];
            return (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* 상단 뱃지 & 카테고리 */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                    >
                      {categoryLabels[tool.category]}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      {tool.badge}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    {tool.name}
                  </h3>

                  {/* 한 줄 설명 */}
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 mb-2">
                    {tool.desc}
                  </p>

                  {/* 교실 실전 활용 포인트 */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-keep">
                    {tool.highlight}
                  </p>
                </div>

                {/* 하단 바로가기 버튼 */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[150px]">
                    {tool.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </span>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tool.name} 사이트로 이동 (새 창)`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white text-slate-700 dark:text-slate-300 text-xs font-extrabold transition-all group-hover:bg-amber-500 group-hover:text-white shadow-sm cursor-pointer"
                  >
                    <span>바로가기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* 2) 인터랙티브 태그 클라우드 모드 */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
          <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 mb-6">
            태그에 마우스를 올리면 상세 기능이 표시되고, 클릭 시 해당 공식 사이트로 이동합니다.
          </p>
          <motion.div
            layout
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool, idx) => (
                <motion.a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${tool.name} (${tool.desc}, 새 창)`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: idx * 0.03 },
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  className={`relative inline-flex items-center rounded-2xl font-black text-white bg-gradient-to-r ${
                    categoryColors[tool.category]
                  } shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                    sizeClasses[tool.size]
                  }`}
                >
                  <span>{tool.name}</span>

                  {/* 호버 툴팁 */}
                  <AnimatePresence>
                    {hoveredTool === tool.id && (
                      <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute -top-16 left-1/2 -translate-x-1/2 px-3.5 py-2 bg-slate-900 text-white text-xs rounded-xl whitespace-nowrap shadow-2xl z-30 pointer-events-none border border-slate-700"
                      >
                        <p className="font-extrabold text-amber-300">
                          {tool.name} · {tool.badge}
                        </p>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          {tool.desc}
                        </p>
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}
