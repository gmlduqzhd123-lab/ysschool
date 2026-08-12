'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, X } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  youtubeId: string;
}

const tracks: Track[] = [
  { title: '아름다운 나라', artist: '아카라카', youtubeId: '' },
  { title: '봄이 오면', artist: '아카라카', youtubeId: '' },
  { title: '여수 밤바다', artist: '아카라카', youtubeId: '' },
  { title: '꿈을 모아서', artist: '아카라카', youtubeId: '' },
  { title: '우리의 노래', artist: '아카라카', youtubeId: '' },
];

export default function MiniPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const nextTrack = () => {
    setCurrentTrack(prev => (prev + 1) % tracks.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Floating Music Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 left-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg flex items-center justify-center cursor-pointer hover:shadow-purple-500/40 transition-shadow"
            aria-label="음악 플레이어 열기"
          >
            <Music className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mini Player Bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-8 z-50 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Header gradient */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm truncate max-w-[150px]">{tracks[currentTrack].title}</p>
                  <p className="text-white/70 text-xs">{tracks[currentTrack].artist}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress bar (decorative) */}
            <div className="h-1 bg-slate-200 dark:bg-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={isPlaying ? { width: ['0%', '100%'] } : {}}
                transition={isPlaying ? { duration: 180, repeat: Infinity, ease: 'linear' } : {}}
                style={{ width: isPlaying ? undefined : '0%' }}
              />
            </div>

            {/* Controls */}
            <div className="px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                )}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </button>
              </div>

              {/* Track indicator */}
              <div className="flex gap-1">
                {tracks.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTrack(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                      idx === currentTrack ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="px-4 pb-3">
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                🎵 아카라카 아카펠라 ·  데모 플레이어
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
