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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showQuickBar = isHovered || isMenuOpen;

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

  // 외부 클릭 시 모바일 퀵메뉴 닫기
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#classroom-hud-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const openWithTab = (tab: 'timer' | 'picker' | 'scoreboard' | 'canvas') => {
    setDefaultTab(tab);
    setIsOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 화면 우하단 고정 플로팅 수업 HUD 런처 (ScrollToTopButton 위쪽) */}
      <div
        id="classroom-hud-container"
        className="fixed bottom-24 right-3 sm:right-6 md:right-8 z-40 flex flex-col items-end gap-2 pointer-events-auto"
      >
        <AnimatePresence>
          {showQuickBar && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap max-w-[calc(100vw-1.5rem)] sm:max-w-none items-center justify-end gap-1 sm:gap-1.5 p-1.5 bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl text-white"
            >
              <Link
                href="/morning"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl hover:bg-emerald-500/20 text-xs font-bold text-emerald-400 transition-colors cursor-pointer"
                title="아침맞이 전자칠판 데스크 열기"
              >
                <Sunrise className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">아침데스크</span>
              </Link>
              <button
                type="button"
                onClick={() => openWithTab('timer')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="수업 타이머 열기"
              >
                <Timer className="w-3.5 h-3.5 text-brand-sky shrink-0" />
                <span className="whitespace-nowrap">타이머</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('picker')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="발표자 뽑기 열기"
              >
                <Dices className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">뽑기</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('scoreboard')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="모둠 점수판 열기"
              >
                <Trophy className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="whitespace-nowrap">점수판</span>
              </button>
              <button
                type="button"
                onClick={() => openWithTab('canvas')}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold transition-colors cursor-pointer"
                title="퀵 판서 열기"
              >
                <PenTool className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">판서</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsShareOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-white/10 text-xs font-bold text-sky-300 transition-colors cursor-pointer"
                title="교사 메신저 공유 & 바로가기 안내"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                <span className="whitespace-nowrap">공유</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 640) {
              setIsMenuOpen((prev) => !prev);
            } else {
              openWithTab('timer');
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-slate-900/95 hover:bg-slate-900 dark:bg-slate-800/95 dark:hover:bg-slate-800 text-white shadow-2xl border border-slate-700/70 backdrop-blur-md transition-all cursor-pointer group"
          title="교실 전자칠판 수업 도구 (단축키 Alt+C)"
          aria-label="수업 대시보드 열기"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-sky to-brand-navy flex items-center justify-center text-white shadow-sm shrink-0">
            <Monitor className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-extrabold tracking-tight group-hover:text-brand-sky transition-colors hidden min-[360px]:inline">
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
