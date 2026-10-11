'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Search,
  Sparkles,
  Code2,
  GraduationCap,
  Briefcase,
  Gamepad2,
  Layers,
  ArrowUpRight,
  Maximize2,
  Star,
  Lightbulb,
  Hash,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { yscodeApps, YsCodeApp } from '@/data/yscodeData';

interface YsCodeAppsGridProps {
  onPreview?: (app: { url: string; title: string }) => void;
}

type CategoryFilter = '전체' | '⭐ 즐겨찾기' | '수업용' | '업무용' | '여가용' | '기타';

export default function YsCodeAppsGrid({ onPreview }: YsCodeAppsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  // 로컬스토리지에서 즐겨찾기 복원
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem('ys_favorite_apps');
        if (saved) {
          setFavorites(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // 즐겨찾기 토글 함수
  const toggleFavorite = (appId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setFavorites((prev) => {
      const isFav = prev.includes(appId);
      const next = isFav ? prev.filter((id) => id !== appId) : [...prev, appId];
      try {
        localStorage.setItem('ys_favorite_apps', JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!isFav) {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.8 },
          colors: ['#38bdf8', '#f59e0b', '#ec4899'],
        });
      }
      return next;
    });
  };

  // 주요 태그 목록 추출
  const popularTags = useMemo(() => {
    const tagCountMap: Record<string, number> = {};
    yscodeApps.forEach((app) => {
      app.tags?.forEach((tag) => {
        tagCountMap[tag] = (tagCountMap[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCountMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, []);

  const categories: { label: CategoryFilter; icon: React.ReactNode; count: number }[] = useMemo(() => [
    { label: '전체', icon: <Layers className="w-4 h-4" />, count: yscodeApps.length },
    { label: '⭐ 즐겨찾기', icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />, count: favorites.length },
    { label: '수업용', icon: <GraduationCap className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '수업용').length },
    { label: '업무용', icon: <Briefcase className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '업무용').length },
    { label: '여가용', icon: <Gamepad2 className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '여가용').length },
    { label: '기타', icon: <Sparkles className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '기타').length },
  ], [favorites.length]);

  const filteredApps = useMemo(() => {
    return yscodeApps.filter((app) => {
      // 카테고리 필터
      if (selectedCategory === '⭐ 즐겨찾기') {
        if (!favorites.includes(app.id)) return false;
      } else if (selectedCategory !== '전체' && app.category !== selectedCategory) {
        return false;
      }

      // 태그 필터
      if (selectedTag !== 'all') {
        if (!app.tags || !app.tags.includes(selectedTag)) return false;
      }

      // 검색어 필터
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchName = app.name.toLowerCase().includes(query);
        const matchDesc = app.desc.toLowerCase().includes(query);
        const matchCategory = app.category.toLowerCase().includes(query);
        const matchTags = app.tags?.some((t) => t.toLowerCase().includes(query));
        const matchTip = app.tip?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCategory && !matchTags && !matchTip) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery, favorites]);

  const getCategoryBadge = (category: YsCodeApp['category']) => {
    switch (category) {
      case '수업용':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
      case '업무용':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800';
      case '여가용':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800';
      case '기타':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-sky-200">
              <Code2 className="w-3.5 h-3.5 text-sky-300" />
              <span>YScode Collection · {yscodeApps.length} Apps · 즐겨찾기 지원</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              엽쌤의 바이브 코딩 교실 웹앱 모음
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              교실 현장의 고민을 해결하기 위해 AI와 바이브 코딩으로 직접 개발한 웹앱 {yscodeApps.length}종입니다.
              설치 없이 브라우저에서 바로 실행되며, ⭐ 별 버튼을 눌러 나만의 자주 쓰는 도구로 저장할 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://gmlduqzhd123-lab.github.io/YScode/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg hover:shadow-white/20 active:scale-95"
            >
              <span>YScode 허브 방문</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.label
                    ? 'bg-brand-navy dark:bg-brand-sky text-white dark:text-slate-900 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.label
                      ? 'bg-white/20 dark:bg-slate-900/20 text-current'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="앱 이름, 태그, 팁 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                지우기
              </button>
            )}
          </div>
        </div>

        {/* Quick Tag Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Hash className="w-3 h-3" /> 추천 태그:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`text-xs px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-brand-sky/20 text-brand-sky font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            전체 태그
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer ${
                selectedTag === tag
                  ? 'bg-brand-sky text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Web Apps Grid */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => {
              const isFavorite = favorites.includes(app.id);
              const isTipExpanded = expandedTipId === app.id;

              return (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Top: Icon + Category Badge + Favorite Button */}
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: `${app.accent}15`,
                        }}
                      >
                        <span>{app.icon}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {app.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Sparkles className="w-3 h-3 fill-current" />
                            추천
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryBadge(
                            app.category
                          )}`}
                        >
                          {app.category}
                        </span>

                        {/* ⭐ 즐겨찾기 토글 버튼 */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(app.id, e)}
                          title={isFavorite ? '즐겨찾기 해제' : '자주 쓰는 도구로 등록'}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            isFavorite
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-500 shadow-sm scale-105'
                              : 'text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 transition-transform ${
                              isFavorite ? 'fill-amber-400 text-amber-400' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-sky transition-colors flex items-center gap-1.5">
                        <span>{app.name}</span>
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {app.desc}
                      </p>
                    </div>

                    {/* Tags */}
                    {app.tags && app.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {app.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-brand-sky/20 hover:text-brand-sky transition-colors cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 💡 엽쌤의 교실 꿀팁 카드 */}
                    {app.tip && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setExpandedTipId(isTipExpanded ? null : app.id)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{isTipExpanded ? '활용 팁 닫기' : '💡 엽쌤의 교실 활용 팁'}</span>
                        </button>

                        <AnimatePresence>
                          {isTipExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                                {app.tip}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-sky text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <span>웹앱 실행하기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {onPreview && (
                      <button
                        type="button"
                        onClick={() => onPreview({ url: app.url, title: app.name })}
                        title="화면에서 미리보기"
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            {selectedCategory === '⭐ 즐겨찾기'
              ? '아직 즐겨찾기에 등록된 웹앱이 없습니다.'
              : '검색 결과와 일치하는 웹앱이 없습니다.'}
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {selectedCategory === '⭐ 즐겨찾기'
              ? '자주 쓰는 웹앱 카드의 ⭐ 별 아이콘을 눌러 나만의 도구로 저장해 보세요!'
              : '다른 검색어나 카테고리를 선택해보세요.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('전체');
              setSelectedTag('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-sky transition-colors cursor-pointer"
          >
            전체 목록 보기
          </button>
        </div>
      )}
    </div>
  );
}
