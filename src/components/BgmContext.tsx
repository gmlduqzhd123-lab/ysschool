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

  // 1. 초기 볼륨 복원
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

  // 2. 첫 접속 시 자동 재생 처리 (브라우저 Autoplay 보안 정책 완벽 대응)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 현재 세션에서 사용자가 직접 일시정지한 적이 없다면 자동 재생
    const isManuallyMuted = sessionStorage.getItem('ys_bgm_disabled') === 'true';
    if (isManuallyMuted) return;

    let hasStarted = false;

    const tryAutoPlay = async () => {
      if (hasStarted || !audio) return;
      try {
        await audio.play();
        hasStarted = true;
        setIsPlaying(true);
        cleanupGestureListeners();
      } catch {
        // 브라우저 첫 사용자 제스처 대기
      }
    };

    const handleFirstGesture = () => {
      tryAutoPlay();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
    };

    // 즉시 자동 재생 시도 (정책 허용 환경 대응)
    tryAutoPlay();

    // 첫 인터랙션(화면 클릭/터치/스크롤/키입력) 시 즉시 자동 재생
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });

    return () => {
      cleanupGestureListeners();
    };
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
      sessionStorage.removeItem('ys_bgm_disabled');
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn('BGM 재생 실패:', err);
      setIsPlaying(false);
    }
  }, [volume]);

  const pauseBgm = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
    sessionStorage.setItem('ys_bgm_disabled', 'true');
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
        autoPlay
        loop
        preload="auto"
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
