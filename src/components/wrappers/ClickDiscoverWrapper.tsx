'use client';

/**
 * ClickDiscoverWrapper - 숨겨진 이스터에그 래퍼 컴포넌트
 *
 * 사용법:
 *   <ClickDiscoverWrapper>
 *     <YourComponent />
 *   </ClickDiscoverWrapper>
 *
 * 3초 이내에 자식 요소를 5번 연속 클릭하면 숨겨진 축하 모달이 나타납니다.
 * 초등학생 방문자를 위한 소소한 재미 요소입니다.
 */

import { useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PartyPopper, Sparkles, Star } from 'lucide-react';
import { fireConfetti } from '../animations/ConfettiEffect';

interface ClickDiscoverWrapperProps {
  children: ReactNode;
  requiredClicks?: number;   // 필요한 클릭 수 (기본: 5)
  timeWindowMs?: number;     // 시간 제한 (기본: 3000ms)
  message?: string;          // 커스텀 축하 메시지
  subMessage?: string;       // 부제 메시지
}

export default function ClickDiscoverWrapper({
  children,
  requiredClicks = 5,
  timeWindowMs = 3000,
  message = '🎉 축하합니다! 🎉',
  subMessage = "선생님의 비밀 상장을 찾아내셨군요!\n앞으로 출시될 '오늘 뭐 먹지?? 스페셜 에디션'도 기대해 주세요!",
}: ClickDiscoverWrapperProps) {
  const [showModal, setShowModal] = useState(false);
  const clickCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    // 기존 onClick 이벤트를 방해하지 않음
    clickCountRef.current += 1;

    // 첫 번째 클릭 시 타이머 시작
    if (clickCountRef.current === 1) {
      timerRef.current = setTimeout(() => {
        clickCountRef.current = 0; // 시간 초과 시 리셋
      }, timeWindowMs);
    }

    // 목표 클릭 수 달성!
    if (clickCountRef.current >= requiredClicks) {
      clickCountRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 이스터에그 발동!
      setShowModal(true);
      fireConfetti();
      setTimeout(() => fireConfetti(), 500);
    }
  };

  return (
    <>
      <div onClickCapture={handleClick}>{children}</div>

      {/* 이스터에그 축하 모달 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 5, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-slate-800 dark:via-slate-850 dark:to-indigo-950 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-amber-200 dark:border-indigo-500"
            >
              {/* 상단 장식 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-orange via-brand-sky to-brand-navy" />

              {/* 떠다니는 별들 */}
              <div className="absolute top-4 left-4 text-amber-400 animate-pulse">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="absolute top-8 right-8 text-sky-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="absolute top-16 left-12 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }}>
                <Star className="w-4 h-4 fill-current" />
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors z-10 cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>

              {/* 콘텐츠 */}
              <div className="pt-12 pb-8 px-8 text-center">
                {/* 파티 아이콘 */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-300/50 dark:shadow-orange-800/50">
                    <PartyPopper className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* 메시지 */}
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                  {message}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                  {subMessage}
                </p>

                {/* 학교종 이모지 장식 */}
                <div className="mt-6 flex justify-center gap-3 text-2xl">
                  <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    🔔
                  </motion.span>
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                    ⭐
                  </motion.span>
                  <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
                    🏆
                  </motion.span>
                </div>

                {/* 닫기 버튼 */}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-8 bg-gradient-to-r from-brand-navy to-brand-sky hover:from-brand-sky hover:to-brand-navy text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-sm"
                >
                  확인했어요! 👍
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
