'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Download, Search,
  Sparkles, Filter, Calendar, Tag, Plus, X, Upload, Link2, Image as ImageIcon, Trash2,
  ArrowRight, ChevronDown, Lock, LayoutGrid, List, RotateCcw, Compass,
  SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminGateButton from '@/components/AdminGateButton';
import { useAdmin } from '@/components/AdminContext';
import { trainingData, type TrainingMaterial } from '@/data/trainingData';

type DisplayMaterial = TrainingMaterial & { source?: 'shared' | 'local' | 'default' };

const categories = ['전체', '에듀테크', 'AI활용', '독서인문', '기타'] as const;
const DELETE_PASSWORD = '1234';

const roadmapSeasons = [
  {
    id: 'spring',
    label: '2~3월 새학년 준비',
    sub: '비전·시수 편제표·설문지',
    icon: '🌸',
    keywords: ['교육과정', '설문', '편제', '시수', '비전', '준비기간', '다모임', '학사일정']
  },
  {
    id: 'summer1',
    label: '4~6월 1학기 수업·평가',
    sub: '개념기반 PBL·질문수업·형성평가',
    icon: '🌿',
    keywords: ['지도안', '수업안', 'pbl', '질문', '퀴즈', '형성평가', '도구', '루브릭']
  },
  {
    id: 'summer2',
    label: '7~8월 방학 캠프·창의영재',
    sub: '발명영재 패키지·3D 메이커',
    icon: '☀️',
    keywords: ['발명', 'summer', '3d', '특허', '메이커', '캠프', '산출물']
  },
  {
    id: 'autumn',
    label: '9~11월 AI융합·학생 책 출판',
    sub: '자작자작 글쓰기·학생 도서 출판',
    icon: '🍁',
    keywords: ['출판', '모둠', '이야기', '책', '자작자작', 'ai', '캔바', '글로-cal', '작가']
  },
  {
    id: 'winter',
    label: '12~1월 성과나눔·되돌아보기',
    sub: '교육과정 반성·성장 기록집',
    icon: '❄️',
    keywords: ['되돌아보기', '성과', '반성', '보고서', '기록', '모음집', '자료집']
  },
] as const;

const quickPresets = [
  { id: 'worksheet', label: '⚡ 출력용 활동지·서식', icon: '📝' },
  { id: 'hwp', label: '한글 HWP 원본', icon: '📃' },
  { id: 'pptx', label: '발표 슬라이드 PPT', icon: '📊' },
  { id: 'pdf', label: '가이드 PDF', icon: '📑' },
  { id: 'book', label: '학생 출판 도서관', icon: '📚' },
] as const;

