'use client';

import { motion } from 'framer-motion';
import { Code2, Wrench, FolderOpen, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

const highlights = [
  {
    icon: Code2,
    titleKo: '교육 웹앱 실험실',
    titleEn: 'EduTech Gallery',
    descKo: '직접 기획·개발한 교육용 웹앱과 미니게임을 체험해 보세요.',
    descEn: 'Try out educational web apps and mini-games built from scratch.',
    href: '/showcase',
    gradient: 'from-brand-navy to-brand-sky',
    iconBg: 'bg-brand-navy/10 dark:bg-brand-sky/10',
    iconColor: 'text-brand-navy dark:text-brand-sky',
  },
  {
    icon: Wrench,
    titleKo: '에듀테크 도구 모음',
    titleEn: 'EduTech Toolkit',
    descKo: '수업에서 활용하는 14가지 에듀테크 도구를 한눈에 확인하세요.',
    descEn: 'Browse 14 EduTech tools used in actual classroom settings.',
    href: '/tools',
    gradient: 'from-brand-sky to-cyan-400',
    iconBg: 'bg-brand-sky/10',
    iconColor: 'text-brand-sky',
  },
  {
    icon: FolderOpen,
    titleKo: '포트폴리오 & 약력',
    titleEn: 'Portfolio & CV',
    descKo: '교육 여정, 수상 내역, 아카펠라 공연 등 활동 기록을 만나보세요.',
    descEn: 'Explore my journey, awards, a cappella performances, and more.',
    href: '/portfolio',
    gradient: 'from-brand-orange to-rose-500',
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
  },
  {
    icon: GraduationCap,
    titleKo: '연수 자료',
    titleEn: 'Training Materials',
    descKo: '교사 연수 및 강의에서 사용된 발표 자료를 다운로드하세요.',
    descEn: 'Download presentation materials from teacher training sessions.',
    href: '/training',
    gradient: 'from-emerald-500 to-teal-400',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
];

export default function FeaturedHighlights() {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">
            Explore
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('엽쌤스쿨 둘러보기', 'Explore YSSCHOOL')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t(
              '에듀테크, 포트폴리오, 연수 자료까지 — 관심 있는 영역을 선택해 보세요.',
              'From EduTech tools to portfolio and training materials — explore what interests you.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block h-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-7 border border-slate-100 dark:border-slate-700 hover:border-brand-sky/40 dark:hover:border-brand-sky/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {t(item.titleKo, item.titleEn)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 break-keep">
                    {t(item.descKo, item.descEn)}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:gap-2.5 transition-all duration-300`}>
                    {t('둘러보기', 'Explore')}
                    <ArrowRight className={`w-4 h-4 ${item.iconColor} group-hover:translate-x-1 transition-transform duration-300`} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
