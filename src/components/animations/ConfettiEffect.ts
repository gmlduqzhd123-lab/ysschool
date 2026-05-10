'use client';

/**
 * ConfettiEffect - 테마 전환 시 화면 전체에 폭죽 효과를 발생시키는 컴포넌트
 * canvas-confetti 라이브러리를 사용하여 컬러풀한 파티클 애니메이션을 1~2초간 표시
 */

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function fireConfetti() {
  // 양쪽에서 동시에 폭죽 발사
  const count = 150;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      particleCount: Math.floor(count * particleRatio),
      ...opts,
    });
  }

  // 왼쪽에서 발사
  fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.2, y: 0.7 } });
  fire(0.2, { spread: 60, origin: { x: 0.2, y: 0.7 } });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.2, y: 0.7 } });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, origin: { x: 0.2, y: 0.7 } });

  // 오른쪽에서 발사
  fire(0.25, { spread: 26, startVelocity: 55, origin: { x: 0.8, y: 0.7 } });
  fire(0.2, { spread: 60, origin: { x: 0.8, y: 0.7 } });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, origin: { x: 0.8, y: 0.7 } });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, origin: { x: 0.8, y: 0.7 } });
}

export function useConfetti() {
  return useCallback(() => {
    fireConfetti();
  }, []);
}
