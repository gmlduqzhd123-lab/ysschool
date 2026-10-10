'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Power,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  link?: { label: string; href: string };
}

interface QuickChip {
  id: string;
  label: string;
  icon: string;
  query: string;
  category: string;
}

const QUICK_CHIPS: QuickChip[] = [
  { id: 'games', label: '100종 배움게임 추천', icon: '🎮', query: '100종 배움게임 추천해줘', category: '게임' },
  { id: 'morning', label: '아침 교실 전자칠판', icon: '🌅', query: '아침 교실 데스크 어떻게 써?', category: '교실' },
  { id: 'meal', label: '오늘 학교 급식 식단', icon: '🍱', query: '학교 급식 어떻게 확인해?', category: '교실' },
  { id: 'books', label: '엽쌤 저서 10권 & 출판', icon: '📖', query: '출간하신 책 어디서 사?', category: '저서' },
  { id: 'tools', label: '에듀테크 추천 도구함', icon: '🛠️', query: '추천 에듀테크 도구 알려줘', category: '자료' },
  { id: 'training', label: '연수 및 강의 섭외', icon: '✉️', query: '연수 강의 의뢰하고 싶어요', category: '연수' },
  { id: 'acappella', label: '아카펠라 공연 영상', icon: '🎤', query: '아카펠라 공연 보고 싶어', category: '공연' },
];

const faqData = [
  {
    keywords: ['연수', '신청', '강의', '교육', '섭외', '의뢰'],
    answer: '연수 및 강의 요청은 이메일(gmlduqzhd@naver.com) 또는 홈페이지 하단 연수 의뢰를 통해 문의해주세요! 개념기반 탐구학습, AI·디지털 수업, 학생 책 쓰기 출판 등 다양한 주제의 교원 연수를 진행하고 있습니다. 😊\n\n📄 교원 연수 자료실 보기 → /training',
  },
  {
    keywords: ['책', '구매', '도서', '출판', '부크크', 'yes24', '저서'],
    answer: '엽쌤의 대표 저서 "고학년 독서인문교육, 독서미션으로 끝장내기" 및 학생 출판 프로젝트 도서 10여 권은 YES24, 교보문고, 부크크에서 만나보실 수 있습니다! 📚\n\n📖 저서 & 출판 도서 둘러보기 → /portfolio#publications',
  },
  {
    keywords: ['아침', '교실', '데스크', '전자칠판', '모닝'],
    answer: '출근 후 3초 만에 전자칠판에 띄우는 교실 전용 데스크입니다! 실시간 대형 시계, 아침 칠판 알림판, 자습 타이머, 펜타토닉 힐링 BGM, 학생 추첨기까지 무광고·무설치로 제공됩니다. 🌅\n\n🖥️ 아침 교실 데스크 풀스크린 실행 → /morning',
  },
  {
    keywords: ['급식', '식단', '밥', '점심', '메뉴'],
    answer: 'NEIS(교육행정정보시스템) 공식 연동으로 전국 모든 초·중·고등학교의 오늘/내일 급식 메뉴와 알레르기 유발 정보를 실시간으로 큰 글씨로 확인할 수 있습니다! 🍱\n\n🍱 급식 확인하러 가기 → /morning',
  },
  {
    keywords: ['게임', '학습게임', '미니게임', '배움', '100종', 'pin', '핀'],
    answer: '2022 개정 교육과정 교과서 단원별 100종 무설치 배움게임이 준비되어 있습니다! 학생들은 교실에서 3자리 PIN 번호만 입력하면 즉시 게임에 입장할 수 있어요. 🎮\n\n🎯 100종 배움게임 허브 바로가기 → /showcase',
  },
  {
    keywords: ['자작자작', '글쓰기', '플랫폼'],
    answer: '자작자작은 초등학생 맞춤형 AI 글쓰기 플랫폼으로, 400자 글쓰기부터 학생 책 출판까지 연계되는 엽쌤의 추천 도구입니다! ✍️\n\n🔧 에듀테크 서재 둘러보기 → /library#tools',
  },
  {
    keywords: ['에듀테크', '도구', '프로그램', '앱', '서재'],
    answer: '자작자작(글쓰기), 부크크(출판), 투닝(웹툰), 캔바(디자인), 띵커벨(퀴즈), 패들렛(협업) 등 엽쌤이 수업에서 직접 검증한 도구들을 모아두었습니다! 🛠️\n\n🔧 에듀테크 추천 도구함 → /library#tools',
  },
  {
    keywords: ['아카펠라', '노래', '공연', '아카라카', '음악'],
    answer: '전남 초등교사 아카펠라 그룹 "아카라카"에서 보컬퍼커셔니스트 & 바리톤으로 활동 중입니다! 다양한 축제 공연과 교육 봉사 영상을 감상해보세요. 🎵\n\n🎤 아카펠라 활동 영상 보기 → /portfolio#acappella',
  },
  {
    keywords: ['발명', '영재', '특허'],
    answer: '전남교육청 발명교육센터에서 발명영재 심화/사사 과정을 지도하며, 학생 특허 출원과 창의융합 발명교육을 함께하고 있습니다! 💡\n\n🏆 교육 활동 및 발자취 보기 → /portfolio',
  },
  {
    keywords: ['쇼케이스', '웹앱', '개발', '포트폴리오', '갤러리'],
    answer: '선생님과 학생들을 위해 직접 개발한 100종 배움게임, AI 프롬프트 놀이터, 교실 타이머 등 다양한 교육용 웹앱을 만나보세요! 💻\n\n🎮 100종 배움게임 & 웹앱 → /showcase',
  },
  {
    keywords: ['안녕', '반갑', '하이', 'hello', 'hi'],
    answer: '반갑습니다! 엽쌤스쿨에 오신 것을 환영해요! 🎉 교실 수업 자료, 100종 게임, 연수 안내 등 무엇이든 물어보세요!',
  },
  {
    keywords: ['감사', '고마', '수고', '최고'],
    answer: '방문해주셔서 감사합니다! 선생님과 학생들의 즐거운 학교생활을 언제나 응원합니다. 더 궁금한 점이 있으시면 편하게 말씀해 주세요! 😄',
  },
  {
    keywords: ['수상', '상', '표창', '실적'],
    answer: '수업혁신사례연구대회 전국 2등급(교육부장관표창), 독서인문교육 교육감표창 등 주요 수상 내역과 교단 발자취를 확인하실 수 있습니다! 🏆\n\n🏅 명예의 전당 보기 → /portfolio#hall-of-fame',
  },
  {
    keywords: ['프롬프트', 'ai', '인공지능', '놀이터'],
    answer: '초등학생도 쉽고 재미있게 배우는 AI 프롬프트 놀이터에서 프롬프트 작성법을 미션으로 익혀보세요! 🤖\n\n🎯 AI 프롬프트 놀이터 → /playground',
  },
];

