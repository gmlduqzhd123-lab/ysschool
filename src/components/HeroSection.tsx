'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, User, FolderOpen, Code2, Trophy, Music, Video, BookText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-brand-sky/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-brand-navy/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-sky/10 font-extrabold text-sm mb-6 border border-brand-sky/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-4 h-4 text-brand-sky" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-sky dark:from-brand-sky dark:to-brand-orange">
                {t('에듀테크 크리에이터', 'EduTech Creator')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight break-keep">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-rose-500">
                {t('경계를 넘어서는 교육,', 'Education Beyond Boundaries,')}
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-sky dark:from-brand-sky dark:to-blue-400">
                {t('엽쌤스쿨', 'YSSCHOOL')}
              </span><span className="text-slate-900 dark:text-white">{t('에 오신 것을 환영합니다.', ' welcomes you.')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed break-keep">
              {t(
                '안녕하세요, 초등교사 김희엽입니다. \n늘 배우며 성장하겠습니다.',
                'Hello, I\'m Kim Hee-yeop, an elementary school teacher.\nAlways learning, always growing.'
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/showcase"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-brand-navy text-white font-semibold hover:bg-brand-navy/90 transition-all shadow-lg hover:shadow-brand-navy/30"
              >
                {t('에듀테크 갤러리', 'EduTech Gallery')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#dev-lab"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-brand-navy dark:text-white font-semibold border-2 border-brand-navy/10 hover:border-brand-sky transition-all shadow-sm hover:shadow-md"
              >
                {t('최신 웹앱 체험하기', 'Try Latest Web Apps')}
              </a>
            </div>

            {/* Quick Links Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-semibold">
                {t('아카이브 바로가기 ⚡', 'Quick Archive Links ⚡')}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { id: 'cv', label: t('주요 약력 및 활동', 'CV & Activities'), icon: User },
                  { id: 'edu-archive', label: t('교육 자료실', 'Edu Archive'), icon: FolderOpen },
                  { id: 'dev-lab', label: t('교육 웹앱 실험실', 'Dev Lab'), icon: Code2 },
                  { id: 'hall-of-fame', label: t('수상 내역', 'Hall of Fame'), icon: Trophy },
                  { id: 'acappella', label: t('아카펠라 공연 영상', 'A Cappella'), icon: Music },
                  { id: 'media-room', label: t('영상 갤러리', 'Media Room'), icon: Video },
                  { id: 'publications', label: t('저서 소개', 'Publications'), icon: BookText },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-brand-sky/10 hover:text-brand-sky hover:border-brand-sky/40 hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
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
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
              </a>
              <a
                href="https://youtube.com/@acappellaakaraka"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-500 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="아카라카"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="https://indischool.com/@user359088"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-green-500 hover:border-green-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                title="인디스쿨"
              >
                <FolderOpen className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
