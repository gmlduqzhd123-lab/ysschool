'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Edit3,
  Check,
  Eye,
  FileText,
  AlertCircle,
  Tag,
  Clock,
  User,
} from 'lucide-react';
import { saveBlogPost, type CustomBlogPost } from '@/lib/blogStorage';

interface PostEditModalProps {
  isOpen: boolean;
  initialPost?: CustomBlogPost | null; // null이면 새 글 작성, 있으면 수정
  onSaved: (savedPost: CustomBlogPost) => void;
  onClose: () => void;
}

const CATEGORY_OPTIONS = [
  '교실 혁신',
  '에듀테크',
  'AI 교육',
  '인문 독서',
  '웹앱 개발',
  '교육 철학',
];

export default function PostEditModal({
  isOpen,
  initialPost,
  onSaved,
  onClose,
}: PostEditModalProps) {
  const isEditing = Boolean(initialPost && initialPost.id);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [author, setAuthor] = useState('엽쌤');
  const [readTime, setReadTime] = useState('5분');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (initialPost) {
        setTitle(initialPost.title || '');
        setCategory(initialPost.category || CATEGORY_OPTIONS[0]);
        setAuthor(initialPost.author || '엽쌤');
        setReadTime(initialPost.readTime || '5분');
        setDescription(initialPost.description || '');
        setContent(initialPost.content || initialPost.description || '');
      } else {
        setTitle('');
        setCategory(CATEGORY_OPTIONS[0]);
        setAuthor('엽쌤');
        setReadTime('5분');
        setDescription('');
        setContent('');
      }
      setTab('write');
      setError(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [initialPost, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('글 제목을 입력해주세요.');
      return;
    }
    if (!description.trim()) {
      setError('한 줄 요약(설명)을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      setError('본문 내용을 입력해주세요.');
      return;
    }

    const saved = saveBlogPost({
      id: initialPost?.id,
      slug: initialPost?.slug,
      title: title.trim(),
      category: category.trim(),
      author: author.trim() || '엽쌤',
      readTime: readTime.trim() || '5분',
      description: description.trim(),
      content: content.trim(),
      date: initialPost?.date,
    });

    onSaved(saved);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl text-slate-900 dark:text-white relative my-8 max-h-[90vh] flex flex-col"
        >
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 모달 타이틀 */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">
                {isEditing ? '블로그 글 수정' : '새 블로그 글 작성'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                교육 철학과 실천 경험, 에듀테크 개발 노하우를 자유롭게 기록하세요.
              </p>
            </div>
          </div>

          {/* 폼 본문 */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 글 제목 */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="글의 매력적인 제목을 입력하세요 (예: 아침 교실 전자칠판 활용기)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                autoFocus
              />
            </div>

            {/* 카테고리 & 작성자 & 읽기 시간 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 카테고리 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-blue-500" />
                  <span>카테고리</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* 작성자 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  <span>작성자</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="작성자 이름 (예: 엽쌤)"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 읽기 시간 */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>예상 읽기 시간</span>
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="예: 5분"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 한 줄 요약 */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                한 줄 요약 (목록에 노출될 설명) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="글의 핵심 내용을 1~2문장으로 요약해주세요."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>

            {/* 본문 탭: [작성] / [미리보기] */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  본문 내용 (마크다운 지원) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setTab('write')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      tab === 'write'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-300 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>작성</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('preview')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      tab === 'preview'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-300 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>미리보기</span>
                  </button>
                </div>
              </div>

              {tab === 'write' ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="본문 내용을 자유롭게 작성하세요. 줄바꿈과 마크다운(# 제목, - 목록, > 인용)을 지원합니다."
                  className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 leading-relaxed font-sans"
                />
              ) : (
                <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 min-h-[200px] max-h-[260px] overflow-y-auto text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {content ? (
                    <div className="space-y-2">
                      {content.split('\n').map((line, idx) => {
                        if (line.startsWith('## ')) {
                          return <h3 key={idx} className="text-base font-black text-blue-500 pt-2">{line.replace('## ', '')}</h3>;
                        }
                        if (line.startsWith('# ')) {
                          return <h2 key={idx} className="text-lg font-black text-slate-900 dark:text-white pt-2">{line.replace('# ', '')}</h2>;
                        }
                        if (line.startsWith('> ')) {
                          return <blockquote key={idx} className="p-2 border-l-4 border-amber-400 bg-amber-400/10 rounded font-medium my-1">{line.replace('> ', '')}</blockquote>;
                        }
                        if (line.startsWith('- ')) {
                          return <li key={idx} className="ml-4 list-disc">{line.replace('- ', '')}</li>;
                        }
                        return <p key={idx} className="my-1">{line || '\u00A0'}</p>;
                      })}
                    </div>
                  ) : (
                    <span className="text-slate-400">작성된 본문이 없습니다.</span>
                  )}
                </div>
              )}
            </div>

            {/* 하단 버튼 바 */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{isEditing ? '수정 완료' : '글 등록하기'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
