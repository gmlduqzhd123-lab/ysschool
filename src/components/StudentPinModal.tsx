'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  QrCode,
  ExternalLink,
  Check,
  Copy,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import QRCode from 'qrcode';
import { findGameByPin, LearningGame } from '@/data/learningGamesData';

interface StudentPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPin?: string;
  initialGame?: LearningGame | null;
  onPlayGame?: (game: LearningGame) => void;
}

export default function StudentPinModal({
  isOpen,
  onClose,
  initialPin = '',
  initialGame = null,
  onPlayGame,
}: StudentPinModalProps) {
  const [pinInput, setPinInput] = useState(initialPin);
  const [matchedGame, setMatchedGame] = useState<LearningGame | null>(initialGame);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isQrZoomed, setIsQrZoomed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Props 변경 시 렌더 도중 상태 동기화 (React 권장 패턴: setState in effect 방지)
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const [prevInitialGame, setPrevInitialGame] = useState(initialGame);
  const [prevInitialPin, setPrevInitialPin] = useState(initialPin);

  if (isOpen !== prevOpen || initialGame !== prevInitialGame || initialPin !== prevInitialPin) {
    setPrevOpen(isOpen);
    setPrevInitialGame(initialGame);
    setPrevInitialPin(initialPin);
    setIsQrZoomed(false);
    if (initialGame) {
      setPinInput(initialGame.pin);
      setMatchedGame(initialGame);
    } else if (initialPin) {
      setPinInput(initialPin);
      setMatchedGame(findGameByPin(initialPin) || null);
    } else {
      setPinInput('');
      setMatchedGame(null);
    }
  }

  const [prevMatchedGame, setPrevMatchedGame] = useState<LearningGame | null>(matchedGame);
  if (matchedGame !== prevMatchedGame) {
    setPrevMatchedGame(matchedGame);
    if (!matchedGame) {
      setQrCodeUrl(null);
    }
  }

  // 모달 열릴 때 포커스
  useEffect(() => {
    if (isOpen && !initialGame) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialGame]);

  // QR 코드 비동기 생성 (외부 라이브러리 비동기 Promise)
  useEffect(() => {
    if (!matchedGame) return;
    let isCurrent = true;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ysschool.vercel.app';
    const targetUrl = `${origin}${matchedGame.url}`;

    QRCode.toDataURL(targetUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isCurrent) setQrCodeUrl(url);
      })
      .catch(() => {
        if (isCurrent) setQrCodeUrl(null);
      });

    return () => {
      isCurrent = false;
    };
  }, [matchedGame]);

  // 키보드 Esc 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isQrZoomed) {
          setIsQrZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isQrZoomed, onClose]);

  // PIN 입력 변경 시 자동 탐색
  const handlePinChange = (val: string) => {
    const cleaned = val.replace(/[^0-9a-zA-Z]/g, '').slice(0, 4);
    setPinInput(cleaned);
    if (cleaned.length >= 1) {
      const found = findGameByPin(cleaned);
      setMatchedGame(found || null);
    } else {
      setMatchedGame(null);
    }
  };

  const handleLaunch = (game: LearningGame) => {
    if (onPlayGame) {
      onPlayGame(game);
      onClose();
    } else {
      window.open(game.url, '_blank');
      onClose();
    }
  };

  const copyShareLink = (game: LearningGame) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ysschool.vercel.app';
    const url = `${origin}${game.url}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold">
                🎮
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>학생 수업 게임 입장</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    QR & PIN
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  카메라로 QR 코드를 찍거나 3자리 PIN 번호로 즉시 시작하세요
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 flex flex-col items-center overflow-y-auto">
            {/* PIN Input Area */}
            <div className="w-full max-w-sm mb-5 text-center">
              <label htmlFor="student-pin-input" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                게임 코드 입력 (예: 001, 1, 042)
              </label>
              <div className="relative">
                <input
                  id="student-pin-input"
                  ref={inputRef}
                  type="text"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => handlePinChange(e.target.value)}
                  placeholder="001"
                  className="w-full text-center text-4xl sm:text-5xl font-mono font-black tracking-widest py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-brand-sky focus:outline-none text-slate-900 dark:text-white transition-all shadow-inner"
                />
                {pinInput && (
                  <button
                    type="button"
                    onClick={() => handlePinChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Matched Game Result */}
            {matchedGame ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col gap-4 mb-2"
              >
                {!isQrZoomed ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      {/* Left: Game Info & PIN */}
                      <div className="md:col-span-3 flex flex-col justify-between">
                        <div className="flex items-start gap-3">
                          <div className="text-4xl p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-600 shrink-0">
                            {matchedGame.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white font-mono font-black text-xs">
                                PIN {matchedGame.pin}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-brand-sky/20 text-brand-navy dark:text-brand-sky font-bold text-xs">
                                {matchedGame.subject}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs">
                                {matchedGame.gradeLabel}
                              </span>
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white truncate">
                              {matchedGame.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                              {matchedGame.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                          <p>💡 교실 단말기에서 <strong>PIN {matchedGame.pin}</strong>을 누르거나, 오른쪽 <strong>QR 코드</strong>를 스캔하세요.</p>
                        </div>
                      </div>

                      {/* Right: QR Code Preview */}
                      <div className="md:col-span-2 flex flex-col items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                        {qrCodeUrl ? (
                          <div className="relative group flex flex-col items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={qrCodeUrl}
                              alt={`${matchedGame.title} 접속 QR 코드`}
                              className="w-36 h-36 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm"
                            />
                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 mt-2">
                              <QrCode className="w-3.5 h-3.5 text-emerald-500" />
                              <span>QR로 즉시 입장</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsQrZoomed(true)}
                              className="mt-1.5 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold transition-colors cursor-pointer"
                              title="전자칠판용 크게 보기"
                            >
                              <Maximize2 className="w-3 h-3" />
                              <span>칠판용 크게 보기</span>
                            </button>
                          </div>
                        ) : (
                          <div className="w-36 h-36 flex items-center justify-center text-slate-400 text-xs">
                            QR 생성 중...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                      <button
                        type="button"
                        onClick={() => handleLaunch(matchedGame)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-md shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>지금 바로 게임 시작</span>
                      </button>

                      <a
                        href={matchedGame.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 transition-colors"
                        title="새 창에서 열기"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => copyShareLink(matchedGame)}
                        className="p-3 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                        title="교실 학생용 링크 복사"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </>
                ) : (
                  /* 칠판 전용 대형 QR 화면 */
                  <div className="flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="text-left">
                        <span className="text-xs font-bold text-emerald-500">📺 교실 전자칠판·TV 전체 모드</span>
                        <h4 className="text-base font-black text-slate-900 dark:text-white">
                          {matchedGame.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsQrZoomed(false)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                      >
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>기본 모드로 복귀</span>
                      </button>
                    </div>

                    {qrCodeUrl && (
                      <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrCodeUrl}
                          alt={`${matchedGame.title} 접속 QR`}
                          className="w-56 h-56 sm:w-72 sm:h-72 object-contain"
                        />
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-3">
                      <span className="text-sm font-semibold text-slate-500">학생 입력 PIN:</span>
                      <span className="px-4 py-1 rounded-xl bg-emerald-500 text-white font-mono font-black text-2xl tracking-widest shadow-md">
                        {matchedGame.pin}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      카메라를 비추거나 브라우저에서 PIN 번호를 입력하면 바로 시작됩니다.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : pinInput.length >= 1 ? (
              <div className="w-full py-8 text-center text-slate-500 dark:text-slate-400">
                <p className="text-sm font-semibold">입력하신 코드 <span className="font-mono font-bold text-amber-500">[{pinInput}]</span> 에 해당하는 게임이 없습니다.</p>
                <p className="text-xs text-slate-400 mt-1">1번 ~ 100번 사이의 번호를 입력해주세요. (예: 1, 001, 042)</p>
              </div>
            ) : (
              <div className="w-full py-4 text-center">
                <span className="text-xs text-slate-400 font-medium">추천 코드:</span>
                <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                  {[
                    { pin: '001', name: '매쓰 서바이버즈' },
                    { pin: '002', name: '교육용 테트리스' },
                    { pin: '004', name: '분수 닌자' },
                    { pin: '005', name: '구구단 디펜스' },
                    { pin: '008', name: '맞춤법 버블팝' },
                  ].map((rec) => (
                    <button
                      key={rec.pin}
                      type="button"
                      onClick={() => handlePinChange(rec.pin)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <span className="font-mono text-emerald-500 font-bold mr-1">{rec.pin}</span>
                      {rec.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Smartboard Teacher Guide Info */}
            <div className="w-full mt-2 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>💡 선생님: 교실 전자칠판·TV에 띄우면 학생들이 QR 카메라 스캔 또는 3자리 PIN으로 즉시 입장할 수 있습니다.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
