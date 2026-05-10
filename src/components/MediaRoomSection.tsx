'use client';

import { motion } from 'framer-motion';
import { mediaData } from '../data/dummyData';
import Image from 'next/image';
import { Play } from 'lucide-react';

export default function MediaRoomSection() {
  return (
    <section id="media-room" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-navy/20 blur-[100px] -z-10 rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-sky/10 blur-[100px] -z-10 rounded-full mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Media Room</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            영상 갤러리
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 break-keep">
            글로 다 담지 못하는 생생한 아이들의 표정과, 교육 현장의 온기를 영상으로 전합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaData.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-lg ring-1 ring-white/10 group-hover:ring-brand-sky/50 transition-all duration-300">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    unoptimized={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-orange/80 backdrop-blur-sm flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-brand-orange/30">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 text-xs font-medium rounded-md">
                    {video.duration}
                  </div>
                </div>
                <h4 className="text-lg font-semibold group-hover:text-brand-sky transition-colors duration-200 line-clamp-2">
                  {video.title}
                </h4>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
