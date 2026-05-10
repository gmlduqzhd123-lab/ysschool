'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  // YouTube embed URL for background audio (looped)
  const videoId = 'sYe-RMXn3KI';

  // Initialize the hidden YouTube iframe for audio
  useEffect(() => {
    // We'll use a YouTube iframe approach but with proper API
    const iframe = document.createElement('iframe');
    iframe.id = 'bgm-iframe';
    iframe.width = '0';
    iframe.height = '0';
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.allow = 'autoplay';
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&loop=1&playlist=${videoId}&controls=0`;
    iframe.title = 'BGM';
    document.body.appendChild(iframe);

    // Store reference
    audioRef.current = iframe as unknown as HTMLAudioElement;

    return () => {
      const el = document.getElementById('bgm-iframe');
      if (el) el.remove();
    };
  }, [videoId]);

  // Post message to control YouTube iframe
  const postCommand = useCallback((command: string) => {
    const iframe = document.getElementById('bgm-iframe') as HTMLIFrameElement | null;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    }
  }, []);

  // Try to autoplay on first user interaction
  useEffect(() => {
    const attemptAutoPlay = () => {
      if (hasAutoPlayed.current) return;
      hasAutoPlayed.current = true;

      // Small delay to ensure iframe is loaded
      setTimeout(() => {
        postCommand('playVideo');
        setIsPlaying(true);
      }, 800);
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach((evt) =>
      document.addEventListener(evt, attemptAutoPlay, { once: true, passive: true })
    );

    return () => {
      events.forEach((evt) =>
        document.removeEventListener(evt, attemptAutoPlay)
      );
    };
  }, [postCommand]);

  // Show tooltip on first load to guide user
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      postCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postCommand('playVideo');
      setIsPlaying(true);
      hasAutoPlayed.current = true;
    }
    setShowTooltip(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-8 left-8 z-[100] flex items-end gap-3">
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
          onClick={togglePlay}
          className="relative p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label={isPlaying ? '배경음악 끄기' : '배경음악 켜기'}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 className="w-6 h-6 text-brand-sky" />
              {/* Pulsing indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-sky" />
              </span>
            </div>
          ) : (
            <VolumeX className="w-6 h-6 text-slate-400" />
          )}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap pointer-events-none"
            >
              🎵 클릭하면 힐링 음악이 재생돼요
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
