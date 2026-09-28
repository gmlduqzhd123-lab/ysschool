'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import { miniAppsData } from '@/data/showcaseData';

interface MiniAppsGridProps {
  onPreview: (app: { url: string; title: string }) => void;
}

export default function MiniAppsGrid({ onPreview }: MiniAppsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {miniAppsData.map((app, i) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={app.thumbnail}
              alt={app.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
              {app.techStack.map((tech) => (
                <span key={tech} className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">{app.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-5 text-sm leading-relaxed">{app.description}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onPreview({ url: app.appUrl, title: app.title })}
                className="flex items-center gap-2 bg-brand-navy hover:bg-brand-sky text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                체험하기
              </button>
              <a
                href={app.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                새 창
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
