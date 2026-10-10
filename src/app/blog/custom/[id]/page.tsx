'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/blogPosts';
import {
  getSingleBlogPost,
  deleteBlogPost,
  type CustomBlogPost,
} from '@/lib/blogStorage';
import PasswordConfirmModal from '@/components/blog/PasswordConfirmModal';
import PostEditModal from '@/components/blog/PostEditModal';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Edit2,
  Trash2,
  Share2,
  Check,
} from 'lucide-react';

export default function CustomBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [post, setPost] = useState<CustomBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // 모달 상태
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordAction, setPasswordAction] = useState<'edit' | 'delete'>('edit');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (id) {
        const found = getSingleBlogPost(id, blogPosts);
        setPost(found);
        setLoading(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [id]);

  // 비밀번호 인증 성공 시 핸들러
  const handlePasswordSuccess = () => {
    setIsPasswordModalOpen(false);
    if (passwordAction === 'edit') {
      setIsEditModalOpen(true);
    } else if (passwordAction === 'delete') {
      if (post && confirm('정말로 이 글을 삭제하시겠습니까?')) {
        deleteBlogPost(post.slug || post.id);
        alert('글이 성공적으로 삭제되었습니다.');
        router.push('/blog');
      }
    }
  };

  const handleSaved = (saved: CustomBlogPost) => {
    setPost(saved);
    setIsEditModalOpen(false);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-36 pb-24 max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-bold">글을 불러오는 중...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-36 pb-24 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-black mb-3">글을 찾을 수 없습니다.</h1>
          <p className="text-slate-500 text-sm mb-6">
            삭제되었거나 존재하지 않는 게시글입니다.
          </p>
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            ← 블로그 목록으로 돌아가기
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        {/* 상단 컨트롤 바: 뒤로가기 & 수정 & 삭제 */}
        <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>블로그 목록</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="링크 복사"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '복사됨' : '공유'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPasswordAction('edit');
                setIsPasswordModalOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold text-blue-600 dark:text-sky-300 border border-blue-200/60 dark:border-blue-700/60 transition-colors cursor-pointer"
              title="수정하기 (비밀번호: 1234)"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>수정</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPasswordAction('delete');
                setIsPasswordModalOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-xs font-bold text-red-600 dark:text-red-300 border border-red-200/60 dark:border-red-700/60 transition-colors cursor-pointer"
              title="삭제하기 (비밀번호: 1234)"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>삭제</span>
            </button>
          </div>
        </div>

        {/* 게시글 아티클 */}
        <article className="prose prose-slate dark:prose-invert lg:prose-lg mx-auto">
          {/* 메타 정보 칩 */}
          <div className="flex flex-wrap items-center gap-2 mb-4 not-prose">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            {post.author && (
              <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            )}
          </div>

          {/* 제목 */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* 한 줄 요약 박스 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-blue-500 not-prose mb-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            {post.description}
          </div>

          {/* 본문 렌더링 */}
          <div className="space-y-4 text-slate-800 dark:text-slate-200 text-base leading-relaxed">
            {post.content.split('\n').map((line, idx) => {
              if (line.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg font-black text-slate-900 dark:text-white pt-4 pb-1">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-xl font-black text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('# ')) {
                return (
                  <h1 key={idx} className="text-2xl font-black text-slate-900 dark:text-white pt-6 pb-2">
                    {line.replace('# ', '')}
                  </h1>
                );
              }
              if (line.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="p-3 border-l-4 border-amber-400 bg-amber-400/10 rounded-r-xl font-medium text-slate-700 dark:text-slate-300 my-3"
                  >
                    {line.replace('> ', '')}
                  </blockquote>
                );
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return (
                  <li key={idx} className="ml-5 list-disc my-1">
                    {line.replace(/^[-*]\s+/, '')}
                  </li>
                );
              }
              if (line.trim() === '---') {
                return <hr key={idx} className="my-6 border-slate-200 dark:border-slate-800" />;
              }
              return (
                <p key={idx} className="my-2">
                  {line || '\u00A0'}
                </p>
              );
            })}
          </div>
        </article>

        {/* 하단 네비게이션 & 관리 버튼 */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>모든 글 목록 보기</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPasswordAction('edit');
                setIsPasswordModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              수정 (1234)
            </button>
            <button
              type="button"
              onClick={() => {
                setPasswordAction('delete');
                setIsPasswordModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              삭제 (1234)
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* 비밀번호 확인 모달 (비밀번호: 1234) */}
      <PasswordConfirmModal
        isOpen={isPasswordModalOpen}
        actionType={passwordAction}
        postTitle={post.title}
        onSuccess={handlePasswordSuccess}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      {/* 글 수정 모달 */}
      <PostEditModal
        isOpen={isEditModalOpen}
        initialPost={post}
        onSaved={handleSaved}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
