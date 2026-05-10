'use client';

import { motion } from 'framer-motion';
import { skillsData } from '../data/dummyData';
import * as Icons from 'lucide-react';

export default function AboutSection() {
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
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">About</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            핵심 역량 및 철학
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            끊임없이 배우고 성장하며, 배운 것을 나누는 교육자이자 크리에이터입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => {
            const Icon = Icons[skill.icon as keyof typeof Icons] as React.ElementType;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-navy dark:group-hover:bg-brand-sky transition-all duration-300">
                  {Icon && <Icon className="w-8 h-8 text-brand-navy dark:text-brand-sky group-hover:text-white transition-colors duration-300" />}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{skill.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
