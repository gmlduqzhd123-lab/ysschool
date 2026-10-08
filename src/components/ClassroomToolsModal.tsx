'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Timer,
  Dices,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Plus,
  Minus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface ClassroomToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'timer' | 'picker';
}

// Web Audio API를 활용한 무설치 차임벨 사운드
function playChimeSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (화사한 완료 팡파르)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.9);
    });
  } catch {
    // 오디오 컨텍스트 미지원 시 무시
  }
}

// 틱톡 탭 사운드
function playTickSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // 무시
  }
}

export default function ClassroomToolsModal({
  isOpen,
  onClose,
  defaultTab = 'timer',
}: ClassroomToolsModalProps) {
  const [activeTab, setActiveTab] = useState<'timer' | 'picker'>(defaultTab);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // ===== 타이머 상태 =====
  const [totalSeconds, setTotalSeconds] = useState(180); // 기본 3분
  const [remainingSeconds, setRemainingSeconds] = useState(180);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // ===== 뽑기 상태 =====
  const [pickerMode, setPickerMode] = useState<'number' | 'group' | 'custom'>('number');
  const [maxStudentNumber, setMaxStudentNumber] = useState(25);
  const [groupCount, setGroupCount] = useState(6);
  const [customNamesInput, setCustomNamesInput] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('ysschool-picker-names') || '';
      } catch {
        return '';
      }
    }
    return '';
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickedResult, setPickedResult] = useState<string | null>(null);
  const [pickedHistory, setPickedHistory] = useState<string[]>([]);
  const [excludeAlreadyPicked, setExcludeAlreadyPicked] = useState(true);

  // 탭 변경 시
  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);
  if (defaultTab !== prevDefaultTab) {
    setPrevDefaultTab(defaultTab);
    setActiveTab(defaultTab);
  }

  // 키보드 Esc 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isFullscreen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isFullscreen, onClose]);

  // 타이머 실행 루프
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          if (isSoundEnabled) playChimeSound();
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, isSoundEnabled]);

  // 타이머 설정 헬퍼
  const setTimerPreset = (secs: number) => {
    setIsTimerRunning(false);
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
  };

  const adjustTimer = (deltaSecs: number) => {
    setTotalSeconds((prev) => {
      const next = Math.max(30, Math.min(3600, prev + deltaSecs));
      setRemainingSeconds(next);
      return next;
    });
  };

  // 전체화면 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // 뽑기 실행
  const runPicker = useCallback(() => {
    let pool: string[] = [];

    if (pickerMode === 'number') {
      pool = Array.from({ length: maxStudentNumber }, (_, i) => `${i + 1}번`);
    } else if (pickerMode === 'group') {
      pool = Array.from({ length: groupCount }, (_, i) => `${i + 1}모둠`);
    } else {
      pool = customNamesInput
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (pool.length === 0) return;

    // 이미 뽑힌 사람 제외
    const availablePool = excludeAlreadyPicked
      ? pool.filter((item) => !pickedHistory.includes(item))
      : pool;

    if (availablePool.length === 0) {
      alert('모든 대상이 이미 뽑혔습니다! 목록을 초기화합니다.');
      setPickedHistory([]);
      return;
    }

    setIsSpinning(true);
    setPickedResult(null);

    // 셔플 애니메이션
    let counter = 0;
    const totalFlips = 24;
    const interval = setInterval(() => {
      counter++;
      const randomIdx = Math.floor(Math.random() * availablePool.length);
      setPickedResult(availablePool[randomIdx]);
      if (isSoundEnabled) playTickSound();

      if (counter >= totalFlips) {
        clearInterval(interval);
        const finalWinner = availablePool[Math.floor(Math.random() * availablePool.length)];
        setPickedResult(finalWinner);
        setIsSpinning(false);
        setPickedHistory((prev) => [finalWinner, ...prev]);

        if (isSoundEnabled) playChimeSound();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }, 70);
  }, [pickerMode, maxStudentNumber, groupCount, customNamesInput, excludeAlreadyPicked, pickedHistory, isSoundEnabled]);

  // 커스텀 이름 변경 저장
  const handleCustomNamesChange = (val: string) => {
    setCustomNamesInput(val);
    try {
      localStorage.setItem('ysschool-picker-names', val);
    } catch {
      // 무시
    }
  };

  if (!isOpen) return null;

  // 타이머 진행률 계산
  const progressRatio = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col ${
            isFullscreen ? 'h-full max-w-none rounded-none' : 'max-h-[92vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-bold">
                🏫
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  교실 수업 도구
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  전자칠판·스마트보드용 타이머 & 뽑기
                </p>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setActiveTab('timer')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'timer'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>수업 타이머</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('picker')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'picker'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Dices className="w-4 h-4" />
                <span>발표자·모둠 뽑기</span>
              </button>
            </div>

            {/* Top Controls */}
            <div className="flex items-center gap-2">
              <Link
                href="/morning"
                onClick={onClose}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300/50 transition-colors"
                title="전자칠판 전용 아침 맞이 교실 데스크 전체화면 열기"
              >
                <span>🌅</span>
                <span>아침 교실 데스크</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isSoundEnabled
                    ? 'text-brand-navy dark:text-brand-sky bg-brand-sky/10'
                    : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
                title={isSoundEnabled ? '소리 켜짐' : '음소거'}
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
                title="전자칠판 전체화면"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
            {/* ==================== 1. 비주얼 타이머 ==================== */}
            {activeTab === 'timer' && (
              <div className="w-full flex flex-col items-center text-center">
                {/* Visual Circle & Time Display */}
                <div className="relative my-4 flex items-center justify-center">
                  <svg className="w-64 h-64 sm:w-80 sm:h-80 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      className={`transition-all duration-1000 ${
                        remainingSeconds <= 10
                          ? 'text-rose-500'
                          : remainingSeconds <= 30
                          ? 'text-amber-500'
                          : 'text-brand-sky'
                      }`}
                      strokeWidth="8"
                      strokeDasharray={264}
                      strokeDashoffset={264 - 264 * progressRatio}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>

                  <div className="absolute flex flex-col items-center">
                    <span
                      className={`font-mono font-black tracking-tight text-5xl sm:text-7xl transition-colors ${
                        remainingSeconds <= 10
                          ? 'text-rose-600 dark:text-rose-400 animate-pulse'
                          : remainingSeconds <= 30
                          ? 'text-amber-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {timeFormatted}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-2">
                      {isTimerRunning ? '🔥 집중 시간 진행 중' : remainingSeconds === 0 ? '🎉 시간 완료!' : '수업 준비'}
                    </span>
                  </div>
                </div>

                {/* Adjust & Action Controls */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => adjustTimer(-30)}
                    disabled={isTimerRunning}
                    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
                    title="30초 빼기"
                  >
                    <Minus className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-extrabold text-white shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                        : 'bg-brand-navy hover:bg-brand-sky shadow-brand-navy/25'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-6 h-6 fill-current" />
                        <span>일시정지</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 fill-current" />
                        <span>타이머 시작</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimerPreset(totalSeconds)}
                    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title="다시 설정 시간으로 리셋"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustTimer(30)}
                    disabled={isTimerRunning}
                    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
                    title="30초 더하기"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { label: '1분 (생각)', sec: 60 },
                    { label: '3분 (짝나눔)', sec: 180 },
                    { label: '5분 (모둠활동)', sec: 300 },
                    { label: '10분 (개별학습)', sec: 600 },
                    { label: '15분', sec: 900 },
                    { label: '20분 (단원평가)', sec: 1200 },
                  ].map((preset) => (
                    <button
                      key={preset.sec}
                      type="button"
                      onClick={() => setTimerPreset(preset.sec)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        totalSeconds === preset.sec && !isTimerRunning
                          ? 'bg-brand-navy dark:bg-brand-sky text-white dark:text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== 2. 발표자·모둠 뽑기 ==================== */}
            {activeTab === 'picker' && (
              <div className="w-full flex flex-col items-center text-center">
                {/* Mode Selector */}
                <div className="flex items-center gap-2 mb-6">
                  {[
                    { key: 'number' as const, label: '🔢 학생 번호 뽑기' },
                    { key: 'group' as const, label: '👥 모둠 뽑기' },
                    { key: 'custom' as const, label: '📝 이름 명렬표' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => {
                        setPickerMode(tab.key);
                        setPickedResult(null);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        pickerMode === tab.key
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Mode Option Inputs */}
                {pickerMode === 'number' && (
                  <div className="flex items-center gap-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <span>학급 인원:</span>
                    <input
                      type="number"
                      min={5}
                      max={45}
                      value={maxStudentNumber}
                      onChange={(e) => setMaxStudentNumber(Math.max(1, parseInt(e.target.value) || 25))}
                      className="w-20 px-3 py-1.5 text-center font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <span>번까지 (1 ~ {maxStudentNumber}번)</span>
                  </div>
                )}

                {pickerMode === 'group' && (
                  <div className="flex items-center gap-3 mb-6 text-sm text-slate-600 dark:text-slate-400">
                    <span>모둠 개수:</span>
                    <input
                      type="number"
                      min={2}
                      max={12}
                      value={groupCount}
                      onChange={(e) => setGroupCount(Math.max(2, parseInt(e.target.value) || 6))}
                      className="w-20 px-3 py-1.5 text-center font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                    <span>모둠까지 (1 ~ {groupCount}모둠)</span>
                  </div>
                )}

                {pickerMode === 'custom' && (
                  <div className="w-full max-w-md mb-6">
                    <textarea
                      rows={3}
                      value={customNamesInput}
                      onChange={(e) => handleCustomNamesChange(e.target.value)}
                      placeholder="학생 이름을 쉼표(,)나 줄바꿈으로 입력하세요. (예: 민수, 지우, 서연, 도윤)"
                      className="w-full p-3 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                )}

                {/* Big Result Card */}
                <div className="w-full max-w-md min-h-[160px] p-6 mb-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/60 border-2 border-amber-200/80 dark:border-amber-500/30 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                    {isSpinning ? '두구두구두구... 🥁' : pickedResult ? '🎉 당첨 결과' : '행운의 주인공은?'}
                  </div>
                  <div
                    className={`text-5xl sm:text-6xl font-black text-slate-900 dark:text-white transition-all transform ${
                      isSpinning ? 'scale-110 blur-[0.5px]' : pickedResult ? 'scale-100' : 'text-slate-400 dark:text-slate-600 text-3xl'
                    }`}
                  >
                    {pickedResult || '뽑기 버튼을 눌러주세요!'}
                  </div>
                </div>

                {/* Spin Button */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={runPicker}
                    disabled={isSpinning}
                    className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg shadow-lg shadow-amber-500/30 active:scale-95 disabled:opacity-60 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{isSpinning ? '추첨 진행 중...' : '랜덤 뽑기!'}</span>
                  </button>
                </div>

                {/* Options & History */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excludeAlreadyPicked}
                      onChange={(e) => setExcludeAlreadyPicked(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>이미 뽑힌 대상 제외 (중복 방지)</span>
                  </label>
                  {pickedHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setPickedHistory([])}
                      className="text-slate-400 hover:text-rose-500 underline cursor-pointer"
                    >
                      기록 지우기
                    </button>
                  )}
                </div>

                {/* History Chips */}
                {pickedHistory.length > 0 && (
                  <div className="w-full max-w-lg flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">뽑힌 순서:</span>
                    {pickedHistory.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
