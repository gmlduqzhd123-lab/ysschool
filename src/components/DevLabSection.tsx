'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { devLabsData } from '../data/dummyData';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function DevLabSection() {
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  
  const categories = ['전체', ...Array.from(new Set(devLabsData.map(item => item.category).filter(Boolean)))];

  const filteredData = activeCategory === '전체' 
    ? devLabsData 
    : devLabsData.filter(app => app.category === activeCategory);

  return (
    <section id="dev-lab" className="py-24 md:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Tech-inspired decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-sky/30 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-brand-navy/40 blur-[120px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBNMzkuNSAwdiM0MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-brand-sky/10 border border-brand-sky/20">
            <h2 className="text-sm font-bold text-brand-sky uppercase tracking-widest">
              {'< Dev Lab />'}
            </h2>
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            교육 웹앱 실험실
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 break-keep">
            교실의 문제들을 기술로 해결합니다. 아이들과 교사 모두의 성장을 돕기 위해 직접 기획하고 개발 중인 맞춤형 교육 도구들입니다.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        {categories.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-brand-sky text-slate-900 shadow-lg shadow-brand-sky/30' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"
          >
            <div className="bg-brand-sky/10 p-6 rounded-full mb-6">
              <Construction className="w-16 h-16 text-brand-sky" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              현재 준비 중입니다
            </h4>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              새로운 개발 자료와 웹 애플리케이션들이 곧 업데이트될 예정입니다. 기대해 주세요!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {filteredData.map((app, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={app.id} 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-slate-800/50 border border-slate-700/50`}
                  >
                    
                    {/* Mockup Display */}
                    <div className="w-full lg:w-1/2 relative">
                      <div className="relative w-full aspect-[16/10] bg-slate-200 dark:bg-slate-700 rounded-xl lg:rounded-2xl border-[8px] lg:border-[12px] border-slate-800 dark:border-slate-900 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                          <Image
                            src={app.image}
                            alt={app.title}
                            fill
                            unoptimized={true}
                            className="object-contain hover:scale-[1.02] transition-transform duration-1000 ease-in-out p-4"
                          />
                        </div>
                      </div>
                      {/* Decorative element behind mockup */}
                      <div className={`absolute -inset-4 bg-gradient-to-r from-brand-sky/30 to-brand-navy/30 blur-2xl -z-10 rounded-[3rem] ${isEven ? '-rotate-3' : 'rotate-3'}`}></div>
                    </div>

                    {/* App Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <h4 className="text-3xl font-bold text-white mb-4">
                        {app.title}
                      </h4>
                      <p className="text-lg text-slate-300 mb-8 leading-relaxed whitespace-pre-line break-keep">
                        {app.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {app.techStack.map((tech) => (
                          <span key={tech} className="px-4 py-1.5 bg-slate-800/80 text-brand-sky text-sm font-semibold rounded-md border border-slate-700 shadow-sm shadow-brand-sky/10 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={app.link}
                        target={app.target || "_blank"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] w-full sm:w-max"
                      >
                        {app.buttonText || "앱 확인하기"}
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
