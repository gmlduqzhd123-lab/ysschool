'use client';

import { motion } from 'framer-motion';
import { skillsData } from '../data/dummyData';
import * as Icons from 'lucide-react';
import { useLanguage } from './LanguageContext';

const skillsTranslations: Record<string, { title: string; description: string }> = {
  'Top-tier Educator': {
    title: 'Top-tier Educator',
    description: 'National teaching competition runner-up (Ministry of Education Award), acclaimed lecturer at Jeonnam Education Training Institute, and active consultant for innovative classroom practices.',
  },
  'Edutech & AI Leader': {
    title: 'Edutech & AI Leader',
    description: 'Leading AI-focused and digital pioneer schools, serving as an AIDT instructor and edutech field support member shaping the future of education.',
  },
  'Author & Creator': {
    title: 'Author & Creator',
    description: 'Author of 10 books on reading & humanities education, and a vocal percussionist/baritone in the Jeonnam Elementary A Cappella Group "Akaraka".',
  },
};

export default function AboutSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Education Philosophy</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
            {t(
              '경계를 넘어서는 교육,\n아이들의 가능성을 세상과 연결합니다.',
              'Education beyond boundaries,\nconnecting children\'s potential to the world.'
            ).split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep mb-8">
            {t(
              '교실이라는 공간을 넘어 독서인문, AI·디지털, 발명영재교육, 예술(아카펠라) 등 다양한 영역을 융합하여 미래 인재를 양성하는 현직 초등 교사이자 교육 크리에이터입니다.',
              'An elementary school teacher and education creator who nurtures future talents by integrating reading & humanities, AI & digital, invention & gifted education, and arts (a cappella) beyond the classroom.'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {['#독서인문교육', '#글로-CAL', '#AI·디지털 선도', '#학생 저자 양성', '#발명영재교육', '#에듀테크 크리에이터'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-brand-orange/10 text-brand-orange dark:text-brand-orange text-sm font-semibold rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => {
            const Icon = Icons[skill.icon as keyof typeof Icons] as React.ElementType;
            const enData = skillsTranslations[skill.title];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-navy dark:group-hover:bg-brand-sky transition-all duration-300">
                  {Icon && <Icon className="w-8 h-8 text-brand-navy dark:text-brand-sky group-hover:text-white transition-colors duration-300" />}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {lang === 'en' && enData ? enData.title : skill.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'en' && enData ? enData.description : skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
