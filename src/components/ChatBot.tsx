'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Power } from 'lucide-react';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

const faqData = [
  {
    keywords: ['연수', '신청', '강의', '교육'],
    answer: '연수 및 강의 요청은 이메일(gmlduqzhd@naver.com)로 문의해주세요! 전남교육청 발명교육센터 연수, 교육지원청 연수 등 다양한 연수를 진행하고 있습니다. 😊',
  },
  {
    keywords: ['책', '구매', '도서', '출판', '부크크'],
    answer: '엽쌤의 도서는 부크크(bookk.co.kr)에서 구매할 수 있습니다! "교실 속 생각 레시피", "독서로 시작하는 인문학 수업" 등 10권 이상의 도서가 있습니다. 📚',
  },
  {
    keywords: ['자작자작', '글쓰기', '플랫폼'],
    answer: '자작자작은 AI 기반 글쓰기 플랫폼으로, 학생들이 단계적으로 글쓰기 능력을 향상시킬 수 있습니다. 처음에는 400자부터 시작해 점차 분량을 늘려가며, AI가 맞춤형 피드백을 제공합니다. ✍️',
  },
  {
    keywords: ['에듀테크', '도구', '프로그램', '앱'],
    answer: '엽쌤이 활용하는 주요 에듀테크: 자작자작(글쓰기), 부크크(출판), 크리드(AI 피드백), 투닝(웹툰), 캔바(디자인), 패들렛(협업), 띵커벨(퀴즈) 등이 있습니다! 🛠️',
  },
  {
    keywords: ['아카펠라', '노래', '공연', '아카라카'],
    answer: '엽쌤은 전남 초등교사 아카펠라 그룹 "아카라카"에서 보컬퍼커셔니스트 & 바리톤으로 활동하고 있습니다! 다양한 공연과 봉사활동을 진행합니다. 🎵',
  },
  {
    keywords: ['발명', '영재', '특허'],
    answer: '전남교육청 발명교육센터에서 발명영재 심화/사사 과정을 지도하고 있습니다. 학생 특허 출원 지도 경험도 있습니다! 💡',
  },
  {
    keywords: ['쇼케이스', '웹앱', '개발', '포트폴리오'],
    answer: '엽쌤이 직접 개발한 웹앱들은 상단 메뉴의 "에듀테크 쇼케이스"에서 확인할 수 있습니다! 교실에서 바로 사용할 수 있는 다양한 도구들이 있어요. 💻',
  },
  {
    keywords: ['안녕', '반갑', '하이', 'hello', 'hi'],
    answer: '안녕하세요! 엽쌤스쿨에 오신 것을 환영합니다! 🎉 궁금한 것이 있으시면 편하게 물어보세요!',
  },
  {
    keywords: ['감사', '고마', '수고'],
    answer: '감사합니다! 엽쌤스쿨을 방문해주셔서 정말 기쁩니다. 더 궁금한 점이 있으면 언제든 물어보세요! 😄',
  },
];

const quickQuestions = [
  '연수 신청 방법이 궁금해요',
  '출간하신 책은 어디서 구매하나요?',
  '자작자작이 뭔가요?',
  '에듀테크 도구 추천해주세요',
];

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of faqData) {
    if (faq.keywords.some(kw => lower.includes(kw))) {
      return faq.answer;
    }
  }
  return '좋은 질문이네요! 😊 더 자세한 내용은 이메일(gmlduqzhd@naver.com)로 문의해주시면 엽쌤이 직접 답변드리겠습니다!';
}

export default function ChatBot() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 엽쌤 AI 어시스턴트입니다 🤖\n궁금한 점을 물어보세요!' },
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
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
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
            className="fixed bottom-8 left-8 z-50 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-brand-navy dark:hover:text-brand-sky transition-all group"
            aria-label="채팅봇 다시 켜기"
            title="채팅봇 켜기"
          >
            <Power className="w-4 h-4" />
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
            className="fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-navy to-brand-sky text-white shadow-lg shadow-brand-navy/30 flex items-center justify-center cursor-pointer hover:shadow-brand-sky/40 transition-shadow"
            aria-label="채팅봇 열기"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange rounded-full animate-pulse" />
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
            className="fixed bottom-8 left-8 z-50 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-sky p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">엽쌤 AI</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/70 text-xs">온라인</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleDisable}
                  className="p-1.5 rounded-lg text-white/50 hover:text-red-300 hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="채팅봇 끄기"
                  title="챗봇 끄기"
                >
                  <Power className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="채팅창 닫기"
                  title="채팅창 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '300px' }}>
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
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-brand-sky/50 transition-all"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-10 h-10 rounded-xl bg-brand-navy hover:bg-brand-navy/80 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
