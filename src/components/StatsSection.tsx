'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from './LanguageContext';

function Counter({ from = 0, to, duration = 2, suffix = '' }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  const { t } = useLanguage();
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Simple visit counter using localStorage
    const key = 'ysschool-visit-count';
    const sessionKey = 'ysschool-session-visited';
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    const sessionVisited = sessionStorage.getItem(sessionKey);
    
    if (!sessionVisited) {
      const newCount = current + 1;
      localStorage.setItem(key, String(newCount));
      sessionStorage.setItem(sessionKey, 'true');
      requestAnimationFrame(() => setVisitCount(newCount));
    } else {
      requestAnimationFrame(() => setVisitCount(current));
    }
  }, []);

  const stats = [
    { label: t('수업 자료', 'Teaching Materials'), value: 100, suffix: t('개+', '+'), delay: 0.1 },
    { label: t('공연 횟수', 'Performances'), value: 30, suffix: t('회+', '+'), delay: 0.2 },
    { label: t('개발한 웹/앱', 'Web/Apps Built'), value: 15, suffix: t('개+', '+'), delay: 0.3 },
    { label: t('지도한 학생', 'Students Mentored'), value: 300, suffix: t('명+', '+'), delay: 0.4 },
    { label: t('강의 및 컨설팅', 'Lectures & Consulting'), value: 80, suffix: t('회+', '+'), delay: 0.5 },
  ];

  return (
    <section className="py-20 bg-brand-navy dark:bg-slate-900 text-white relative overflow-hidden">
      {/* Parallax Background Shapes */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-48 h-48 bg-brand-sky/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-white/10" />
                  <motion.circle 
                    cx="50%" cy="50%" r="42%" fill="transparent" stroke={`url(#gradient-${idx})`} strokeWidth="6" 
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut", delay: stat.delay }}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 drop-shadow-sm">
                    <Counter to={stat.value} />
                  </div>
                  <div className="text-sm font-bold text-brand-sky mt-1">{stat.suffix}</div>
                </div>
              </div>
              <div className="text-sm md:text-base font-semibold text-slate-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit Counter Badge */}
        {visitCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300 font-medium">
                {t('사이트 방문', 'Site Visits')}: <span className="text-white font-bold">{visitCount.toLocaleString()}</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
