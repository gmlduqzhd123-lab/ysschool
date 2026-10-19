'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  text: string;
  href: string;
  date: string;
  badge?: string;
}

const NEWS_ITEMS: NewsItem[] = [
  { id: 'news-1', text: '아침 맞이 교실 데스크 – 전자칠판 전용 무광고 풀스크린', href: '/morning', date: '2026-10', badge: 'NEW' },
  { id: 'news-2', text: '100종 배움게임 PIN 시스템 업데이트', href: '/showcase#learning-games', date: '2026-10', badge: 'UPDATE' },
  { id: 'news-3', text: '엽쌤 제작 수업 자료 나눔 오픈', href: '/materials', date: '2026-10', badge: 'NEW' },
];

const DISMISS_KEY = 'ysschool-news-dismissed';

export default function NewsBanner() {
  const [visible, setVisible] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISS_KEY);
    const today = new Date().toISOString().slice(0, 10);
    if (dismissed !== today) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setCurrentIdx((p) => (p + 1) % NEWS_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, new Date().toISOString().slice(0, 10));
  };

  if (!visible) return null;

  const item = NEWS_ITEMS[currentIdx];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto pl-3 pr-9 sm:px-10 py-2 flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 sm:gap-2 min-w-0"
            >
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-black uppercase shrink-0">
                  {item.badge}
                </span>
              )}
              <Link href={item.href} className="font-semibold hover:underline underline-offset-2 truncate">
                {item.text}
              </Link>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={dismiss}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
            aria-label="닫기"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
