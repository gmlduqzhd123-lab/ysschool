'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  PlusCircle,
  Edit2,
  Trash2,
  User,
} from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';
import {
  mergeAllBlogPosts,
  deleteBlogPost,
  type CustomBlogPost,
} from '@/lib/blogStorage';
import PasswordConfirmModal from './PasswordConfirmModal';
import PostEditModal from './PostEditModal';

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

export default function BlogListSection({ posts: initialPosts }: BlogListSectionProps) {
  const [allPosts, setAllPosts] = useState<CustomBlogPost[]>(() =>
    initialPosts.map((p) => ({ ...p, id: p.slug, content: p.description, isCustom: false }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 모달 제어 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [targetPostForEdit, setTargetPostForEdit] = useState<CustomBlogPost | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordActionType, setPasswordActionType] = useState<'edit' | 'delete'>('edit');
  const [targetPostForPassword, setTargetPostForPassword] = useState<CustomBlogPost | null>(null);

  // 로컬스토리지에서 글 목록 병합 (새 글, 수정된 글, 삭제된 글 동기화)
  const refreshPosts = useCallback(() => {
    const merged = mergeAllBlogPosts(initialPosts);
    setAllPosts(merged);
  }, [initialPosts]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      refreshPosts();
    });
    return () => cancelAnimationFrame(frame);
  }, [refreshPosts]);

  // 카테고리 목록 추출
  const categories = useMemo(() => {
    const list = Array.from(new Set(allPosts.map((p) => p.category || '기타')));
    return ['전체', ...list];
  }, [allPosts]);

  // 필터링된 게시글
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCategory = selectedCategory === '전체' || post.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // 최신 추천 글
  const isDefaultView = selectedCategory === '전체' && !searchQuery.trim();
  const featuredPost = isDefaultView ? allPosts[0] : null;
  const regularPosts = isDefaultView ? allPosts.slice(1) : filteredPosts;

  // 글 작성 버튼 클릭 (비밀번호 없이 누구나 작성 가능)
  const handleOpenCreateModal = () => {
    setTargetPostForEdit(null);
    setIsEditModalOpen(true);
  };

  // 글 수정 버튼 클릭 (비밀번호 1234 인증 필요)
  const handleRequestEdit = (post: CustomBlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTargetPostForPassword(post);
    setPasswordActionType('edit');
    setIsPasswordModalOpen(true);
  };

  // 글 삭제 버튼 클릭 (비밀번호 1234 인증 필요)
  const handleRequestDelete = (post: CustomBlogPost, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTargetPostForPassword(post);
    setPasswordActionType('delete');
    setIsPasswordModalOpen(true);
  };

  // 비밀번호(1234) 검증 성공 시 처리
  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    if (!targetPostForPassword) return;

    if (passwordActionType === 'edit') {
      setTargetPostForEdit(targetPostForPassword);
      setIsEditModalOpen(true);
    } else if (passwordActionType === 'delete') {
      if (confirm(`'${targetPostForPassword.title}' 글을 정말 삭제하시겠습니까?`)) {
        deleteBlogPost(targetPostForPassword.slug || targetPostForPassword.id);
        refreshPosts();
        alert('글이 성공적으로 삭제되었습니다.');
      }
    }
  };

  // 글 저장 완료 시 처리
  const handlePostSaved = () => {
    setIsEditModalOpen(false);
    refreshPosts();
  };

  // 글 링크 URL 결정 (커스텀 글이면 /blog/custom/[id], 기본 글이면 /blog/[slug])
  const getPostUrl = (post: CustomBlogPost) => {
    if (post.isCustom) {
      return `/blog/custom/${post.slug || post.id}`;
    }
    return `/blog/${post.slug}`;
  };

  return (
    <div className="space-y-8">
      {/* 1. 컨트롤 패널: 새 글 작성 버튼 & 검색창 & 뷰 모드 토글 */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
        {/* 새 글 작성하기 버튼 */}
        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>새 글 작성하기</span>
        </button>

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
              ? allPosts.length
              : allPosts.filter((p) => p.category === category).length;
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

      {/* 3. 기본 뷰일 때: Featured Post (최신 추천 글 하이라이트) */}
      {featuredPost && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>최신 추천 이야기</span>
            </div>
            {/* 수정 / 삭제 관리 버튼 */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handleRequestEdit(featuredPost, e)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-300 transition-colors cursor-pointer"
                title="글 수정 (비밀번호: 1234)"
              >
                <Edit2 className="w-3 h-3" />
                <span>수정</span>
              </button>
              <button
                type="button"
                onClick={(e) => handleRequestDelete(featuredPost, e)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                title="글 삭제 (비밀번호: 1234)"
              >
                <Trash2 className="w-3 h-3" />
                <span>삭제</span>
              </button>
            </div>
          </div>

          <Link href={getPostUrl(featuredPost)} className="block group">
            <article className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 dark:from-blue-900/30 dark:via-slate-800/50 dark:to-indigo-900/30 border border-blue-500/20 dark:border-blue-400/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white">
                  NEW
                </span>
                {featuredPost.isCustom && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    직접 작성
                  </span>
                )}
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
                {featuredPost.author && (
                  <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <User className="w-3.5 h-3.5" />
                    {featuredPost.author}
                  </span>
                )}
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

          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            수정·삭제 비밀번호: <strong className="font-mono text-slate-600 dark:text-slate-300">1234</strong>
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-3xl mb-2">🔍</p>
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
              검색 조건에 맞는 글이 없습니다.
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              다른 검색어를 입력하시거나 새 글을 직접 작성해 보세요.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('전체');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                전체 글 보기
              </button>
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                + 새 글 작성하기
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* 그리드 뷰 (2열 풍성한 카드) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {regularPosts.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] || {
                bg: 'bg-slate-100 dark:bg-slate-700',
                text: 'text-slate-700 dark:text-slate-200',
                border: 'border-slate-200',
              };
              return (
                <Link key={post.slug || post.id} href={getPostUrl(post)} className="block group h-full">
                  <article className="p-5 sm:p-6 h-full flex flex-col justify-between bg-white dark:bg-slate-800/80 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                          >
                            {post.category}
                          </span>
                          {post.isCustom && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              직접 작성
                            </span>
                          )}
                        </div>

                        {/* 수정 / 삭제 관리 버튼 */}
                        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => handleRequestEdit(post, e)}
                            className="p-1 rounded-md hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-sky-300 transition-colors"
                            title="수정 (비밀번호: 1234)"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRequestDelete(post, e)}
                            className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors"
                            title="삭제 (비밀번호: 1234)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 tracking-tight">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                        {post.author && (
                          <>
                            <span>·</span>
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-blue-600 dark:text-sky-400 font-extrabold group-hover:translate-x-1 transition-transform">
                        읽기 <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          /* 리스트 뷰 (컴팩트 목록) */
          <div className="bg-white dark:bg-slate-800/80 rounded-3xl border border-slate-200 dark:border-slate-700/80 divide-y divide-slate-100 dark:divide-slate-700/60 overflow-hidden shadow-xs">
            {regularPosts.map((post) => {
              const catStyle = CATEGORY_COLORS[post.category] || {
                bg: 'bg-slate-100 dark:bg-slate-700',
                text: 'text-slate-700 dark:text-slate-200',
                border: 'border-slate-200',
              };
              return (
                <div
                  key={post.slug || post.id}
                  className="p-4 sm:p-5 hover:bg-blue-50/40 dark:hover:bg-slate-750 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4"
                >
                  <Link href={getPostUrl(post)} className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-black border shrink-0 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                      >
                        {post.category}
                      </span>
                      {post.isCustom && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                          직접 작성
                        </span>
                      )}
                      <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors truncate">
                        {post.title}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {post.description}
                    </p>
                  </Link>

                  <div className="flex items-center gap-3 shrink-0 text-xs text-slate-400 dark:text-slate-500 font-mono">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>

                    {/* 수정 / 삭제 버튼 */}
                    <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-2">
                      <button
                        type="button"
                        onClick={(e) => handleRequestEdit(post, e)}
                        className="p-1 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-colors"
                        title="수정 (비밀번호: 1234)"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleRequestDelete(post, e)}
                        className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-slate-700 text-slate-400 hover:text-red-500 transition-colors"
                        title="삭제 (비밀번호: 1234)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link href={getPostUrl(post)} className="p-1 hover:text-blue-600 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 비밀번호 확인 모달 (비밀번호 1234) */}
      <PasswordConfirmModal
        isOpen={isPasswordModalOpen}
        actionType={passwordActionType}
        postTitle={targetPostForPassword?.title || ''}
        onSuccess={handlePasswordSuccess}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* 글 작성/수정 모달 */}
      <PostEditModal
        isOpen={isEditModalOpen}
        initialPost={targetPostForEdit}
        onSaved={handlePostSaved}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
