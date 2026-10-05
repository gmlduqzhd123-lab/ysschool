'use client';

import { useEffect, useState, type ReactNode } from 'react';

type YSInstallApi = { open: () => void; installed: () => boolean };

// 📲 앱 설치 버튼: 앱으로 열린 상태가 아니면 언제나 보인다.
// 누르면 크롬·엣지·삼성 인터넷은 설치 창을 바로 띄우고, 아이폰·카카오톡 등은 설치 방법을 안내한다 (public/ys-install.js).
export default function InstallAppButton({ className, label = '📲 앱 설치' }: { className?: string; label?: ReactNode }) {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const check = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    // 설치 여부는 화면이 뜬 뒤에만 알 수 있어서 여기서 한 번 반영한다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInstalled(check());
    const onInstalled = () => setInstalled(true);
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, []);

  if (installed) return null;

  const install = () => {
    const ys = (window as Window & { YSInstall?: YSInstallApi }).YSInstall;
    if (ys) ys.open();
    else alert('브라우저 메뉴에서 "앱 설치" 또는 "홈 화면에 추가"를 선택하세요.');
  };

  return (
    <button type="button" onClick={install} className={className} aria-label="앱 설치">
      {label}
    </button>
  );
}
