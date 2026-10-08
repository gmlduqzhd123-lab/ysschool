'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  BookOpen,
  GraduationCap,
  Award,
  ArrowRight,
  Sparkles,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function FeaturedHighlights() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-slate-50/60 dark:bg-slate-950/60 relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[25rem] bg-blue-500/5 dark:bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-brand-sky font-black text-xs uppercase tracking-wider mb-4 border border-blue-500/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecosystem Bento Grid</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            {t('경계를 넘어서는 5대 교육 생태계', '5 Educational Ecosystems Beyond Boundaries')}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 break-keep leading-relaxed">
            {t(
              '100종 무설치 배움게임부터 독서인문 저서, 교원 연수자료, 교실 스마트 도구까지 체계적으로 만나보세요.',
              'Explore 100+ installation-free learning games, publications, teacher training, and classroom smart tools.'
            )}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 100종 배움게임월드 (2 Columns on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bento-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                      EduTech Showcase
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      100종 무설치 배움게임월드
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                  PIN & QR 탑재
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-6">
                국어·수학·사회·과학 4개 교과 단원별 개념을 웹 브라우저에서 바로 체험하는 에듀테크 게임입니다.
                별도 설치 없이 교실 전자칠판 QR 스캔이나 3자리 학생 PIN으로 1초 만에 즉시 실행됩니다.
              </p>

              {/* Sample Popular Games Ticker */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { pin: '001', name: '매쓰 서바이버즈', sub: '수학' },
                  { pin: '002', name: '교육용 테트리스', sub: '융합' },
                  { pin: '004', name: '분수 닌자', sub: '수학' },
                  { pin: '005', name: '구구단 디펜스', sub: '수학' },
                  { pin: '008', name: '맞춤법 버블팝', sub: '국어' },
                ].map((game) => (
                  <span
                    key={game.pin}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                  >
                    <span className="font-mono text-emerald-500 font-black">{game.pin}</span>
                    <span>{game.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">10개 팩 · 총 100종 무설치 웹게임 완비</span>
              <Link
                href="/showcase#learning-games"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-extrabold shadow-sm transition-all group-hover:gap-3"
              >
                <span>게임 쇼케이스 열기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: 출간 저서 & 나눔서재 (1 Column, Multi-height) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 bento-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-black tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                Publications & Library
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 mb-3">
                출간 저서 10권 & 나눔 서재
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-6">
                독서인문 수업 나눔 저서와 학생 작가 프로젝트를 통해 출판한 도서 10권의 아카이브입니다.
                수업에 바로 활용할 수 있는 독서 교육 자료를 자유롭게 내려받으세요.
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs">
                  <p className="font-extrabold text-amber-900 dark:text-amber-300">📖 대표 저서 및 지도서</p>
                  <p className="text-amber-800/80 dark:text-amber-400/80 mt-0.5 line-clamp-1">그림책 나눔 수업 · 초등 독서 인문 지도</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">저서 상세 & 열람</span>
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 group-hover:gap-2.5 transition-all"
              >
                <span>나눔 서재 둘러보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 3: 교원 연수 자료실 (1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 bento-card p-7 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-black tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Teacher Training
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                교원 연수 & 강의 자료실
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-4">
                2022 개정 교육과정 개념기반 탐구학습, AI 활용 국어·독서 수업, 에듀테크 수업 평가 연수 발표자료 묶음입니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">최신 연수자료</span>
              <Link
                href="/training"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all"
              >
                <span>자료실 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4: 수상 & 포트폴리오 (1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 bento-card p-7 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold mb-4">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-xs font-black tracking-wider text-rose-600 dark:text-rose-400 uppercase">
                Portfolio & Career
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                수업연구대회 2등급 & 약력
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-4">
                교육부장관상 수상, AI 디지털 선도교사, 전남 초등교사 아카펠라 그룹 아카라카 활동 등 10년의 교육 여정 기록입니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">약력 연대기</span>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:gap-2 transition-all"
              >
                <span>포트폴리오 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 5: 프롬프트 놀이터 & 도구 (1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 bento-card p-7 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-xs font-black tracking-wider text-purple-600 dark:text-purple-400 uppercase">
                AI & Tools Lab
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                AI 프롬프트 놀이터 & 도구
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-4">
                선생님을 위한 교과별 검증 프롬프트 모음과 전자칠판 타이머, 룰렛 번호 뽑기 등 스마트 교실 도구함입니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">프롬프트 & 도구</span>
              <Link
                href="/playground"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:gap-2 transition-all"
              >
                <span>놀이터 입장</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
