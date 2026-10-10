'use client';

import React, { useState, useEffect, useRef } from 'react';
import { navLinks, NavItem } from '../data/dummyData';
import {
  BookOpen,
  ChevronDown,
  Search,
  Command,
  Download,
  Gamepad2,
  Wrench,
  Bot,
  FileText,
  PenTool,
  User,
  Calendar,
  Book,
  Music,
  Mail,
  Sparkles,
  Code2,
  QrCode,
} from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import InstallAppButton from './InstallAppButton';
import QrButton from './QrButton';
import BgmToggle from './BgmToggle';

// ========== 메뉴 아이콘 렌더링 ==========
function RenderNavIcon({ iconName }: { iconName?: string }) {
  switch (iconName) {
    case 'Gamepad2':
      return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
    case 'Code2':
      return <Code2 className="w-4 h-4 text-violet-500" />;
    case 'Wrench':
      return <Wrench className="w-4 h-4 text-amber-500" />;
    case 'Bot':
      return <Bot className="w-4 h-4 text-sky-500" />;
    case 'FileText':
      return <FileText className="w-4 h-4 text-blue-500" />;
    case 'BookOpen':
      return <BookOpen className="w-4 h-4 text-indigo-500" />;
    case 'PenTool':
      return <PenTool className="w-4 h-4 text-purple-500" />;
    case 'User':
      return <User className="w-4 h-4 text-cyan-500" />;
    case 'Calendar':
      return <Calendar className="w-4 h-4 text-rose-500" />;
    case 'Book':
      return <Book className="w-4 h-4 text-teal-500" />;
    case 'Music':
      return <Music className="w-4 h-4 text-pink-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-brand-sky" />;
  }
}

