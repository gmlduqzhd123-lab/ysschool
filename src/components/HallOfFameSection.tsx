'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { awardsData } from '../data/dummyData';
import Image from 'next/image';
import { X } from 'lucide-react';

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
          {awardsData.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid relative rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              onClick={() => setSelectedImage(award.image)}
            >
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 aspect-[3/4] flex items-center justify-center">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  unoptimized={true}
                  className="object-cover p-2 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-sky font-semibold text-sm mb-1">{award.date}</span>
                <h4 className="text-white font-bold text-lg leading-tight">{award.title}</h4>
              </div>
            </motion.div>
          ))}
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
