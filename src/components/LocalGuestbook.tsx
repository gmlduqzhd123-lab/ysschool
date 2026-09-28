'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, PenLine, Send, Trash2, X } from 'lucide-react';
import { useAdmin } from './AdminContext';

interface GuestEntry {
  id: string | number;
  name: string;
  affiliation: string;
  message: string;
  date: string;
  source: 'local' | 'shared';
}

type GuestbookMode = 'loading' | 'local' | 'shared';

const STORAGE_KEY = 'ysschool-local-guestbook-v2';
const LEGACY_KEY = 'ysschool-guestbook';

function anonymizeName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  return `${trimmed.charAt(0)}${'○'.repeat(trimmed.length - 1)}`;
}

function loadLocalEntries(): GuestEntry[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return (JSON.parse(saved) as Array<Omit<GuestEntry, 'source'>>).map((entry) => ({
        ...entry,
        source: 'local' as const,
      }));
    } catch {}
  }

  const legacy = localStorage.getItem(LEGACY_KEY);
  if (!legacy) return [];

  try {
    const parsed = JSON.parse(legacy) as Array<{
      name?: string;
      affiliation?: string;
      message?: string;
      date?: string;
    }>;

    const migrated: GuestEntry[] = parsed
      .filter((entry) => entry.name && entry.message)
      .slice(0, 20)
      .map((entry, index) => ({
        id: `legacy-${Date.now()}-${index}`,
        name: entry.name ?? '',
        affiliation: entry.affiliation ?? '',
        message: entry.message ?? '',
        date: entry.date ?? new Date().toLocaleDateString('ko-KR'),
        source: 'local',
      }));

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(migrated.map(({ source, ...entry }) => {
        void source;
        return entry;
      })),
    );
    return migrated;
  } catch {
    return [];
  }
}