function readJsonArray<T>(key: string): T[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Follows ?category= on every client navigation (e.g. header dropdown links while already on /training).
function CategoryFromUrl({ onChange }: { onChange: (category: string) => void }) {
  const searchParams = useSearchParams();
  const cat = searchParams.get('category');
  useEffect(() => {
    onChange(cat && (categories as readonly string[]).includes(cat) ? cat : '전체');
  }, [cat, onChange]);
  return null;
}

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const { isAdmin } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState<DisplayMaterial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharedMode, setSharedMode] = useState(false);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // New Smart Archive UI States
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'name' | 'category'>('latest');

  // Load view mode preference from localStorage
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        const savedMode = localStorage.getItem('ysschool_training_view_mode');
        if (savedMode === 'grid' || savedMode === 'table') {
          setViewMode(savedMode);
        }
      } catch {}
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleViewModeChange = (mode: 'grid' | 'table') => {
    setViewMode(mode);
    try {
      localStorage.setItem('ysschool_training_view_mode', mode);
    } catch {}
  };

  // Delete modal state
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deletePasswordError, setDeletePasswordError] = useState('');

  // ESC 키로 열린 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (deleteModalId !== null) {
          setDeleteModalId(null);
          setDeletePassword('');
          setDeletePasswordError('');
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    if (isModalOpen || deleteModalId !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, deleteModalId]);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'에듀테크' | 'AI활용' | '독서인문' | '기타'>('에듀테크');
  const [link, setLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function cleanHtmlText(str: string): string {
    if (!str) return '';
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }

  const readLocalMaterials = useCallback((): DisplayMaterial[] => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ysschool_training_materials') : null;
    const deletedIds = typeof window !== 'undefined' ? readJsonArray<number>('ysschool_training_deleted_ids') : [];
    const base = trainingData
      .filter((item) => !deletedIds.includes(item.id))
      .map((item) => ({
        ...item,
        title: cleanHtmlText(item.title),
        description: cleanHtmlText(item.description),
        source: 'default' as const,
      }));

    if (!stored) return base;

    try {
      const parsed = JSON.parse(stored) as TrainingMaterial[];
      return [
        ...parsed.map((item) => {
          let safeLink = item.link;
          if (safeLink && (safeLink.includes('storage.googleapis.com') || safeLink.includes('padlet-uploads'))) {
            safeLink = undefined;
          }
          let safeFile = item.fileUrl;
          if (safeFile && (safeFile.includes('storage.googleapis.com') || safeFile.includes('padlet-uploads'))) {
            safeFile = undefined;
          }
          let safeThumb = item.thumbnail;
          if (safeThumb && (safeThumb.includes('storage.googleapis.com') || safeThumb.includes('padlet-uploads'))) {
            safeThumb = undefined;
          }
          return {
            ...item,
            title: cleanHtmlText(item.title),
            description: cleanHtmlText(item.description),
            link: safeLink,
            fileUrl: safeFile,
            thumbnail: safeThumb,
            source: 'local' as const,
          };
        }),
        ...base,
      ];
    } catch {
      return base;
    }
  }, []);

  // Prefer the shared store when configured, while preserving older browser-only items.
  useEffect(() => {
    let cancelled = false;

    const loadMaterials = async () => {
      const localItems = readLocalMaterials();

      try {
        const response = await fetch('/api/training', { cache: 'no-store' });
        const data = await response.json();

        if (data.configured) {
          if (!cancelled) {
            setSharedMode(true);
            const sharedItems = Array.isArray(data.items) ? data.items : [];
            requestAnimationFrame(() => setMaterials([...sharedItems, ...localItems]));
            if (!response.ok && data.error) setErrorMsg(data.error);
          }
          return;
        }
      } catch {}

      if (!cancelled) {
        setSharedMode(false);
        requestAnimationFrame(() => setMaterials(localItems));
      }
    };

    void loadMaterials().finally(() => {
      if (!cancelled) setLoadingMaterials(false);
    });

    return () => {
      cancelled = true;
    };
  }, [readLocalMaterials]);

  const saveLocalMaterials = (newMaterials: DisplayMaterial[]) => {
    setMaterials(newMaterials);
    const customOnly = newMaterials
      .filter((item) => item.source === 'local' || (item.source == null && item.id >= 10000))
      .map(({ source, ...item }) => {
        void source;
        return item;
      });
    localStorage.setItem('ysschool_training_materials', JSON.stringify(customOnly));
  };

  const handleDeleteMaterial = async (id: number) => {
    const target = materials.find((item) => item.id === id);
    if (!target) return;

    if (target.source === 'shared') {
      if (!isAdmin) {
        setDeleteModalId(null);
        return;
      }

      try {
        const response = await fetch(`/api/training/${id}`, { method: 'DELETE' });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setErrorMsg(data.error || '자료를 삭제하지 못했습니다.');
          return;
        }
        setMaterials((current) => current.filter((item) => item.id !== id));
      } catch {
        setErrorMsg('공유 저장소에 연결할 수 없습니다.');
      } finally {
        setDeleteModalId(null);
      }
      return;
    }

    const updated = materials.filter((item) => item.id !== id);
    setMaterials(updated);

    if (target.source === 'default' || (target.source == null && id < 10000)) {
      const deletedIds = readJsonArray<number>('ysschool_training_deleted_ids');
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('ysschool_training_deleted_ids', JSON.stringify(deletedIds));
      }
    } else {
      const customOnly = updated
        .filter((item) => item.source === 'local' || (item.source == null && item.id >= 10000))
        .map(({ source, ...item }) => {
          void source;
          return item;
        });
      localStorage.setItem('ysschool_training_materials', JSON.stringify(customOnly));
    }

    setDeleteModalId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = sharedMode ? 4 * 1024 * 1024 : 1_500_000;
    if (file.size > maxBytes) {
      setErrorMsg(sharedMode
        ? '공유 저장소에는 4MB 이하 파일만 첨부할 수 있습니다.'
        : '브라우저 저장 한계 때문에 1.5MB 이하 파일만 첨부할 수 있습니다. 큰 파일은 Google Drive 등 외부 링크를 이용해주세요.');
      e.target.value = '';
      setSelectedFile(null);
      setFileName('');
      setFileUrl('');
      setFileType('');
      return;
    }

    setErrorMsg('');
    setSelectedFile(file);
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    setFileType(ext);

    if (sharedMode) {
      setFileUrl('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFileUrl(uploadEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('에듀테크');
    setLink('');
    setFileName('');
    setFileUrl('');
    setFileType('');
    setSelectedFile(null);
    setThumbnail('');
    setErrorMsg('');
    setIsModalOpen(false);
  };

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !description.trim()) {
      setErrorMsg('제목과 설명을 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);

    if (sharedMode) {
      if (!isAdmin) {
        setErrorMsg('관리자 로그인이 필요합니다.');
        setSubmitting(false);
        return;
      }

      try {
        let uploadedFileUrl = '';
        let uploadedFileType = fileType;

        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          const uploadResponse = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });
          const uploadData = await uploadResponse.json().catch(() => ({}));
          if (!uploadResponse.ok) {
            setErrorMsg(uploadData.error || '파일 업로드에 실패했습니다.');
            return;
          }
          uploadedFileUrl = uploadData.url || '';
          uploadedFileType = uploadData.fileType || fileType;
        }

        const response = await fetch('/api/training', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            category,
            date: new Date().toISOString().split('T')[0],
            link: link.trim() || undefined,
            fileUrl: uploadedFileUrl || undefined,
            fileType: uploadedFileType || undefined,
            thumbnail: thumbnail.trim() || undefined,
          }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setErrorMsg(data.error || '공유 자료를 저장하지 못했습니다.');
          return;
        }

        if (data.item) setMaterials((current) => [data.item, ...current]);
        resetForm();
      } catch {
        setErrorMsg('공유 저장소에 연결할 수 없습니다.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const newMaterial: DisplayMaterial = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      link: link.trim() || undefined,
      fileUrl: fileUrl || undefined,
      fileType: fileType || undefined,
      thumbnail: thumbnail.trim() || undefined,
      source: 'local',
    };

    saveLocalMaterials([newMaterial, ...materials]);
    resetForm();
    setSubmitting(false);
  };

  // 1. 서가 인포그래픽 통계 계산
  const stats = {
    total: materials.length,
    curriculum: materials.filter((m) =>
      /교육과정|편제|시수|비전|설문|2026/i.test(m.title + ' ' + m.description)
    ).length,
    ai: materials.filter((m) =>
      /ai|인공지능|캔바|프롬프트|gpt|챗봇|클로드|생성형/i.test((m.title + ' ' + m.description).toLowerCase())
    ).length,
    publishing: materials.filter((m) =>
      /출판|자작자작|책|도서|그림책|작가|문집/i.test(m.title + ' ' + m.description)
    ).length,
    invention: materials.filter((m) =>
      /발명|영재|특허|메이커|3d|과학|아이디어/i.test(m.title + ' ' + m.description)
    ).length,
  };

  const resetAllFilters = () => {
    setSelectedCategory('전체');
    setSearchQuery('');
    setSelectedSeason(null);
    setSelectedPreset(null);
    setFormatFilter('all');
    setSortOrder('latest');
  };

  const filteredData = materials
    .filter((item) => {
      // 1. 카테고리 필터
      const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;

      // 2. 검색어 필터
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      // 3. 1년 학사일정 로드맵 시즌 필터
      let matchesSeason = true;
      if (selectedSeason) {
        const season = roadmapSeasons.find((s) => s.id === selectedSeason);
        if (season) {
          const text = (item.title + ' ' + item.description).toLowerCase();
          matchesSeason = season.keywords.some((kw) => text.includes(kw.toLowerCase()));
        }
      }

      // 4. 퀵 프리셋 필터
      let matchesPreset = true;
      if (selectedPreset) {
        const text = (item.title + ' ' + item.description).toLowerCase();
        if (selectedPreset === 'worksheet') {
          matchesPreset = /활동지|서식|양식|설문|편제|계획서|워크시트/.test(text);
        } else if (selectedPreset === 'hwp') {
          matchesPreset = item.fileType === 'hwp' || text.includes('hwp') || text.includes('한글');
        } else if (selectedPreset === 'pptx') {
          matchesPreset =
            item.fileType === 'pptx' || item.fileType === 'ppt' || text.includes('ppt') || text.includes('슬라이드');
        } else if (selectedPreset === 'pdf') {
          matchesPreset = item.fileType === 'pdf' || text.includes('pdf');
        } else if (selectedPreset === 'book') {
          matchesPreset = /출판|도서|자작자작|그림책|문집|이야기|작가/.test(text);
        }
      }

      // 5. 파일 포맷 필터
      let matchesFormat = true;
      if (formatFilter !== 'all') {
        const ft = (item.fileType || '').toLowerCase();
        const t = item.title.toLowerCase();
        if (formatFilter === 'hwp') matchesFormat = ft === 'hwp' || t.includes('.hwp');
        else if (formatFilter === 'pptx') matchesFormat = ft === 'pptx' || ft === 'ppt' || t.includes('.ppt');
        else if (formatFilter === 'pdf') matchesFormat = ft === 'pdf' || t.includes('.pdf');
        else if (formatFilter === 'link') matchesFormat = Boolean(item.link);
      }

      return matchesCategory && matchesSearch && matchesSeason && matchesPreset && matchesFormat;
    })
    .sort((a, b) => {
      if (sortOrder === 'name') {
        return cleanHtmlText(a.title).localeCompare(cleanHtmlText(b.title), 'ko');
      }
      if (sortOrder === 'category') {
        return a.category.localeCompare(b.category, 'ko');
      }
      return b.id - a.id;
    });

  const currentFilterKey = `${selectedCategory}-${searchQuery}-${selectedSeason || ''}-${selectedPreset || ''}-${formatFilter}-${sortOrder}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);
  const [visibleCount, setVisibleCount] = useState(18);

  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setVisibleCount(18);
  }

  const visibleData = filteredData.slice(0, visibleCount);

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'pptx': case 'ppt': return '📊';
      case 'hwp': return '📝';
      case 'docx': case 'doc': return '📃';
      default: return '📎';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={null}>
        <CategoryFromUrl onChange={setSelectedCategory} />
      </Suspense>
      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1d3d 0%, #1a2f5e 50%, #0c1a38 100%)' }}
      >
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span className="text-sm font-medium text-emerald-200">Training Materials</span>
          </motion.div>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            연수 강의안·자료실
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-8"
          >
            교육 현장에서 직접 제작한 연수 자료를 공유합니다. 링크와 파일을 통해 자유롭게 활용해보세요.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-block"
          >
            {sharedMode ? (
              <AdminGateButton
                label="새 자료 등록하기"
                onAuthorized={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all cursor-pointer text-base disabled:opacity-60"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all cursor-pointer text-base"
              >
                <Plus className="w-5 h-5" />
                새 자료 등록하기
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* 1. Bookshelf Stats Bar (서가 인포그래픽 통계 칩 대시보드) */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200/80 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={resetAllFilters}
            className="flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/40 border border-slate-100 dark:border-slate-700/60 transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              📚
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">전체 아카이브</div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {stats.total.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedSeason('spring');
              setSelectedPreset(null);
              setSelectedCategory('전체');
            }}
            className={`flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl sm:rounded-2xl transition-all text-left group cursor-pointer border ${
              selectedSeason === 'spring'
                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 ring-2 ring-sky-400/30'
                : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-sky-950/40 border-slate-100 dark:border-slate-700/60'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              🏫
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">교육과정·시수</div>
              <div className="text-base sm:text-lg font-black text-sky-600 dark:text-sky-400">
                {stats.curriculum.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory('AI활용');
              setSelectedSeason(null);
              setSelectedPreset(null);
            }}
            className={`flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl sm:rounded-2xl transition-all text-left group cursor-pointer border ${
              selectedCategory === 'AI활용'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 ring-2 ring-indigo-400/30'
                : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border-slate-100 dark:border-slate-700/60'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              🤖
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">AI·에듀테크</div>
              <div className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400">
                {stats.ai.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedPreset('book');
              setSelectedSeason(null);
              setSelectedCategory('전체');
            }}
            className={`flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl sm:rounded-2xl transition-all text-left group cursor-pointer border ${
              selectedPreset === 'book'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-400/30'
                : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-slate-100 dark:border-slate-700/60'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              📖
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">학생책출판</div>
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                {stats.publishing.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedSeason('summer2');
              setSelectedPreset(null);
              setSelectedCategory('전체');
            }}
            className={`col-span-2 sm:col-span-1 flex items-center gap-2.5 sm:gap-3 p-3 rounded-xl sm:rounded-2xl transition-all text-left group cursor-pointer border ${
              selectedSeason === 'summer2'
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 ring-2 ring-amber-400/30'
                : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/40 border-slate-100 dark:border-slate-700/60'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
              💡
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">창의발명·영재</div>
              <div className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400">
                {stats.invention.toLocaleString()}
                <span className="text-xs font-normal text-slate-400 ml-0.5">건</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* 2. Netflix-style Curation Rail (넷플릭스형 엽쌤 시그니처 큐레이션 레일) */}
      <section className="pt-12 pb-8 bg-slate-100/70 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Signature Curation Rail
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                엽쌤 추천 시그니처 테마 컬렉션
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              실제 검증된 대표 교안과 연수 패키지를 가로로 넘겨보세요 ➔
            </p>
          </div>

          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            {/* Workshop Card 1: 2026 School Curriculum */}
            <Link
              href="/training/school-curriculum-2026"
              className="flex-none w-[290px] sm:w-[340px] snap-start group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950 p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-sky-800/50 flex flex-col justify-between min-h-[250px]"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-sky-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    2026 교육과정
                  </span>
                  <span className="text-[11px] font-semibold text-sky-200">
                    40종 실무 서식
                  </span>
                </div>
                <h3 className="text-lg font-black leading-snug group-hover:text-sky-300 transition-colors">
                  2026. 학교교육과정 설계의 모든 것
                </h3>
                <p className="mt-2 text-xs text-sky-100/80 leading-relaxed line-clamp-3">
                  학교 비전 수립부터 교원·학부모 설문지(구글폼/HWP), 시수 편제표 엑셀 자동계산기, 새학년 집중준비기간 운영 서식.
                </p>
              </div>
              <div className="relative mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-300">
                <span>전용 연수 페이지 열기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Workshop Card 2: 2026 AI Lesson Design */}
            <Link
              href="/training/ai-lesson-design-2026"
              className="flex-none w-[290px] sm:w-[340px] snap-start group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-indigo-800/50 flex flex-col justify-between min-h-[250px]"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    2026 AI 직무연수
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-200">
                    49개 실습 자료
                  </span>
                </div>
                <h3 className="text-lg font-black leading-snug group-hover:text-emerald-300 transition-colors">
                  2026. AI 활용 수업 설계 역량강화
                </h3>
                <p className="mt-2 text-xs text-indigo-100/80 leading-relaxed line-clamp-3">
                  수업에 바로 쓰는 디지털 도구 레시피! Padlet TA, Canva 강의 원고, 8종 아케이드 배움게임, 교실 수업사례 모음.
                </p>
              </div>
              <div className="relative mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>전용 연수 페이지 열기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Workshop Card 3: 2026 Student Growth */}
            <Link
              href="/training/student-growth-2026"
              className="flex-none w-[290px] sm:w-[340px] snap-start group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-teal-800/50 flex flex-col justify-between min-h-[250px]"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                    수업·평가·기록
                  </span>
                  <span className="text-[11px] font-semibold text-teal-200">
                    94개 연수 자료
                  </span>
                </div>
                <h3 className="text-lg font-black leading-snug group-hover:text-teal-300 transition-colors">
                  2026. 학생 성장을 위한 수업-평가-기록
                </h3>
                <p className="mt-2 text-xs text-teal-100/80 leading-relaxed line-clamp-3">
                  개념기반 탐구학습과 PBL, AI 활용 국어·독서 수업, 자작자작 글쓰기 & 학생 작가 출판 프로젝트 자료 모음집.
                </p>
              </div>
              <div className="relative mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-teal-300">
                <span>전용 연수 페이지 열기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Workshop Card 4: Invention & Maker Archive */}
            <button
              type="button"
              onClick={() => {
                setSelectedSeason('summer2');
                setSelectedPreset(null);
                setSelectedCategory('전체');
              }}
              className="flex-none w-[290px] sm:w-[340px] snap-start text-left group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-slate-900 to-stone-900 p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-amber-800/50 flex flex-col justify-between min-h-[250px] cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    창의발명 & 메이커
                  </span>
                  <span className="text-[11px] font-semibold text-amber-200">
                    실전 수상작 교안
                  </span>
                </div>
                <h3 className="text-lg font-black leading-snug group-hover:text-amber-300 transition-colors">
                  초등 창의발명 & 학생 메이커 아카이브
                </h3>
                <p className="mt-2 text-xs text-amber-100/80 leading-relaxed line-clamp-3">
                  대한민국 학생발명전시회 수상작 지도 노하우, 3D 모델링, 틴커캐드 실습, 특허 검색 및 출품 설명서 양식.
                </p>
              </div>
              <div className="relative mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300">
                <span>발명 자료 원클릭 모아보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 1-Year Academic Roadmap Navigator (1년 학사일정 인터랙티브 로드맵 타임라인) */}
      <section className="py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                1년 학사일정 인터랙티브 로드맵
              </h3>
              <span className="text-[11px] text-slate-400 hidden md:inline">
                지금 시즌에 꼭 필요한 자료를 바로 선택해보세요
              </span>
            </div>
            {selectedSeason && (
              <button
                type="button"
                onClick={() => setSelectedSeason(null)}
                className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                시즌 필터 해제
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {roadmapSeasons.map((season) => {
              const isSelected = selectedSeason === season.id;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setSelectedSeason(isSelected ? null : season.id)}
                  className={`p-3 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500 shadow-xs ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">{season.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {isSelected ? '선택됨' : '시즌'}
                    </span>
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {season.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {season.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Smart Facet Filter & View Toggle Bar (다차원 스마트 패싯 필터 & 뷰 전환 바) */}
      <div className="sticky top-16 lg:top-[4.5rem] z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
          {/* Top Row: Search, Category Buttons, Add Button */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80 lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="940여 개 자료 검색 (제목, 키워드, 내용)..."
                aria-label="연수 자료 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs sm:text-sm border border-transparent focus:border-brand-sky focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-1.5 flex-wrap items-center w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === '전체' && <Filter className="w-3 h-3" />}
                  {cat}
                </button>
              ))}

              {sharedMode ? (
                <AdminGateButton
                  label="자료 등록"
                  compact
                  onAuthorized={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all cursor-pointer shadow-xs disabled:opacity-60 ml-auto md:ml-2"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all cursor-pointer shadow-xs ml-auto md:ml-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  자료 등록
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Quick Presets & Format / Sort / View Switcher */}
          <div className="flex flex-col lg:flex-row gap-2.5 items-start lg:items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                퀵 프리셋:
              </span>
              {quickPresets.map((preset) => {
                const isActive = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(isActive ? null : preset.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                );
              })}
              {(selectedPreset || selectedSeason || searchQuery || selectedCategory !== '전체' || formatFilter !== 'all' || sortOrder !== 'latest') && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="모든 필터 초기화"
                >
                  <RotateCcw className="w-3 h-3" />
                  초기화
                </button>
              )}
            </div>

            {/* Right Controls: Format Filter + Sort + View Mode Switcher */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
              {/* Format Filter */}
              <select
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                aria-label="자료 형식 필터"
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs border border-transparent focus:border-brand-sky focus:outline-none cursor-pointer"
              >
                <option value="all">포맷 전체</option>
                <option value="hwp">한글 (HWP)</option>
                <option value="pptx">슬라이드 (PPT)</option>
                <option value="pdf">문서 (PDF)</option>
                <option value="link">외부 링크/웹</option>
              </select>

              {/* Sort Order */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'latest' | 'name' | 'category')}
                aria-label="자료 정렬 방식"
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs border border-transparent focus:border-brand-sky focus:outline-none cursor-pointer"
              >
                <option value="latest">최신순</option>
                <option value="name">자료명 (가나다)</option>
                <option value="category">카테고리순</option>
              </select>

              {/* View Mode Toggle: Grid vs Table */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/70 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => handleViewModeChange('grid')}
                  aria-label="카드 갤러리 뷰"
                  title="카드 갤러리 뷰"
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleViewModeChange('table')}
                  aria-label="노션 스마트 테이블 뷰"
                  title="노션 스마트 테이블 뷰"
                  className={`p-1.5 rounded-md transition-all cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-slate-700 text-brand-navy dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Main Content Area (스마트 테이블 뷰 ↔ 카드 갤러리 뷰) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              검색 결과: {filteredData.length.toLocaleString()}건
            </span>
            <span className="text-slate-400">|</span>
            <span>
              현재 {Math.min(visibleCount, filteredData.length).toLocaleString()}개 표시 중
            </span>
            {selectedSeason && (
              <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                시즌: {roadmapSeasons.find((s) => s.id === selectedSeason)?.label}
              </span>
            )}
            {selectedPreset && (
              <span className="inline-flex items-center gap-1 bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                프리셋: {quickPresets.find((p) => p.id === selectedPreset)?.label}
              </span>
            )}
            {formatFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                포맷: {formatFilter.toUpperCase()}
              </span>
            )}
          </div>
          <div className="hidden sm:block text-xs text-slate-400">
            {viewMode === 'grid' ? '카드 갤러리 모드' : '스마트 테이블 모드 (고밀도 열람)'}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loadingMaterials && materials.length === 0 ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-busy="true"
              aria-label="연수 자료를 불러오는 중"
            >
              {[0, 1, 2].map((n) => (
                <div key={n} className="h-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 animate-pulse">
                  <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-700 mb-4" />
                  <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-700 mb-3" />
                  <div className="h-4 w-full rounded bg-slate-100 dark:bg-slate-700/60 mb-2" />
                  <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-slate-700/60" />
                </div>
              ))}
            </motion.div>
          ) : filteredData.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* SMART TABLE VIEW */}
              {viewMode === 'table' ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/70 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <th className="py-3 px-4 w-14 text-center">번호</th>
                          <th className="py-3 px-3 w-24">구분</th>
                          <th className="py-3 px-4">자료명 및 내용 요약</th>
                          <th className="py-3 px-3 w-28 hidden md:table-cell">등록일</th>
                          <th className="py-3 px-3 w-28 hidden sm:table-cell">형식</th>
                          <th className="py-3 px-4 w-44 text-right">열람 / 다운로드</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm">
                        {visibleData.map((item, idx) => (
                          <tr
                            key={item.id}
                            className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            {/* Number */}
                            <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-400">
                              {idx + 1}
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 bg-brand-sky/10 text-brand-sky text-[11px] font-bold px-2 py-0.5 rounded-md">
                                {item.category}
                              </span>
                            </td>

                            {/* Title & Desc */}
                            <td className="py-3.5 px-4 min-w-[240px]">
                              {item.link || item.fileUrl ? (
                                <a
                                  href={item.link || item.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-extrabold text-slate-900 dark:text-white leading-snug hover:text-brand-sky dark:hover:text-brand-sky transition-colors line-clamp-1 block cursor-pointer"
                                  title="자료 열기"
                                >
                                  {cleanHtmlText(item.title)}
                                </a>
                              ) : (
                                <div className="font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-brand-sky transition-colors line-clamp-1">
                                  {cleanHtmlText(item.title)}
                                </div>
                              )}
                              {item.description && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                                  {cleanHtmlText(item.description)}
                                </div>
                              )}
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-3 text-xs text-slate-400 whitespace-nowrap hidden md:table-cell">
                              {item.date}
                            </td>

                            {/* Format Badge */}
                            <td className="py-3.5 px-3 whitespace-nowrap hidden sm:table-cell">
                              {item.fileType ? (
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                  item.fileType === 'hwp'
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                                    : item.fileType.includes('ppt')
                                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                                    : item.fileType === 'pdf'
                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                }`}>
                                  {getFileIcon(item.fileType)} {item.fileType.toUpperCase()}
                                </span>
                              ) : item.link ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                  🌐 LINK
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">-</span>
                              )}
                            </td>

                            {/* Action Buttons & Delete Button */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-brand-navy hover:bg-brand-sky hover:text-slate-950 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg transition-colors shadow-xs"
                                    title="자료 열람"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    <span className="hidden sm:inline">열기</span>
                                  </a>
                                )}
                                {item.fileUrl && !item.fileUrl.includes('storage.googleapis.com') && (
                                  <a
                                    href={item.fileUrl}
                                    download={cleanHtmlText(item.title)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                                    title="파일 다운로드"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span className="hidden sm:inline">다운</span>
                                  </a>
                                )}
                                {/* 호버 시에만 나타나는 아주 작은 삭제 버튼 */}
                                {(item.source !== 'shared' || isAdmin) && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteModalId(item.id);
                                      setDeletePassword('');
                                      setDeletePasswordError('');
                                    }}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                                    title="자료 삭제"
                                    aria-label="자료 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* CARD GALLERY VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleData.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col justify-between"
                    >
                      {/* 우측 상단 호버 시에만 나타나는 아주 작은 삭제 버튼 */}
                      {(item.source !== 'shared' || isAdmin) && (
                        <button
                          onClick={() => {
                            setDeleteModalId(item.id);
                            setDeletePassword('');
                            setDeletePasswordError('');
                          }}
                          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-slate-200/70 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 dark:hover:text-rose-400 shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                          title="자료 삭제"
                          aria-label="자료 삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div>
                        {/* Thumbnail */}
                        {item.thumbnail && (
                          <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.thumbnail}
                              alt={cleanHtmlText(item.title)}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const parent = e.currentTarget.parentElement;
                                if (parent) parent.style.display = 'none';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}

                        <div className="p-5">
                          {/* Category & Date */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 bg-brand-sky/10 text-brand-sky text-xs font-bold px-2.5 py-1 rounded-full">
                              <Tag className="w-3 h-3" />
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
                            {cleanHtmlText(item.title)}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            {cleanHtmlText(item.description)}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-5 pt-0 flex items-center gap-2 flex-wrap">
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-brand-sky hover:text-slate-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            자료 열람 및 다운로드
                          </a>
                        )}
                        {item.fileUrl && !item.fileUrl.includes('storage.googleapis.com') && (
                          <a
                            href={item.fileUrl}
                            download={cleanHtmlText(item.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {getFileIcon(item.fileType)} 파일 다운로드
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination / Expand More Buttons */}
              {visibleCount < filteredData.length && (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 36)}
                    className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-sky text-slate-800 dark:text-slate-200 font-bold px-6 py-3.5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer text-sm"
                  >
                    <span>+36개 더 보기 ({visibleCount} / {filteredData.length})</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredData.length)}
                    className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-5 py-3.5 rounded-2xl transition-all cursor-pointer text-sm"
                  >
                    <span>전체 자료 한 번에 펼치기 ({filteredData.length}개)</span>
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                {searchQuery ? '검색 결과가 없습니다' : '연수 자료 준비 중'}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-2">
                {searchQuery
                  ? `"${searchQuery}"에 해당하는 자료를 찾지 못했습니다. 다른 검색어를 시도해보세요.`
                  : '새로운 연수 자료가 곧 업데이트됩니다. 직접 자료를 등록할 수도 있어요!'}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                {loadingMaterials
                  ? '자료 저장소를 확인하는 중입니다.'
                  : sharedMode
                    ? '공유 자료는 서버에 저장되어 모든 방문자에게 표시됩니다.'
                    : '공유 저장소 설정 전까지 등록 자료는 현재 브라우저에만 저장됩니다.'}
              </p>
              {sharedMode ? (
                <AdminGateButton
                  label="첫 자료 등록하기"
                  onAuthorized={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  첫 자료 등록하기
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Material Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-material-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 dark:border-slate-700"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-brand-navy to-brand-sky px-6 py-5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 id="create-material-title" className="font-extrabold text-lg">새 연수 자료 등록</h2>
                    <p className="text-xs text-white/70">
                      {sharedMode ? '관리자 권한으로 공유 저장소에 등록합니다' : '이 브라우저에만 저장되는 개인 자료입니다'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleCreateMaterial} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {errorMsg && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm font-medium rounded-xl">
                    {errorMsg}
                  </div>
                )}

                <div className="p-4 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-2xl text-xs leading-relaxed text-sky-800 dark:text-sky-200">
                  {sharedMode
                    ? '등록한 자료와 첨부 파일은 공유 저장소에 저장되어 다른 기기와 방문자에게도 표시됩니다. 공개 가능한 자료만 등록해주세요.'
                    : '공유 저장소 설정 전에는 등록한 자료와 첨부 파일이 현재 브라우저에만 저장됩니다.'}
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="material-title" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    자료 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="material-title"
                    type="text"
                    required
                    placeholder="예: 2025 AI 활용 수업 도구 연수 자료"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="material-category" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    카테고리
                  </label>
                  <select
                    id="material-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as '에듀테크' | 'AI활용' | '독서인문' | '기타')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  >
                    <option value="에듀테크">에듀테크</option>
                    <option value="AI활용">AI활용</option>
                    <option value="독서인문">독서인문</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="material-description" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    자료 설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="material-description"
                    required
                    rows={3}
                    placeholder="자료에 대한 주요 내용 및 안내 사항을 적어주세요."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                {/* External Link */}
                <div>
                  <label htmlFor="material-link" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-brand-sky" /> 외부 링크 (선택)
                  </label>
                  <input
                    id="material-link"
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                {/* Direct File Attachment */}
                <div>
                  <label htmlFor="material-file" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-emerald-500" /> 파일 업로드 (선택)
                  </label>
                  <input
                    id="material-file"
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                  {fileName && (
                    <p className="mt-1 text-xs text-emerald-600 font-medium truncate">
                      선택됨: {fileName} {sharedMode ? '(최대 4MB)' : '(최대 1.5MB)'}
                    </p>
                  )}
                </div>

                {/* Thumbnail Image URL */}
                <div>
                  <label htmlFor="material-thumbnail" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-500" /> 썸네일 이미지 URL (선택)
                  </label>
                  <input
                    id="material-thumbnail"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                    <Plus className="w-4 h-4" />
                    {submitting ? '저장 중...' : '자료 등록하기'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalId !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-material-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => {
              setDeleteModalId(null);
              setDeletePassword('');
              setDeletePasswordError('');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 id="delete-material-title" className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-lg">
                  <Trash2 className="w-5 h-5" />
                  자료 삭제 확인
                </h2>
                <button
                  type="button"
                  aria-label="닫기"
                  onClick={() => {
                    setDeleteModalId(null);
                    setDeletePassword('');
                    setDeletePasswordError('');
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 삭제 대상 자료 안내 */}
              {(() => {
                const target = materials.find((item) => item.id === deleteModalId);
                return (
                  <div className="mb-4 p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                    <p className="text-xs font-bold text-rose-900 dark:text-rose-200 line-clamp-1 mb-1">
                      {target?.title ? cleanHtmlText(target.title) : '선택한 자료'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {target?.source === 'shared'
                        ? '공유 저장소에서 이 자료를 영구 삭제합니다.'
                        : '이 기기 목록에서 해당 자료를 삭제(숨김)합니다.'}
                    </p>
                  </div>
                );
              })()}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (deletePassword !== DELETE_PASSWORD) {
                    setDeletePasswordError('비밀번호가 올바르지 않습니다.');
                    return;
                  }
                  handleDeleteMaterial(deleteModalId);
                  setDeleteModalId(null);
                  setDeletePassword('');
                  setDeletePasswordError('');
                }}
              >
                <div className="mb-5">
                  <label htmlFor="delete-password-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-500" />
                    관리자 비밀번호 확인
                  </label>
                  <input
                    id="delete-password-input"
                    type="password"
                    autoFocus
                    placeholder="비밀번호 입력"
                    value={deletePassword}
                    onChange={(e) => {
                      setDeletePassword(e.target.value);
                      if (deletePasswordError) setDeletePasswordError('');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  />
                  {deletePasswordError && (
                    <p className="mt-1.5 text-xs font-bold text-rose-500">
                      {deletePasswordError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setDeleteModalId(null);
                      setDeletePassword('');
                      setDeletePasswordError('');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-rose-600/30"
                  >
                    삭제 확인
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

