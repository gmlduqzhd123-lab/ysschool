'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, PenLine, Send, Trash2, X } from 'lucide-react';

interface LocalGuestEntry {
  id: string;
  name: string;
  affiliation: string;
  message: string;
  date: string;
}

const STORAGE_KEY = 'ysschool-local-guestbook-v2';
const LEGACY_KEY = 'ysschool-guestbook';

function anonymizeName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  return `${trimmed.charAt(0)}${'○'.repeat(trimmed.length - 1)}`;
}

export default function LocalGuestbook() {
  const [entries, setEntries] = useState<LocalGuestEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as LocalGuestEntry[];
        requestAnimationFrame(() => setEntries(parsed));
      } catch {}
      return;
    }

    // 기존 로컬 방명록이 있으면 비밀번호 정보는 버리고 방문 메모 형식으로 1회 이전합니다.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return;

    try {
      const parsed = JSON.parse(legacy) as Array<{
        name?: string;
        affiliation?: string;
        message?: string;
        date?: string;
      }>;

      const migrated = parsed
        .filter((entry) => entry.name && entry.message)
        .slice(0, 20)
        .map((entry, index) => ({
          id: `legacy-${Date.now()}-${index}`,
          name: entry.name ?? '',
          affiliation: entry.affiliation ?? '',
          message: entry.message ?? '',
          date: entry.date ?? new Date().toLocaleDateString('ko-KR'),
        }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      requestAnimationFrame(() => setEntries(migrated));
    } catch {}
  }, []);

  const persist = (next: LocalGuestEntry[]) => {
    setEntries(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: LocalGuestEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim().slice(0, 20),
      affiliation: affiliation.trim().slice(0, 30),
      message: message.trim().slice(0, 300),
      date: new Date().toLocaleDateString('ko-KR'),
    };

    persist([newEntry, ...entries].slice(0, 20));
    setName('');
    setAffiliation('');
    setMessage('');
    setShowForm(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    persist(entries.filter((entry) => entry.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-sky-200/70 dark:border-sky-900/60 bg-sky-50/70 dark:bg-sky-950/20 px-4 py-3 mb-6 text-sm text-sky-900 dark:text-sky-200">
        <strong>방문 메모는 이 브라우저에만 저장됩니다.</strong>
        <span className="block mt-1 text-xs opacity-80">
          다른 방문자에게 공개되지 않습니다. 공개형 방명록은 서버 저장 기능을 연결한 뒤 제공할 예정입니다.
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PenLine className="w-5 h-5 text-brand-sky" />
          방문 메모
        </h4>
        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-xl font-semibold transition-all duration-300 shadow-sm cursor-pointer text-sm"
          aria-expanded={showForm}
        >
          <Send className="w-4 h-4" />
          메모 남기기
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
                placeholder="이 기기에 남길 메모를 적어주세요"
                maxLength={300}
                className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                이름은 화면에서 자동 익명 처리됩니다. 최대 20개의 메모를 보관합니다.
              </p>
              <button
                type="submit"
                className="shrink-0 px-6 py-2.5 bg-brand-sky hover:bg-brand-sky/80 text-slate-900 rounded-xl font-bold transition-colors cursor-pointer text-sm"
              >
                저장
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">이 브라우저에 저장된 방문 메모가 없습니다.</p>
          </div>
        ) : (
          entries.slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-sm font-bold text-brand-navy dark:text-brand-sky">
                  {entry.name.charAt(0)}
                </span>
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
              <button
                onClick={() => setDeleteId(entry.id)}
                className="shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                aria-label="방문 메모 삭제"
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
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
              aria-label="방문 메모 삭제 확인"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">방문 메모 삭제</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">이 브라우저에서 해당 메모를 삭제합니다.</p>
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
                  onClick={handleDelete}
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
