'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ExternalLink, FileText, Download, Search,
  Sparkles, Filter, Calendar, Tag, Plus, Lock, X, Upload, Link2, Image as ImageIcon, Trash2
} from 'lucide-react';
import Link from 'next/link';
import { trainingData, type TrainingMaterial } from '@/data/trainingData';

const categories = ['전체', '에듀테크', 'AI활용', '독서인문', '기타'] as const;

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState<TrainingMaterial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'에듀테크' | 'AI활용' | '독서인문' | '기타'>('에듀테크');
  const [link, setLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Load initial + stored materials
  useEffect(() => {
    const stored = localStorage.getItem('ysschool_training_materials');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMaterials([...trainingData, ...parsed]);
      } catch (e) {
        setMaterials(trainingData);
      }
    } else {
      setMaterials(trainingData);
    }
  }, []);

  const saveMaterials = (newMaterials: TrainingMaterial[]) => {
    setMaterials(newMaterials);
    // Custom uploaded materials (id > 10000 or added by user)
    const customOnly = newMaterials.filter(item => item.id >= 10000);
    localStorage.setItem('ysschool_training_materials', JSON.stringify(customOnly));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    setFileType(ext);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFileUrl(uploadEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== '1234') {
      setErrorMsg('비밀번호가 올바르지 않습니다. (비밀번호: 1234)');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setErrorMsg('제목과 설명을 모두 입력해주세요.');
      return;
    }

    const newMaterial: TrainingMaterial = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      link: link.trim() || undefined,
      fileUrl: fileUrl || undefined,
      fileType: fileType || undefined,
      thumbnail: thumbnail.trim() || undefined,
    };

    const updated = [newMaterial, ...materials];
    saveMaterials(updated);

    // Reset form and close modal
    setTitle('');
    setDescription('');
    setCategory('에듀테크');
    setLink('');
    setFileName('');
    setFileUrl('');
    setFileType('');
    setThumbnail('');
    setPassword('');
    setErrorMsg('');
    setIsModalOpen(false);
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
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
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
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all cursor-pointer text-base"
          >
            <Plus className="w-5 h-5" />
            새 자료 등록하기
          </motion.button>
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                자료 등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          {filteredData.length > 0 ? (
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
                        <img
                          src={item.thumbnail}
                          alt={item.title}
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
                  <div className="p-5 pt-0 flex gap-2 flex-wrap">
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
              <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed mb-6">
                {searchQuery
                  ? `"${searchQuery}"에 해당하는 자료를 찾지 못했습니다. 다른 검색어를 시도해보세요.`
                  : '등록된 교육 연수 자료가 없습니다. 새로운 연수 자료를 등록해보세요!'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                첫 자료 등록하기
              </button>
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
                    <p className="text-xs text-white/70">자료 등록을 위해 비밀번호를 입력해주세요</p>
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
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-sm font-medium rounded-xl flex items-center gap-2">
                    <Lock className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Password field */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl">
                  <label className="block text-xs font-bold text-amber-800 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> 관리자 비밀번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="비밀번호 입력 (1234)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-amber-300 dark:border-amber-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
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
                    onChange={(e) => setCategory(e.target.value as any)}
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
                      선택됨: {fileName}
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
                    className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    자료 등록하기
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

