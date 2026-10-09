'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBgm } from './BgmContext';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function BgmToggle({ className }: { className?: string }) {
  const { isPlaying, toggleBgm, volume, setVolume } = useBgm();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 볼륨 슬라이더 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowVolumeSlider(false);
      }
    };
    if (showVolumeSlider) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showVolumeSlider]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleBgm}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowVolumeSlider((prev) => !prev);
        }}
        className={
          className ||
          `relative p-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group flex items-center gap-1.5 ${
            isPlaying
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 border border-blue-200/80 dark:border-blue-800/80 shadow-blue-500/10'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`
        }
        aria-label={isPlaying ? 'BGM 일시정지' : 'BGM 재생'}
        title={
          isPlaying
            ? '🎵 BGM 일시정지 (우클릭: 볼륨 조절)'
            : '🎵 BGM 켜기 (우클릭: 볼륨 조절)'
        }
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            {/* 이퀄라이저 애니메이션 바 */}
            <div className="flex items-end gap-0.5 h-4 w-3.5 justify-center py-0.5" aria-hidden="true">
              <span className="w-0.5 bg-current rounded-full animate-[musicBar_0.8s_ease-in-out_infinite_alternate]" style={{ height: '70%' }} />
              <span className="w-0.5 bg-current rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_alternate_0.2s]" style={{ height: '100%' }} />
              <span className="w-0.5 bg-current rounded-full animate-[musicBar_0.9s_ease-in-out_infinite_alternate_0.4s]" style={{ height: '50%' }} />
            </div>
            <span className="text-[11px] font-extrabold tracking-tight hidden min-[420px]:inline">
              BGM
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 opacity-75 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <Music className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hidden min-[420px]:inline">
              BGM
            </span>
          </div>
        )}
      </button>

      {/* 볼륨 컨트롤 팝업 (우클릭 또는 토글 시 표시) */}
      {showVolumeSlider && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 min-w-[160px] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold text-slate-700 dark:text-slate-200">
            <span className="flex items-center gap-1">
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
              )}
              BGM 볼륨
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      )}
    </div>
  );
}
