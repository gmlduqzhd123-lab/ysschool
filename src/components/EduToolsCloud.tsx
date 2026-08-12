'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

// 에듀테크 도구 데이터
const eduTools = [
  { name: '자작자작', desc: 'AI 기반 글쓰기 플랫폼', url: 'https://www.jajakjakjak.com', category: 'writing', size: 'lg' },
  { name: '부크크', desc: '1인 출판 플랫폼 (ISBN 발급)', url: 'https://www.bookk.co.kr', category: 'publishing', size: 'lg' },
  { name: '크리드', desc: 'AI 글쓰기 피드백 도구', url: 'https://cread.ai', category: 'writing', size: 'md' },
  { name: '투닝', desc: 'AI 웹툰 & 일러스트 생성', url: 'https://tooning.io', category: 'creative', size: 'md' },
  { name: '캔바', desc: '디자인 & 프레젠테이션', url: 'https://www.canva.com', category: 'creative', size: 'lg' },
  { name: 'ChatGPT', desc: 'AI 대화형 학습 도우미', url: 'https://chat.openai.com', category: 'ai', size: 'lg' },
  { name: '패들렛', desc: '실시간 협업 보드', url: 'https://padlet.com', category: 'collab', size: 'md' },
  { name: '클래스카드', desc: '어휘 학습 & 퀴즈', url: 'https://www.classcard.net', category: 'quiz', size: 'sm' },
  { name: '띵커벨', desc: '수업 참여형 퀴즈 도구', url: 'https://www.tkbell.co.kr', category: 'quiz', size: 'md' },
  { name: '겟지피티', desc: '교육용 AI 어시스턴트', url: 'https://wrtn.ai', category: 'ai', size: 'sm' },
  { name: '카훗', desc: '게임 기반 학습 퀴즈', url: 'https://kahoot.com', category: 'quiz', size: 'md' },
  { name: '미리캔버스', desc: '한국형 디자인 플랫폼', url: 'https://www.miricanvas.com', category: 'creative', size: 'sm' },
  { name: '블루캣', desc: '교육용 게임 플랫폼', url: 'https://www.playblucat.com', category: 'game', size: 'sm' },
  { name: 'Notion', desc: '올인원 생산성 도구', url: 'https://www.notion.so', category: 'collab', size: 'md' },
];

const categoryColors: Record<string, string> = {
  writing: 'from-blue-500 to-cyan-400',
  publishing: 'from-emerald-500 to-teal-400',
  creative: 'from-purple-500 to-pink-400',
  ai: 'from-orange-500 to-amber-400',
  collab: 'from-indigo-500 to-blue-400',
  quiz: 'from-rose-500 to-red-400',
  game: 'from-green-500 to-lime-400',
};

const categoryLabels: Record<string, string> = {
  all: '전체',
  writing: '글쓰기',
  publishing: '출판',
  creative: '창작',
  ai: 'AI',
  collab: '협업',
  quiz: '퀴즈',
  game: '게임',
};

export default function EduToolsCloud() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(eduTools.map(t => t.category)))];
  const filteredTools = activeCategory === 'all' ? eduTools : eduTools.filter(t => t.category === activeCategory);

  const sizeClasses: Record<string, string> = {
    lg: 'text-base md:text-lg px-5 py-2.5',
    md: 'text-sm md:text-base px-4 py-2',
    sm: 'text-xs md:text-sm px-3 py-1.5',
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">EduTech Toolkit</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('에듀테크 도구 모음', 'EduTech Toolkit')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t('엽쌤이 수업에서 활용하는 에듀테크 도구들입니다. 클릭하면 해당 사이트로 이동합니다.', 'EduTech tools used in YeopSsaem\'s classes. Click to visit each tool.')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/30'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Tag Cloud */}
        <motion.div layout className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, idx) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: idx * 0.05 } }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1, y: -4 }}
                onMouseEnter={() => setHoveredTool(tool.name)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`relative inline-flex items-center rounded-2xl font-bold text-white bg-gradient-to-r ${categoryColors[tool.category]} shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer ${sizeClasses[tool.size]}`}
              >
                {tool.name}
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredTool === tool.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl z-20"
                    >
                      {tool.desc}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
