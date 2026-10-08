'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2,
  Search,
  Filter,
  Play,
  ExternalLink,
  Sparkles,
  QrCode,
  RotateCcw,
  Maximize2,
  X,
  BookOpen,
  Shuffle,
  ChevronDown,
} from 'lucide-react';
import { learningGamesData, LearningGame } from '@/data/learningGamesData';
import StudentPinModal from '@/components/StudentPinModal';

export default function LearningGamesHub() {
  const [selectedGrade, setSelectedGrade] = useState<'all' | 'lower' | 'middle' | 'upper'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPack, setSelectedPack] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayLimit, setDisplayLimit] = useState(16);

  // 모달 상태
  const [activePlayGame, setActivePlayGame] = useState<LearningGame | null>(null);
  const [pinTargetGame, setPinTargetGame] = useState<LearningGame | null>(null);

  // 필터링 계산
  const filteredGames = useMemo(() => {
    return learningGamesData.filter((game) => {
      // 학년 필터
      if (selectedGrade !== 'all' && game.grade !== selectedGrade) return false;
      // 과목 필터
      if (selectedSubject !== 'all' && game.subject !== selectedSubject) return false;
      // 묶음 필터
      if (selectedPack !== 'all' && game.pack !== selectedPack) return false;
      // 검색어 필터
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchDesc = game.description.toLowerCase().includes(q);
        const matchSubject = game.rawSubject.toLowerCase().includes(q);
        const matchPin = game.pin.includes(q) || game.packPin.includes(q) || String(game.no) === q;
        if (!matchTitle && !matchDesc && !matchSubject && !matchPin) return false;
      }
      return true;
    });
  }, [selectedGrade, selectedSubject, selectedPack, searchQuery]);

  // 필터 초기화
  const resetFilters = () => {
    setSelectedGrade('all');
    setSelectedSubject('all');
    setSelectedPack('all');
    setSearchQuery('');
    setDisplayLimit(16);
  };

  // 랜덤 게임 실행
  const pickRandomGame = () => {
    if (filteredGames.length === 0) return;
    const rand = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    setActivePlayGame(rand);
  };

  const visibleGames = filteredGames.slice(0, displayLimit);

  return (
    <div id="learning-games" className="w-full">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/20 text-brand-sky text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>전국 초등 교실 활용 100종</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
              배움게임월드 교육과정 허브
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              사칙연산, 분수, 맞춤법, 과학, 역사 개념을 3분 미니게임으로 익히세요. 모든 게임은 설치 없이 브라우저에서 즉시 실행되며, 학생 단체 PIN 코드를 지원합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={pickRandomGame}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>랜덤 게임 뽑기</span>
            </button>
            <a
              href="/learning-games-all/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              <span>전체 대시보드 뷰</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter Controls Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 mb-8 space-y-4">
        {/* Row 1: Grade Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 shrink-0">
            학년 선택:
          </span>
          {[
            { key: 'all' as const, label: '전체 학년' },
            { key: 'lower' as const, label: '🌱 1~2학년 (저학년)' },
            { key: 'middle' as const, label: '🌿 3~4학년 (중학년)' },
            { key: 'upper' as const, label: '🌳 5~6학년 (고학년)' },
          ].map((grade) => (
            <button
              key={grade.key}
              type="button"
              onClick={() => {
                setSelectedGrade(grade.key);
                setDisplayLimit(16);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === grade.key
                  ? 'bg-brand-navy dark:bg-brand-sky text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Row 2: Subject Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2 shrink-0">
            교과 과목:
          </span>
          {['all', '수학', '국어', '과학', '사회', '영어', '창체/안전/기타'].map((subj) => (
            <button
              key={subj}
              type="button"
              onClick={() => {
                setSelectedSubject(subj);
                setDisplayLimit(16);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedSubject === subj
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {subj === 'all' ? '전체 과목' : subj}
            </button>
          ))}
        </div>

        {/* Row 3: Search Bar & Pack Select */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="게임명, 개념(분수, 구구단, 맞춤법 등), 또는 PIN 번호 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky text-slate-900 dark:text-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={selectedPack}
            onChange={(e) => setSelectedPack(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="w-full sm:w-44 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-sky"
          >
            <option value="all">전체 묶음 (1~10집)</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}집 (게임 {i * 10 + 1}~{(i + 1) * 10}번)
              </option>
            ))}
          </select>

          {(selectedGrade !== 'all' || selectedSubject !== 'all' || selectedPack !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기화</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between mb-6 px-1">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
          검색 결과 <span className="text-emerald-500 font-extrabold">{filteredGames.length}</span>개 게임
        </span>
        <span className="text-xs text-slate-400">
          * 모든 게임은 학생 3자리 PIN 코드 또는 QR로 즉시 입장 가능
        </span>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleGames.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Top Bar with Icon & PIN */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="text-3xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button
                        type="button"
                        onClick={() => setPinTargetGame(game)}
                        className="px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 dark:text-emerald-400 font-mono font-black text-xs transition-colors cursor-pointer"
                        title="학생용 PIN 안내 열기"
                      >
                        PIN {game.pin}
                      </button>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {game.pack}집 #{game.no}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-brand-sky/15 text-brand-navy dark:text-brand-sky font-bold text-[11px]">
                      {game.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                      {game.gradeLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 mb-1">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActivePlayGame(game)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-navy hover:bg-brand-sky text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>체험하기</span>
                  </button>

                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                    title="새 창에서 전체화면 실행"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPinTargetGame(game)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    title="교실 학생 PIN 및 QR 안내 띄우기"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {displayLimit < filteredGames.length && (
            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={() => setDisplayLimit((prev) => prev + 16)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-extrabold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
              >
                <span>게임 더보기 ({visibleGames.length} / {filteredGames.length})</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="text-5xl mb-3">🔍</div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            조건에 일치하는 게임이 없습니다
          </h4>
          <p className="text-sm text-slate-500 mb-6">
            검색어 또는 학년·과목 필터를 조금 더 넓혀보세요.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold"
          >
            필터 전체 초기화
          </button>
        </div>
      )}

      {/* In-Page Game Iframe Modal */}
      {activePlayGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-slate-800 border-b border-slate-700 text-white shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activePlayGame.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base">{activePlayGame.title}</h3>
                    <span className="px-2 py-0.5 bg-emerald-500 text-white font-mono font-bold text-xs rounded">
                      PIN {activePlayGame.pin}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{activePlayGame.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePlayGame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
                  title="새 창에서 열기"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setActivePlayGame(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Game Frame */}
            <div className="flex-1 bg-black w-full h-full relative">
              <iframe
                src={activePlayGame.url}
                title={activePlayGame.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; clipboard-write"
              />
            </div>
          </div>
        </div>
      )}

      {/* Student PIN Modal */}
      <StudentPinModal
        isOpen={Boolean(pinTargetGame)}
        onClose={() => setPinTargetGame(null)}
        initialGame={pinTargetGame}
        onPlayGame={(g) => setActivePlayGame(g)}
      />
    </div>
  );
}
