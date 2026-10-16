'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Gamepad2, Sunrise, Search, MessageCircle } from 'lucide-react';

const ONBOARDING_KEY = 'ysschool-onboarding-done';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: '환영합니다! 🎉',
    description: '엽쌤스쿨은 100종 배움게임, 수업 자료, 교실 도구를 한곳에 모은 교육 플랫폼입니다.',
    icon: <Sparkles className="w-6 h-6 text-amber-500" />,
  },
  {
    title: '100종 배움게임',
    description: '학생이 3자리 PIN만 입력하면 즉시 교과 연계 게임에 입장할 수 있어요.',
    icon: <Gamepad2 className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: '아침 교실 데스크',
    description: '출근 후 전자칠판에 띄우면! 시계, 타이머, BGM, 알림판이 한 화면에.',
    icon: <Sunrise className="w-6 h-6 text-orange-500" />,
  },
  {
    title: 'Ctrl+K 통합 검색',
    description: '어디서든 Ctrl+K를 누르면 게임, 자료, 페이지를 한 번에 검색할 수 있어요.',
    icon: <Search className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'AI 챗봇 어시스턴트',
    description: '오른쪽 하단 말풍선을 누르면 엽쌤 AI가 궁금한 것을 안내해드려요.',
    icon: <MessageCircle className="w-6 h-6 text-violet-500" />,
  },
];

export default function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY);
    if (!done) {
      // 스플래시 스크린 이후에 표시 (2.5초 지연)
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(ONBOARDING_KEY, 'true');
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key={currentStep}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Progress */}
          <div className="flex gap-1 px-6 pt-5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= currentStep ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-keep">
              {step.description}
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <button
              onClick={handleDismiss}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              건너뛰기
            </button>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors active:scale-95"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  다음 <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                '시작하기 🚀'
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
