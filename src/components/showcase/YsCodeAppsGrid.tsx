'use client';

import React, { useState, useMemo } from 'react';
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
  Maximize2
} from 'lucide-react';
import { yscodeApps, YsCodeApp } from '@/data/yscodeData';

interface YsCodeAppsGridProps {
  onPreview?: (app: { url: string; title: string }) => void;
}

type CategoryFilter = '전체' | '수업용' | '업무용' | '여가용' | '기타';

export default function YsCodeAppsGrid({ onPreview }: YsCodeAppsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: CategoryFilter; icon: React.ReactNode; count: number }[] = useMemo(() => [
    { label: '전체', icon: <Layers className="w-4 h-4" />, count: yscodeApps.length },
    { label: '수업용', icon: <GraduationCap className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '수업용').length },
    { label: '업무용', icon: <Briefcase className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '업무용').length },
    { label: '여가용', icon: <Gamepad2 className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '여가용').length },
    { label: '기타', icon: <Sparkles className="w-4 h-4" />, count: yscodeApps.filter((a) => a.category === '기타').length },
  ], []);

  const filteredApps = useMemo(() => {
    return yscodeApps.filter((app) => {
      const matchCategory = selectedCategory === '전체' || app.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        app.name.toLowerCase().includes(query) ||
        app.desc.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

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
              <span>YScode Collection · 19 Apps</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              엽쌤의 바이브 코딩 교실 웹앱 모음
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              교실 현장의 고민을 해결하기 위해 AI와 바이브 코딩으로 직접 개발한 웹앱 19종입니다.
              설치 없이 브라우저에서 바로 실행되며 학생 수업, 교직 업무, 교실 여가 시간에 자유롭게 활용할 수 있습니다.
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
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
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
            placeholder="웹앱 이름 또는 키워드 검색..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              지우기
            </button>
          )}
        </div>
      </div>

      {/* Web Apps Grid */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top: Icon + Category Badge + Featured */}
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
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            검색 결과와 일치하는 웹앱이 없습니다.
          </p>
          <p className="text-sm text-slate-400 mt-1">다른 검색어나 카테고리를 선택해보세요.</p>
          <button
            onClick={() => {
              setSelectedCategory('전체');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-sky transition-colors cursor-pointer"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
