'use client';

import { motion } from 'framer-motion';
import { publicationsData } from '../data/dummyData';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';

export default function PublicationsSection() {
  return (
    <section id="publications" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Publications</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            출간 도서
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            교실 속 아이들의 생생한 목소리를 담고, 교사로서의 교육적 성찰을 대중과 나누기 위해 집필·지도한 총 14권의 저서 아카이브입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {publicationsData.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              className="group flex flex-col items-center bg-white/70 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200/70 dark:border-slate-700/60 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {book.category && (
                <span className="mb-4 inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                  {book.category}
                </span>
              )}

              {/* 3D Book Cover Effect */}
              <div className="relative w-44 h-60 mb-6 perspective-1000 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-brand-navy rounded-r-lg shadow-2xl rotate-y-[-10deg] transform-style-3d group-hover:rotate-y-0 transition-transform duration-500">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    unoptimized={true}
                    className="object-cover rounded-r-lg"
                  />
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/40 to-transparent z-10" />
                </div>
                {/* Book shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%] group-hover:blur-xl transition-all duration-500" />
              </div>

              <div className="text-center flex-grow flex flex-col items-center justify-between w-full">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1.5 min-h-[3rem] flex items-center justify-center text-center line-clamp-2 leading-snug">
                    {book.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
                    {book.author}
                  </p>
                  <p className="text-sm font-bold text-brand-sky mb-5">
                    {book.price}
                  </p>
                </div>
                
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-sky hover:text-white dark:hover:bg-brand-sky dark:hover:text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  YES24에서 구매하기
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
