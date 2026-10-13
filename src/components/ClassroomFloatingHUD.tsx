'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Timer, Dices, Trophy, PenTool, Sunrise, Share2 } from 'lucide-react';
import Link from 'next/link';
import ClassroomToolsModal from './ClassroomToolsModal';
import TeacherShareModal from './TeacherShareModal';

export default function ClassroomFloatingHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<'timer' | 'picker' | 'scoreboard' | 'canvas'>('timer');
  const [isHovered, setIsHovered] = useState(false);

  // Alt + C 단축키로 어디서든 즉시 토글
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openWithTab = (tab: 'timer' | 'picker' | 'scoreboard' | 'canvas') => {
    setDefaultTab(tab);
    setIsOpen(true);
  };

  return (
    <>
      {/* 화면 우하단 고정 플로팅 수업 HUD 런처 (ScrollToTopButton 위쪽) */}
      <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-8 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 p-1.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl text-white"
            >
              <Link
                href="/morning"
                className="flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-emerald-500/20 text-xs font-bold text-emerald-400 transition-colors cursor-pointer"
                title="아침맞이 전자칠판 데스크 열기"
              >
                <Sunrise className="w-3.5 h-3.5 text-emerald-400" />
                <span>아침데스크</span>
              </Link>
              <button
                type="button"
                onClick={() => openWithTab('timer')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="수업 타이머 열기"
              >
                <Timer className="w-3.5 h-3.5 text-brand-sky" />
                <span>타이머</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('picker')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="발표자 뽑기 열기"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400" />
                <span>뽑기</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('scoreboard')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="모둠 점수판 열기"
              >
                <Trophy className="w-3.5 h-3.5 text-orange-400" />
                <span>점수판</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('canvas')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="퀵 판서 열기"
              >
                <PenTool className="w-3.5 h-3.5 text-emerald-400" />
                <span>판서</span>
              </button>
              <button
                type="button"
                onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold text-sky-300 transition-colors cursor-pointer"
                title="교사 메신저 공유 & 바로가기 안내"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-300" />
                <span>공유</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setDefaultTab('timer');
            setIsOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/95 hover:bg-slate-900 dark:bg-slate-800/95 dark:hover:bg-slate-800 text-white shadow-2xl border border-slate-700/70 backdrop-blur-md transition-all cursor-pointer group"
          title="교실 전자칠판 수업 도구 (단축키 Alt+C)"
          aria-label="수업 대시보드 열기"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-sky to-brand-navy flex items-center justify-center text-white shadow-sm">
            <Monitor className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-extrabold tracking-tight group-hover:text-brand-sky transition-colors hidden sm:inline">
            수업 HUD
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono hidden md:inline">
            Alt+C
          </span>
        </motion.button>
      </div>

      {/* 스마트 수업 도구 모달 */}
      <ClassroomToolsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultTab={defaultTab}
      />

      {/* 교사 공유 & 바탕화면 바로가기 모달 */}
      <TeacherShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />
    </>
  );
}
