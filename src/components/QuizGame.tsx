'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ChevronRight, RotateCcw, Share2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: '엽쌤이 활동하는 아카펠라 그룹의 이름은?',
    options: ['하모니즈', '아카라카', '보이스밴드', '코러스원'],
    answer: 1,
    explanation: '전남 초등교사 아카펠라 그룹 "아카라카"에서 보컬퍼커셔니스트 & 바리톤으로 활동하고 있습니다!',
  },
  {
    question: '엽쌤이 학생들의 글쓰기 교육에 주로 활용하는 AI 플랫폼은?',
    options: ['노션', '자작자작', '구글독스', '한글'],
    answer: 1,
    explanation: '자작자작은 AI 기반 글쓰기 플랫폼으로, 학생들이 단계적으로 글쓰기 능력을 향상시킬 수 있습니다.',
  },
  {
    question: '엽쌤이 학생들과 함께 책을 출판할 때 사용하는 플랫폼은?',
    options: ['교보문고', '부크크', '알라딘', '예스24'],
    answer: 1,
    explanation: '부크크(bookk.co.kr)는 1인 출판 플랫폼으로, ISBN을 발급받아 정식 도서를 출간할 수 있습니다.',
  },
  {
    question: '엽쌤스쿨의 슬로건은 무엇인가요?',
    options: ['함께 성장하는 교실', '경계를 넘어서는 교육', '미래를 여는 수업', '배움의 새로운 시작'],
    answer: 1,
    explanation: '"경계를 넘어서는 교육" - 교실의 경계를 넘어 다양한 영역을 융합하는 엽쌤의 교육 철학입니다.',
  },
  {
    question: '엽쌤이 지도하는 영재교육의 분야는?',
    options: ['수학영재', '과학영재', '발명영재', '정보영재'],
    answer: 2,
    explanation: '전남교육청 발명교육센터에서 발명영재 심화/사사 과정을 지도하고 있습니다.',
  },
  {
    question: '엽쌤이 출간한 도서는 약 몇 권인가요?',
    options: ['3권', '5권', '10권', '15권'],
    answer: 2,
    explanation: '독서인문교육, 에듀테크 활용 등 다양한 주제로 약 10권의 도서를 출간했습니다.',
  },
  {
    question: '다음 중 엽쌤이 활용하는 에듀테크 도구가 아닌 것은?',
    options: ['투닝', '패들렛', '로블록스', '띵커벨'],
    answer: 2,
    explanation: '투닝(웹툰), 패들렛(협업보드), 띵커벨(퀴즈) 모두 엽쌤이 수업에서 활용하는 도구입니다.',
  },
  {
    question: '엽쌤의 교육 분야 중 "글로-CAL"이란?',
    options: ['글로벌 캘린더', '글로벌+로컬 융합교육', '글쓰기 캘리그라피', '글로벌 커뮤니케이션'],
    answer: 1,
    explanation: 'GLObal + loCAL = 글로-CAL. 세계와 지역을 연결하는 융합교육을 의미합니다.',
  },
  {
    question: '엽쌤은 어떤 학교급의 교사인가요?',
    options: ['유치원', '초등학교', '중학교', '고등학교'],
    answer: 1,
    explanation: '엽쌤(김희엽)은 현직 초등학교 교사입니다.',
  },
  {
    question: '전국수업실천사례대회에서 엽쌤이 받은 상은?',
    options: ['대상', '최우수상(차상)', '우수상', '장려상'],
    answer: 1,
    explanation: '전국수업실천사례대회에서 차상(교육부장관상)을 수상했습니다!',
  },
];

const resultTitles = [
  { min: 9, title: '🏅 엽쌤 박사', desc: '엽쌤스쿨의 모든 것을 꿰뚫고 있는 당신! 엽쌤의 수제자급입니다!', color: 'from-yellow-400 to-amber-500' },
  { min: 7, title: '📖 에듀테크 탐험가', desc: '엽쌤스쿨에 대해 잘 알고 계시네요! 이미 교육 전문가의 자질이!', color: 'from-blue-400 to-cyan-500' },
  { min: 4, title: '🌱 배움의 새싹', desc: '엽쌤스쿨에 대해 조금씩 알아가고 있네요! 더 많이 탐험해보세요!', color: 'from-green-400 to-emerald-500' },
  { min: 0, title: '👋 엽쌤스쿨 첫 방문자', desc: '환영합니다! 사이트를 둘러보며 엽쌤에 대해 더 알아보세요!', color: 'from-purple-400 to-pink-500' },
];

function getResult(score: number) {
  return resultTitles.find(r => score >= r.min) || resultTitles[resultTitles.length - 1];
}

export default function QuizGame() {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[currentQ].answer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setGameState('result');
    }
  };

  const result = getResult(score);
  const q = quizQuestions[currentQ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Quiz Game</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('엽쌤 퀴즈', 'YeopSsaem Quiz')}
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t('엽쌤스쿨에 대해 얼마나 알고 있나요? 퀴즈로 확인해보세요!', 'How well do you know YeopSsaem? Take the quiz!')}
          </p>
        </motion.div>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-slate-700 shadow-sm">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-6">🎯</div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">엽쌤 퀴즈 챌린지</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  총 {quizQuestions.length}문제 · 엽쌤스쿨에 대한 재미있는 퀴즈!
                </p>
                <button
                  onClick={startGame}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-navy to-brand-sky text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  퀴즈 시작하기
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                    {currentQ + 1} / {quizQuestions.length}
                  </span>
                  <span className="text-sm font-bold text-brand-sky">
                    점수: {score}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-8">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-navy to-brand-sky rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6 break-keep">
                  Q. {q.question}
                </h4>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {q.options.map((opt, idx) => {
                    let style = 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-brand-sky';
                    if (selected !== null) {
                      if (idx === q.answer) style = 'bg-green-50 dark:bg-green-900/30 border-green-400 text-green-700 dark:text-green-300';
                      else if (idx === selected) style = 'bg-red-50 dark:bg-red-900/30 border-red-400 text-red-700 dark:text-red-300';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selected !== null}
                        className={`w-full text-left px-5 py-3.5 rounded-xl border-2 font-medium transition-all duration-200 cursor-pointer ${style} ${
                          selected === null ? 'hover:-translate-y-0.5 hover:shadow-md' : ''
                        }`}
                      >
                        <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6"
                    >
                      <div className={`p-4 rounded-xl text-sm ${
                        selected === q.answer
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        <p className="font-bold mb-1">{selected === q.answer ? '✅ 정답!' : '❌ 아쉽네요!'}</p>
                        <p className="break-keep">{q.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selected !== null && (
                  <button
                    onClick={nextQuestion}
                    className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {currentQ < quizQuestions.length - 1 ? '다음 문제' : '결과 보기'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            )}

            {gameState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${result.color} mb-6`}>
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{result.title}</h4>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 break-keep">{result.desc}</p>
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-sky mb-8">
                  {score} / {quizQuestions.length}
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={startGame}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    다시 도전
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
