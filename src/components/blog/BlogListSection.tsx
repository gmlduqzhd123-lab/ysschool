'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

import {
  Search,
  Calendar,
  Clock,
  Sparkles,
  LayoutGrid,
  List,
  ArrowRight,
  BookOpen,
  Filter,
} from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

interface BlogListSectionProps {
  posts: BlogPost[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '교실 혁신': { bg: 'bg-emerald-500/10 dark:bg-emerald-500/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-500/30' },
  '에듀테크': { bg: 'bg-blue-500/10 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/30' },
  'AI 교육': { bg: 'bg-purple-500/10 dark:bg-purple-500/20', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-500/30' },
  '인문 독서': { bg: 'bg-amber-500/10 dark:bg-amber-500/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-500/30' },
  '웹앱 개발': { bg: 'bg-cyan-500/10 dark:bg-cyan-500/20', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-500/30' },
  '교육 철학': { bg: 'bg-rose-500/10 dark:bg-rose-500/20', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-500/30' },
  '교실 이야기': { bg: 'bg-slate-500/10 dark:bg-slate-500/20', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-500/30' },
};

export default function BlogListSection({ posts }: BlogListSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const list = Array.from(new Set(posts.map((p) => p.category || '기타')));
    return ['전체', ...list];
  }, [posts]);

  // 필터링된 게시글
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory = selectedCategory === '전체' || post.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // 최신 추천 글 (검색이나 필터가 '전체'이고 검색어가 없을 때 최상단 하이라이트)
  const isDefaultView = selectedCategory === '전체' && !searchQuery.trim();
  const featuredPost = isDefaultView ? posts[0] : null;
  const regularPosts = isDefaultView ? posts.slice(1) : filteredPosts;

  return (
    <div className="space-y-8">
      {/* 1. 컨트롤 패널: 검색창 & 뷰 모드 토글 */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        {/* 검색 인풋 */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="글 제목, 내용, 키워드로 검색해보세요..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              지우기
            </button>
          )}
        </div>

        {/* 뷰 모드 토글 (카드 그리드 vs 컴팩트 리스트) */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="그리드 뷰 (카드)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">그리드</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="리스트 뷰 (한눈에 목록)"
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">목록</span>
          </button>
        </div>
      </div>

      {/* 2. 카테고리 필터 칩 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 mr-1" />
        {categories.map((category) => {
          const count =
            category === '전체'
              ? posts.length
              : posts.filter((p) => p.category === category).length;
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span>{category}</span>
              <span className={`ml-1 text-[11px] font-normal ${isSelected ? 'opacity-90' : 'text-slate-400 dark:text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. 기본 뷰일 때: Featured Post (최신 대표 글 하이라이트) */}
      {featuredPost && (
        <div className="mb-8">
          <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>최신 추천 이야기</span>
          </div>
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <article className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 dark:from-blue-900/30 dark:via-slate-800/50 dark:to-indigo-900/30 border border-blue-500/20 dark:border-blue-400/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
                  NEW
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${
                    CATEGORY_COLORS[featuredPost.category]?.bg || 'bg-slate-100 dark:bg-slate-700'
                  } ${CATEGORY_COLORS[featuredPost.category]?.text || 'text-slate-700 dark:text-slate-200'} ${
                    CATEGORY_COLORS[featuredPost.category]?.border || 'border-slate-200'
                  }`}
                >
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors tracking-tight">
                {featuredPost.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                {featuredPost.description}
              </p>

              <div className="flex items-center gap-1 text-xs sm:text-sm font-black text-blue-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                <span>글 읽으러 가기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          </Link>
        </div>
      )}

      {/* 4. 게시글 목록 영역 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
              {isDefaultView ? '모든 이야기 모아보기' : `'${selectedCategory}' 검색 결과`}
            </h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {filteredPosts.length}편
            </span>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-3xl mb-2">🔍</p>
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              검색 조건에 맞는 글이 없습니다.
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              다른 검색어를 입력하시거나 카테고리 필터를 변경해 보세요.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('전체');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              전체 글 보기
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* 그리드 뷰 (2열 풍성한 카드, 모바일 1열) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {regularPosts.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] || {
                bg: 'bg-slate-100 dark:bg-slate-700',
                text: 'text-slate-700 dark:text-slate-200',
                border: 'border-slate-200',
              };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group h-full">
                  <article className="p-5 sm:p-6 h-full flex flex-col justify-between bg-white dark:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                        >
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 tracking-tight">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                      <span>더 읽기</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          /* 리스트 뷰 (한눈에 쏙 들어오는 정돈된 컴팩트 목록) */
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden shadow-xs">
            {regularPosts.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] || {
                bg: 'bg-slate-100 dark:bg-slate-700',
                text: 'text-slate-700 dark:text-slate-200',
                border: 'border-slate-200',
              };
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-4 sm:p-5 hover:bg-blue-50/50 dark:hover:bg-slate-750 transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-black border shrink-0 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                      >
                        {post.category}
                      </span>
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors truncate">
                        {post.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400 dark:text-slate-500 font-mono">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1 sm:pl-16">
                    {post.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
