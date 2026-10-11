'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (ko: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ko',
  toggleLanguage: () => {},
  t: (ko: string) => ko,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ko');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
      try {
        const saved = localStorage.getItem('lang') as Language;
        if (saved === 'en') {
          setLang('en');
          document.documentElement.lang = 'en';
        }
      } catch {
        // ignore
      }
    });
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'ko' ? 'en' : 'ko';
    setLang(newLang);
    try {
      localStorage.setItem('lang', newLang);
    } catch {
      // ignore
    }
    document.documentElement.lang = newLang;
  };

  const t = (ko: string, en: string) => {
    if (!mounted) return ko;
    return lang === 'ko' ? ko : en;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
