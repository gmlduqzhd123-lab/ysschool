'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md text-center">
        <p className="text-5xl mb-4" aria-hidden="true">🛠️</p>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          일시적인 문제가 발생했어요
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          잠시 후 다시 시도해주세요. 문제가 계속되면 gmlduqzhd@naver.com 으로 알려주세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-2xl bg-brand-navy hover:bg-brand-sky text-white font-bold px-6 py-3 transition-colors cursor-pointer"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold px-6 py-3 hover:border-brand-sky transition-colors"
          >
            홈으로 가기
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-slate-500">오류 코드: {error.digest}</p>
        )}
      </div>
    </main>
  );
}