// ========== 앵커 및 아카이브 탭 링크 부드러운 스크롤 처리 ==========
function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onAfter?: () => void
) {
  if (onAfter) onAfter();

  const hashIdx = href.indexOf('#');
  if (hashIdx === -1) {
    if (typeof window !== 'undefined' && window.location.pathname === href) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const targetPath = href.substring(0, hashIdx) || '/';
  const targetHash = href.substring(hashIdx + 1);

  if (typeof window === 'undefined') return;

  const currentPath = window.location.pathname;
  const isSamePage =
    currentPath === targetPath ||
    (currentPath === '' && targetPath === '/') ||
    (currentPath === '/' && targetPath === '');

  if (isSamePage) {
    e.preventDefault();

    const archiveTabs = [
      'dev-lab',
      'edu-archive',
      'hall-of-fame',
      'acappella',
      'media-room',
      'press-room',
      'publications',
      'archive-tabs',
    ];

    if (archiveTabs.includes(targetHash)) {
      window.dispatchEvent(
        new CustomEvent('ysschool-navigate-tab', { detail: { tab: targetHash } })
      );
      if (window.location.hash !== `#${targetHash}`) {
        window.history.pushState(null, '', `#${targetHash}`);
      }
      return;
    }

    const showcaseTabs = [
      'yscode',
      'playground',
      'apps',
      'games',
      'learning-games',
      'gallery',
    ];

    if (showcaseTabs.includes(targetHash)) {
      window.dispatchEvent(
        new CustomEvent('showcase-tab-change', { detail: { tab: targetHash } })
      );
      if (window.location.hash !== `#${targetHash}`) {
        window.history.pushState(null, '', `#${targetHash}`);
      }
      return;
    }

    const element = document.getElementById(targetHash);
    if (element) {
      if (window.location.hash !== `#${targetHash}`) {
        window.history.pushState(null, '', `#${targetHash}`);
      }
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  }
}

// ========== 데스크톱 드롭다운 ==========
function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Esc 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const menuId = `nav-menu-${item.name.replace(/\s+/g, '-')}`;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-brand-sky font-semibold text-sm transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky ${
          open ? 'text-brand-navy dark:text-brand-sky bg-slate-100/80 dark:bg-slate-800/80' : ''
        }`}
      >
        <span>{item.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? 'rotate-180 text-brand-navy dark:text-brand-sky' : 'text-slate-400'
          }`}
          aria-hidden="true"
        />
      </button>

      {open && item.children && (
        <div
          id={menuId}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="w-80 p-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-700/80 space-y-1">
            {item.children.map((child) =>
              child.href.startsWith('/') ? (
                <Link
                  key={child.name}
                  href={child.href}
                  onClick={(e) => {
                    setOpen(false);
                    handleAnchorClick(e, child.href);
                  }}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/90 dark:hover:bg-slate-700/70 transition-all duration-200 group text-left"
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-700/80 group-hover:bg-brand-navy group-hover:text-white dark:group-hover:bg-brand-sky dark:group-hover:text-slate-900 transition-colors shrink-0">
                    <RenderNavIcon iconName={child.iconName} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-navy dark:group-hover:text-brand-sky transition-colors">
                        {child.name}
                      </span>
                      {child.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 leading-none">
                          {child.badge}
                        </span>
                      )}
                    </div>
                    {child.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                        {child.description}
                      </p>
                    )}
                  </div>
                </Link>
              ) : (
                <a
                  key={child.name}
                  href={child.href}
                  onClick={(e) => {
                    setOpen(false);
                    handleAnchorClick(e, child.href);
                  }}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/90 dark:hover:bg-slate-700/70 transition-all duration-200 group text-left"
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-700/80 group-hover:bg-brand-navy group-hover:text-white dark:group-hover:bg-brand-sky dark:group-hover:text-slate-900 transition-colors shrink-0">
                    <RenderNavIcon iconName={child.iconName} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-navy dark:group-hover:text-brand-sky transition-colors">
                        {child.name}
                      </span>
                      {child.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 leading-none">
                          {child.badge}
                        </span>
                      )}
                    </div>
                    {child.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 leading-snug">
                        {child.description}
                      </p>
                    )}
                  </div>
                </a>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ========== 모바일 아코디언 ==========
function MobileAccordion({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 dark:border-slate-800/60 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors"
      >
        <span>{item.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-brand-navy dark:text-brand-sky' : ''
          }`}
        />
      </button>
      {open && item.children && (
        <div className="px-2 pb-2 space-y-1">
          {item.children.map((child) =>
            child.href.startsWith('/') ? (
              <Link
                key={child.name}
                href={child.href}
                onClick={(e) => {
                  onClose();
                  handleAnchorClick(e, child.href);
                }}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
              >
                <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                  <RenderNavIcon iconName={child.iconName} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {child.name}
                    </span>
                    {child.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 leading-none">
                        {child.badge}
                      </span>
                    )}
                  </div>
                  {child.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {child.description}
                    </p>
                  )}
                </div>
              </Link>
            ) : (
              <a
                key={child.name}
                href={child.href}
                onClick={(e) => {
                  onClose();
                  handleAnchorClick(e, child.href);
                }}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
              >
                <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                  <RenderNavIcon iconName={child.iconName} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {child.name}
                    </span>
                    {child.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 leading-none">
                        {child.badge}
                      </span>
                    )}
                  </div>
                  {child.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {child.description}
                    </p>
                  )}
                </div>
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ========== 메인 Header ==========
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 left-0 ${
        isScrolled ? 'w-full lg:w-max lg:left-1/2 lg:-translate-x-1/2 top-0 lg:top-4' : 'w-full top-0'
      }`}
    >
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          isScrolled
            ? 'glass-header shadow-xl lg:rounded-full lg:border lg:border-white/30 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl'
            : 'max-w-7xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm'
        }`}
      >
        <div
          className={`flex justify-between items-center gap-3 sm:gap-6 lg:gap-8 transition-all duration-300 ${
            isScrolled ? 'h-16 lg:h-14 lg:px-3' : 'h-20'
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-brand-navy p-1.5 min-[400px]:p-2 rounded-lg group-hover:bg-brand-sky transition-colors duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg min-[400px]:text-xl sm:text-2xl text-brand-navy dark:text-white tracking-tight whitespace-nowrap">
                YSSCHOOL
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-3.5">
            {navLinks.map((item) => {
              if (item.children) {
                return <DesktopDropdown key={item.name} item={item} />;
              }

              if (item.highlight) {
                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    onClick={(e) => handleAnchorClick(e, item.href!)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              }

              return item.href?.startsWith('/') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href!)}
                  className="text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-brand-sky font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href!)}
                  className="text-slate-700 dark:text-slate-200 hover:text-brand-navy dark:hover:text-brand-sky font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </a>
              );
            })}

            <button
              onClick={() => {
                const e = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
                window.dispatchEvent(e);
              }}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 text-sm transition-all duration-200 cursor-pointer border border-slate-200 dark:border-slate-700"
              aria-label="검색"
            >
              <Search className="w-4 h-4" />
              <span className="text-xs">검색</span>
              <kbd className="hidden 2xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono font-bold">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </button>
            <InstallAppButton className="px-3 py-1.5 rounded-full bg-brand-navy text-white text-xs font-bold whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer" />
            <QrButton label="📱 QR" className="px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold whitespace-nowrap hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" />
            <BgmToggle />
            <LanguageToggle />
            <ThemeToggle />
          </nav>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-2 shrink-0">
            {/* 📲 앱 설치 · 📱 QR: 휴대폰에서도 상단에 (좁은 화면은 아이콘만) */}
            <InstallAppButton
              label={
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">설치</span>
                </>
              }
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-brand-navy text-white text-xs font-bold leading-4 whitespace-nowrap shadow-sm cursor-pointer"
            />
            <QrButton
              label={
                <>
                  <QrCode className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">QR</span>
                </>
              }
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold leading-4 whitespace-nowrap cursor-pointer"
            />
            <div className="hidden sm:flex items-center gap-1.5">
              <LanguageToggle />
            </div>
            <BgmToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky cursor-pointer"
              aria-label={mobileMenuOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="모바일 메뉴"
          className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute top-full left-0 w-full shadow-lg max-h-[75vh] overflow-y-auto"
        >
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((item) => {
              if (item.children) {
                return (
                  <MobileAccordion
                    key={item.name}
                    item={item}
                    onClose={() => setMobileMenuOpen(false)}
                  />
                );
              }

              if (item.highlight) {
                return (
                  <div key={item.name} className="pt-2 px-1">
                    <Link
                      href={item.href!}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleAnchorClick(e, item.href!);
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-md"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  </div>
                );
              }

              return item.href?.startsWith('/') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleAnchorClick(e, item.href!);
                  }}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleAnchorClick(e, item.href!);
                  }}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
