'use client';

import { motion } from 'framer-motion';
import { pressData } from '../data/dummyData';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function PressRoomSection() {
  return (
    <section id="press-room" className="py-24 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Press & News</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            언론 보도 및 기사
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            교육 현장에서의 혁신적인 활동과 뜻깊은 성과들이 소개된 언론 보도 및 기사 모음입니다.
          </p>
        </motion.div>

        <div className="space-y-32">
          {pressData.map((app, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={app.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Mockup Display */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 relative"
                >
                  <div className="relative w-full aspect-[16/10] bg-slate-200 dark:bg-slate-700 rounded-xl lg:rounded-2xl border-[8px] lg:border-[12px] border-slate-800 dark:border-slate-900 shadow-2xl overflow-hidden">
                    {/* Mockup Screen */}
                    <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        className="object-cover object-top hover:scale-[1.02] transition-transform duration-1000 ease-in-out"
                      />
                    </div>
                  </div>
                  {/* Decorative element behind mockup */}
                  <div className={`absolute -inset-4 bg-gradient-to-r from-brand-sky/30 to-brand-navy/30 blur-2xl -z-10 rounded-[3rem] ${isEven ? '-rotate-3' : 'rotate-3'}`}></div>
                </motion.div>

                {/* App Info */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {app.title}
                  </h4>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed whitespace-pre-line">
                    {app.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {app.techStack.map((tech) => (
                      <span key={tech} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-600 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-sky text-white rounded-full font-semibold transition-colors duration-300 shadow-md hover:shadow-lg w-max"
                  >
                    기사 원문 보기
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </motion.div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
