'use client';

/**
 * AccordionItem - 아코디언 단일 항목 컴포넌트
 * 클릭 시 부드러운 슬라이드 애니메이션으로 콘텐츠를 펼칩니다.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { LibraryItem } from '@/data/libraryData';

interface AccordionItemProps {
  item: LibraryItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-6 text-left cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors duration-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-grow min-w-0">
          {/* Badges */}
          <div className="flex-shrink-0 flex items-center gap-1.5 flex-wrap">
            {item.category && (
              <span className="text-[11px] font-bold px-2 py-0.5 sm:py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300 whitespace-nowrap">
                {item.category}
              </span>
            )}
            <span className={`text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap ${item.toolColor}`}>
              {item.tool}
            </span>
          </div>

          {/* Title */}
          <span className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white leading-snug group-hover:text-brand-navy dark:group-hover:text-brand-sky transition-colors break-keep">
            {item.title}
          </span>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 mt-0.5 sm:mt-0 p-1"
        >
          <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-0">
              <div className="border-t border-slate-100 dark:border-slate-700 pt-5">
                <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
                  {item.content}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
