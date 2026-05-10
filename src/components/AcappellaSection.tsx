'use client';

import { motion } from 'framer-motion';
import { acappellaData } from '../data/cvData';
import { Music, Play } from 'lucide-react';

export default function AcappellaSection() {
  return (
    <section id="acappella" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
              <Music className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">A Cappella</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            아카펠라 공연 영상
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            목소리만으로 빚어내는 아름다운 하모니. 2024 대한민국글로컬박람회 축하 공연 등 85회 이상의 무대에서 교학상장의 마음을 노래했습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {acappellaData.map((video, index) => {
            // 간단하게 유튜브 URL에서 썸네일 추출 (watch?v= 또는 youtu.be/)
            let videoId = '';
            if (video.url.includes('youtube.com/watch?v=')) {
              videoId = video.url.split('v=')[1].split('&')[0];
            } else if (video.url.includes('youtu.be/')) {
              videoId = video.url.split('youtu.be/')[1].split('?')[0];
            }
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-slate-50 dark:bg-slate-800"
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden w-full">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-orange/80 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-brand-orange/30">
                      <Play className="w-6 h-6 text-white ml-1 fill-current" />
                    </div>
                  </div>
                </a>
                <div className="p-5">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {video.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
