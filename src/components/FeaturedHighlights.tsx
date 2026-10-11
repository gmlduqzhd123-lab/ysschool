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
  FileText,
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
            {t('경계를 넘어서는 6대 교육 생태계', '6 Educational Ecosystems Beyond Boundaries')}
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 break-keep leading-relaxed">
            {t(
              '100종 무설치 배움게임부터 엽쌤 제작 수업 자료, 944종 교원 연수자료, 출간 도서, 교실 스마트 도구까지 체계적으로 만나보세요.',
              'Explore 100+ installation-free learning games, classroom teaching materials, 944+ teacher training archives, publications, and smart tools.'
            )}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 100종 배움게임 (2 Columns on Desktop) */}
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
                      100종 배움게임
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
                <span>100종 배움게임 열기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: 엽쌤 제작 수업 자료실 (NEW! 1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 bento-card p-7 sm:p-8 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-brand-sky flex items-center justify-center font-bold mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black tracking-wider text-sky-600 dark:text-brand-sky uppercase">
                  Classroom Materials
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold text-[10px]">
                  59종 HWP·PDF
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 mb-3">
                엽쌤 제작 수업 자료실
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-6">
                현직 교사가 교실에서 실천하고 검증한 국어·독서, 인문·토론, 에듀테크·AI, 발명영재 지도안과 학생 출판 도서 원고 아카이브입니다.
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 text-xs">
                  <p className="font-extrabold text-sky-900 dark:text-sky-300">📄 실천 지도안 & 한글 HWP 원본</p>
                  <p className="text-sky-800/80 dark:text-sky-400/80 mt-0.5 line-clamp-1">공개수업 지도안 · 발명영재 · 활동지 다운로드</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">지도안 59종 무료 나눔</span>
              <Link
                href="/materials"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-sky-600 dark:text-brand-sky group-hover:gap-2.5 transition-all"
              >
                <span>수업 자료실 둘러보기</span>
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
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                  Teacher Training
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                  944종 통합 DB
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                연수 강의안·자료실
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-4">
                2022 개정 교육과정 개념기반 탐구학습, AI 활용 국어·독서 수업, 2026 학교교육과정 설계 등 17개 패들렛 연수 자료 묶음입니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">연수 교안 & 서식</span>
              <Link
                href="/training"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all"
              >
                <span>연수 자료실 열기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4: 에듀테크 나눔 서재 (1 Column) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 bento-card p-7 flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-black tracking-wider text-amber-600 dark:text-amber-400 uppercase">
                Publications & Library
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1 mb-2">
                에듀테크 나눔 서재
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-keep mb-4">
                독서인문 수업 나눔 저서와 학생 작가 프로젝트를 통해 출판한 도서 14권 및 검증된 교실 추천 에듀테크 도구함입니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">출판 도서 14권</span>
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all"
              >
                <span>나눔 서재 둘러보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 5: AI 프롬프트 놀이터 & 도구 (1 Column) */}
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
                AI 프롬프트 놀이터
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
                <span>AI 놀이터 입장</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 6: 프로필 & 발자취 (Full Width 3 Columns Banner) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 bento-card p-7 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
          >
            <div className="flex items-start md:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-black tracking-wider text-rose-600 dark:text-rose-400 uppercase">
                    Profile & Footprints
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                    교육부장관표창 수상
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[10px]">
                    초등교사 10년의 기록
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  교육자 엽쌤의 철학과 발자취
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  수업혁신사례연구대회 전국 2등급, AI 디지털 선도교사, 전남 초등교사 아카펠라 그룹 아카라카 활동, 총 14권의 도서 집필 등 현장과 함께 성장한 교육 여정입니다.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto flex items-center justify-end">
              <Link
                href="/portfolio"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all"
              >
                <span>프로필 & 포트폴리오 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
