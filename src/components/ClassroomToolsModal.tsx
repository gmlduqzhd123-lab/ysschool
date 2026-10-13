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
  Trophy,
  PenTool,
  Eraser,
  Trash2,
  Undo2,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StrokePoint {
  x: number;
  y: number;
}

interface Stroke {
  points: StrokePoint[];
  color: string;
  width: number;
  isEraser: boolean;
}

interface ClassroomToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'timer' | 'picker' | 'scoreboard' | 'canvas';
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
  const [activeTab, setActiveTab] = useState<'timer' | 'picker' | 'scoreboard' | 'canvas'>(defaultTab);
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

  // ===== 모둠 점수판 상태 =====
  const [scoreboardGroupCount, setScoreboardGroupCount] = useState(6);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // ===== 전자칠판 퀵 캔버스 상태 =====
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#38bdf8');
  const [penWidth, setPenWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

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

  // 전체화면 변경 이벤트 감지 (ESC 키나 브라우저 컨트롤 등으로 나갈 때 동기화)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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
    playTickSound();
  };

  const adjustTimer = (deltaSecs: number) => {
    setRemainingSeconds((prev) => {
      const next = Math.max(0, prev + deltaSecs);
      setTotalSeconds((tot) => Math.max(tot, next));
      return next;
    });
    playTickSound();
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setRemainingSeconds(totalSeconds);
    playTickSound();
  };

  const toggleTimer = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(totalSeconds);
    }
    setIsTimerRunning((prev) => !prev);
    playTickSound();
  };

  // 풀스크린 토글
  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;
    if (!document.fullscreenElement) {
      modalContainerRef.current
        .requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {
          setIsFullscreen(true);
        });
    } else {
      document
        .exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => {
          setIsFullscreen(false);
        });
    }
  };

  // 뽑기 실행
  const runPicker = () => {
    if (isSpinning) return;

    let pool: string[] = [];
    if (pickerMode === 'number') {
      pool = Array.from({ length: maxStudentNumber }, (_, i) => `${i + 1}번`);
    } else if (pickerMode === 'group') {
      pool = Array.from({ length: groupCount }, (_, i) => `${i + 1}모둠`);
    } else {
      pool = customNamesInput
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (pool.length === 0) {
      alert('추첨할 대상 목록이 비어 있습니다.');
      return;
    }

    if (excludeAlreadyPicked) {
      pool = pool.filter((item) => !pickedHistory.includes(item));
      if (pool.length === 0) {
        alert('모든 대상이 한 번씩 뽑혔습니다! 기록을 초기화하거나 중복 방지를 해제하세요.');
        return;
      }
    }

    setIsSpinning(true);
    let counter = 0;
    const maxTicks = 18;
    const spinInterval = setInterval(() => {
      counter++;
      const tempPick = pool[Math.floor(Math.random() * pool.length)];
      setPickedResult(tempPick);
      playTickSound();

      if (counter >= maxTicks) {
        clearInterval(spinInterval);
        const finalPick = pool[Math.floor(Math.random() * pool.length)];
        setPickedResult(finalPick);
        setPickedHistory((prev) => [finalPick, ...prev]);
        setIsSpinning(false);
        if (isSoundEnabled) playChimeSound();
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#f59e0b', '#10b981'],
        });
      }
    }, 70);
  };

  // 모둠 점수판 함수
  const updateScore = (index: number, delta: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, (next[index] || 0) + delta);
      return next;
    });
    playTickSound();
  };

  const resetScores = () => {
    if (confirm('모든 모둠의 점수를 0점으로 초기화하시겠습니까?')) {
      setScores(new Array(scoreboardGroupCount).fill(0));
    }
  };

  const handleGroupCountChange = (count: number) => {
    setScoreboardGroupCount(count);
    setScores((prev) => {
      const next = new Array(count).fill(0);
      for (let i = 0; i < count; i++) {
        next[i] = prev[i] || 0;
      }
      return next;
    });
  };

  // 캔버스 드로잉 로직 및 고해상도 리사이즈 보정
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const allStrokes = strokesRef.current;
    for (const stroke of allStrokes) {
      if (stroke.points.length === 0) continue;
      ctx.beginPath();
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = stroke.isEraser ? '#020617' : stroke.color;

      const first = stroke.points[0];
      ctx.moveTo(first.x, first.y);

      if (stroke.points.length === 1) {
        ctx.lineTo(first.x + 0.1, first.y + 0.1);
      } else {
        for (let i = 1; i < stroke.points.length; i++) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
      }
      ctx.stroke();
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const newWidth = Math.floor(rect.width * dpr);
    const newHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    redrawCanvas();
  }, [redrawCanvas]);

  // 캔버스 리사이즈 감지 (전체화면, 창 크기 변경 시 자동 재조정)
  useEffect(() => {
    if (!isOpen || activeTab !== 'canvas') return;
    const container = canvasContainerRef.current;
    if (!container) return;

    const animId = requestAnimationFrame(() => {
      resizeCanvas();
    });
    const timerId = setTimeout(() => {
      resizeCanvas();
    }, 280);

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    observer.observe(container);

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timerId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isOpen, activeTab, isFullscreen, resizeCanvas]);

  // 포인터 이벤트 기반 판서 핸들러 (전자칠판 터치펜/손가락/마우스 완벽 대응)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
      activePointerIdRef.current = e.pointerId;
    } catch {
      // ignore
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const strokeWidth = isEraser ? penWidth * 5 : penWidth;
    const strokeColor = isEraser ? '#020617' : penColor;

    const newStroke: Stroke = {
      points: [{ x, y }],
      color: strokeColor,
      width: strokeWidth,
      isEraser,
    };

    currentStrokeRef.current = newStroke;
    setIsDrawing(true);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = strokeColor;
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.1, y + 0.1);
      ctx.stroke();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const stroke = currentStrokeRef.current;
    const lastPoint = stroke.points[stroke.points.length - 1];

    stroke.points.push({ x, y });

    ctx.beginPath();
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== null && e.pointerId === activePointerIdRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      activePointerIdRef.current = null;
    }

    if (currentStrokeRef.current) {
      const finishedStroke = currentStrokeRef.current;
      currentStrokeRef.current = null;
      setStrokes((prev) => {
        const next = [...prev, finishedStroke];
        strokesRef.current = next;
        return next;
      });
    }
    setIsDrawing(false);
  };

  const undoLastStroke = () => {
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice(0, -1);
      strokesRef.current = next;
      requestAnimationFrame(redrawCanvas);
      return next;
    });
  };

  const clearCanvas = () => {
    if (strokesRef.current.length === 0) return;
    if (confirm('판서 내용을 모두 지우시겠습니까?')) {
      strokesRef.current = [];
      setStrokes([]);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  };

  const downloadCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // 칠판 배경색 채우기
    tempCtx.fillStyle = '#020617';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    // 캔버스 내용 복사
    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `ysschool-chalkboard-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  // 타이머 진행률 계산
  const progressRatio = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const maxScore = Math.max(...scores);

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isFullscreen ? 'p-0' : 'p-2 sm:p-6'
        } bg-black/80 backdrop-blur-md`}
      >
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative ${
            isFullscreen
              ? 'w-full h-full w-screen h-screen max-w-none max-h-none rounded-none border-0'
              : 'w-full max-w-5xl max-h-[94vh] rounded-3xl border border-slate-200 dark:border-slate-800'
          } bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 font-bold text-lg">
                🏫
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>스마트 수업 대시보드</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-sky/20 text-brand-sky font-bold">
                    Classroom HUD
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  교실 전자칠판·스마트보드 전용 타이머, 뽑기, 모둠 점수판, 판서 도구
                </p>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-2xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('timer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'timer'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>타이머</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('picker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'picker'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Dices className="w-3.5 h-3.5" />
                <span>뽑기</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('scoreboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'scoreboard'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>모둠 점수판</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'canvas'
                    ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-brand-sky shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 text-emerald-500" />
                <span>퀵 판서</span>
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isSoundEnabled ? '효과음 끄기' : '효과음 켜기'}
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={isFullscreen ? '창 모드로 복귀' : '전자칠판 전체화면'}
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

          {/* Body Content */}
          <div
            className={`flex-1 min-h-0 ${
              activeTab === 'canvas'
                ? 'p-2 sm:p-4 flex flex-col overflow-hidden'
                : 'p-6 overflow-y-auto'
            }`}
          >
            {activeTab === 'timer' && (
              /* TAB 1: TIMER */
              <div className="flex flex-col items-center max-w-xl mx-auto py-2">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                    <circle cx="120" cy="120" r="104" stroke="currentColor" strokeWidth="12" fill="none" className="text-slate-100 dark:text-slate-800" />
                    <circle
                      cx="120"
                      cy="120"
                      r="104"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 104}
                      strokeDashoffset={2 * Math.PI * 104 * (1 - progressRatio)}
                      strokeLinecap="round"
                      className={`transition-all duration-300 ${
                        remainingSeconds <= 30
                          ? 'text-rose-500'
                          : remainingSeconds <= 60
                          ? 'text-amber-500'
                          : 'text-brand-sky'
                      }`}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div
                      className={`font-mono font-black tracking-tight ${
                        isFullscreen ? 'text-7xl sm:text-8xl' : 'text-5xl sm:text-6xl'
                      } ${
                        remainingSeconds <= 30
                          ? 'text-rose-600 animate-pulse'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {timeFormatted}
                    </div>
                    <span className="text-xs text-slate-400 font-medium mt-1">
                      {isTimerRunning ? '진행 중' : remainingSeconds === 0 ? '시간 종료!' : '일시정지'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 my-4">
                  <button
                    type="button"
                    onClick={() => adjustTimer(-30)}
                    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-bold text-xs"
                    title="30초 빼기"
                  >
                    -30초
                  </button>

                  <button
                    type="button"
                    onClick={toggleTimer}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-lg shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
                        : 'bg-brand-navy hover:bg-brand-sky shadow-brand-navy/30'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-6 h-6 fill-current" />
                        <span>일시 정지</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 fill-current" />
                        <span>{remainingSeconds === 0 ? '다시 시작' : '타이머 시작'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetTimer}
                    className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                    title="초기화"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => adjustTimer(30)}
                    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-bold text-xs"
                    title="30초 더하기"
                  >
                    +30초
                  </button>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  {[
                    { label: '1분', sec: 60 },
                    { label: '2분', sec: 120 },
                    { label: '3분', sec: 180 },
                    { label: '5분', sec: 300 },
                    { label: '10분', sec: 600 },
                    { label: '15분', sec: 900 },
                  ].map((preset) => (
                    <button
                      key={preset.sec}
                      type="button"
                      onClick={() => setTimerPreset(preset.sec)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        totalSeconds === preset.sec && !isTimerRunning
                          ? 'bg-brand-sky text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'picker' && (
              /* TAB 2: PICKER */
              <div className="flex flex-col items-center max-w-xl mx-auto py-2">
                <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
                  {[
                    { key: 'number', label: '학생 번호' },
                    { key: 'group', label: '모둠 번호' },
                    { key: 'custom', label: '직접 입력' },
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      type="button"
                      onClick={() => setPickerMode(mode.key as 'number' | 'group' | 'custom')}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pickerMode === mode.key
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>

                {pickerMode === 'number' && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-slate-500">학급 총 학생 수:</span>
                    <input
                      type="number"
                      min={1}
                      max={45}
                      value={maxStudentNumber}
                      onChange={(e) => setMaxStudentNumber(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center font-bold text-base py-1 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <span className="text-xs text-slate-500">명</span>
                  </div>
                )}

                {pickerMode === 'group' && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs text-slate-500">총 모둠 수:</span>
                    <input
                      type="number"
                      min={2}
                      max={12}
                      value={groupCount}
                      onChange={(e) => setGroupCount(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-20 text-center font-bold text-base py-1 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <span className="text-xs text-slate-500">모둠</span>
                  </div>
                )}

                {pickerMode === 'custom' && (
                  <div className="w-full mb-6">
                    <textarea
                      rows={3}
                      value={customNamesInput}
                      onChange={(e) => {
                        setCustomNamesInput(e.target.value);
                        try {
                          localStorage.setItem('ysschool-picker-names', e.target.value);
                        } catch {}
                      }}
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

            {activeTab === 'scoreboard' && (
              /* TAB 3: SCOREBOARD */
              <div className="flex flex-col items-center max-w-2xl mx-auto py-2">
                <div className="w-full flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold">모둠 수:</span>
                    {[4, 5, 6, 7, 8].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleGroupCountChange(n)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          scoreboardGroupCount === n
                            ? 'bg-amber-500 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={resetScores}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>점수 리셋</span>
                  </button>
                </div>

                {/* Score Cards Grid */}
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Array.from({ length: scoreboardGroupCount }).map((_, idx) => {
                    const score = scores[idx] || 0;
                    const isTop = score > 0 && score === maxScore;

                    return (
                      <div
                        key={idx}
                        className={`relative p-5 rounded-3xl border text-center transition-all ${
                          isTop
                            ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-400 shadow-lg scale-102'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 shadow-sm'
                        }`}
                      >
                        {isTop && (
                          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-black shadow-sm">
                            <Trophy className="w-3 h-3 fill-current" />
                            <span>1위</span>
                          </div>
                        )}

                        <div className="text-sm font-extrabold text-slate-600 dark:text-slate-300 mb-2">
                          {idx + 1}모둠
                        </div>

                        <div className="font-mono font-black text-4xl sm:text-5xl text-slate-900 dark:text-white mb-4">
                          {score}
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateScore(idx, -1)}
                            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 flex items-center justify-center font-black cursor-pointer"
                            title="1점 감점"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateScore(idx, 1)}
                            className="flex-1 h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-amber-500/20 cursor-pointer"
                            title="1점 득점"
                          >
                            <Plus className="w-4 h-4 mr-0.5" />
                            <span>1점</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'canvas' && (
              /* TAB 4: CANVAS QUICK NOTE */
              <div className="flex flex-col w-full h-full flex-1 min-h-0">
                {/* Canvas Toolbar */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-2 sm:mb-3 shrink-0">
                  {/* 펜 색상 */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-bold text-slate-500">색상:</span>
                    {[
                      { color: '#38bdf8', label: '스카이블루' },
                      { color: '#f43f5e', label: '빨강' },
                      { color: '#eab308', label: '형광노랑' },
                      { color: '#22c55e', label: '에메랄드' },
                      { color: '#ffffff', label: '흰색' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => {
                          setPenColor(c.color);
                          setIsEraser(false);
                        }}
                        style={{ backgroundColor: c.color }}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          penColor === c.color && !isEraser
                            ? 'scale-125 border-slate-900 shadow-sm'
                            : 'border-transparent'
                        }`}
                        title={c.label}
                      />
                    ))}
                  </div>

                  {/* 굵기 */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs font-bold text-slate-500">굵기:</span>
                    {[3, 6, 12].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setPenWidth(w)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          penWidth === w
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {w === 3 ? '얇게' : w === 6 ? '보통' : '두껍게'}
                      </button>
                    ))}
                  </div>

                  {/* 액션 버튼들 */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEraser(!isEraser)}
                      className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isEraser
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                      title="지우개 모드"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">지우개</span>
                    </button>
                    <button
                      type="button"
                      onClick={undoLastStroke}
                      disabled={strokes.length === 0}
                      className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        strokes.length === 0
                          ? 'opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800 text-slate-400'
                          : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                      title="실행 취소 (Undo)"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">되돌리기</span>
                    </button>
                    <button
                      type="button"
                      onClick={downloadCanvasImage}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-sky transition-colors cursor-pointer"
                      title="판서 이미지 다운로드"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">저장</span>
                    </button>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                      title="판서 전체 지우기"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">모두 지우기</span>
                    </button>
                  </div>
                </div>

                {/* Drawing Surface */}
                <div
                  ref={canvasContainerRef}
                  className="w-full flex-1 min-h-0 bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden relative shadow-inner cursor-crosshair touch-none"
                >
                  <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="w-full h-full block touch-none"
                    style={{ touchAction: 'none' }}
                  />
                  <div className="absolute bottom-2.5 left-3.5 text-[11px] text-slate-500 pointer-events-none select-none flex items-center gap-2">
                    <span>🖊️ 전자칠판 터치펜·터치·마우스로 자유롭게 판서하세요</span>
                    <span className="hidden md:inline text-slate-600">| 우측 상단 ⛶ 전체화면으로 교실 전체에 꽉 채울 수 있습니다</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
