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

export default function ArchiveTabs() {
  const [activeTab, setActiveTab] = useState('edu-archive');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['edu-archive', 'dev-lab', 'hall-of-fame', 'acappella', 'media-room', 'press-room', 'publications'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
        // 부드럽게 탭 컨테이너로 스크롤
        setTimeout(() => {
          const element = document.getElementById('archive-tabs');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };
    
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['edu-archive', 'dev-lab', 'hall-of-fame', 'acappella', 'media-room', 'press-room', 'publications'];
    if (validTabs.includes(hash)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(hash);
    }
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const tabs = [
    { id: 'edu-archive', label: '교육 자료실', icon: FolderOpen },
    { id: 'dev-lab', label: '웹앱 실험실', icon: Code2 },
    { id: 'hall-of-fame', label: '수상 내역', icon: Trophy },
    { id: 'acappella', label: '아카펠라', icon: Music },
    { id: 'media-room', label: '영상 갤러리', icon: Video },
    { id: 'press-room', label: '언론 보도', icon: FileText },
    { id: 'publications', label: '저서 소개', icon: BookText },
  ];

  return (
    <div id="archive-tabs" className="w-full bg-slate-50 dark:bg-slate-900/50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">YSSCHOOL ARCHIVE</h2>
        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
          통합 아카이브
        </h3>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep mb-10">
          아래 탭을 눌러 방대한 자료와 프로젝트들을 한자리에서 간편하게 열람하세요.
        </p>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
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
