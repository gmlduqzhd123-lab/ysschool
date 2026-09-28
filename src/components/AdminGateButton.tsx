'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LockKeyhole, LogOut, ShieldCheck, X } from 'lucide-react';
import { useAdmin } from './AdminContext';

interface AdminGateButtonProps {
  label: string;
  onAuthorized: () => void;
  className?: string;
  compact?: boolean;
}

export default function AdminGateButton({
  label,
  onAuthorized,
  className = '',
  compact = false,
}: AdminGateButtonProps) {
  const { loading, authConfigured, contentStoreConfigured, isAdmin, login, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleClick = () => {
    if (isAdmin) {
      onAuthorized();
      return;
    }
    setError('');
    setPassword('');
    setOpen(true);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!password.trim()) return;
    setSubmitting(true);
    setError('');
    const result = await login(password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || '로그인에 실패했습니다.');
      return;
    }

    setOpen(false);
    setPassword('');
    onAuthorized();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={className}
        title={isAdmin ? '관리자 권한으로 실행' : '관리자 로그인 필요'}
      >
        {isAdmin ? <ShieldCheck className={compact ? 'w-3.5 h-3.5' : 'w-5 h-5'} /> : <LockKeyhole className={compact ? 'w-3.5 h-3.5' : 'w-5 h-5'} />}
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="관리자 로그인"
              className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">관리자 로그인</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    자료와 일정을 공유 저장소에 변경할 때만 필요합니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="관리자 로그인 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!authConfigured ? (
                <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 text-sm text-amber-800 dark:text-amber-200">
                  관리자 인증 환경이 아직 연결되지 않았습니다. 서버 환경변수 설정이 완료되면 이 화면에서 바로 로그인할 수 있습니다.
                </div>
              ) : (
                <form onSubmit={handleLogin}>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2" htmlFor="ysschool-admin-password">
                    관리자 비밀번호
                  </label>
                  <input
                    id="ysschool-admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-brand-sky"
                    autoFocus
                  />
                  {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                  {!contentStoreConfigured && (
                    <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">
                      로그인은 가능하지만 공유 저장소 설정이 끝나기 전에는 서버 저장이 비활성화됩니다.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-4 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-bold disabled:opacity-60"
                  >
                    {submitting ? '확인 중...' : '로그인'}
                  </button>
                </form>
              )}

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => { void logout(); setOpen(false); }}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  관리자 로그아웃
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
