'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Send,
  Lightbulb,
  Bot,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

// ========== 레벨 데이터 ==========
export interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  badPrompt: string;
  templateParts: string[]; // 빈칸 사이의 텍스트 조각들
  blanks: number;
  hints: string[]; // 각 빈칸의 힌트 단어
  tip: string;
}

export const promptLevels: LevelData[] = [
  {
    id: 1,
    title: '구체적으로 말하기',
    subtitle: '모호한 요청을 구체적인 요청으로 바꿔보자!',
    emoji: '🎨',
    badPrompt: '강아지 그려줘',
    templateParts: ['', ' 모자를 쓴 ', ' 강아지를 ', ' 스타일로 그려줘'],
    blanks: 3,
    hints: ['빨간', '귀여운', '3D 애니메이션'],
    tip: '💡 AI에게 색깔, 모양, 스타일을 알려주면 더 멋진 결과가 나와요!',
  },
  {
    id: 2,
    title: '역할 부여하기',
    subtitle: 'AI에게 역할을 주면 전문가처럼 답해줘요!',
    emoji: '🎭',
    badPrompt: '파이썬 알려줘',
    templateParts: [
      '너는 10년 차 ',
      '야. 초등학생이 이해하기 쉽게 ',
      '로 파이썬 기초를 설명해 줘.',
    ],
    blanks: 2,
    hints: ['코딩 선생님', '비유'],
    tip: '💡 AI에게 "너는 ~야"라고 역할을 주면 그 역할에 맞게 대답해줘요!',
  },
  {
    id: 3,
    title: '조건 걸기',
    subtitle: '조건을 걸면 원하는 형태로 받을 수 있어요!',
    emoji: '⚙️',
    badPrompt: '게임 코드 짜줘',
    templateParts: [
      '',
      '로 움직이는 간단한 미로 찾기 게임 코드를 작성해 줘. 단, 코드는 ',
      ' 줄 이내로 짧게 작성하고 각 줄에 ',
      '을 달아줘.',
    ],
    blanks: 3,
    hints: ['화살표 키', '50', '주석'],
    tip: '💡 "단, ~해줘"라고 조건을 걸면 AI가 규칙을 지켜서 답해줘요!',
  },
];

