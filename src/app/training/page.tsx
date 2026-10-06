'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Download, Search,
  Sparkles, Filter, Calendar, Tag, Plus, X, Upload, Link2, Image as ImageIcon, Trash2
} from 'lucide-react';
import Header from '@/components/Header';
import AdminGateButton from '@/components/AdminGateButton';
import { useAdmin } from '@/components/AdminContext';
import { trainingData, type TrainingMaterial } from '@/data/trainingData';

type DisplayMaterial = TrainingMaterial & { source?: 'shared' | 'local' | 'default' };

const categories = ['전체', '에듀테크', 'AI활용', '독서인문', '기타'] as const;

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

  // Delete modal state
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

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

  const readLocalMaterials = (): DisplayMaterial[] => {
    const stored = localStorage.getItem('ysschool_training_materials');
    const deletedIds = readJsonArray<number>('ysschool_training_deleted_ids');
    const base = trainingData
      .filter((item) => !deletedIds.includes(item.id))
      .map((item) => ({ ...item, source: 'default' as const }));

    if (!stored) return base;

    try {
      const parsed = JSON.parse(stored) as TrainingMaterial[];
      return [
        ...parsed.map((item) => ({ ...item, source: 'local' as const })),
        ...base,
      ];
    } catch {
      return base;
    }
  };

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
  }, []);

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

  const filteredData = materials.filter((item) => {
    const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        className="relative py-20 sm:py-28 overflow-hidden"
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
            연수 자료실
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

      {/* Search & Filter */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="자료 검색..."
                aria-label="연수 자료 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-sm border border-transparent focus:border-brand-sky focus:outline-none transition-colors"
              />
            </div>
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === '전체' && <Filter className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              ))}
              {sharedMode ? (
                <AdminGateButton
                  label="자료 등록"
                  compact
                  onAuthorized={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all cursor-pointer shadow-sm disabled:opacity-60"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  자료 등록
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredData.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    {item.thumbnail && (
                      <div className="relative aspect-video overflow-hidden">
                        {/* User-provided thumbnails can come from arbitrary hosts, so native img is intentional here. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
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
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex gap-2 flex-wrap items-center">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-brand-sky text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          링크 열기
                        </a>
                      )}
                      {item.fileUrl && (
                        <a
                          href={item.fileUrl}
                          download={item.title}
                          className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {getFileIcon(item.fileType)} 파일 다운로드
                        </a>
                      )}
                    </div>
                    {(item.source !== 'shared' || isAdmin) && (
                      <button
                        onClick={() => setDeleteModalId(item.id)}
                        className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-bold text-xs px-3 py-2.5 rounded-xl transition-colors cursor-pointer ml-auto"
                        title={item.source === 'shared' ? '공유 자료 관리자 삭제' : '이 기기 자료 삭제'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        삭제
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
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
                    <h2 className="font-extrabold text-lg">새 연수 자료 등록</h2>
                    <p className="text-xs text-white/70">
                      {sharedMode ? '관리자 권한으로 공유 저장소에 등록합니다' : '이 브라우저에만 저장되는 개인 자료입니다'}
                    </p>
                  </div>
                </div>
                <button
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    자료 제목 <span className="text-red-500">*</span>
                  </label>
                  <input
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    카테고리
                  </label>
                  <select
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    자료 설명 <span className="text-red-500">*</span>
                  </label>
                  <textarea
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Link2 className="w-3.5 h-3.5 text-brand-sky" /> 외부 링크 (선택)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky"
                  />
                </div>

                {/* Direct File Attachment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5 text-emerald-500" /> 파일 업로드 (선택)
                  </label>
                  <input
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
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-500" /> 썸네일 이미지 URL (선택)
                  </label>
                  <input
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setDeleteModalId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-lg">
                  <Trash2 className="w-5 h-5" />
                  자료 삭제
                </div>
                <button
                  onClick={() => setDeleteModalId(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                {materials.find((item) => item.id === deleteModalId)?.source === 'shared'
                  ? '관리자 권한으로 공유 저장소에서 이 자료를 삭제합니다. 모든 방문자 화면에서 사라집니다.'
                  : '이 브라우저에 저장된 자료를 삭제하거나 기본 자료를 이 기기에서 숨깁니다.'}
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleDeleteMaterial(deleteModalId); }}>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setDeleteModalId(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors cursor-pointer shadow-md shadow-rose-600/30"
                  >
                    삭제하기
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

