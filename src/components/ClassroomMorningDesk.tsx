'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Music,
  Dices,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  Home,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import {
  startAmbientSound,
  stopAmbientSound,
  setAmbientVolume,
} from '@/lib/webAudioAmbient';
import MorningSchoolMealCard from './MorningSchoolMealCard';

type DeskTheme = 'chalkboard' | 'slate' | 'whiteboard';

// 전자칠판 글씨 크기 6단계 프리셋
const FONT_SIZES = [
  'text-base sm:text-lg leading-relaxed',
  'text-lg sm:text-xl leading-relaxed',
  'text-xl sm:text-2xl leading-relaxed font-medium',
  'text-2xl sm:text-3xl leading-relaxed font-semibold',
  'text-3xl sm:text-4xl leading-relaxed font-bold',
  'text-4xl sm:text-5xl leading-snug font-extrabold',
];

const TEMPLATES = [
  {
    label: '📖 아침 독서의 날',
    content: `☀️ 1. 친구들과 눈 맞추며 다정하게 아침 인사 나누기\n📚 2. 좋아하는 책을 꺼내 15분간 조용히 몰입 독서하기\n📝 3. 독서 통장에 오늘 읽은 책 제목과 인상 깊은 한 줄 적기\n🎒 4. 1교시 수업 책과 필기구를 책상 위에 미리 올려두기`,
  },
  {
    label: '🎒 과제 제출 & 준비',
    content: `☀️ 1. 외투와 가방을 사물함에 바르게 정리하기\n📥 2. 어제 숙제와 안내장을 제출 바구니에 바르게 넣기\n✏️ 3. 연필 3자루 깎아두고 1교시 교과서 펼치기\n🌱 4. 교실 창문 열어 신선한 아침 공기 환기하기`,
  },
  {
    label: '🌈 활기찬 하루 시작',
    content: `☀️ 1. 짝꿍에게 "오늘 하루도 힘내자!" 밝게 인사하기\n🎯 2. 오늘 하루 내가 실천할 작은 친절 한 가지 정하기\n🥛 3. 물 한 잔 마시고 바른 자세로 자리에 앉기\n💡 4. 오늘의 질문: 오늘 학교에서 가장 기대되는 것은?`,
  },
];

// 차임벨 소리 (타이머 종료 시)
function playCompletionChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.0);
    });
  } catch {
    // 오디오 미지원 시 무시
  }
}

