'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

const shortcuts = [
  { keys: ['Ctrl', 'K'], desc: '통합 검색 열기' },
  { keys: ['Alt', 'C'], desc: '교실 도구 모달 토글' },
  { keys: ['Esc'], desc: '모달·패널 닫기' },
  { keys: ['↑', '↓'], desc: '검색 결과 탐색' },
  { keys: ['Enter'], desc: '선택한 항목 이동' },
  { keys: ['?'], desc: '이 단축키 안내 열기' },
];

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  return (
    <>
      {/* Footer 링크용 (외부에서도 열 수 있도록) */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
        title="키보드 단축키 안내 (?)"
      >
        <Keyboard className="w-4 h-4" />
        <span>단축키</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">키보드 단축키</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="px-6 py-4 space-y-3">
                {shortcuts.map((s) => (
                  <div key={s.desc} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{s.desc}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="min-w-[1.75rem] px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 text-center shadow-sm"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold border border-slate-300 dark:border-slate-700">?</kbd> 를 눌러 언제든 이 안내를 확인하세요
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