export default function LocalGuestbook() {
  const { isAdmin } = useAdmin();
  const [mode, setMode] = useState<GuestbookMode>('loading');
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch('/api/guestbook', { cache: 'no-store' });
        const data = await response.json();

        if (data.configured) {
          if (!cancelled) {
            setEntries(Array.isArray(data.items) ? data.items : []);
            setMode('shared');
            if (!response.ok) setFeedback(data.error || '방명록을 불러오지 못했습니다.');
          }
          return;
        }
      } catch {}

      if (!cancelled) {
        setEntries(loadLocalEntries());
        setMode('local');
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistLocal = (next: GuestEntry[]) => {
    setEntries(next);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(next.map(({ source, ...entry }) => {
        void source;
        return entry;
      })),
    );
  };

  const resetForm = () => {
    setName('');
    setAffiliation('');
    setMessage('');
    setWebsite('');
    setShowForm(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setFeedback('');

    if (mode === 'shared') {
      try {
        const response = await fetch('/api/guestbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            affiliation: affiliation.trim(),
            message: message.trim(),
            website,
          }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setFeedback(data.error || '방명록을 저장하지 못했습니다.');
          return;
        }

        if (data.item) setEntries((current) => [data.item, ...current].slice(0, 20));
        resetForm();
      } catch {
        setFeedback('방명록 서버에 연결할 수 없습니다.');
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const newEntry: GuestEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim().slice(0, 20),
      affiliation: affiliation.trim().slice(0, 30),
      message: message.trim().slice(0, 300),
      date: new Date().toLocaleDateString('ko-KR'),
      source: 'local',
    };

    persistLocal([newEntry, ...entries].slice(0, 20));
    resetForm();
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (deleteId == null) return;

    if (mode === 'shared') {
      if (!isAdmin) {
        setDeleteId(null);
        return;
      }

      try {
        const response = await fetch(`/api/guestbook/${deleteId}`, { method: 'DELETE' });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          setFeedback(data.error || '방명록을 삭제하지 못했습니다.');
          return;
        }
        setEntries((current) => current.filter((entry) => entry.id !== deleteId));
      } catch {
        setFeedback('방명록 서버에 연결할 수 없습니다.');
      } finally {
        setDeleteId(null);
      }
      return;
    }

    persistLocal(entries.filter((entry) => entry.id !== deleteId));
    setDeleteId(null);
  };

  const shared = mode === 'shared';

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`rounded-2xl border px-4 py-3 mb-6 text-sm ${
          shared
            ? 'border-emerald-200/70 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
            : 'border-sky-200/70 dark:border-sky-900/60 bg-sky-50/70 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200'
        }`}
      >
        <strong>
          {mode === 'loading'
            ? '방명록을 불러오는 중입니다.'
            : shared
              ? '공개 방명록에 저장됩니다.'
              : '현재는 이 브라우저에만 저장됩니다.'}
        </strong>
        <span className="block mt-1 text-xs opacity-80">
          {shared
            ? '작성한 글은 다른 방문자에게도 표시되며, 스팸 방지를 위해 동일 접속에서는 짧은 시간에 반복 등록할 수 없습니다.'
            : '공유 저장소 설정 전까지는 다른 방문자에게 공개되지 않는 방문 메모로 동작합니다.'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PenLine className="w-5 h-5 text-brand-sky" />
          {shared ? '공개 방명록' : '방문 메모'}
        </h4>
        <button
          onClick={() => setShowForm((value) => !value)}
          disabled={mode === 'loading'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm cursor-pointer text-sm disabled:opacity-50"
          aria-expanded={showForm}
        >
          <Send className="w-4 h-4" />
          글 남기기
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="이름"
                maxLength={20}
                className="flex-shrink-0 sm:w-36 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                required
              />
              <input
                type="text"
                value={affiliation}
                onChange={(event) => setAffiliation(event.target.value)}
                placeholder="소속 (선택)"
                maxLength={30}
                className="flex-shrink-0 sm:w-44 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
              />
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={shared ? '방문자들과 나눌 한마디를 적어주세요' : '이 기기에 남길 메모를 적어주세요'}
                maxLength={300}
                className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                required
              />
              <input
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                이름은 화면에서 자동 익명 처리됩니다. 메시지는 최대 300자입니다.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 px-6 py-2.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl font-bold transition-colors cursor-pointer text-sm disabled:opacity-60"
              >
                {submitting ? '저장 중...' : '저장'}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {feedback && (
        <p className="mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
          {feedback}
        </p>
      )}

      <div className="space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">{shared ? '아직 공개 방명록이 없습니다.' : '이 브라우저에 저장된 방문 메모가 없습니다.'}</p>
          </div>
        ) : (
          entries.slice(0, 20).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index, 5) * 0.05 }}
              className="group flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-bold text-brand-navy dark:text-brand-sky">{entry.name.charAt(0)}</span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{anonymizeName(entry.name)}</span>
                  {entry.affiliation && (
                    <span className="text-xs text-brand-navy/60 dark:text-brand-sky/60 bg-brand-navy/5 dark:bg-brand-sky/10 px-2 py-0.5 rounded-full">
                      {entry.affiliation}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{entry.date}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 break-words">{entry.message}</p>
              </div>
              {(!shared || isAdmin) && (
                <button
                  onClick={() => setDeleteId(entry.id)}
                  className="shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                  aria-label={shared ? '공개 방명록 관리자 삭제' : '방문 메모 삭제'}
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {deleteId != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[260] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-700"
              role="dialog"
              aria-modal="true"
              aria-label="방명록 삭제 확인"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">글 삭제</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {shared ? '관리자 권한으로 공개 방명록에서 삭제합니다.' : '이 브라우저에서 해당 메모를 삭제합니다.'}
                  </p>
                </div>
                <button
                  onClick={() => setDeleteId(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  aria-label="삭제 확인창 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm"
                >
                  취소
                </button>
                <button
                  onClick={() => void handleDelete()}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
