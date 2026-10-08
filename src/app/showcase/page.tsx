'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Rocket, Play, X,
  Music, Image as ImageIcon, FileText, ChevronDown, Pause,
  Sparkles, LayoutGrid
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MiniAppsGrid from '@/components/showcase/MiniAppsGrid';
import LearningGamesHub from '@/components/showcase/LearningGamesHub';
import {
  sunoData, canvaData, notebookData, padletData,
} from '@/data/showcaseData';

type Tab = 'games' | 'apps' | 'gallery';
type GallerySub = 'suno' | 'canva' | 'notebook' | 'padlet';

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<Tab>('games');
  const [gallerySub, setGallerySub] = useState<GallerySub>('suno');
  const [iframeModal, setIframeModal] = useState<{ url: string; title: string } | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [expandedNotebook, setExpandedNotebook] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('learning-games') || hash.includes('games')) {
        setActiveTab('games');
      } else if (hash.includes('apps')) {
        setActiveTab('apps');
      } else if (hash.includes('gallery')) {
        setActiveTab('gallery');
      }
    }
  }, []);

  useEffect(() => {
    const modalOpen = Boolean(iframeModal || lightboxImg);
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIframeModal(null);
      setLightboxImg(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [iframeModal, lightboxImg]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
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
            교실에서 탄생한 100종 배움게임과 에듀테크 콘텐츠를 직접 체험해보세요.
          </motion.p>
        </div>
      </motion.section>

      {/* Tab Buttons */}
      <div className="sticky top-16 lg:top-[4.5rem] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 grid grid-cols-3 gap-2 py-3 sm:py-4">
          {([
            { key: 'games' as Tab, label: '🎮 100종 배움게임', icon: Gamepad2 },
            { key: 'apps' as Tab, label: '🚀 교실 미니 웹앱', icon: Sparkles },
            { key: 'gallery' as Tab, label: '🎨 에듀테크 갤러리', icon: Rocket },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-brand-navy dark:bg-brand-sky text-white dark:text-slate-900 shadow-lg shadow-brand-navy/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <LearningGamesHub />
            </motion.div>
          )}

          {activeTab === 'apps' && (
            <motion.div
              key="apps"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mini Apps Grid */}
              <MiniAppsGrid onPreview={(app) => setIframeModal(app)} />
            </motion.div>
          )}

          {activeTab === 'gallery' && (
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
                  { key: 'padlet' as GallerySub, label: '📌 패들렛 아카이빙', icon: LayoutGrid },
                ]).map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setGallerySub(sub.key)}
                    aria-pressed={gallerySub === sub.key}
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
                  >
                    {sunoData.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sunoData.map((song, i) => (
                          <SunoCard key={song.id} song={song} delay={i * 0.1} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState icon="🎵" title="Suno AI 음악" description="AI로 작곡한 교육용 음악 콘텐츠가 준비되면 이곳에 공개됩니다." />
                    )}
                  </motion.div>
                )}

                {/* ===== CANVA ===== */}
                {gallerySub === 'canva' && (
                  <motion.div
                    key="canva"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    {canvaData.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {canvaData.map((item, i) => (
                          <motion.button
                            type="button"
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group w-full text-left cursor-pointer bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
                            onClick={() => setLightboxImg(item.image)}
                            aria-label={`${item.title} 이미지 크게 보기`}
                          >
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <EmptyState icon="🎨" title="Canva 시각 자료" description="Canva로 제작한 교육용 포스터와 시각 자료가 준비되면 이곳에 공개됩니다." />
                    )}
                  </motion.div>
                )}

                {/* ===== NotebookLM ===== */}
                {gallerySub === 'notebook' && (
                  <motion.div
                    key="notebook"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    {notebookData.length > 0 ? (
                      <div className="space-y-4 max-w-3xl">
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
                              aria-expanded={expandedNotebook === item.id}
                              aria-controls={`notebook-panel-${item.id}`}
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
                                  <div id={`notebook-panel-${item.id}`} className="px-5 pb-5 pt-0">
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
                      </div>
                    ) : (
                      <EmptyState icon="📝" title="NotebookLM 결과물" description="NotebookLM으로 분석·정리한 교육 자료가 준비되면 이곳에 공개됩니다." />
                    )}
                  </motion.div>
                )}

                {/* ===== Padlet ===== */}
                {gallerySub === 'padlet' && (
                  <motion.div
                    key="padlet"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    {padletData.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {padletData.map((item, i) => (
                          <motion.a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
                          >
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-5">
                              <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    ) : (
                      <EmptyState icon="📌" title="패들렛 아카이빙" description="교육 현장에서 활용한 패들렛 자료가 준비되면 이곳에 공개됩니다." />
                    )}
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
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
            onClick={() => setIframeModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white dark:bg-slate-900 rounded-none sm:rounded-2xl shadow-2xl w-full max-w-4xl h-[100dvh] sm:h-auto max-h-[100dvh] sm:max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${iframeModal.title} 미리보기`}
            >
              <div className="flex items-center justify-between gap-3 p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="min-w-0 truncate font-bold text-base sm:text-lg text-slate-900 dark:text-white">{iframeModal.title}</h3>
                <button
                  onClick={() => setIframeModal(null)}
                  className="shrink-0 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="미리보기 닫기"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <iframe
                src={iframeModal.url}
                title={iframeModal.title}
                loading="lazy"
                className="w-full border-0 h-[calc(100dvh-61px)] sm:h-[calc(90vh-70px)]"
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
            role="dialog"
            aria-modal="true"
            aria-label="이미지 확대 보기"
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
              aria-label="확대 이미지 닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

// ===== Suno Audio Card Component =====
function SunoCard({ song, delay }: { song: typeof sunoData[0]; delay: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !song.audioUrl) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
    >
      {song.audioUrl && (
        <audio
          ref={audioRef}
          src={song.audioUrl}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
          onTimeUpdate={(event) => {
            const audio = event.currentTarget;
            setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
          }}
        />
      )}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={song.coverArt}
          alt={song.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          type="button"
          onClick={() => void togglePlayback()}
          disabled={!song.audioUrl}
          aria-label={song.audioUrl ? (isPlaying ? `${song.title} 일시정지` : `${song.title} 재생`) : `${song.title} 음원 준비 중`}
          className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-brand-orange/90 hover:bg-brand-orange flex items-center justify-center text-white shadow-xl shadow-brand-orange/30 transform hover:scale-110 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
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
        <div className="mt-4 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-sky to-brand-orange rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        {!song.audioUrl && (
          <p className="text-[10px] text-slate-400 mt-2 text-center italic">🎵 음원은 준비 중입니다</p>
        )}
      </div>
    </motion.div>
  );
}

// ===== Empty State Placeholder =====
function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">{description}</p>
      <div className="mt-8 inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium px-5 py-2.5 rounded-full">
        <Sparkles className="w-4 h-4" />
        콘텐츠 준비 중
      </div>
    </div>
  );
}