export default function ClassroomMorningDesk() {
  // 테마 상태
  const [theme, setTheme] = useState<DeskTheme>('chalkboard');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 실시간 시계 & 날짜
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentTime(new Date()), 0);
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // 칠판 알림판 내용 (localStorage 보관)
  const [noticeText, setNoticeText] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ysschool_morning_notice');
      if (saved) return saved;
    }
    return TEMPLATES[0].content;
  });
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ysschool_morning_notice_fontsize');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed < FONT_SIZES.length) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return 1; // 2단계 (text-lg sm:text-xl) 기본
  });
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [isBoardMaximized, setIsBoardMaximized] = useState(false);

  // ESC 키로 알림판 전체화면 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBoardMaximized) {
        setIsBoardMaximized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBoardMaximized]);

  const updateFontSize = (level: number) => {
    const clamped = Math.max(0, Math.min(FONT_SIZES.length - 1, level));
    setFontSizeLevel(clamped);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ysschool_morning_notice_fontsize', String(clamped));
      } catch {
        // ignore
      }
    }
  };

  const handleNoticeChange = (text: string) => {
    setNoticeText(text);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ysschool_morning_notice', text);
      setIsSavedRecently(true);
      setTimeout(() => setIsSavedRecently(false), 2000);
    }
  };

  const applyTemplate = (content: string) => {
    handleNoticeChange(content);
  };

  // 타이머 상태 (기본 15분 아침 독서)
  const [timerDuration, setTimerDuration] = useState(900);
  const [timeRemaining, setTimeRemaining] = useState(900);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsTimerRunning(false);
    setTimeRemaining(timerDuration);
  }, [timerDuration]);

  const selectDuration = (seconds: number) => {
    setTimerDuration(seconds);
    setTimeRemaining(seconds);
    setIsTimerRunning(false);
  };

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            playCompletionChime();
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeRemaining]);

  // 앰비언트 BGM 상태
  const [isBgmPlaying, setIsBgmPlaying] = useState(false);
  const [bgmMode, setBgmMode] = useState<'peaceful' | 'rain' | 'bell'>('peaceful');
  const [bgmVolume, setBgmVolume] = useState(0.6);

  const toggleBgm = () => {
    if (isBgmPlaying) {
      stopAmbientSound();
      setIsBgmPlaying(false);
    } else {
      startAmbientSound(bgmMode, bgmVolume);
      setIsBgmPlaying(true);
    }
  };

  const changeBgmMode = (mode: 'peaceful' | 'rain' | 'bell') => {
    setBgmMode(mode);
    if (isBgmPlaying) {
      startAmbientSound(mode, bgmVolume);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setBgmVolume(vol);
    setAmbientVolume(vol);
  };

  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  // 빠른 발표자 번호 뽑기 모달/상태
  const [maxStudentNum, setMaxStudentNum] = useState(25);
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const pickRandomStudent = () => {
    setIsPicking(true);
    let count = 0;
    const interval = setInterval(() => {
      setPickedNumber(Math.floor(Math.random() * maxStudentNum) + 1);
      count++;
      if (count > 15) {
        clearInterval(interval);
        const finalNum = Math.floor(Math.random() * maxStudentNum) + 1;
        setPickedNumber(finalNum);
        setIsPicking(false);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    }, 70);
  };

  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // 분/초 계산
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const progressRatio = timerDuration > 0 ? (timerDuration - timeRemaining) / timerDuration : 0;

  // 테마별 색상 스타일
  const themeStyles = {
    chalkboard: {
      bg: 'bg-[#0f291e] text-emerald-50',
      boardBg: 'bg-[#16382a]/95 border-emerald-700/60 shadow-2xl',
      headerText: 'text-emerald-100',
      accentText: 'text-amber-300',
      buttonBg: 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-600/50',
      activeBtn: 'bg-amber-400 text-slate-900 font-black shadow-md',
      chalkBorder: 'border-emerald-600/40',
      cardBg: 'bg-[#122e22]/90 border-emerald-800/80',
    },
    slate: {
      bg: 'bg-slate-950 text-slate-100',
      boardBg: 'bg-slate-900/95 border-slate-800 shadow-2xl',
      headerText: 'text-white',
      accentText: 'text-sky-400',
      buttonBg: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
      activeBtn: 'bg-sky-500 text-white font-black shadow-md',
      chalkBorder: 'border-slate-800',
      cardBg: 'bg-slate-900/90 border-slate-800',
    },
    whiteboard: {
      bg: 'bg-slate-100 text-slate-900',
      boardBg: 'bg-white/95 border-slate-200 shadow-xl',
      headerText: 'text-slate-900',
      accentText: 'text-blue-600',
      buttonBg: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      activeBtn: 'bg-slate-900 text-white font-black shadow-md',
      chalkBorder: 'border-slate-200',
      cardBg: 'bg-white border-slate-200',
    },
  }[theme];

  return (
    <div
      ref={containerRef}
      className={`min-h-screen w-full transition-colors duration-500 flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none ${themeStyles.bg}`}
    >
      {/* 1. 상단 바: 날짜 & 실시간 시계 & 컨트롤 */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        {/* 날짜 & 홈 바로가기 */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer"
            title="홈으로 돌아가기"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">엽쌤스쿨 홈</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-extrabold">
                전자칠판 전용 데스크
              </span>
              <span className="text-xs sm:text-sm font-semibold opacity-80">
                {currentTime
                  ? currentTime.toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    })
                  : '로딩 중...'}
              </span>
            </div>
          </div>
        </div>

        {/* 대형 실시간 디지털 시계 */}
        <div className="font-mono font-black text-2xl sm:text-4xl tracking-wider text-amber-300 drop-shadow-sm flex items-center gap-2">
          <span>
            {currentTime
              ? currentTime.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })
              : '00:00:00'}
          </span>
        </div>

        {/* 상단 컨트롤러: 테마 & 전체화면 */}
        <div className="flex items-center gap-2">
          {/* 테마 변경 */}
          <div className="inline-flex p-1 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setTheme('chalkboard')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                theme === 'chalkboard' ? 'bg-emerald-700 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
            >
              칠판
            </button>
            <button
              type="button"
              onClick={() => setTheme('slate')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                theme === 'slate' ? 'bg-slate-700 text-white shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
            >
              다크
            </button>
            <button
              type="button"
              onClick={() => setTheme('whiteboard')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                theme === 'whiteboard' ? 'bg-white text-slate-900 shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
            >
              화이트
            </button>
          </div>

          {/* 전체화면 버튼 */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold transition-all cursor-pointer"
            title="전체화면 (F11)"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">창 화면</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">전체화면</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역: [좌측 50%: 칠판 알림판] + [우측 50%: 집중 타이머 & BGM & 도우미 뽑기 & 식단] */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 flex-grow items-stretch">
        {/* 좌측 50%: 전자칠판 오늘의 아침 알림판 */}
        <section
          className={`w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${themeStyles.boardBg}`}
        >
          <div className="flex flex-col flex-grow">
            {/* 칠판 헤더 */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    오늘의 아침 알림판
                  </h2>
                  <p className="text-xs opacity-75">
                    선생님이 자유롭게 수정할 수 있으며, 입력한 내용은 자동 저장됩니다.
                  </p>
                </div>
              </div>

              {/* 폰트 크기 조절 & 저장 알림 & 알림판 전체화면 */}
              <div className="flex items-center gap-2">
                {isSavedRecently && (
                  <span className="flex items-center gap-1 text-xs text-amber-300 font-bold animate-pulse">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    저장됨
                  </span>
                )}
                {/* 폰트 크기 조절기 */}
                <div className="flex items-center rounded-xl bg-black/20 p-1 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => updateFontSize(fontSizeLevel - 1)}
                    disabled={fontSizeLevel === 0}
                    className="px-2 py-1 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer"
                    title="글씨 축소"
                  >
                    가-
                  </button>
                  <span className="px-1.5 opacity-80 font-mono text-[11px] font-bold">
                    크기 {fontSizeLevel + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateFontSize(fontSizeLevel + 1)}
                    disabled={fontSizeLevel === FONT_SIZES.length - 1}
                    className="px-2 py-1 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer"
                    title="글씨 확대"
                  >
                    가+
                  </button>
                </div>

                {/* 알림판 단독 전체화면 버튼 */}
                <button
                  type="button"
                  onClick={() => setIsBoardMaximized(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                  title="알림판 화면 전체로 확대하기"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">알림판 전체화면</span>
                </button>
              </div>
            </div>

            {/* 템플릿 프리셋 버튼 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs opacity-75 mr-1 font-bold">빠른 템플릿:</span>
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.label}
                  type="button"
                  onClick={() => applyTemplate(tmpl.content)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                >
                  {tmpl.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNoticeChange('')}
                className="px-2 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-all cursor-pointer ml-auto"
                title="알림판 비우기"
              >
                <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                비우기
              </button>
            </div>

            {/* 칠판 본문 에디터 (글씨 쓰는 공간) */}
            <textarea
              value={noticeText}
              onChange={(e) => handleNoticeChange(e.target.value)}
              placeholder="여기를 클릭하여 학생들에게 전할 오늘의 아침 미션이나 알림장을 적어보세요..."
              className={`w-full min-h-[380px] sm:min-h-[460px] flex-grow bg-transparent focus:outline-none resize-none font-medium leading-relaxed ${FONT_SIZES[fontSizeLevel]}`}
              spellCheck={false}
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs opacity-70">
            <span>💡 팁: 칠판 내용을 터치하거나 클릭하여 직접 입력하세요.</span>
            <span>창을 닫아도 브라우저에 안전하게 보관됩니다.</span>
          </div>
        </section>

        {/* 우측 50%: [집중 타이머] + [아침 앰비언트 BGM] + [도우미 뽑기] + [오늘의 급식] */}
        <section className="w-full flex flex-col gap-6">
          {/* A. 아침 자습·독서 집중 타이머 */}
          <div className={`rounded-3xl p-6 border ${themeStyles.cardBg} flex flex-col justify-between shadow-xl`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-base">아침 집중 타이머</h3>
                </div>

                {/* 타이머 프리셋 버튼 */}
                <div className="flex items-center gap-1">
                  {[
                    { label: '5분', sec: 300 },
                    { label: '10분', sec: 600 },
                    { label: '15분', sec: 900 },
                    { label: '20분', sec: 1200 },
                  ].map((p) => (
                    <button
                      key={p.sec}
                      type="button"
                      onClick={() => selectDuration(p.sec)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        timerDuration === p.sec
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 대형 타이머 숫자 표시 */}
              <div className="py-6 text-center">
                <div className="font-mono font-black text-6xl sm:text-7xl tracking-tighter text-amber-300 drop-shadow">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                {/* 진행률 바 */}
                <div className="w-full h-2.5 rounded-full bg-black/30 mt-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                    style={{ width: `${progressRatio * 100}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              </div>
            </div>

            {/* 타이머 제어 버튼 */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {isTimerRunning ? (
                <button
                  type="button"
                  onClick={pauseTimer}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>일시정지</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startTimer}
                  className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-lg shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>타이머 시작</span>
                </button>
              )}

              <button
                type="button"
                onClick={resetTimer}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                title="타이머 초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* B. 광고 없는 무설치 아침 앰비언트 BGM 플레이어 */}
          <div className={`rounded-3xl p-5 border ${themeStyles.cardBg} shadow-xl`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-300" />
                <h3 className="font-extrabold text-sm">광고 제로 아침 BGM (Web Audio)</h3>
              </div>

              {/* 재생/정지 버튼 */}
              <button
                type="button"
                onClick={toggleBgm}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  isBgmPlaying
                    ? 'bg-amber-400 text-slate-950 shadow-md animate-pulse'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {isBgmPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>재생 중</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>음악 켜기</span>
                  </>
                )}
              </button>
            </div>

            {/* BGM 모드 선택 버튼 */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { key: 'peaceful' as const, label: '🎵 맑은 피아노' },
                { key: 'rain' as const, label: '🌧️ 집중 빗소리' },
                { key: 'bell' as const, label: '🔔 마음 챙김' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => changeBgmMode(m.key)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer truncate ${
                    bgmMode === m.key
                      ? 'bg-white/25 text-white border border-white/30 font-black'
                      : 'bg-black/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* 볼륨 슬라이더 */}
            <div className="flex items-center gap-2 pt-1 text-xs opacity-75">
              <span>볼륨</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgmVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-[11px] w-8 text-right">
                {Math.round(bgmVolume * 100)}%
              </span>
            </div>
          </div>

          {/* C. 오늘 1번 발표자 / 아침 도우미 뽑기 */}
          <div className={`rounded-3xl p-5 border ${themeStyles.cardBg} shadow-xl flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Dices className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm">오늘의 발표자·도우미 뽑기</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs opacity-70">학급 인원:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={maxStudentNum}
                    onChange={(e) => setMaxStudentNum(parseInt(e.target.value) || 25)}
                    className="w-12 px-1.5 py-0.5 rounded bg-black/20 text-center font-bold text-xs border border-white/20"
                  />
                  <span className="text-xs opacity-70">번까지</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {pickedNumber !== null && (
                <div className="font-black text-3xl font-mono text-amber-300 animate-bounce">
                  {pickedNumber}번!
                </div>
              )}
              <button
                type="button"
                onClick={pickRandomStudent}
                disabled={isPicking}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
              >
                {isPicking ? '추첨 중...' : '번호 뽑기'}
              </button>
            </div>
          </div>

          {/* D. 오늘의 급식 식단 (나이스 실시간 연동) */}
          <MorningSchoolMealCard themeStyles={themeStyles} />
        </section>
      </main>

      {/* 3. 하단 빠른 바로가기 바 (교실 도구 연계) */}
      <footer className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs opacity-80">
        <div className="flex items-center gap-2">
          <span>🎒 다음 수업 준비:</span>
          <Link
            href="/showcase#learning-games"
            className="font-bold underline hover:text-amber-300 flex items-center gap-1"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            100종 배움게임 바로가기
          </Link>
          <span>·</span>
          <Link
            href="/playground"
            className="font-bold underline hover:text-amber-300"
          >
            AI 프롬프트 놀이터
          </Link>
          <span>·</span>
          <Link
            href="/library#tools"
            className="font-bold underline hover:text-amber-300"
          >
            에듀테크 도구함
          </Link>
        </div>

        <div className="text-[11px] opacity-60">
          엽쌤스쿨 · 교실 전자칠판 전용 모닝 데스크 (무설치/무광고)
        </div>
      </footer>

      {/* 4. 오늘의 아침 알림판 전용 전체화면 모드 (전자칠판 단독 칠판 뷰) */}
      <AnimatePresence>
        {isBoardMaximized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-50 p-4 sm:p-8 flex flex-col justify-between overflow-hidden select-none ${themeStyles.bg}`}
          >
            <div
              className={`w-full h-full rounded-3xl p-6 sm:p-10 flex flex-col justify-between border ${themeStyles.boardBg} shadow-2xl`}
            >
              <div className="flex flex-col flex-grow">
                {/* 상단 컨트롤 바 */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-2xl bg-amber-400/20 text-amber-300">
                      <Sparkles className="w-6 h-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold">
                          전자칠판 전체화면 모드
                        </span>
                        {isSavedRecently && (
                          <span className="flex items-center gap-1 text-xs text-amber-300 font-bold animate-pulse">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            실시간 저장됨
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-0.5">
                        오늘의 아침 알림판
                      </h2>
                    </div>
                  </div>

                  {/* 컨트롤러: 시계 & 폰트 크기 & 축소 버튼 */}
                  <div className="flex items-center gap-2.5">
                    {/* 실시간 시계 */}
                    <div className="hidden md:flex font-mono font-black text-xl text-amber-300 mr-2">
                      {currentTime
                        ? currentTime.toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                          })
                        : ''}
                    </div>

                    {/* 폰트 크기 조절기 */}
                    <div className="flex items-center rounded-xl bg-black/30 p-1 border border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => updateFontSize(fontSizeLevel - 1)}
                        disabled={fontSizeLevel === 0}
                        className="px-2.5 py-1.5 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer"
                        title="글씨 축소"
                      >
                        가-
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-amber-300">
                        크기 {fontSizeLevel + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateFontSize(fontSizeLevel + 1)}
                        disabled={fontSizeLevel === FONT_SIZES.length - 1}
                        className="px-2.5 py-1.5 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer"
                        title="글씨 확대"
                      >
                        가+
                      </button>
                    </div>

                    {/* 원래 화면으로 축소 버튼 */}
                    <button
                      type="button"
                      onClick={() => setIsBoardMaximized(false)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      title="원래 교실 데스크 화면으로 돌아가기 (ESC)"
                    >
                      <Minimize2 className="w-4 h-4" />
                      <span>원래 크기로 (ESC)</span>
                    </button>
                  </div>
                </div>

                {/* 템플릿 프리셋 */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs opacity-75 mr-1 font-bold">빠른 템플릿:</span>
                  {TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.label}
                      type="button"
                      onClick={() => applyTemplate(tmpl.content)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleNoticeChange('')}
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-all cursor-pointer ml-auto"
                    title="알림판 비우기"
                  >
                    <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                    비우기
                  </button>
                </div>

                {/* 전체화면 대형 칠판 에디터 */}
                <textarea
                  value={noticeText}
                  onChange={(e) => handleNoticeChange(e.target.value)}
                  placeholder="여기를 클릭하여 학생들에게 전할 오늘의 아침 미션이나 알림장을 적어보세요..."
                  className={`w-full min-h-[50vh] flex-grow bg-transparent focus:outline-none resize-none font-medium leading-relaxed ${FONT_SIZES[fontSizeLevel]}`}
                  spellCheck={false}
                  autoFocus
                />
              </div>

              {/* 하단 바 */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs opacity-70">
                <span>💡 팁: 전체화면에서 작성한 내용도 실시간 자동 저장됩니다.</span>
                <span>키보드 ESC 키를 누르면 원래 교실 화면으로 돌아갑니다.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
