'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Power } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  link?: { label: string; href: string };
}

const faqData = [
  {
    keywords: ['연수', '신청', '강의', '교육'],
    answer: '연수 및 강의 요청은 이메일(gmlduqzhd@naver.com)로 문의해주세요! 전남교육청 발명교육센터 연수, 교육지원청 연수 등 다양한 연수를 진행하고 있습니다. 😊\n\n📄 연수 자료 보기 → /training',
  },
  {
    keywords: ['책', '구매', '도서', '출판', '부크크'],
    answer: '엽쌤의 도서는 YES24 및 부크크(Bookk)에서 만나보실 수 있습니다! 단독 저서 "고학년 독서인문교육, 독서미션으로 끝장내기" 및 학생 출판 프로젝트 등 총 14권의 도서가 출간되어 있습니다. 📚\n\n📖 저서 목록 보기 → /portfolio#publications',
  },
  {
    keywords: ['자작자작', '글쓰기', '플랫폼'],
    answer: '자작자작은 AI 기반 글쓰기 플랫폼으로, 학생들이 단계적으로 글쓰기 능력을 향상시킬 수 있습니다. 처음에는 400자부터 시작해 점차 분량을 늘려가며, AI가 맞춤형 피드백을 제공합니다. ✍️\n\n🔧 도구 모음 보기 → /library#tools',
  },
  {
    keywords: ['에듀테크', '도구', '프로그램', '앱'],
    answer: '엽쌤이 활용하는 주요 에듀테크: 자작자작(글쓰기), 부크크(출판), 크리드(AI 피드백), 투닝(웹툰), 캔바(디자인), 패들렛(협업), 띵커벨(퀴즈) 등이 있습니다! 🛠️\n\n🔧 도구 모음 보기 → /library#tools',
  },
  {
    keywords: ['아카펠라', '노래', '공연', '아카라카'],
    answer: '엽쌤은 전남 초등교사 아카펠라 그룹 "아카라카"에서 보컬퍼커셔니스트 & 바리톤으로 활동하고 있습니다! 다양한 공연과 봉사활동을 진행합니다. 🎵\n\n🎤 공연 영상 보기 → /portfolio#acappella',
  },
  {
    keywords: ['발명', '영재', '특허'],
    answer: '전남교육청 발명교육센터에서 발명영재 심화/사사 과정을 지도하고 있습니다. 학생 특허 출원 지도 경험도 있습니다! 💡',
  },
  {
    keywords: ['쇼케이스', '웹앱', '개발', '포트폴리오', '갤러리'],
    answer: '엽쌤이 직접 개발한 웹앱들은 100종 배움게임 및 쇼케이스에서 확인할 수 있습니다! 교실에서 바로 사용할 수 있는 다양한 도구들이 있어요. 💻\n\n🎮 100종 배움게임 → /showcase',
  },
  {
    keywords: ['안녕', '반갑', '하이', 'hello', 'hi'],
    answer: '안녕하세요! 엽쌤스쿨에 오신 것을 환영합니다! 🎉 궁금한 것이 있으시면 편하게 물어보세요!',
  },
  {
    keywords: ['감사', '고마', '수고'],
    answer: '감사합니다! 엽쌤스쿨을 방문해주셔서 정말 기쁩니다. 더 궁금한 점이 있으면 언제든 물어보세요! 😄',
  },
  {
    keywords: ['게임', '학습게임', '미니게임', '배움'],
    answer: '엽쌤스쿨 100종 배움게임에서 무설치 HTML 학습 게임을 즐겨보세요! 국어, 수학, 과학 등 다양한 과목을 게임으로 배울 수 있어요. 🎮\n\n🎮 100종 배움게임 → /showcase',
  },
  {
    keywords: ['수상', '상', '표창'],
    answer: '수업혁신사례연구대회 전국 2등급(교육부장관표창), 독서인문교육 교육감표창 등 다양한 수상 이력이 있습니다! 🏆\n\n🏅 수상 내역 보기 → /portfolio#hall-of-fame',
  },
  {
    keywords: ['프롬프트', 'AI', '인공지능'],
    answer: 'AI 프롬프트 작성법을 재미있는 게임으로 배울 수 있는 프롬프트 놀이터가 있어요! 🤖\n\n🎯 프롬프트 놀이터 → /playground',
  },
];

const quickQuestions = [
  '연수 신청은 어떻게 하나요?',
  '출간하신 책은 어디서 구매하나요?',
  '에듀테크 도구 추천해주세요',
  '아카펠라 공연 보고 싶어요',
];

interface BotAnswer {
  text: string;
  link?: { label: string; href: string };
}

// Answers end with an optional "\n\n<label> → /path" hint; turn it into a real link.
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
  return { text: '좋은 질문이네요! 😊 더 자세한 내용은 이메일(gmlduqzhd@naver.com)로 문의해주시면 엽쌤이 직접 답변드리겠습니다!' };
}

export default function ChatBot() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 엽쌤 안내봇입니다 🤖\n궁금한 점을 물어보세요!' },
  ]);
  const [input, setInput] = useState('');

  const handleDisable = () => {
    setIsOpen(false);
    setIsEnabled(false);
  };

  const handleEnable = () => {
    setIsEnabled(true);
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = { role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages(prev => [...prev, { role: 'bot', ...answer }]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Re-enable Button (shown when chatbot is disabled) */}
      <AnimatePresence>
        {!isEnabled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleEnable}
            className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-brand-navy dark:hover:text-brand-sky transition-all group"
            aria-label="채팅봇 다시 켜기"
            title="채팅봇 켜기"
          >
            <Power className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-slate-800 dark:bg-slate-600 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              챗봇 켜기
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {isEnabled && !isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brand-navy to-brand-sky text-white shadow-lg shadow-brand-navy/30 flex items-center justify-center cursor-pointer hover:shadow-brand-sky/40 transition-shadow"
            aria-label="채팅봇 열기"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:-top-1 sm:-right-1 sm:w-4 sm:h-4 bg-brand-orange rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isEnabled && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto z-50 sm:w-96 max-h-[min(500px,80dvh)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="엽쌤 안내봇"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-sky p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">엽쌤 안내봇</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs">FAQ 안내</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDisable}
                  className="p-1.5 rounded-lg text-white/80 hover:text-red-200 hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="채팅봇 끄기"
                  title="챗봇 끄기"
                >
                  <Power className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="채팅창 닫기"
                  title="채팅창 닫기"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3" aria-live="polite">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-brand-navy text-white rounded-br-sm'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                    {msg.link && (
                      <Link
                        href={msg.link.href}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 flex w-fit items-center gap-1 rounded-full bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-brand-navy dark:text-brand-sky shadow-sm hover:bg-brand-sky/10 transition-colors"
                      >
                        {msg.link.label}
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-brand-sky/10 text-brand-navy dark:text-brand-sky hover:bg-brand-sky/20 transition-colors cursor-pointer font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-700 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="메시지를 입력하세요..."
                  aria-label="안내봇에게 보낼 메시지"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-sky/50 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  aria-label="메시지 보내기"
                  className="w-10 h-10 rounded-xl bg-brand-navy hover:bg-brand-navy/80 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
