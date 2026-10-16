'use client';

import React from 'react';
import { Home, Gamepad2, Sunrise, FolderOpen, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/showcase#learning-games', icon: Gamepad2, label: '게임' },
  { href: '/morning', icon: Sunrise, label: '아침교실' },
  { href: '/training', icon: FolderOpen, label: '자료' },
  { href: '/sitemap-hub', icon: MoreHorizontal, label: '더보기' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 safe-area-bottom"
      aria-label="모바일 메뉴"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href.split('#')[0]));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${
                isActive
                  ? 'text-blue-600 dark:text-brand-sky'
                  : 'text-slate-400 dark:text-slate-500 active:text-slate-700 dark:active:text-slate-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
