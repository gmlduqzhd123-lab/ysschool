'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchItem {
  title: string;
  category: string;
  href: string;
  description?: string;
}

const searchItems: SearchItem[] = [
  // 메인 섹션
  { title: '소개 (About)', category: '섹션', href: '/#about' },
  { title: '프로필 & 발자취 (CV)', category: '섹션', href: '/portfolio' },
  { title: '통합 아카이브', category: '섹션', href: '/portfolio#archive-tabs' },
  { title: '연락하기 (Contact)', category: '섹션', href: '/#contact' },
  // 아카이브 탭
  { title: '언론 보도', category: '아카이브', href: '/portfolio#press-room', description: '언론 기사 및 보도 자료' },
  { title: '출간 도서', category: '아카이브', href: '/portfolio#publications', description: '독서미션으로 끝장내기 등 집필 도서 목록' },
  { title: '수상 내역 (Hall of Fame)', category: '아카이브', href: '/portfolio#hall-of-fame', description: '교육 관련 수상 실적' },
  { title: '교육 자료실', category: '아카이브', href: '/portfolio#edu-archive', description: '수업 자료 및 교육 콘텐츠' },
  { title: '아카펠라 활동', category: '아카이브', href: '/portfolio#acappella', description: '교사 아카펠라 그룹 아카라카 공연 영상' },
  { title: '영상 갤러리', category: '아카이브', href: '/portfolio#media-room', description: '교육 활동 영상 모음' },
  // 서브 페이지
  { title: '아침 맞이 3초 교실 데스크', category: '교실도구', href: '/morning', description: '전자칠판 전용 풀스크린 아침활동 시계·타이머·알림판·무광고 BGM' },
  { title: '엽쌤 개발 웹앱 모음', category: '페이지', href: '/showcase#yscode', description: '교직·수업·여가를 아우르는 19종 바이브코딩 웹앱' },
  { title: '교실 추천 에듀테크 도구함', category: '에듀테크', href: '/library#tools', description: '자작자작, 투닝, 캔바 등 교실 추천 에듀테크 모음' },
  { title: 'AI 프롬프트 놀이터', category: '페이지', href: '/playground', description: '학생·교사용 생성형 AI 실습 게임' },
  { title: '연수 강의안·자료실', category: '페이지', href: '/training', description: 'AI·디지털선도·독서인문 연수 PPT 및 자료' },
  { title: '에듀테크 나눔 서재', category: '페이지', href: '/library', description: 'AI 실전 노하우 & 교실 추천 에듀테크 도구함' },
  { title: '교육 이야기·블로그', category: '페이지', href: '/blog', description: '디지털 수업 성찰과 에듀테크 교육 칼럼' },
  // 주요 프로젝트
  { title: '엽쌤스쿨 배움게임월드', category: '프로젝트', href: '/showcase#apps', description: '100개 HTML 학습 게임' },
  { title: 'HALLYO SWIM', category: '프로젝트', href: '/showcase#yscode', description: '수영부 관리 어플리케이션' },
  { title: '매쓰 서바이벌', category: '프로젝트', href: '/showcase#yscode', description: '수학 연산 미니게임' },
  // 저서
  { title: '고학년 독서인문교육, 독서미션으로 끝장내기', category: '저서', href: '/portfolio#publications', description: '김희엽 저' },
  { title: '우리의 서로가 계절이 되어가는 동안', category: '저서', href: '/portfolio#publications', description: '김희엽 저 (2026)' },
  { title: '우리의 서로가 하루가 되어가는 동안', category: '저서', href: '/portfolio#publications', description: '김희엽 저 (2026)' },
  { title: '글로-CAL 프로젝트를 통한 여수義 사랑 미래 인재 기르기', category: '저서', href: '/portfolio#publications', description: '연구 보고서' },
  { title: '삼삼반, 의(義)로운 생각 발달사', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '나, 그리고 우리들의 이야기', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '자작자작, 우리들의 이야기', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '여수의(義) 사랑, 우리들의 이야기 2', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '여수의(義) 사랑, 우리들의 이야기', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '우리들의 눈물 상자', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '해를 담은 아이', category: '저서', href: '/portfolio#publications', description: '이해담 저' },
  { title: 'AI와 함께 그린 꿈의 조각', category: '저서', href: '/portfolio#publications', description: '김나희, 김연우 공저' },
  { title: '아무도 모르는 5학년의 속마음', category: '저서', href: '/portfolio#publications', description: '학생 공저' },
  { title: '안심하고 읽는 94가지 이야기', category: '저서', href: '/portfolio#publications', description: '2023 나도 작가 프로젝트' },
  // CV 키워드
  { title: '수업혁신사례연구대회 전국 2등급', category: 'CV', href: '/portfolio#cv', description: '교육부장관표창' },
  { title: 'AI 중점학교 / 디지털 선도학교', category: 'CV', href: '/portfolio#cv' },
  { title: 'AIDT 강사 / 에듀테크 현장지원단', category: 'CV', href: '/portfolio#cv' },
  { title: '전남초등아카펠라연구회 아카라카', category: 'CV', href: '/portfolio#cv' },
  { title: '발명교육센터 영재 강사', category: 'CV', href: '/portfolio#cv' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K shortcut & custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleOpenCustom = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search-modal', handleOpenCustom);
    return () => {
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
      });
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return searchItems.slice(0, 8);
    const q = query.toLowerCase();
    return searchItems.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    const hashIdx = item.href.indexOf('#');
    if (hashIdx !== -1) {
      // Has hash — navigate to page then scroll to element
      const pagePath = item.href.substring(0, hashIdx) || '/';
      const hash = item.href.substring(hashIdx);
      router.push(pagePath);
      setTimeout(() => {
        window.location.hash = hash;
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      router.push(item.href);
    }
  };

  const categoryColors: Record<string, string> = {
    '섹션': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    '아카이브': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    '페이지': 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
    '프로젝트': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    '저서': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'CV': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  };

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[8vh] sm:pt-[15vh] px-3 sm:px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="사이트 통합 검색"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setSelectedIdx(0);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setSelectedIdx(prev => Math.min(prev + 1, filteredItems.length - 1));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setSelectedIdx(prev => Math.max(prev - 1, 0));
                    } else if (e.key === 'Enter' && filteredItems.length > 0) {
                      e.preventDefault();
                      handleSelect(filteredItems[selectedIdx]);
                    }
                  }}
                  placeholder="검색어를 입력하세요..."
                  className="flex-grow bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto px-2 py-2">
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">검색 결과가 없습니다</p>
                    <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
                  </div>
                ) : (
                  filteredItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIdx(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left group cursor-pointer ${
                        idx === selectedIdx ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${categoryColors[item.category] || 'bg-slate-100 text-slate-600'}`}>
                            {item.category}
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-white truncate text-sm">
                            {item.title}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate pl-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-sky shrink-0 transition-colors" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <span>↑↓ 이동 · Enter 선택 · Esc 닫기</span>
                <span className="flex items-center gap-1">
                  <Command className="w-3 h-3" />K로 열기
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
