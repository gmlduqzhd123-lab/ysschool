'use client';

/**
 * ThemeToggle - 다크/라이트 모드 전환 버튼
 * 전환 시 canvas-confetti 폭죽 효과가 1~2초간 화면에 표시됩니다.
 */

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { fireConfetti } from './animations/ConfettiEffect';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      // ignore
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);

    const frame = requestAnimationFrame(() => {
      setIsDark(dark);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    try {
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
    } catch {
      // ignore
    }

    // 🎉 폭죽 효과!
    fireConfetti();
  };

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 animate-pulse"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 min-[400px]:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={isDark ? '☀️ 라이트 모드' : '🌙 다크 모드'}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        >
          <Moon className="w-5 h-5" />
        </div>
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <Sun className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
}
