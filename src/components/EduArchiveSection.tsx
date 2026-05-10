'use client';

import { motion } from 'framer-motion';
import { eduResourcesData } from '../data/dummyData';
import Image from 'next/image';
import { DownloadCloud } from 'lucide-react';

export default function EduArchiveSection() {
  return (
    <section id="edu-archive" className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Edu Archive</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            교육 자료실
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            직접 연구하고 제작한 양질의 교육 자료를 공유합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eduResourcesData.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-800 flex flex-col h-full"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/20 transition-colors duration-300" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-brand-sky/10 text-brand-sky dark:text-brand-sky text-xs font-semibold rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {resource.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 flex-grow">
                  {resource.description}
                </p>
                
                <a
                  href={resource.link}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-brand-navy hover:text-white dark:bg-slate-800 dark:hover:bg-brand-sky text-slate-700 dark:text-slate-300 rounded-xl transition-colors duration-300 font-medium text-sm mt-auto"
                >
                  <DownloadCloud className="w-4 h-4" />
                  다운로드 / 보기
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
