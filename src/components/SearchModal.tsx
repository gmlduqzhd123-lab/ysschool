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
  { title: '주요 약력 및 활동 (CV)', category: '섹션', href: '/#cv' },
  { title: '통합 아카이브', category: '섹션', href: '/#archive-tabs' },
  { title: '연락하기 (Contact)', category: '섹션', href: '/#contact' },
  // 아카이브 탭
  { title: '교육 웹앱 실험실', category: '아카이브', href: '/#dev-lab', description: '직접 개발한 교육 웹 앱들' },
  { title: '교육 자료실', category: '아카이브', href: '/#edu-archive', description: '수업 자료 및 교육 콘텐츠' },
  { title: '수상 내역 (Hall of Fame)', category: '아카이브', href: '/#hall-of-fame', description: '교육 관련 수상 실적' },
  { title: '아카펠라 공연 영상', category: '아카이브', href: '/#acappella', description: '아카라카 공연 영상' },
  { title: '영상 갤러리', category: '아카이브', href: '/#media-room', description: '교육 활동 영상 모음' },
  { title: '언론 보도', category: '아카이브', href: '/#press-room', description: '언론 기사 및 보도 자료' },
  { title: '저서 소개', category: '아카이브', href: '/#publications', description: '집필한 책 소개' },
  // 서브 페이지
  { title: '에듀테크 갤러리', category: '페이지', href: '/showcase', description: '에듀테크 미니앱 모음' },
  { title: '나눔 서재', category: '페이지', href: '/library', description: '추천 도서 및 자료' },
  { title: '프롬프트 놀이터', category: '페이지', href: '/playground', description: 'AI 프롬프트 체험' },
  { title: '연수 자료', category: '페이지', href: '/training', description: '교사 연수 관련 자료' },
  { title: '블로그', category: '페이지', href: '/blog', description: "Teacher's Journal" },
  // 주요 프로젝트
  { title: '엽쌤스쿨 배움게임월드', category: '프로젝트', href: '/#dev-lab', description: '100개 HTML 학습 게임' },
  { title: 'HALLYO SWIM', category: '프로젝트', href: '/#dev-lab', description: '수영부 관리 어플리케이션' },
  { title: '매쓰 서바이벌', category: '프로젝트', href: '/#dev-lab', description: '수학 연산 미니게임' },
  // 저서
  { title: '고학년 독서인문교육, 독서미션으로 끝장내기', category: '저서', href: '/#publications' },
  { title: '여수의(義) 사랑, 우리들의 이야기', category: '저서', href: '/#publications' },
  { title: '우리들의 눈물 상자', category: '저서', href: '/#publications' },
  { title: '아무도 모르는 5학년의 속마음', category: '저서', href: '/#publications' },
  // CV 키워드
  { title: '수업혁신사례연구대회 전국 2등급', category: 'CV', href: '/#cv', description: '교육부장관표창' },
  { title: 'AI 중점학교 / 디지털 선도학교', category: 'CV', href: '/#cv' },
  { title: 'AIDT 강사 / 에듀테크 현장지원단', category: 'CV', href: '/#cv' },
  { title: '전남초등아카펠라연구회 아카라카', category: 'CV', href: '/#cv' },
  { title: '발명교육센터 영재 강사', category: 'CV', href: '/#cv' },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
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
    if (item.href.startsWith('/#')) {
      // Hash navigation on main page
      router.push('/');
      setTimeout(() => {
        const hash = item.href.replace('/', '');
        window.location.hash = hash;
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm transition-all duration-200 cursor-pointer border border-slate-200 dark:border-slate-700"
        aria-label="검색"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs">검색</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono font-bold">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
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
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group cursor-pointer"
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
