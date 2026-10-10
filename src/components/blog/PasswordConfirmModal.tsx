'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AlertCircle, X, Check } from 'lucide-react';
import { verifyBlogActionPassword } from '@/lib/blogStorage';

interface PasswordConfirmModalProps {
  isOpen: boolean;
  actionType: 'edit' | 'delete';
  postTitle: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function PasswordConfirmModal({
  isOpen,
  actionType,
  postTitle,
  onSuccess,
  onClose,
}: PasswordConfirmModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    if (verifyBlogActionPassword(password)) {
      setError(null);
      setPassword('');
      onSuccess();
    } else {
      setError('비밀번호가 올바르지 않습니다. (설정된 비밀번호: 1234)');
    }
  };

  const actionName = actionType === 'edit' ? '수정' : '삭제';
  const actionColor = actionType === 'edit' ? 'text-blue-500' : 'text-red-500';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-900 dark:text-white relative"
        >
          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* 모달 헤더 */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-3 rounded-2xl ${
                actionType === 'edit' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
              }`}
            >
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                글 <span className={actionColor}>{actionName}</span> 비밀번호 확인
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[260px]">
                {postTitle}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            이 글을 {actionName}하려면 관리자 비밀번호를 입력해주세요.
            <br />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              (기본 설정된 비밀번호: <strong className="font-mono text-amber-500 font-bold">1234</strong>)
            </span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="비밀번호(1234) 입력"
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 font-mono tracking-wider"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-red-500 font-bold">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md ${
                  actionType === 'edit'
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                    : 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{actionName} 확인</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
