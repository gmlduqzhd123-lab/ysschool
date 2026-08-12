'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, ChevronLeft, ChevronRight, Star, PenLine } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: '이○○ 선생님',
    role: '영광초등학교 교사',
    content: '항상 AI 관련 연수와 교실 내 활용 방법을 알고 싶어했는데 이번 기회에 아주 많은 에듀테크를 알아갈 수 있어서 너무 감사드립니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '목포에항초등학교 교사',
    content: '다양한 인공지능 플랫폼을 알 수 있었고, 선생님께서 직접 겪어온 이야기들을 바탕으로 진행해주셔서 졸리지 않고 더욱 집중이 잘 되었습니다. 감사합니다!',
    rating: 5,
  },
  {
    name: '임○○ 선생님',
    role: '목포동초등학교 교사',
    content: '\'부크크\'라는 에듀테크를 활용해 아이들이 직접 작성한 글을 책으로 묶어 낼 수 있다는 것을 새롭게 알게 되었습니다. 선생님께서 보여주신 사례들을 통해 책 출판뿐만 아니라 학생의 성장을 도모할 수 있는 학습인 것 같습니다. 저 또한 학생들과 함께 성장할 기회인 것 같습니다. 좋은 수업 감사합니다.',
    rating: 5,
  },
  {
    name: '선생님',
    role: '목포연산초등학교 교사',
    content: '에듀테크는 단순히 디지털 기기를 활용하는 것이 아니라 학생 개개인의 수준과 특성에 맞는 맞춤형 학습을 지원하고, 학습 과정과 성장을 지속적으로 확인할 수 있는 도구라는 점을 새롭게 알게 되었습니다. 학생의 깊은 마음을 글로 끌어낼 수 있는 수업 사례를 보면서 굉장히 많은 배움을 얻었습니다.',
    rating: 5,
  },
  {
    name: '이○○ 선생님',
    role: '현경북초등학교 교사',
    content: '다양한 재밌는 게임들이 너무 기억에 남아요! 재밌었어요 😊',
    rating: 5,
  },
];

interface GuestEntry {
  name: string;
  message: string;
  date: string;
}

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [guestEntries, setGuestEntries] = useState<GuestEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('ysschool-guestbook');
    if (saved) setGuestEntries(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    const newEntry: GuestEntry = {
      name: guestName.trim(),
      message: guestMessage.trim(),
      date: new Date().toLocaleDateString('ko-KR'),
    };
    const updated = [newEntry, ...guestEntries];
    setGuestEntries(updated);
    localStorage.setItem('ysschool-guestbook', JSON.stringify(updated));
    setGuestName('');
    setGuestMessage('');
    setShowForm(false);
  };

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Testimonials & Guestbook</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            방명록 & 후기
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            엽쌤스쿨을 방문해주신 분들의 따뜻한 한마디가 큰 힘이 됩니다.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-6 break-keep">
                &ldquo;{testimonials[currentIdx].content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-brand-navy dark:text-brand-sky" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{testimonials[currentIdx].name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonials[currentIdx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 p-2 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIdx ? 'bg-brand-navy dark:bg-brand-sky w-8' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Guestbook */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PenLine className="w-5 h-5 text-brand-sky" />
              방명록
            </h4>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm cursor-pointer text-sm"
            >
              <Send className="w-4 h-4" />
              글 남기기
            </button>
          </div>

          {/* Write Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="이름"
                    className="flex-shrink-0 sm:w-40 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                    required
                  />
                  <input
                    type="text"
                    value={guestMessage}
                    onChange={e => setGuestMessage(e.target.value)}
                    placeholder="따뜻한 한마디를 남겨주세요 ✨"
                    className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl font-bold transition-colors cursor-pointer text-sm"
                  >
                    등록
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Guest Entries */}
          <div className="space-y-3">
            {guestEntries.length === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">아직 방명록이 없습니다. 첫 번째 글을 남겨보세요!</p>
              </div>
            ) : (
              guestEntries.slice(0, 5).map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-brand-navy dark:text-brand-sky">
                      {entry.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{entry.name}</span>
                      <span className="text-xs text-slate-400">{entry.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 break-keep">{entry.message}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
