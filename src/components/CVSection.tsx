'use client';

import { motion } from 'framer-motion';
import { 
  careerHistory, 
  researchAchievements, 
  schoolResearch, 
  publicClasses, 
  studentMentoring, 
  commendations, 
  lecturesAndConsulting 
} from '../data/cvData';
import { Briefcase, Award, BookOpen, Presentation, Users, Star, GraduationCap } from 'lucide-react';

export default function CVSection() {
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
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            교육 현장에서의 다양한 연구, 강의, 지도 실적을 소개합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Career History */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Briefcase size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">주요 약력</h4>
            </div>
            <ul className="space-y-3">
              {careerHistory.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Awards & Commendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                <Award size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">표창 내역</h4>
            </div>
            <ul className="space-y-3">
              {commendations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-yellow-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Research Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <BookOpen size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">개인 연구 실적</h4>
            </div>
            <div className="space-y-4">
              {researchAchievements.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
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
                <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-purple-500 transition-colors">
                  <h5 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Student Mentoring */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <Users size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">학생 지도 실적</h4>
            </div>
            <ul className="space-y-3">
              {studentMentoring.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lectures and Consulting */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                <Presentation size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">연수, 강의, 컨설팅</h4>
            </div>
            <ul className="space-y-3">
              {lecturesAndConsulting.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-brand-orange shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Public Classes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                <GraduationCap size={24} />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">공개 수업 및 교육 활동</h4>
            </div>
            <ul className="space-y-3">
              {publicClasses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-pink-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
