'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Music, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';
import { useState, useEffect } from 'react';

function useTimeTheme() {
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState(() => (typeof window !== 'undefined' ? new Date().getHours() : 12));

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const timer = setInterval(() => setHour(new Date().getHours()), 60000);
    return () => clearInterval(timer);
  }, []);

  // All themes use light backgrounds for light mode - dark mode handled by dark: classes
  if (!mounted) return { gradient: '', blob1: 'bg-brand-sky/10', blob2: 'bg-brand-navy/5' };
  if (hour >= 6 && hour < 12) return { gradient: 'from-amber-50 via-orange-50/50 to-sky-50', blob1: 'bg-amber-200/20', blob2: 'bg-sky-200/15' };
  if (hour >= 12 && hour < 18) return { gradient: 'from-sky-50/50 via-blue-50/30 to-cyan-50/50', blob1: 'bg-brand-sky/10', blob2: 'bg-brand-navy/5' };
  if (hour >= 18 && hour < 22) return { gradient: 'from-orange-50/50 via-rose-50/30 to-purple-50/50', blob1: 'bg-orange-200/15', blob2: 'bg-purple-200/15' };
  return { gradient: 'from-indigo-50/50 via-slate-50 to-blue-50/50', blob1: 'bg-indigo-200/15', blob2: 'bg-blue-200/15' };
}

export default function HeroSection() {
  const { t } = useLanguage();
  const theme = useTimeTheme();

  return (
    <section id="hero" className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-gradient-to-br ${theme.gradient} dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-1000`}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className={`absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full ${theme.blob1} blur-3xl`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full ${theme.blob2} blur-3xl`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/10 font-bold text-xs sm:text-sm mb-6 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-brand-sky" />
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {t('에듀테크 크리에이터 · 초등교사 엽쌤', 'EduTech Creator & Educator Yeop')}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6 leading-[1.12] break-keep text-slate-900 dark:text-white">
              <span>
                {t('경계를 넘어서는 교육,', 'Education Beyond Boundaries,')}
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
                {t('엽쌤스쿨', 'YSSCHOOL')}
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {t('입니다.', '.')}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed break-keep max-w-xl">
              {t(
                '교실의 한계를 뛰어넘어 에듀테크 개발, 독서인문, AI 디지털 교육, 저술 활동까지 — 학생과 교사 모두의 성장을 세상과 연결합니다.',
                'Beyond classroom boundaries: EduTech development, reading & humanities, AI digital innovation, and publishing.'
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
              <Link
                href="/showcase"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-sm shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                {t('에듀테크 쇼케이스', 'EduTech Showcase')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 font-extrabold text-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
              >
                {t('포트폴리오 & 약력', 'Portfolio & CV')}
              </Link>
            </div>

            {/* Key Metrics Ticker */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">100<span className="text-emerald-500 text-lg font-bold">+</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">배움게임 & 웹앱</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">10<span className="text-blue-500 text-lg font-bold">권</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">출간 및 집필</p>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">10<span className="text-indigo-500 text-lg font-bold">년차</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">현직 초등교사</p>
              </div>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-md mx-auto aspect-square"
            >
              {/* Decorative shapes behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky to-brand-orange rounded-2xl rotate-6 opacity-20 blur-lg mix-blend-multiply dark:mix-blend-lighten"></div>
              <div className="absolute inset-0 bg-brand-navy rounded-2xl -rotate-6 transition-transform hover:rotate-0 duration-500 shadow-lg"></div>
              
              <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border-4 border-white/50 dark:border-slate-700 shadow-2xl">
                <Image
                  src="/images/profile_hero.jpg"
                  alt="엽쌤 프로필"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </motion.div>

            {/* SNS Icons below profile */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center gap-3 mt-8"
            >
              <a
                href="https://www.youtube.com/@yeopssam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="엽쌤 유튜브 채널 (새 창으로 열기)"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
              </a>
              <a
                href="https://youtube.com/@acappellaakaraka"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="아카펠라 아카라카 유튜브 채널 (새 창으로 열기)"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-500 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="아카라카"
              >
                <Music className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://indischool.com/@user359088"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인디스쿨 엽쌤 프로필 (새 창으로 열기)"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-green-500 hover:border-green-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="인디스쿨"
              >
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
