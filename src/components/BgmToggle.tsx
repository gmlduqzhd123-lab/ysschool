'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBgm } from './BgmContext';
import { Music, Volume1, Volume2, VolumeX } from 'lucide-react';

// 볼륨에 따른 스피커 아이콘 컴포넌트
function VolumeIcon({ volume }: { volume: number }) {
  if (volume === 0) return <VolumeX className="w-3.5 h-3.5 text-slate-400" />;
  if (volume < 0.5) return <Volume1 className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />;
  return <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />;
}

const PRESETS = [
  { label: '음소거', value: 0 },
  { label: '20%', value: 0.2 },
  { label: '40%', value: 0.4 },
  { label: '70%', value: 0.7 },
];

export default function BgmToggle({ className }: { className?: string }) {
  const { isPlaying, toggleBgm, volume, setVolume, playBgm } = useBgm();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 볼륨 팝업 닫기
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

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    // 볼륨을 올렸는데 재생 중이 아니라면 바로 음악 재생
    if (newVal > 0 && !isPlaying) {
      playBgm();
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* 캡슐형 BGM + 볼륨 조절 복합 버튼 */}
      <div
        className={
          className ||
          `flex items-center rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border ${
            isPlaying
              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 shadow-blue-500/10'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300'
          }`
        }
      >
        {/* 1. 재생 / 일시정지 버튼 */}
        <button
          type="button"
          onClick={toggleBgm}
          className="flex items-center gap-1.5 px-2 sm:px-2.5 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-l-xl max-sm:rounded-r-xl transition-colors cursor-pointer"
          aria-label={isPlaying ? 'BGM 일시정지' : 'BGM 재생'}
          title={isPlaying ? '🎵 BGM 일시정지' : '🎵 BGM 재생'}
        >
          {isPlaying ? (
            <>
              {/* 3단 애니메이션 이퀄라이저 바 */}
              <div className="flex items-end gap-0.5 h-3.5 w-3 justify-center py-0.5" aria-hidden="true">
                <span className="w-0.5 bg-current rounded-full animate-[musicBar_0.8s_ease-in-out_infinite_alternate]" style={{ height: '70%' }} />
                <span className="w-0.5 bg-current rounded-full animate-[musicBar_1.1s_ease-in-out_infinite_alternate_0.2s]" style={{ height: '100%' }} />
                <span className="w-0.5 bg-current rounded-full animate-[musicBar_0.9s_ease-in-out_infinite_alternate_0.4s]" style={{ height: '50%' }} />
              </div>
              <span className="hidden sm:inline text-xs font-black tracking-tight">BGM</span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 opacity-70" />
              <span className="hidden sm:inline text-xs font-bold opacity-75">BGM</span>
            </>
          )}
        </button>

        {/* 구분선 */}
        <span className="hidden sm:block w-px h-3.5 bg-slate-300 dark:bg-slate-700/80 shrink-0" aria-hidden="true" />

        {/* 2. 볼륨 조절 팝업 열기 버튼 */}
        <button
          type="button"
          onClick={() => setShowVolumeSlider((prev) => !prev)}
          className={`hidden sm:flex px-2 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-r-xl transition-colors cursor-pointer items-center gap-1 ${
            showVolumeSlider ? 'bg-black/10 dark:bg-white/10' : ''
          }`}
          aria-label="BGM 볼륨 조절"
          title={`BGM 볼륨 조절 (현재: ${Math.round(volume * 100)}%)`}
        >
          <VolumeIcon volume={volume} />
          <span className="text-[10px] font-mono font-bold hidden sm:inline opacity-80">
            {Math.round(volume * 100)}%
          </span>
        </button>
      </div>

      {/* 3. 볼륨 조절 팝업 레이어 */}
      {showVolumeSlider && (
        <div className="absolute top-full right-0 mt-2 p-3.5 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 z-50 w-60 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
          {/* 팝업 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
              <VolumeIcon volume={volume} />
              <span>배경음악 볼륨</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 font-mono text-xs font-black border border-blue-200/50 dark:border-blue-800/50">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* 슬라이더 컨트롤 */}
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => handleVolumeChange(0)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors p-0.5"
              title="음소거"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-sky-400"
              aria-label="볼륨 슬라이더"
            />
            <button
              type="button"
              onClick={() => handleVolumeChange(1)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors p-0.5"
              title="최대 볼륨"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 빠른 프리셋 버튼 모음 */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {PRESETS.map((preset) => {
              const isActive = Math.abs(volume - preset.value) < 0.05;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleVolumeChange(preset.value)}
                  className={`py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
