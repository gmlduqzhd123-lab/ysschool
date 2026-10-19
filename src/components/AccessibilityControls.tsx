'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Plus, Minus, Eye } from 'lucide-react';

const FONT_SIZE_KEY = 'ysschool-font-size';
const CONTRAST_KEY = 'ysschool-high-contrast';

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedSize = localStorage.getItem(FONT_SIZE_KEY);
    const savedContrast = localStorage.getItem(CONTRAST_KEY);
    if (savedSize) {
      const s = parseInt(savedSize, 10);
      requestAnimationFrame(() => setFontScale(s));
      document.documentElement.style.fontSize = `${s}%`;
    }
    if (savedContrast === 'true') {
      requestAnimationFrame(() => setHighContrast(true));
      document.documentElement.classList.add('high-contrast');
    }
  }, []);

  const changeFontSize = (delta: number) => {
    setFontScale((prev) => {
      const next = Math.max(80, Math.min(140, prev + delta));
      document.documentElement.style.fontSize = `${next}%`;
      localStorage.setItem(FONT_SIZE_KEY, String(next));
      return next;
    });
  };

  const toggleContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      localStorage.setItem(CONTRAST_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="fixed bottom-[7.5rem] left-3 sm:bottom-24 sm:left-8 z-40 flex flex-col items-start gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col gap-2 p-3 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            {/* 글꼴 크기 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeFontSize(-10)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="글꼴 축소"
              >
                <Minus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-10 text-center">
                {fontScale}%
              </span>
              <button
                onClick={() => changeFontSize(10)}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                aria-label="글꼴 확대"
              >
                <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
            {/* 고대비 */}
            <button
              onClick={toggleContrast}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                highContrast
                  ? 'bg-yellow-400 text-black'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              고대비 {highContrast ? 'ON' : 'OFF'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-800/85 dark:bg-slate-700/85 backdrop-blur-md text-white shadow-md hover:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="접근성 설정"
        title="접근성 설정 (글꼴 크기·고대비)"
      >
        <Accessibility className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
