'use client';

/**
 * EdutechLibrary - 에듀테크 나눔 서재 페이지
 * 동료 교사들을 위한 AI 도구 활용 노하우 아코디언 UI
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Library, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AccordionItem from '@/components/AccordionItem';
import { libraryData } from '@/data/libraryData';

export default function EdutechLibraryPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-navy p-2 rounded-lg group-hover:bg-brand-sky transition-colors duration-300">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-brand-navy dark:text-white tracking-tight">YSSCHOOL</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-brand-navy dark:hover:text-brand-sky transition-colors"
          >
            ← 메인으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1d3d 0%, #1a2f5e 50%, #0c1a38 100%)' }}
      >
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <Library className="h-4 w-4 text-violet-300" />
            <span className="text-sm font-medium text-violet-200">Edutech Library</span>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            에듀테크 나눔 서재
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            바쁜 선생님들을 위한 <strong className="text-violet-300">AI 도구 활용 노하우</strong>를 한곳에 모았습니다.
            <br className="hidden sm:block" />
            각 항목을 클릭하면 실전 팁을 확인할 수 있어요.
          </motion.p>
        </div>
      </motion.section>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8"
        >
          <Sparkles className="w-5 h-5 text-violet-500" />
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            총 {libraryData.length}개의 AI 도구 노하우 · 클릭하여 펼쳐보기
          </p>
        </motion.div>

        {/* 아코디언 아이템들 */}
        <div className="flex flex-col gap-4">
          {libraryData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            >
              <AccordionItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* 하단 CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30 rounded-2xl p-8 border border-violet-100 dark:border-violet-800"
        >
          <p className="text-2xl mb-2">💡</p>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            더 많은 노하우가 궁금하신가요?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            새로운 AI 도구 활용 팁이 지속적으로 업데이트됩니다.
          </p>
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-sky text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            에듀테크 갤러리 구경하기
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
