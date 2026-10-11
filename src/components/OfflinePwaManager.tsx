'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, X } from 'lucide-react';

export default function OfflinePwaManager() {
  const [isOffline, setIsOffline] = useState(false);
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 1. Service Worker 등록
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .catch((err) => {
            console.warn('[SW Registration Failed]', err);
          });
      });
    }

    // 2. 온라인/오프라인 네트워크 이벤트 리스너
    const handleOnline = () => {
      setIsOffline(false);
      setShowOnlineToast(true);
      const timer = setTimeout(() => setShowOnlineToast(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setDismissed(false);
    };

    // 초기 상태 체크
    if (typeof window !== 'undefined' && !navigator.onLine) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* 1. 오프라인 모드 안내 배너 */}
      <AnimatePresence>
        {isOffline && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 inset-x-0 z-[300] bg-slate-900/95 border-b border-amber-500/40 text-white px-4 py-2.5 backdrop-blur-md shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                  <WifiOff className="w-4 h-4" />
                </span>
                <span className="font-bold text-amber-300">오프라인 모드:</span>
                <span className="text-slate-300">
                  인터넷 연결이 끊어졌지만, 캐시된 수업 도구와 배움게임은 정상 동작합니다.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. 온라인 재연결 토스트 알림 */}
      <AnimatePresence>
        {showOnlineToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold"
          >
            <Wifi className="w-4 h-4" />
            <span>네트워크가 다시 연결되었습니다.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
