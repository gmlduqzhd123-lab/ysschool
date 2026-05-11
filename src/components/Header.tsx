'use client';

import React, { useState, useEffect, useRef } from 'react';
import { navLinks, NavItem } from '../data/dummyData';
import { BookOpen, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

// ========== 데스크톱 드롭다운 ==========
function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-brand-sky font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
      >
        {item.name}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[160px] bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
          {item.children!.map((child) =>
            child.href.startsWith('/') ? (
              <Link
                key={child.name}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-navy dark:hover:text-brand-sky transition-colors whitespace-nowrap"
              >
                {child.name}
              </Link>
            ) : (
              <a
                key={child.name}
                href={child.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-navy dark:hover:text-brand-sky transition-colors whitespace-nowrap"
              >
                {child.name}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ========== 모바일 아코디언 ==========
function MobileAccordion({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
      >
        {item.name}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pl-4 pb-1">
          {item.children!.map((child) =>
            child.href.startsWith('/') ? (
              <Link
                key={child.name}
                href={child.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-brand-sky rounded-lg"
              >
                {child.name}
              </Link>
            ) : (
              <a
                key={child.name}
                href={child.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-brand-sky rounded-lg"
              >
                {child.name}
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
    <header className={`fixed w-full lg:w-auto z-50 transition-all duration-500 left-0 lg:left-1/2 lg:-translate-x-1/2 ${isScrolled ? 'top-0 lg:top-4' : 'top-0 lg:top-6'}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'glass-header shadow-xl lg:rounded-full lg:border lg:border-white/30 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16 lg:h-14 lg:px-2' : 'h-20'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-brand-navy p-2 rounded-lg group-hover:bg-brand-sky transition-colors duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-brand-navy dark:text-white tracking-tight whitespace-nowrap">
                YSSCHOOL
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.name} item={item} />
              ) : item.href?.startsWith('/') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-brand-sky font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-brand-navy dark:hover:text-brand-sky font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {item.name}
                </a>
              )
            )}
            <ThemeToggle />
          </nav>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-navy focus:outline-none cursor-pointer"
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
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute top-20 left-0 w-full shadow-lg max-h-[70vh] overflow-y-auto">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((item) =>
              item.children ? (
                <MobileAccordion key={item.name} item={item} onClose={() => setMobileMenuOpen(false)} />
              ) : item.href?.startsWith('/') ? (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:text-brand-navy hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {item.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
