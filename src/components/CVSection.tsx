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
import { Briefcase, Award, BookOpen, Presentation, Users, GraduationCap } from 'lucide-react';

export default function CVSection() {
  const [activeTab, setActiveTab] = useState('career');

  const tabs = [
    { id: 'career', label: '주요 약력 및 표창' },
    { id: 'research', label: '연구 및 공개수업' },
    { id: 'mentoring', label: '학생지도 및 연수' },
  ];

  return (
    <section id="cv" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">CV & Activities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            주요 약력 및 활동
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            아이들에게 더 넓은 세상을 보여주기 위해, 끊임없이 연구하고 실천해 온 치열한 교육의 발자취입니다.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
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
                {/* Career History */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Briefcase size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">주요 약력</h4>
                  </div>
                  <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 pl-6 space-y-5 mt-4">
                    {careerHistory.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative"
                      >
                        {/* Timeline Node */}
                        <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-brand-navy shadow-sm group-hover:scale-125 transition-transform duration-300" />
                        
                        <div className="bg-slate-50 dark:bg-slate-900/50 py-3 px-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-brand-sky/50 transition-all duration-300">
                          <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed break-keep font-medium">{item}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Awards & Commendations */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                      <Award size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">표창 내역</h4>
                  </div>
                  <ul className="space-y-8 mt-8">
                    {commendations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="w-2.5 h-2.5 mt-2 rounded-full bg-yellow-500 shrink-0 shadow-sm" />
                        <span className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </li>
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
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">개인 연구 실적</h4>
                  </div>
                  <div className="space-y-4">
                    {researchAchievements.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                        <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400 break-keep">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                      <BookOpen size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">연구 학교 실적</h4>
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
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                      <GraduationCap size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">공개 수업 및 교육 활동</h4>
                  </div>
                  <ul className="space-y-4">
                    {publicClasses.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-pink-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </li>
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
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                      <Users size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">학생 지도 실적</h4>
                  </div>
                  <ul className="space-y-4">
                    {studentMentoring.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lectures and Consulting */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                      <Presentation size={24} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">연수, 강의, 컨설팅</h4>
                  </div>
                  <ul className="space-y-4">
                    {lecturesAndConsulting.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-brand-orange shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300 leading-relaxed break-keep">{item}</span>
                      </li>
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
