'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: string;
}

// Using placeholder gradient images since we don't have actual photos
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/class1.svg', alt: '독서교육 수업', caption: '독서인문교육 워크숍', category: '독서교육' },
  { src: '/images/gallery/class2.svg', alt: '발명교육', caption: '발명영재 심화과정', category: '발명교육' },
  { src: '/images/gallery/class3.svg', alt: '에듀테크 수업', caption: '에듀테크 활용 수업', category: '에듀테크' },
  { src: '/images/gallery/class4.svg', alt: '아카펠라 공연', caption: '아카라카 정기공연', category: '공연' },
  { src: '/images/gallery/class5.svg', alt: '출판 프로젝트', caption: '학생 저자 출판 프로젝트', category: '독서교육' },
  { src: '/images/gallery/class6.svg', alt: 'AI 수업', caption: 'AI 디지털 선도학교 수업', category: '에듀테크' },
];

const categories = ['전체', '독서교육', '발명교육', '에듀테크', '공연'];

// SVG 기반의 플레이스홀더 이미지 생성
function GalleryPlaceholder({ item, onClick }: { item: GalleryImage; onClick: () => void }) {
  const colorMap: Record<string, { from: string; to: string; icon: string }> = {
    '독서교육': { from: '#3B82F6', to: '#06B6D4', icon: '📚' },
    '발명교육': { from: '#F59E0B', to: '#EF4444', icon: '💡' },
    '에듀테크': { from: '#8B5CF6', to: '#EC4899', icon: '💻' },
    '공연': { from: '#10B981', to: '#3B82F6', icon: '🎵' },
  };
  const colors = colorMap[item.category] || colorMap['독서교육'];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]"
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
      >
        <span className="text-5xl mb-3">{colors.icon}</span>
        <span className="text-white font-bold text-lg">{item.caption}</span>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-sm font-medium">{item.caption}</p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('전체');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered = activeCategory === '전체'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIdx(prev => prev !== null ? (prev + 1) % filtered.length : null);

  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Gallery</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('수업 현장 갤러리', 'Classroom Gallery')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t('교실에서 일어나는 다양한 교육 활동의 순간들을 만나보세요.', 'Discover various educational activities happening in the classroom.')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIdx(null); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-navy text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.caption}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <GalleryPlaceholder item={img} onClick={() => openLightbox(idx)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {(() => {
                const item = filtered[lightboxIdx];
                const colorMap: Record<string, { from: string; to: string; icon: string }> = {
                  '독서교육': { from: '#3B82F6', to: '#06B6D4', icon: '📚' },
                  '발명교육': { from: '#F59E0B', to: '#EF4444', icon: '💡' },
                  '에듀테크': { from: '#8B5CF6', to: '#EC4899', icon: '💻' },
                  '공연': { from: '#10B981', to: '#3B82F6', icon: '🎵' },
                };
                const colors = colorMap[item.category] || colorMap['독서교육'];
                return (
                  <div className="rounded-2xl overflow-hidden">
                    <div
                      className="aspect-video flex flex-col items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                    >
                      <span className="text-8xl mb-4">{colors.icon}</span>
                      <span className="text-white font-bold text-2xl">{item.caption}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 text-center">
                      <p className="font-bold text-slate-900 dark:text-white">{item.caption}</p>
                      <p className="text-sm text-slate-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
