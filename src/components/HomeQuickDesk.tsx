'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Timer,
  FileText,
  Wrench,
  ArrowRight,
  Sparkles,
  Play,
} from 'lucide-react';
import Link from 'next/link';
import ClassroomToolsModal from './ClassroomToolsModal';
import StudentPinModal from './StudentPinModal';

export default function HomeQuickDesk() {
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [toolsDefaultTab, setToolsDefaultTab] = useState<'timer' | 'picker'>('timer');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [homePinInput, setHomePinInput] = useState('');

  const handleOpenTools = (tab: 'timer' | 'picker') => {
    setToolsDefaultTab(tab);
    setIsToolsModalOpen(true);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homePinInput.trim()) {
      setIsPinModalOpen(true);
    }
  };

  return (
    <section className="relative z-10 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800/80"
      >
        {/* Top Banner & Student PIN Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-amber-500 uppercase">
                  Classroom Quick Desk
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                  선생님 빠른 준비
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                오늘 수업에 바로 쓰는 교실 바로가기
              </h2>
            </div>
          </div>

          {/* Student Fast PIN Bar */}
          <form
            onSubmit={handlePinSubmit}
            className="w-full lg:w-auto flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-2 px-3 text-slate-500 dark:text-slate-400 text-xs font-bold whitespace-nowrap">
              <Gamepad2 className="w-4 h-4 text-emerald-500" />
              <span>학생 게임 PIN:</span>
            </div>
            <input
              type="text"
              maxLength={4}
              value={homePinInput}
              onChange={(e) => setHomePinInput(e.target.value)}
              placeholder="예: 001"
              className="w-24 text-center font-mono font-bold text-sm bg-white dark:bg-slate-700 py-1.5 px-2 rounded-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-brand-sky"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>입장</span>
            </button>
          </form>
        </div>

        {/* 4 Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* 1. 100종 배움게임 */}
          <Link
            href="/showcase#learning-games"
            className="group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-slate-800/80 dark:to-slate-800/40 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                100종 무설치 게임
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                배움게임월드
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                국·수·사·과 개념을 익히는 단원별 미니게임 모음
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>게임 둘러보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 2. 전자칠판 교실 도구 (타이머 & 룰렛) */}
          <div
            onClick={() => handleOpenTools('timer')}
            className="group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-slate-800/80 dark:to-slate-800/40 border border-amber-100 dark:border-amber-900/30 hover:border-amber-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Timer className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">
                전자칠판 전용 도구
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                수업 타이머 & 뽑기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                집중 타이머와 발표자·모둠 추첨 룰렛 위젯
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>도구 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenTools('picker');
                }}
                className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/40 text-[10px] font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-200"
              >
                룰렛 바로가기
              </button>
            </div>
          </div>

          {/* 3. 연수 자료 & PPT */}
          <Link
            href="/training"
            className="group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-blue-900/30 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                연수 강의안·서식
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                연수 자료실
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                학생성장 수업·평가·기록, AI 디지털선도 PPT 다운로드
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>자료실 바로가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* 4. 추천 에듀테크 도구함 */}
          <Link
            href="/tools"
            className="group flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-slate-800/80 dark:to-slate-800/40 border border-purple-100 dark:border-purple-900/30 hover:border-purple-500/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                교실 추천 에듀테크
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                에듀테크 도구함
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                자작자작, 투닝, 캔바, 띵커벨 등 검증된 교실 툴 모음
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 mt-4 group-hover:translate-x-1 transition-transform">
              <span>도구 모음 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Classroom Tools Modal */}
      <ClassroomToolsModal
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
        defaultTab={toolsDefaultTab}
      />

      {/* Student PIN Modal */}
      <StudentPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        initialPin={homePinInput}
      />
    </section>
  );
}
