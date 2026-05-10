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
            저서 소개
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            교육 현장의 경험을 바탕으로 누구나 쉽게 이해할 수 있는 책을 집필했습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {publicationsData.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col items-center"
            >
              {/* 3D Book Cover Effect */}
              <div className="relative w-48 h-64 mb-8 perspective-1000 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-brand-navy rounded-r-lg shadow-2xl rotate-y-[-10deg] transform-style-3d group-hover:rotate-y-0 transition-transform duration-500">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover rounded-r-lg"
                  />
                  {/* Book spine effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/40 to-transparent z-10" />
                </div>
                {/* Book shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-md rounded-[100%] group-hover:blur-xl transition-all duration-500" />
              </div>

              <div className="text-center flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {book.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                  {book.description}
                </p>
                
                <a
                  href={book.link}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-brand-sky hover:text-brand-sky text-slate-700 dark:text-slate-300 rounded-full font-semibold transition-all duration-300 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  자세히 보기
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-\\[-10deg\\] { transform: rotateY(-10deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
      `}} />
    </section>
  );
}
