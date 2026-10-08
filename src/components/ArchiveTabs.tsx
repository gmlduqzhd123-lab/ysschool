'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Code2, Trophy, Music, Video, FileText, BookText } from 'lucide-react';

import EduArchiveSection from './EduArchiveSection';
import DevLabSection from './DevLabSection';
import HallOfFameSection from './HallOfFameSection';
import AcappellaSection from './AcappellaSection';
import MediaRoomSection from './MediaRoomSection';
import PressRoomSection from './PressRoomSection';
import PublicationsSection from './PublicationsSection';

const VALID_TABS = ['dev-lab', 'edu-archive', 'hall-of-fame', 'acappella', 'media-room', 'press-room', 'publications'];

export default function ArchiveTabs() {
  const [activeTab, setActiveTab] = useState('dev-lab');

  useEffect(() => {
    const scrollToArchive = () => {
      const element = document.getElementById('archive-tabs');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    };

    const switchToTab = (tabId: string, shouldScroll = true) => {
      if (!VALID_TABS.includes(tabId)) return;
      setActiveTab(tabId);
      if (shouldScroll) {
        setTimeout(scrollToArchive, 100);
      }
    };

    // 1. Initial hash on mount (direct visit / navigation from other page)
    const initialHash = window.location.hash.replace('#', '');
    if (VALID_TABS.includes(initialHash)) {
      switchToTab(initialHash, true);
    }

    // 2. Hashchange & Popstate (browser navigation / hash changes)
    const handleHashOrPop = () => {
      const hash = window.location.hash.replace('#', '');
      if (VALID_TABS.includes(hash)) {
        switchToTab(hash, true);
      }
    };
    window.addEventListener('hashchange', handleHashOrPop);
    window.addEventListener('popstate', handleHashOrPop);

    // 3. Custom navigation event (from Header or other components)
    const handleCustomNav = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: string }>;
      const tabId = customEvent.detail?.tab;
      if (tabId && VALID_TABS.includes(tabId)) {
        switchToTab(tabId, true);
      }
    };
    window.addEventListener('ysschool-navigate-tab', handleCustomNav);

    // 4. Global click interceptor for links targeting archive tabs
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href) return;

      const match = href.match(/(?:\/portfolio)?#(dev-lab|edu-archive|hall-of-fame|acappella|media-room|press-room|publications)$/);
      if (match) {
        const tabId = match[1];
        switchToTab(tabId, true);
        if (window.location.hash !== `#${tabId}`) {
          window.history.pushState(null, '', `#${tabId}`);
        }
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      window.removeEventListener('hashchange', handleHashOrPop);
      window.removeEventListener('popstate', handleHashOrPop);
      window.removeEventListener('ysschool-navigate-tab', handleCustomNav);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const tabs = [
    { id: 'dev-lab', label: '웹앱 실험실', icon: Code2 },
    { id: 'edu-archive', label: '교육 자료실', icon: FolderOpen },
    { id: 'hall-of-fame', label: '수상 내역', icon: Trophy },
    { id: 'acappella', label: '아카펠라 활동', icon: Music },
    { id: 'media-room', label: '영상 갤러리', icon: Video },
    { id: 'press-room', label: '언론 보도', icon: FileText },
    { id: 'publications', label: '출간 도서', icon: BookText },
  ];

  return (
    <div id="archive-tabs" className="w-full bg-slate-50 dark:bg-slate-900/50 pt-24 pb-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">YSSCHOOL ARCHIVE</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
          통합 아카이브
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep mb-10">
          아래 탭을 눌러 방대한 자료와 프로젝트들을 한자리에서 간편하게 열람하세요.
        </p>
        
        {/* Category Tabs */}
        <div role="tablist" aria-label="통합 아카이브 카테고리" className="flex flex-wrap justify-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                // 브라우저 뒤로가기 기록에는 남기되 스크롤 점핑은 막기 위해 직접 pushState
                window.history.pushState(null, '', `#${tab.id}`);
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-brand-navy text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-brand-sky/30 hover:text-brand-sky'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full relative mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'edu-archive' && <EduArchiveSection />}
            {activeTab === 'dev-lab' && <DevLabSection />}
            {activeTab === 'hall-of-fame' && <HallOfFameSection />}
            {activeTab === 'acappella' && <AcappellaSection />}
            {activeTab === 'media-room' && <MediaRoomSection />}
            {activeTab === 'press-room' && <PressRoomSection />}
            {activeTab === 'publications' && <PublicationsSection />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
