'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Trophy, Mic, Code, GraduationCap, Lightbulb, Music, Newspaper } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const milestones = [
  { year: '2017', icon: GraduationCap, title: '교직 시작', desc: '초등학교 교사로 첫 발을 내딛다', color: 'from-blue-500 to-cyan-500' },
  { year: '2018', icon: BookOpen, title: '독서인문교육 시작', desc: '글쓰기와 독서교육에 대한 열정을 발견하다', color: 'from-emerald-500 to-teal-500' },
  { year: '2019', icon: Lightbulb, title: '발명영재교육', desc: '전남교육청 발명교육센터에서 영재교육 시작', color: 'from-amber-500 to-orange-500' },
  { year: '2020', icon: Code, title: '에듀테크 탐구', desc: 'AI와 디지털 도구를 교육에 접목하기 시작', color: 'from-purple-500 to-pink-500' },
  { year: '2021', icon: BookOpen, title: '첫 저서 출간', desc: '교육 현장의 경험을 담은 첫 번째 책을 출간하다', color: 'from-rose-500 to-red-500' },
  { year: '2022', icon: Trophy, title: '전국 수업대회 수상', desc: '전국수업실천사례대회 차상(교육부장관상) 수상', color: 'from-yellow-500 to-amber-500' },
  { year: '2023', icon: Music, title: '아카라카 활동', desc: '전남 초등교사 아카펠라 그룹에서 활발히 활동', color: 'from-indigo-500 to-blue-500' },
  { year: '2024', icon: Newspaper, title: '10권 출간 달성', desc: '독서인문교육 관련 도서 10권 출간 달성', color: 'from-cyan-500 to-blue-500' },
  { year: '2025', icon: Mic, title: '에듀테크 크리에이터', desc: 'AI 디지털 선도, 강연, 컨설팅까지 영역 확장', color: 'from-brand-navy to-brand-sky' },
];

export default function InteractiveTimeline() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Journey</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('교육 여정 타임라인', 'Education Journey Timeline')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t('끊임없이 배우고 도전하는 엽쌤의 교육 여정을 따라가 보세요.', 'Follow YeopSsaem\'s journey of continuous learning and challenge.')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 hidden md:block" />
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-brand-sky to-brand-orange -translate-x-1/2 hidden md:block"
            style={{ height: lineHeight }}
          />

          {/* Mobile Center Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 md:hidden" />

          {milestones.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-16 md:pl-0`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <span className={`inline-block text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${m.color} mb-2`}>
                      {m.year}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{m.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 break-keep">{m.desc}</p>
                  </motion.div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
