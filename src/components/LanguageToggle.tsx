'use client';

import { useLanguage } from './LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group flex items-center gap-1.5"
      aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
      title={lang === 'ko' ? 'English' : '한국어'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-xs font-bold uppercase tracking-wider">
        {lang === 'ko' ? 'EN' : '한'}
      </span>
    </button>
  );
}
