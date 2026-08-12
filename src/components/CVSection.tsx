'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  careerHistory, 
  researchAchievements, 
  schoolResearch, 
  publicClasses, 
  studentMentoring, 
  commendations, 
  lecturesAndConsulting 
} from '../data/cvData';
import { Briefcase, Award, BookOpen, Presentation, Users, GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function CVSection() {
  const [activeTab, setActiveTab] = useState('career');
  const { t } = useLanguage();

  const tabs = [
    { id: 'career', label: t('주요 약력 및 표창', 'Career & Awards') },
    { id: 'research', label: t('연구 및 공개수업', 'Research & Classes') },
    { id: 'mentoring', label: t('학생지도 및 연수', 'Mentoring & Lectures') },
  ];

  // Extract year from career history item
  const extractYear = (item: string): string | null => {
    const match = item.match(/^[\(]?(\d{4})/);
    return match ? match[1] : null;
  };

  return (
    <section id="cv" className="py-24 bg-slate-50/50 dark:bg-slate-900/80 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">CV & Activities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('주요 약력 및 활동', 'CV & Activities')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t(
              '아이들에게 더 넓은 세상을 보여주기 위해, 끊임없이 연구하고 실천해 온 치열한 교육의 발자취입니다.',
              'A passionate journey of research and practice to show children a wider world.'
            )}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* Tab 1: Career & Awards */}
            {activeTab === 'career' && (
              <motion.div
                key="career"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Career History - Enhanced Timeline */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Briefcase size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('주요 약력', 'Career')}</h4>
                  </div>
                  <div className="relative ml-3 pl-6 space-y-4 mt-4 max-h-[600px] overflow-y-auto pr-4">
                    {/* Gradient timeline line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-sky via-brand-navy to-brand-orange rounded-full" />
                    
                    {careerHistory.map((item, idx) => {
                      const year = extractYear(item);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          className="relative group"
                        >
                          {/* Timeline Node with glow */}
                          <div className="absolute -left-[29px] top-3 w-3.5 h-3.5 rounded-full bg-brand-navy dark:bg-brand-sky border-[3px] border-white dark:border-slate-800 shadow-md group-hover:scale-150 group-hover:shadow-brand-sky/50 transition-all duration-300 z-10" />
                          
                          <div className="bg-slate-50 dark:bg-slate-900/50 py-3 px-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-brand-sky/50 hover:bg-brand-sky/5 transition-all duration-300">
                            {year && (
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-3 h-3 text-brand-sky" />
                                <span className="text-xs font-bold text-brand-sky">{year}</span>
                              </div>
                            )}
                            <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed break-keep font-medium">{item}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Awards & Commendations */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                      <Award size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('표창 내역', 'Awards')}</h4>
                  </div>
                  <ul className="space-y-5 mt-8 max-h-[600px] overflow-y-auto pr-4">
                    {commendations.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Research & Public Classes */}
            {activeTab === 'research' && (
              <motion.div
                key="research"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Research Achievements */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('개인 연구 실적', 'Research')}</h4>
                  </div>
                  <div className="space-y-4">
                    {researchAchievements.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                      >
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 break-keep">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('연구 학교 실적', 'School Research')}</h4>
                  </div>
                  <div className="space-y-4">
                    {schoolResearch.map((item, idx) => (
                      <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-purple-500 transition-colors">
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 break-keep">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Public Classes */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                      <GraduationCap size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('공개 수업 및 교육 활동', 'Public Classes')}</h4>
                  </div>
                  <ul className="space-y-4">
                    {publicClasses.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-2 h-2 mt-2 rounded-full bg-pink-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Student Mentoring & Lectures */}
            {activeTab === 'mentoring' && (
              <motion.div
                key="mentoring"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* Student Mentoring */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                      <Users size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('학생 지도 실적', 'Student Mentoring')}</h4>
                  </div>
                  <ul className="space-y-4">
                    {studentMentoring.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Lectures and Consulting */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 dark:border-white/10 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                      <Presentation size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{t('연수, 강의, 컨설팅', 'Lectures & Consulting')}</h4>
                  </div>
                  <ul className="space-y-4">
                    {lecturesAndConsulting.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.06 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-2 h-2 mt-2 rounded-full bg-brand-orange shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
