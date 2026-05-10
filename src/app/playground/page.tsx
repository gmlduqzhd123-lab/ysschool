'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Star, Sparkles, ArrowRight, RotateCcw, Send, Lightbulb, Trophy, Rocket } from 'lucide-react';
import Link from 'next/link';

// ========== 레벨 데이터 ==========
interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  badPrompt: string;
  templateParts: string[];    // 빈칸 사이의 텍스트 조각들
  blanks: number;
  hints: string[];            // 각 빈칸의 힌트 단어
  tip: string;
}

const levels: LevelData[] = [
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
    templateParts: ['너는 10년 차 ', '야. 초등학생이 이해하기 쉽게 ', '로 파이썬 기초를 설명해 줘.'],
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
    templateParts: ['', '로 움직이는 간단한 미로 찾기 게임 코드를 작성해 줘. 단, 코드는 ', ' 줄 이내로 짧게 작성하고 각 줄에 ', '을 달아줘.'],
    blanks: 3,
    hints: ['화살표 키', '50', '주석'],
    tip: '💡 "단, ~해줘"라고 조건을 걸면 AI가 규칙을 지켜서 답해줘요!',
  },
];

// ========== 진행 상태 바 ==========
function ProgressBar({ currentLevel, totalLevels, completed }: { currentLevel: number; totalLevels: number; completed: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: totalLevels }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{
              scale: i < currentLevel || (i === currentLevel && completed) ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl"
          >
            {i < currentLevel || (i === currentLevel && completed) ? '⭐' : '☆'}
          </motion.div>
          <span className={`text-xs font-bold ${
            i <= currentLevel ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
          }`}>
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
  onComplete,
}: {
  level: LevelData;
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
    }, 1200);
  };

  // 완성된 프롬프트 미리보기
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* 레벨 헤더 */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-6xl sm:text-7xl mb-4"
        >
          {level.emoji}
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          Level {level.id}: {level.title}
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
          {level.subtitle}
        </p>
      </div>

      {/* 나쁜 프롬프트 */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">😕</span>
          <span className="font-bold text-red-600 dark:text-red-400 text-sm sm:text-base">이렇게 물어보면...</span>
        </div>
        <p className="text-lg sm:text-xl font-bold text-red-700 dark:text-red-300 pl-8">
          &ldquo;{level.badPrompt}&rdquo;
        </p>
      </motion.div>

      {/* 빈칸 채우기 영역 */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🚀</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">이렇게 바꿔보자!</span>
        </div>

        <div className="flex flex-wrap items-center gap-1 text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-loose pl-8">
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
                    className="inline-block w-28 sm:w-36 px-3 py-2 text-center text-base sm:text-lg font-bold rounded-xl border-2 border-dashed border-amber-400 dark:border-amber-500 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 placeholder:text-amber-300 dark:placeholder:text-amber-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800 focus:outline-none transition-all disabled:opacity-60"
                  />
                  {!isSuccess && (
                    <button
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
                        className="absolute -top-12 left-0 z-10"
                      >
                        <button
                          onClick={() => applyHint(i)}
                          className="bg-amber-400 text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg hover:bg-amber-500 transition-colors whitespace-nowrap cursor-pointer"
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
          className="bg-sky-50 dark:bg-sky-950/30 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-5 sm:p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-sky-500" />
            <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">완성된 프롬프트 미리보기</span>
          </div>
          <p className="text-base sm:text-lg font-medium text-sky-800 dark:text-sky-200 pl-7">
            &ldquo;{buildPrompt()}&rdquo;
          </p>
        </motion.div>
      )}

      {/* 팁 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm sm:text-base text-slate-500 dark:text-slate-400 mb-8 bg-slate-100 dark:bg-slate-800/50 rounded-xl px-4 py-3"
      >
        {level.tip}
      </motion.p>

      {/* 액션 버튼 */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {isChecking ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full"
              />
              <p className="text-amber-600 dark:text-amber-400 font-bold text-lg">AI에게 전송 중...</p>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 text-center">
                성공! 훌륭한 프롬프트 엔지니어네요!
              </h3>
              <button
                onClick={onComplete}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                다음 레벨로! <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              whileHover={{ scale: allFilled ? 1.05 : 1 }}
              whileTap={{ scale: allFilled ? 0.95 : 1 }}
              onClick={handleSubmit}
              disabled={!allFilled}
              className={`flex items-center gap-3 font-extrabold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer ${
                allFilled
                  ? 'bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white hover:shadow-xl'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              AI에게 전송! 🚀
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ========== 메인 페이지 ==========
export default function PlaygroundPage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const handleLevelComplete = useCallback(() => {
    setLevelCompleted(true);
    if (currentLevel >= levels.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-navy p-2 rounded-lg group-hover:bg-brand-sky transition-colors duration-300">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-brand-navy dark:text-white tracking-tight">YSSCHOOL</span>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-slate-500 hover:text-brand-navy dark:hover:text-brand-sky transition-colors"
          >
            ← 메인으로
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-60 h-60 bg-amber-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 rounded-full px-5 py-2 mb-4"
          >
            <Rocket className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-bold text-amber-700 dark:text-amber-300">바이브 코딩 동아리</span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-white mb-3"
          >
            🤖 프롬프트 놀이터
          </motion.h1>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
          >
            AI에게 <strong className="text-amber-600 dark:text-amber-400">똑똑하게 질문하는 법</strong>을 빈칸 채우기 게임으로 배워보자!
          </motion.p>
        </div>
      </section>

      {/* 게임 영역 */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* 진행 바 */}
        <ProgressBar
          currentLevel={currentLevel}
          totalLevels={levels.length}
          completed={levelCompleted || allDone}
        />

        <AnimatePresence mode="wait">
          {allDone ? (
            /* 올 클리어 */
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-amber-200 dark:border-amber-700 p-8 sm:p-12 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl sm:text-8xl mb-6"
              >
                🏆
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mb-4">
                축하해요! 모든 레벨 클리어! 🎉
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                이제 여러분은 <strong className="text-amber-600 dark:text-amber-400">프롬프트 엔지니어</strong>예요!
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                AI에게 질문할 때 <strong>구체적</strong>으로, <strong>역할</strong>을 주고, <strong>조건</strong>을 걸면<br />
                훨씬 더 좋은 답을 받을 수 있다는 걸 기억하세요! 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-extrabold text-base px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  다시 도전하기
                </button>
                <Link
                  href="/showcase"
                  className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-base px-6 py-3.5 rounded-2xl transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  미니 웹앱 보러가기
                </Link>
              </div>
            </motion.div>
          ) : (
            /* 현재 레벨 */
            <div
              key={`level-${currentLevel}`}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-slate-100 dark:border-slate-700 p-6 sm:p-10"
            >
              <PromptLevel
                level={levels[currentLevel]}
                onComplete={handleLevelComplete}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
