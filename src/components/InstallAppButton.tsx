'use client';

import { useEffect, useState } from 'react';

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// 📲 앱 설치 버튼: 설치할 수 있는 브라우저(크롬·엣지·삼성 인터넷, 아이폰 Safari)에서만 보인다.
export default function InstallAppButton({ className }: { className?: string }) {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const ios =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const installed =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setIsIos(false);
    };
    // 브라우저 정보는 화면이 뜬 뒤에만 알 수 있어서 여기서 한 번 반영한다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIos(ios && !installed);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!deferred && !isIos) return null;

  const install = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
    } else {
      alert('Safari 아래쪽 공유 버튼(□↑)을 누른 뒤 "홈 화면에 추가"를 선택하세요.');
    }
  };

  return (
    <button type="button" onClick={install} className={className}>
      📲 앱 설치
    </button>
  );
}
