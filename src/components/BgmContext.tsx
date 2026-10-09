'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';

interface BgmContextType {
  isPlaying: boolean;
  volume: number;
  toggleBgm: () => void;
  playBgm: () => Promise<void>;
  pauseBgm: () => void;
  setVolume: (vol: number) => void;
  title: string;
}

const BgmContext = createContext<BgmContextType>({
  isPlaying: false,
  volume: 0.4,
  toggleBgm: () => {},
  playBgm: async () => {},
  pauseBgm: () => {},
  setVolume: () => {},
  title: '엽쌤스쿨 배경음악',
});

export function BgmProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 초기화 및 볼륨 복원
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedVol = localStorage.getItem('ys_bgm_volume');
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          setVolumeState(parsed);
          if (audioRef.current) audioRef.current.volume = parsed;
        }
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    localStorage.setItem('ys_bgm_volume', clamped.toString());
  }, []);

  const playBgm = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('BGM 자동 재생 차단 또는 실패:', err);
      setIsPlaying(false);
    }
  }, [volume]);

  const pauseBgm = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggleBgm = useCallback(() => {
    if (isPlaying) {
      pauseBgm();
    } else {
      playBgm();
    }
  }, [isPlaying, pauseBgm, playBgm]);

  return (
    <BgmContext.Provider
      value={{
        isPlaying,
        volume,
        toggleBgm,
        playBgm,
        pauseBgm,
        setVolume,
        title: '엽쌤스쿨 배경음악',
      }}
    >
      {/* 전역 지속 오디오 엘리먼트 (페이지 이동 시에도 끊김 없음) */}
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {children}
    </BgmContext.Provider>
  );
}

export function useBgm() {
  return useContext(BgmContext);
}
