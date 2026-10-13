'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Copy,
  Check,
  Monitor,
  QrCode,
  X,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import QRCode from 'qrcode';

interface TeacherShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export default function TeacherShareModal({
  isOpen,
  onClose,
  url,
}: TeacherShareModalProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'messenger' | 'shortcut' | 'qr'>('messenger');

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://ysschool.vercel.app');

  // 교사 메신저(쿨메신저/카카오톡) 맞춤 추천 텍스트
  const shareMessage = `[엽쌤스쿨 추천] 선생님, 교실 수업과 아침맞이에 유용한 플랫폼 안내드립니다!
✨ 전자칠판 전용 아침맞이 데스크 (실시간 대형시계·전국급식·집중BGM·알림판)
🎮 2022 개정 교육과정 연계 100종 무료 배움게임 (학생 PIN 입장)
📂 엽쌤 제작 실천 수업 자료 59종 & 연수 강의안 900+종
👉 접속 링크: ${targetUrl}`;

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((dataUrl) => {
        if (isMounted) setQrCodeUrl(dataUrl);
      })
      .catch(() => {
        if (isMounted) setQrCodeUrl(null);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, targetUrl]);

  // ESC 키 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2500);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-sky/15 text-brand-navy dark:text-brand-sky font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>동료 교사 공유 & 바로가기</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    교실 추천
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  쿨메신저·카톡 공유 및 전자칠판 바탕화면 앱 설치 안내
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-1.5 sm:p-2 gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('messenger')}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'messenger'
                  ? 'bg-white dark:bg-slate-800 text-brand-navy dark:text-brand-sky shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate"><span className="hidden min-[400px]:inline">메신저 </span>추천 문구</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shortcut')}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'shortcut'
                  ? 'bg-white dark:bg-slate-800 text-brand-navy dark:text-brand-sky shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate"><span className="hidden min-[400px]:inline">전자칠판 </span>바탕화면 앱</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('qr')}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 sm:px-3 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'qr'
                  ? 'bg-white dark:bg-slate-800 text-brand-navy dark:text-brand-sky shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate"><span className="hidden min-[400px]:inline">학생 </span>태블릿 QR</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-5 overflow-y-auto space-y-4">
            {activeTab === 'messenger' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>쿨메신저 · 카카오톡 원클릭 추천 양식</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      동학년 추천용
                    </span>
                  </div>
                  <pre className="text-xs font-sans text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    {shareMessage}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-sky to-brand-navy hover:opacity-95 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>추천 문구 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>추천 문구 전체 복사</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>URL 복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>링크만 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  💡 학년 협의록, 교과 연수 자료, 학급 단톡방에 바로 붙여넣어 활용하세요.
                </p>
              </div>
            )}

            {activeTab === 'shortcut' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs leading-relaxed space-y-2">
                  <div className="font-extrabold flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                    <Monitor className="w-4 h-4" />
                    <span>전자칠판 바탕화면에 &apos;1초 바로가기 앱&apos; 만들기</span>
                  </div>
                  <p>
                    매번 인터넷 주소를 치지 않아도, 교실 컴퓨터나 전자칠판 바탕화면에서 더블 클릭 한 번으로 무광고 전체화면 교실 데스크가 열립니다.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <div className="w-6 h-6 rounded-full bg-brand-sky text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="text-xs">
                      <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">
                        크롬(Chrome) 또는 엣지(Edge) 브라우저 열기
                      </strong>
                      <span className="text-slate-500 dark:text-slate-400">
                        브라우저 우측 상단의 <strong>[점 3개(⋮)]</strong> 메뉴 버튼을 누릅니다.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <div className="w-6 h-6 rounded-full bg-brand-sky text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="text-xs">
                      <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">
                        &lsquo;저장 및 공유&rsquo; ➡️ &lsquo;바로가기 만들기&rsquo; 클릭
                      </strong>
                      <span className="text-slate-500 dark:text-slate-400">
                        (엣지 브라우저는 <strong>&lsquo;앱&rsquo; ➡️ &lsquo;이 사이트를 앱으로 설치&rsquo;</strong>를 선택합니다)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="text-xs">
                      <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">
                        &lsquo;창으로 열기&rsquo; 체크 후 [만들기]
                      </strong>
                      <span className="text-slate-500 dark:text-slate-400">
                        바탕화면에 생성된 아이콘을 더블클릭하면 주소창 없이 앱처럼 깔끔하게 교실 데스크가 시작됩니다!
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    🌟 윈도우 시작 시 자동 실행으로 아침 출근 준비 끝!
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    주소 복사
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'qr' && (
              <div className="flex flex-col items-center justify-center py-4 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 text-center max-w-sm">
                  학생들이 스마트폰이나 태블릿 카메라로 비추면 주소 입력 없이 즉시 엽쌤스쿨로 접속합니다.
                </p>

                {qrCodeUrl ? (
                  <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeUrl}
                      alt="접속용 QR 코드"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    />
                    <span className="text-[11px] font-mono text-slate-500 mt-2 font-bold">
                      {targetUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs text-slate-400">
                    QR 코드 생성 중...
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="flex items-center gap-2 py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>접속 링크 복사</span>
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
