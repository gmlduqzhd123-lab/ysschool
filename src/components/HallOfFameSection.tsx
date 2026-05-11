'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { awardsData } from '../data/dummyData';
import Image from 'next/image';
import { X } from 'lucide-react';
import ClickDiscoverWrapper from './wrappers/ClickDiscoverWrapper';

export default function HallOfFameSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="hall-of-fame" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Hall of Fame</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            수상 내역
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            아이들의 성장이 곧 저의 성장이었습니다. 치열하게 도전하며 맺은 결실들을 기록합니다.
          </p>
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {awardsData.map((award, index) => {
            const card = (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid relative group shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer mb-8"
                onClick={() => setSelectedImage(award.image)}
              >
                {/* Premium Certificate Frame Design */}
                <div className="relative bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-md border border-slate-200 dark:border-slate-700 aspect-[1/1.414] overflow-hidden flex flex-col justify-center items-center">
                  
                  {/* Inner Gold Line Accent */}
                  <div className="absolute inset-2 sm:inset-3 border border-amber-200/60 dark:border-amber-500/30 z-10 pointer-events-none rounded-sm" />
                  
                  {/* The Certificate Image */}
                  <div className="relative w-full h-full p-3 sm:p-4 bg-slate-50/50 dark:bg-slate-900/50">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      unoptimized={true}
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out p-3 sm:p-4"
                    />
                  </div>
                </div>
                
                {/* Overlay Text Information */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 rounded-md">
                  <span className="text-amber-400 font-semibold text-sm mb-1 tracking-wider">{award.date}</span>
                  <h4 className="text-white font-bold text-lg leading-snug drop-shadow-md">{award.title}</h4>
                </div>
              </motion.div>
            );

            // 첫 번째 상장에 이스터에그 적용
            if (index === 0) {
              return (
                <ClickDiscoverWrapper key={award.id}>
                  {card}
                </ClickDiscoverWrapper>
              );
            }
            return card;
          })}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto h-auto max-w-5xl max-h-[90vh] flex justify-center items-center"
            >
              <Image
                src={selectedImage}
                alt="Award Full"
                width={1200}
                height={1600}
                unoptimized={true}
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
