'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home, Gamepad2, BookOpen, GraduationCap, Wrench,
  Sunrise, FileText, Bot, PenTool, Code2,
  ArrowRight, Star, Sparkles, Search,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface HubItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
  children?: { title: string; href: string }[];
}

const hubItems: HubItem[] = [
  {
    title: '홈',
    description: '엽쌤스쿨 메인 홈페이지',
    href: '/',
    icon: <Home className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: '100종 배움게임',
    description: '교과 연계 무설치 HTML 미니게임 허브',
    href: '/showcase#learning-games',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-600',
    badge: '100종',
    children: [
      { title: '수학 게임', href: '/showcase#learning-games' },
      { title: '국어 게임', href: '/showcase#learning-games' },
      { title: '과학·사회 게임', href: '/showcase#learning-games' },
    ],
  },
  {
    title: '엽쌤 개발 웹앱 (YScode)',
    description: '바이브코딩으로 만든 교육용 웹앱 모음',
    href: '/showcase#yscode',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'AI 프롬프트 놀이터',
    description: '학생·교사용 생성형 AI 실습 게임',
    href: '/playground',
    icon: <Bot className="w-6 h-6" />,
    color: 'from-sky-500 to-cyan-600',
  },
  {
    title: '아침 맞이 교실 데스크',
    description: '전자칠판 전용 시계·타이머·알림판·BGM',
    href: '/morning',
    icon: <Sunrise className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    badge: 'NEW',
  },
  {
    title: '엽쌤 제작 수업 자료',
    description: '국어·독서·인문·에듀테크 수업 지도안',
    href: '/materials',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-600',
    badge: 'NEW',
  },
  {
    title: '연수 강의안·자료실',
    description: 'AI·디지털선도·독서인문 연수 PPT 940여 종',
    href: '/training',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-blue-600 to-indigo-700',
    badge: '940+',
    children: [
      { title: 'AI 수업 설계', href: '/training/ai-lesson-design-2026' },
      { title: '교육과정 연수', href: '/training/school-curriculum-2026' },
      { title: '학생 성장 연수', href: '/training/student-growth-2026' },
    ],
  },
  {
    title: '에듀테크 나눔 서재',
    description: '추천 에듀테크 도구 큐레이션',
    href: '/library',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: '프로필 & 발자취',
    description: '약력, 출간 도서, 수상, 아카펠라 활동',
    href: '/portfolio',
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-500 to-amber-600',
    children: [
      { title: '출간 도서 14권', href: '/portfolio#publications' },
      { title: '아카펠라 활동', href: '/portfolio#acappella' },
      { title: '통합 아카이브', href: '/portfolio#archive-tabs' },
    ],
  },
  {
    title: '교육 이야기·블로그',
    description: '디지털 수업 성찰과 에듀테크 칼럼',
    href: '/blog',
    icon: <PenTool className="w-6 h-6" />,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    title: '교실 스마트 도구',
    description: '타이머·추첨기·점수판·칠판 캔버스',
    href: '/',
    icon: <Wrench className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-800',
  },
];

export default function SitemapHubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery
    ? hubItems.filter(
        (item) =>
          item.title.includes(searchQuery) ||
          item.description.includes(searchQuery) ||
          item.children?.some((c) => c.title.includes(searchQuery)),
      )
    : hubItems;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-brand-sky font-black text-xs uppercase tracking-wider mb-4 border border-blue-500/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Site Hub Map</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              엽쌤스쿨 전체 콘텐츠
            </h1>
            <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
              원하는 콘텐츠를 빠르게 찾아보세요
            </p>

            {/* 검색 바 */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="콘텐츠 검색..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group block p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </h3>
                        {item.badge && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-brand-sky text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-white shrink-0 mt-1 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {item.children && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {item.children.map((child) => (
                        <span
                          key={child.title}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400"
                        >
                          {child.title}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
