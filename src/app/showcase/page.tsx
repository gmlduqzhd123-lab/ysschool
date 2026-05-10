'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Rocket, Play, X, ExternalLink,
  Music, Image as ImageIcon, FileText, ChevronDown, Pause,
  Sparkles, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import {
  miniAppsData, sunoData, canvaData, notebookData,
} from '@/data/showcaseData';

type Tab = 'apps' | 'gallery';
type GallerySub = 'suno' | 'canva' | 'notebook';

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<Tab>('apps');
  const [gallerySub, setGallerySub] = useState<GallerySub>('suno');
  const [iframeModal, setIframeModal] = useState<{ url: string; title: string } | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [expandedNotebook, setExpandedNotebook] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-navy p-2 rounded-lg group-hover:bg-brand-sky transition-colors duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-brand-navy dark:text-white tracking-tight">YSSCHOOL</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-brand-navy dark:hover:text-brand-sky transition-colors"
          >
            ← 메인으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1d3d 0%, #1a2f5e 50%, #0c1a38 100%)' }}
      >
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-sky-300" />
            <span className="text-sm font-medium text-sky-200">Edutech Showcase</span>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            에듀테크 쇼케이스
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            교실에서 탄생한 미니 웹앱과 AI를 활용한 교육 콘텐츠를 직접 체험해보세요.
          </motion.p>
        </div>
      </motion.section>

      {/* Tab Buttons */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 py-4">
          {([
            { key: 'apps' as Tab, label: '🎮 미니 웹앱 공간', icon: Gamepad2 },
            { key: 'gallery' as Tab, label: '🎨 에듀테크 갤러리', icon: Rocket },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {activeTab === 'apps' ? (
            <motion.div
              key="apps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mini Apps Grid */}
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
                      <img
                        src={app.thumbnail}
                        alt={app.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                          onClick={() => setIframeModal({ url: app.appUrl, title: app.title })}
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
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Gallery Sub-Tabs */}
              <div className="flex gap-3 mb-10 flex-wrap">
                {([
                  { key: 'suno' as GallerySub, label: '🎵 Suno AI 음악', icon: Music },
                  { key: 'canva' as GallerySub, label: '🎨 Canva 시각 자료', icon: ImageIcon },
                  { key: 'notebook' as GallerySub, label: '📝 NotebookLM', icon: FileText },
                ]).map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setGallerySub(sub.key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                      gallerySub === sub.key
                        ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <sub.icon className="w-4 h-4" />
                    {sub.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* ===== SUNO AI ===== */}
                {gallerySub === 'suno' && (
                  <motion.div
                    key="suno"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {sunoData.map((song, i) => (
                      <SunoCard key={song.id} song={song} delay={i * 0.1} />
                    ))}
                  </motion.div>
                )}

                {/* ===== CANVA ===== */}
                {gallerySub === 'canva' && (
                  <motion.div
                    key="canva"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {canvaData.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
                        onClick={() => setLightboxImg(item.image)}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                              <ImageIcon className="w-5 h-5 text-slate-700" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* ===== NotebookLM ===== */}
                {gallerySub === 'notebook' && (
                  <motion.div
                    key="notebook"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-4 max-w-3xl"
                  >
                    {notebookData.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                      >
                        <button
                          onClick={() => setExpandedNotebook(expandedNotebook === item.id ? null : item.id)}
                          className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                        >
                          <span className="text-3xl">{item.icon}</span>
                          <div className="flex-grow">
                            <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">NotebookLM AI 분석 결과물</p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                              expandedNotebook === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedNotebook === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-0">
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                  {item.summary}
                                </p>
                                {item.link !== '#' && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy dark:text-brand-sky hover:underline"
                                  >
                                    <FileText className="w-4 h-4" />
                                    전체 자료 보기
                                  </a>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Iframe Modal */}
      <AnimatePresence>
        {iframeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIframeModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{iframeModal.title}</h3>
                <button
                  onClick={() => setIframeModal(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <iframe
                src={iframeModal.url}
                title={iframeModal.title}
                className="w-full border-0"
                style={{ height: 'calc(90vh - 70px)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightboxImg}
              alt="확대 이미지"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== Suno Audio Card Component =====
function SunoCard({ song, delay }: { song: typeof sunoData[0]; delay: number }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={song.coverArt}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Play/Pause Overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-brand-orange/90 hover:bg-brand-orange flex items-center justify-center text-white shadow-xl shadow-brand-orange/30 transform hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-1" />
          )}
        </button>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-slate-900 dark:text-white mb-1">{song.title}</h4>
        <p className="text-xs text-brand-sky font-medium mb-2">{song.artist}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{song.description}</p>
        {/* Simple progress bar placeholder */}
        <div className="mt-4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-brand-sky to-brand-orange rounded-full transition-all duration-1000 ${
              isPlaying ? 'w-2/3' : 'w-0'
            }`}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center italic">
          {song.audioUrl ? '' : '🎵 음원은 준비 중입니다'}
        </p>
      </div>
    </motion.div>
  );
}