interface BotAnswer {
  text: string;
  link?: { label: string; href: string };
}

function parseAnswer(answer: string): BotAnswer {
  const match = answer.match(/\n\n([^\n]+?)\s*→\s*(\/[^\s]*)\s*$/);
  if (!match) return { text: answer };
  return {
    text: answer.slice(0, match.index).trimEnd(),
    link: { label: match[1].trim(), href: match[2] },
  };
}

function findAnswer(input: string): BotAnswer {
  const lower = input.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      return parseAnswer(faq.answer);
    }
  }
  return {
    text: '좋은 질문이네요! 😊 더 구체적인 상담이나 자료 요청은 이메일(gmlduqzhd@naver.com)로 남겨주시면 엽쌤이 확인 후 친절히 답변드리겠습니다!',
    link: { label: '📧 연수 및 협업 문의 바로가기', href: '/#contact' },
  };
}

export default function ChatBot() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: '안녕하세요! 에듀테크 크리에이터 엽쌤 안내봇입니다 🤖\n아래 추천 질문을 누르시거나 궁금한 내용을 편하게 물어보세요!',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (chipsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chipsRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  };

  const handleChipsScroll = (direction: 'left' | 'right') => {
    if (chipsRef.current) {
      const distance = 160;
      chipsRef.current.scrollBy({
        left: direction === 'left' ? -distance : distance,
        behavior: 'smooth',
      });
      setTimeout(checkScrollState, 200);
    }
  };

  const handleChipsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (chipsRef.current && e.deltaY !== 0) {
      chipsRef.current.scrollLeft += e.deltaY;
      checkScrollState();
    }
  };

  // 메시지 스크롤 자동 이동
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      checkScrollState();
    }
  }, [messages, isTyping, isOpen]);

  const handleDisable = () => {
    setIsOpen(false);
    setIsEnabled(false);
  };

  const handleEnable = () => {
    setIsEnabled(true);
    setIsOpen(true);
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'bot',
        text: '안녕하세요! 에듀테크 크리에이터 엽쌤 안내봇입니다 🤖\n아래 추천 질문을 누르시거나 궁금한 내용을 편하게 물어보세요!',
      },
    ]);
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg: Message = { role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 실제 타이핑 느낌의 부드러운 딜레이 (450ms)
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages(prev => [...prev, { role: 'bot', ...answer }]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 챗봇 다시 켜기 버튼 (비활성화 상태일 때) */}
      <AnimatePresence>
        {!isEnabled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleEnable}
            className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-brand-navy dark:hover:text-brand-sky transition-all group"
            aria-label="채팅봇 다시 켜기"
            title="채팅봇 켜기"
          >
            <Power className="w-4 h-4" />
            <span className="absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-slate-800 dark:bg-slate-600 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              챗봇 켜기
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 플로팅 챗봇 버튼 */}
      <AnimatePresence>
        {isEnabled && !isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 px-4 py-3 sm:px-4 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-navy via-indigo-600 to-sky-500 text-white shadow-xl shadow-blue-900/30 flex items-center gap-2.5 cursor-pointer hover:shadow-sky-500/40 transition-all border border-white/20"
            aria-label="엽쌤 AI 안내봇 열기"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
            </div>
            <span className="text-xs sm:text-sm font-extrabold tracking-tight">
              엽쌤 안내봇
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 챗봇 대화창 */}
      <AnimatePresence>
        {isEnabled && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-50 sm:w-[390px] h-[580px] max-h-[85dvh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-label="엽쌤 AI 안내봇"
          >
            {/* 상단 헤더 */}
            <div className="bg-gradient-to-r from-brand-navy via-indigo-700 to-sky-600 p-4 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-inner">
                  <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-extrabold text-sm tracking-tight">엽쌤 AI 안내봇</p>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-200 text-[10px] font-bold">LIVE</span>
                  </div>
                  <p className="text-white/80 text-[11px]">무설치 교실자료 & 섭외 빠른 안내</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="대화 초기화"
                  title="대화 초기화"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleDisable}
                  className="p-1.5 rounded-xl text-white/80 hover:text-amber-200 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="채팅봇 숨기기"
                  title="챗봇 숨기기"
                >
                  <Power className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="채팅창 닫기"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5" aria-live="polite">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    {msg.text}

                    {/* 추천 링크 액션 버튼 */}
                    {msg.link && (
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                        <Link
                          href={msg.link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all group/btn"
                        >
                          <span>{msg.link.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* 답변 작성 중 애니메이션 */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2.5 rounded-bl-xs flex items-center gap-1 border border-slate-200/60 dark:border-slate-700/60">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 원클릭 추천 퀵 칩 섹션 */}
            <div className="px-3 pt-2 pb-2 bg-slate-50/90 dark:bg-slate-800/80 border-t border-slate-200/80 dark:border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 truncate">
                    자주 묻는 질문 퀵 추천:
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal hidden sm:inline">
                    (마우스 휠/스크롤 이동)
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleChipsScroll('left')}
                    disabled={!canScrollLeft}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-not-allowed"
                    title="이전 퀵 추천 보기"
                    aria-label="이전 퀵 추천"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChipsScroll('right')}
                    disabled={!canScrollRight}
                    className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 disabled:opacity-25 transition-all cursor-pointer disabled:cursor-not-allowed"
                    title="다음 퀵 추천 보기"
                    aria-label="다음 퀵 추천"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 칩 가로 스크롤 영역 */}
              <div className="relative">
                <div
                  ref={chipsRef}
                  onScroll={checkScrollState}
                  onWheel={handleChipsWheel}
                  className="flex gap-1.5 overflow-x-auto pb-1 scroll-smooth overscroll-x-contain select-none"
                  style={{
                    scrollbarWidth: 'thin',
                  }}
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => handleSend(chip.query)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-[11px] font-bold whitespace-nowrap shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
                    >
                      <span>{chip.icon}</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>

                {/* 우측 추가 컨텐츠 그라데이션 페이드 힌트 */}
                {canScrollRight && (
                  <div
                    onClick={() => handleChipsScroll('right')}
                    className="absolute right-0 top-0 bottom-1 w-6 bg-gradient-to-l from-slate-100 dark:from-slate-800 to-transparent pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* 메시지 입력창 */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="궁금한 내용을 편하게 입력하세요..."
                  aria-label="안내봇에게 보낼 메시지"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/40 border border-transparent focus:border-blue-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  aria-label="메시지 보내기"
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