// ========== 진행 상태 바 ==========
function ProgressBar({
  currentLevel,
  totalLevels,
  completed,
}: {
  currentLevel: number;
  totalLevels: number;
  completed: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {Array.from({ length: totalLevels }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{
              scale: i < currentLevel || (i === currentLevel && completed) ? [1, 1.25, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl"
          >
            {i < currentLevel || (i === currentLevel && completed) ? '⭐' : '☆'}
          </motion.div>
          <span
            className={`text-xs font-extrabold ${
              i <= currentLevel ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
            }`}
          >
            Lv.{i + 1}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ========== 빈칸 채우기 레벨 ==========
function PromptLevel({
  level,
  isLast,
  onComplete,
}: {
  level: LevelData;
  isLast: boolean;
  onComplete: () => void;
}) {
  const [answers, setAnswers] = useState<string[]>(Array(level.blanks).fill(''));
  const [isChecking, setIsChecking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHints, setShowHints] = useState<boolean[]>(Array(level.blanks).fill(false));

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const toggleHint = (index: number) => {
    const newHints = [...showHints];
    newHints[index] = !newHints[index];
    setShowHints(newHints);
  };

  const applyHint = (index: number) => {
    updateAnswer(index, level.hints[index]);
    const newHints = [...showHints];
    newHints[index] = false;
    setShowHints(newHints);
  };

  const allFilled = answers.every((a) => a.trim().length > 0);

  const handleSubmit = () => {
    if (!allFilled) return;
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsSuccess(true);
    }, 1000);
  };

  const buildPrompt = () => {
    let result = '';
    for (let i = 0; i < level.templateParts.length; i++) {
      result += level.templateParts[i];
      if (i < level.blanks) {
        result += answers[i] || '___';
      }
    }
    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* 레벨 헤더 */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-5xl sm:text-6xl mb-3"
        >
          {level.emoji}
        </motion.div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-1.5">
          Level {level.id}: {level.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {level.subtitle}
        </p>
      </div>

      {/* 나쁜 프롬프트 */}
      <motion.div
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-4 sm:p-5 mb-5"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-lg">😕</span>
          <span className="font-bold text-red-600 dark:text-red-400 text-xs sm:text-sm">
            이렇게 물어보면...
          </span>
        </div>
        <p className="text-base sm:text-lg font-bold text-red-700 dark:text-red-300 pl-7">
          &ldquo;{level.badPrompt}&rdquo;
        </p>
      </motion.div>

      {/* 빈칸 채우기 영역 */}
      <motion.div
        initial={{ x: 15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 mb-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🚀</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
            이렇게 바꿔보자!
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-loose pl-2 sm:pl-7">
          &ldquo;
          {level.templateParts.map((part, i) => (
            <span key={i} className="inline-flex items-center gap-1 flex-wrap">
              <span>{part}</span>
              {i < level.blanks && (
                <span className="relative inline-flex items-center gap-1">
                  <input
                    type="text"
                    value={answers[i]}
                    onChange={(e) => updateAnswer(i, e.target.value)}
                    placeholder={`빈칸 ${i + 1}`}
                    disabled={isSuccess}
                    className="inline-block w-28 sm:w-36 px-2.5 py-1.5 text-center text-sm sm:text-base font-bold rounded-xl border-2 border-dashed border-amber-400 dark:border-amber-500 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 placeholder:text-amber-300 dark:placeholder:text-amber-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 focus:outline-none transition-all disabled:opacity-60"
                  />
                  {!isSuccess && (
                    <button
                      type="button"
                      onClick={() => toggleHint(i)}
                      className="flex-shrink-0 p-1.5 rounded-full bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800 text-amber-600 dark:text-amber-400 transition-colors cursor-pointer"
                      title="힌트 보기"
                    >
                      <Lightbulb className="w-4 h-4" />
                    </button>
                  )}
                  <AnimatePresence>
                    {showHints[i] && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.9 }}
                        className="absolute -top-10 left-0 z-10"
                      >
                        <button
                          type="button"
                          onClick={() => applyHint(i)}
                          className="bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-lg hover:bg-amber-500 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          💡 {level.hints[i]}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </span>
              )}
            </span>
          ))}
          &rdquo;
        </div>
      </motion.div>

      {/* 완성 프롬프트 미리보기 */}
      {allFilled && !isSuccess && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-5 mb-5"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span className="font-bold text-sky-600 dark:text-sky-400 text-xs sm:text-sm">
              완성된 프롬프트 미리보기
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium text-sky-800 dark:text-sky-200 pl-6">
            &ldquo;{buildPrompt()}&rdquo;
          </p>
        </motion.div>
      )}

      {/* 팁 */}
      <p className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-2.5">
        {level.tip}
      </p>

      {/* 액션 버튼 */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {isChecking ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
              <p className="text-amber-600 dark:text-amber-400 font-bold text-sm">
                AI에게 전송 중...
              </p>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="text-5xl animate-bounce">🎉</div>
              <h4 className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 text-center">
                성공! 훌륭한 프롬프트 엔지니어네요!
              </h4>
              <button
                type="button"
                onClick={onComplete}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-base px-7 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {isLast ? '결과 보기' : '다음 레벨로!'} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allFilled}
              className={`flex items-center gap-2 font-extrabold text-base px-7 py-3.5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer ${
                allFilled
                  ? 'bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white hover:shadow-xl hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>AI에게 전송! 🚀</span>
            </button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ========== 메인 컴포넌트 ==========
interface PromptPlaygroundSectionProps {
  showHeroHeader?: boolean;
}

export default function PromptPlaygroundSection({
  showHeroHeader = true,
}: PromptPlaygroundSectionProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const handleLevelComplete = useCallback(() => {
    setLevelCompleted(true);
    if (currentLevel >= promptLevels.length - 1) {
      setAllDone(true);
    } else {
      setLevelCompleted(false);
      setCurrentLevel((prev) => prev + 1);
    }
  }, [currentLevel]);

  const handleRestart = () => {
    setCurrentLevel(0);
    setLevelCompleted(false);
    setAllDone(false);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header Card */}
      {showHeroHeader && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-indigo-900 text-white p-6 sm:p-10 shadow-xl border border-amber-400/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold text-amber-100">
                <Bot className="w-3.5 h-3.5" />
                <span>학생·교사용 생성형 AI 실습 게임</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                🤖 AI 프롬프트 놀이터
              </h2>
              <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
                AI에게 <strong className="text-yellow-300">똑똑하게 질문하는 법</strong>을 3단계
                빈칸 채우기 게임으로 즐겁게 배워보세요! 구체성·역할·조건을 부여하면 AI가 훨씬 놀라운
                답변을 선사합니다.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/playground"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-sm hover:bg-amber-50 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4 text-orange-600" />
                <span>전체화면 새 창</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 게임 인터랙티브 카드 */}
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        {/* 진행 바 */}
        <ProgressBar
          currentLevel={currentLevel}
          totalLevels={promptLevels.length}
          completed={levelCompleted || allDone}
        />

        <AnimatePresence mode="wait">
          {allDone ? (
            /* 올 클리어 */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border-2 border-amber-300 dark:border-amber-600 p-8 sm:p-12 text-center"
            >
              <div className="text-6xl sm:text-7xl mb-4">🏆</div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mb-3">
                축하합니다! 모든 레벨 클리어! 🎉
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">
                이제 여러분은 멋진 <strong className="text-amber-500">프롬프트 엔지니어</strong>
                예요!
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto">
                AI에게 질문할 때 <strong>구체적으로</strong>, <strong>역할을 주고</strong>,{' '}
                <strong>조건을 걸면</strong> 훨씬 더 유용한 답변을 얻을 수 있음을 잊지 마세요! 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>처음부터 다시 도전하기</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* 현재 진행 레벨 */
            <div
              key={`level-${currentLevel}`}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10"
            >
              <PromptLevel
                level={promptLevels[currentLevel]}
                isLast={currentLevel >= promptLevels.length - 1}
                onComplete={handleLevelComplete}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
