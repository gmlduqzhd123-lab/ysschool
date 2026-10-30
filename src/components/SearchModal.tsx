'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  Command,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  Layers,
  GraduationCap,
  Code2,
  Gamepad2,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { yscodeApps } from '@/data/yscodeData';
import { trainingData } from '@/data/trainingData';
import { teachingMaterialsData } from '@/data/teachingMaterialsData';
import { learningGamesData } from '@/data/learningGamesData';

export interface SearchItem {
  title: string;
  category: '연수자료' | '수업자료' | '웹앱' | '배움게임' | '섹션' | '아카이브' | '저서' | 'CV';
  href: string;
  description?: string;
  date?: string;
  tags?: string[];
  externalUrl?: string;
  fileType?: string;
}

const staticSearchItems: SearchItem[] = [
  // 메인 섹션
  { title: '소개 (About)', category: '섹션', href: '/#about', description: '에듀테크 크리에이터이자 교사 엽쌤 소개' },
  { title: '프로필 & 발자취 (CV)', category: 'CV', href: '/portfolio', description: '수업혁신 전국 2등급 등 교육 경력 및 활동' },
  { title: '통합 아카이브', category: '섹션', href: '/portfolio#archive-tabs', description: '보도자료, 출간 도서, 수상 내역, 연구 보고서' },
  { title: '연락 및 강의 의뢰 (Contact)', category: '섹션', href: '/#contact', description: '연수 강사 섭외 및 협업 문의' },
  // 주요 서브 페이지
  { title: '아침 맞이 3초 교실 데스크', category: '섹션', href: '/morning', description: '전자칠판 전용 풀스크린 아침활동 시계·타이머·알림판·무광고 BGM' },
  { title: '엽쌤 개발 웹앱 모음 (YScode)', category: '섹션', href: '/showcase#yscode', description: `교직·수업·여가를 아우르는 ${yscodeApps.length}종 바이브코딩 웹앱` },
  { title: '배움게임월드 교육과정 허브', category: '섹션', href: '/showcase#learning-games', description: '100종 초등 교과 연계 HTML 미니게임' },
  { title: '교실 추천 에듀테크 도구함', category: '섹션', href: '/library#tools', description: '자작자작, 투닝, 캔바 등 추천 도구 큐레이션' },
  { title: 'AI 프롬프트 놀이터', category: '섹션', href: '/playground', description: '학생·교사용 생성형 AI 실습 게임' },
  { title: '연수 강의안·자료실 (940여 종)', category: '섹션', href: '/training', description: 'AI·디지털선도·독서인문 연수 PPT 및 자료 940여 종' },
  { title: '교육 이야기·블로그', category: '섹션', href: '/blog', description: '디지털 수업 성찰과 에듀테크 교육 칼럼' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 1. 전체 데이터 통합 인덱싱 (초기 1회 useMemo 캐싱)
  const allIndexedItems = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [...staticSearchItems];

    // YScode 23종 웹앱 인덱싱
    yscodeApps.forEach((app) => {
      items.push({
        title: app.name,
        category: '웹앱',
        href: `/showcase#yscode`,
        description: app.desc,
        externalUrl: app.url,
        tags: app.tags,
      });
    });

    // 100종 배움게임 인덱싱
    learningGamesData.forEach((game) => {
      items.push({
        title: `[PIN ${game.pin}] ${game.title}`,
        category: '배움게임',
        href: `/showcase#learning-games`,
        description: `${game.gradeLabel} ${game.subject} · ${game.description}`,
        externalUrl: game.url,
        tags: [game.subject, game.gradeLabel, game.curriculumTopic],
      });
    });

    // 59종 수업 지도안/자료 인덱싱
    teachingMaterialsData.forEach((mat) => {
      items.push({
        title: mat.title,
        category: '수업자료',
        href: `/materials#${mat.id}`,
        description: mat.description,
        tags: [mat.subject, mat.grade, mat.badge].filter(Boolean) as string[],
        fileType: mat.fileType,
      });
    });

    // 940여 개 연수 자료 인덱싱 (상위 핵심 메타데이터)
    trainingData.forEach((train) => {
      items.push({
        title: train.title,
        category: '연수자료',
        href: `/training#${train.id}`,
        description: train.description,
        date: train.date,
        externalUrl: train.link || train.fileUrl,
        fileType: train.fileType,
      });
    });

    return items;
  }, []);

  // Cmd+K / Ctrl+K shortcut & custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleOpenCustom = () => {
      setIsOpen(true);
    };

    // 전역 함수 등록 (직접 호출 지원)
    if (typeof window !== 'undefined') {
      (window as unknown as { openSearchModal?: () => void }).openSearchModal = handleOpenCustom;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search-modal', handleOpenCustom);
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as unknown as { openSearchModal?: () => void }).openSearchModal;
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search-modal', handleOpenCustom);
    };
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      requestAnimationFrame(() => {
        setQuery('');
        setSelectedIdx(0);
        setActiveCategory('전체');
      });
    }
  }, [isOpen]);

  // ───── 자연어 검색 파서 ─────
  const parseNaturalQuery = (raw: string) => {
    const q = raw.toLowerCase().trim();
    let grade: string | null = null;
    let subject: string | null = null;

    // 학년 추출
    const gradeMatch = q.match(/(([1-2])\s*학년|저학년)/);
    const gradeMatchMid = q.match(/(([3-4])\s*학년|중학년)/);
    const gradeMatchUp = q.match(/(([5-6])\s*학년|고학년)/);
    if (gradeMatch) grade = 'lower';
    if (gradeMatchMid) grade = 'middle';
    if (gradeMatchUp) grade = 'upper';

    // 과목 추출
    const subjectMap: Record<string, string> = {
      '수학': '수학', '산수': '수학', '덧셈': '수학', '뺄셈': '수학', '곱셈': '수학', '나눗셈': '수학', '분수': '수학',
      '국어': '국어', '어휘': '국어', '맞춤법': '국어', '독해': '국어', '글쓰기': '국어',
      '과학': '과학', '우주': '과학', '생태': '과학',
      '사회': '사회', '역사': '사회',
      '영어': '영어',
    };
    for (const [kw, subj] of Object.entries(subjectMap)) {
      if (q.includes(kw)) { subject = subj; break; }
    }

    // 질문에서 키워드 제거해 나머지 검색어 추출
    const cleanQ = q
      .replace(/[1-6]\s*학년|저학년|중학년|고학년/g, '')
      .replace(/수학|산수|국어|과학|사회|영어|어휘|맞춤법/g, '')
      .replace(/게임|뭐\s*있|추천|알려|보여|찾아/g, '')
      .trim();

    return { grade, subject, cleanQ };
  };

  // 검색어 및 카테고리 필터링 (자연어 지원)
  const filteredItems = useMemo(() => {
    let list = allIndexedItems;

    if (activeCategory !== '전체') {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (!query.trim()) {
      return list.slice(0, 30);
    }

    const { grade, subject, cleanQ } = parseNaturalQuery(query);
    const q = query.toLowerCase().trim();

    // 자연어 파싱된 결과가 있으면 먼저 필터
    const scored = list.map((item) => {
      let score = 0;
      const titleLow = item.title.toLowerCase();
      const descLow = item.description?.toLowerCase() || '';
      const tagsJoined = item.tags?.join(' ').toLowerCase() || '';

      // 기본 키워드 매칭
      if (titleLow.includes(q)) score += 10;
      if (descLow.includes(q)) score += 5;
      if (tagsJoined.includes(q)) score += 5;
      if (item.category.toLowerCase().includes(q)) score += 3;

      // cleanQ 매칭
      if (cleanQ && cleanQ.length > 0) {
        if (titleLow.includes(cleanQ)) score += 8;
        if (descLow.includes(cleanQ)) score += 4;
      }

      // 자연어 파싱 보너스
      if (grade) {
        if (tagsJoined.includes(grade === 'lower' ? '1~2학년' : grade === 'middle' ? '3~4학년' : '5~6학년')) score += 15;
        if (descLow.includes(grade === 'lower' ? '1~2학년' : grade === 'middle' ? '3~4학년' : '5~6학년')) score += 10;
      }
      if (subject) {
        if (tagsJoined.includes(subject)) score += 15;
        if (titleLow.includes(subject)) score += 10;
        if (item.category === '배움게임') score += 5;
      }

      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item)
      .slice(0, 50);
  }, [allIndexedItems, activeCategory, query]);

  // 키보드 엔터 또는 클릭 시 이동
  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    if (item.externalUrl && (item.category === '웹앱' || item.category === '배움게임')) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const hashIdx = item.href.indexOf('#');
    if (hashIdx !== -1) {
      const pagePath = item.href.substring(0, hashIdx) || '/';
      const hash = item.href.substring(hashIdx);
      router.push(item.href);
      void pagePath;
      setTimeout(() => {
        window.location.hash = hash;
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      router.push(item.href);
    }
  };

  const selectedItem: SearchItem | undefined = filteredItems[selectedIdx] || filteredItems[0];

  const categoryBadges: Record<string, { bg: string; icon: React.ReactNode }> = {
    '전체': { bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', icon: <Layers className="w-3.5 h-3.5" /> },
    '연수자료': { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    '수업자료': { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', icon: <BookOpen className="w-3.5 h-3.5" /> },
    '웹앱': { bg: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', icon: <Code2 className="w-3.5 h-3.5" /> },
    '배움게임': { bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    '섹션': { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', icon: <Sparkles className="w-3.5 h-3.5" /> },
  };

  const categories = ['전체', '연수자료', '수업자료', '웹앱', '배움게임', '섹션'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[5vh] sm:pt-[10vh] px-3 sm:px-4 bg-black/65 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="사이트 스마트 통합 검색"
          >
            {/* 1. 상단 검색창 */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-brand-sky shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIdx(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIdx((prev) => Math.min(prev + 1, filteredItems.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIdx((prev) => Math.max(prev - 1, 0));
                  } else if (e.key === 'Enter' && filteredItems.length > 0) {
                    e.preventDefault();
                    handleSelect(filteredItems[selectedIdx]);
                  }
                }}
                placeholder="검색어를 입력하세요 (예: AI, 패들렛, 지도안, 001, 구구단, 에듀테크...)"
                className="flex-grow bg-transparent text-base sm:text-lg font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. 카테고리 퀵 탭 */}
            <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedIdx(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-brand-navy dark:bg-brand-sky text-white dark:text-slate-900 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {categoryBadges[cat]?.icon}
                  <span>{cat}</span>
                </button>
              ))}
              <span className="ml-auto text-[11px] text-slate-400 shrink-0 font-medium">
                {filteredItems.length}건 검색됨
              </span>
            </div>

            {/* 3. 본문 2열 레이아웃: 좌측 목록 + 우측 퀵 프리뷰어 */}
            <div className="flex-1 min-h-[240px] sm:min-h-[380px] max-h-[55vh] flex overflow-hidden">
              {/* 좌측: 검색 결과 리스트 */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5 border-r border-slate-100 dark:border-slate-800">
                {filteredItems.length === 0 ? (
                  <div className="py-20 text-center text-slate-400">
                    <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="font-bold text-sm">일치하는 검색 결과가 없습니다.</p>
                    <p className="text-xs text-slate-500 mt-1">다른 키워드나 &apos;전체&apos; 탭을 선택해 보세요.</p>
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIdx;
                    const badge = categoryBadges[item.category] || categoryBadges['전체'];

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIdx(idx)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-100 dark:bg-slate-800 shadow-sm ring-1 ring-brand-sky/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${badge.bg}`}>
                              {item.category}
                            </span>
                            <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {item.title}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-brand-sky translate-x-1' : 'text-slate-300 dark:text-slate-600'
                        }`} />
                      </button>
                    );
                  })
                )}
              </div>

              {/* 우측: 퀵 미리보기 패널 (데스크톱 전용) */}
              <div className="hidden md:flex w-80 lg:w-96 p-5 flex-col justify-between bg-slate-50/50 dark:bg-slate-900/30 overflow-y-auto">
                {selectedItem ? (
                  <div className="space-y-4">
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        categoryBadges[selectedItem.category]?.bg || 'bg-slate-200 text-slate-700'
                      }`}>
                        {categoryBadges[selectedItem.category]?.icon}
                        <span>{selectedItem.category}</span>
                      </span>
                      <h4 className="mt-2 text-lg font-black text-slate-900 dark:text-white leading-snug">
                        {selectedItem.title}
                      </h4>
                      {selectedItem.date && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{selectedItem.date}</span>
                        </div>
                      )}
                    </div>

                    {selectedItem.description && (
                      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">상세 요약</p>
                        <p>{selectedItem.description}</p>
                      </div>
                    )}

                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400">관련 태그</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.fileType && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                        <FileText className="w-3.5 h-3.5" />
                        <span>형식: {selectedItem.fileType.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-slate-400 my-auto">
                    <p className="text-xs">항목을 선택하면 미리보기가 표시됩니다.</p>
                  </div>
                )}

                {selectedItem && (
                  <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 mt-4">
                    <button
                      type="button"
                      onClick={() => handleSelect(selectedItem)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-sky text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>
                        {selectedItem.externalUrl ? '외부 링크 바로가기' : '해당 페이지로 이동'}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4. 하단 키보드 단축키 안내 푸터 */}
            <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 bg-white dark:bg-slate-900">
              <span className="flex items-center gap-2">
                <span>↑↓ 이동</span>
                <span>·</span>
                <span>Enter 선택</span>
                <span>·</span>
                <span>Esc 닫기</span>
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Command className="w-3 h-3" />K
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
