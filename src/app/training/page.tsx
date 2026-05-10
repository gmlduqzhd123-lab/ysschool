'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, ExternalLink, FileText, Download, Search,
  Sparkles, Filter, Calendar, Tag
} from 'lucide-react';
import Link from 'next/link';
import { trainingData, type TrainingMaterial } from '@/data/trainingData';

const categories = ['전체', '에듀테크', 'AI활용', '독서인문', '기타'] as const;

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = trainingData.filter((item) => {
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
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            교육 현장에서 직접 제작한 연수 자료를 공유합니다. 링크와 파일을 통해 자유롭게 활용해보세요.
          </motion.p>
        </div>
      </motion.section>

      {/* Search & Filter */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
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
            <div className="flex gap-2 flex-wrap">
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
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700"
                >
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

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
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
                          download
                          className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {getFileIcon(item.fileType)} 파일 다운로드
                        </a>
                      )}
                    </div>
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
              <p className="text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                {searchQuery
                  ? `"${searchQuery}"에 해당하는 자료를 찾지 못했습니다. 다른 검색어를 시도해보세요.`
                  : '교육 연수 자료가 준비되면 이곳에 공개됩니다. 조금만 기다려주세요!'}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium px-5 py-2.5 rounded-full">
                <Sparkles className="w-4 h-4" />
                콘텐츠 준비 중
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
