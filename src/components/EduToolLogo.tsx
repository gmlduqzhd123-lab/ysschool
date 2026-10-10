'use client';

import React, { useState } from 'react';
import type { EduToolItem } from '@/data/eduToolsData';

interface EduToolLogoProps {
  tool: EduToolItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function EduToolLogo({
  tool,
  className = '',
  size = 'md',
}: EduToolLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerSizes = {
    sm: 'w-10 h-10 rounded-xl p-1.5',
    md: 'w-12 h-12 sm:w-13 sm:h-13 rounded-2xl p-2',
    lg: 'w-14 h-14 rounded-2xl p-2.5',
  };

  const imgSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8 sm:w-8.5 sm:h-8.5',
    lg: 'w-9 h-9',
  };

  const emojiSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const logoSrc =
    tool.logoUrl ||
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      tool.url,
    )}&sz=128`;

  return (
    <div
      className={`relative flex items-center justify-center bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all duration-200 shrink-0 overflow-hidden group-hover:scale-105 ${
        tool.brandBg ? tool.brandBg : ''
      } ${containerSizes[size]} ${className}`}
      title={`${tool.name} 로고`}
    >
      {!hasError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc}
          alt={`${tool.name} 대표 로고`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className={`${imgSizes[size]} object-contain drop-shadow-2xs transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-80'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <span
          className={`${emojiSizes[size]} select-none transform transition-transform group-hover:scale-110`}
          role="img"
          aria-label={tool.name}
        >
          {tool.symbolEmoji || '🛠️'}
        </span>
      )}
    </div>
  );
}
