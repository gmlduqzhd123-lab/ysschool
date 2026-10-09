'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MessageCircle,
  PenLine,
  Send,
  Trash2,
  X,
  Heart,
  Sparkles,
} from 'lucide-react';
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
const LIKES_STORAGE_KEY = 'ysschool_guestbook_likes_v1';

const ROLE_OPTIONS = [
  { label: '🏫 현직 교사', value: '현직 교사' },
  { label: '🎒 초·중등 학생', value: '학생' },
  { label: '👨‍👩‍👧 학부모', value: '학부모' },
  { label: '✨ 교육 관계자', value: '교육 관계자' },
  { label: '🌱 방문자', value: '방문자' },
];

const QUICK_STICKERS = [
  '👏 수업에 정말 잘 썼어요!',
  '💡 100종 배움게임 아이디어 최고예요!',
  '❤️ 엽쌤의 따뜻한 교육 늘 응원합니다!',
  '🌅 아침 교실 전자칠판 매일 켜두고 있어요!',
  '📚 학생들과 독서 프로젝트 함께 도전합니다!',
];

function anonymizeName(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 1) return trimmed;
  return `${trimmed.charAt(0)}${'○'.repeat(trimmed.length - 1)}`;
}

function getRoleBadgeStyle(affiliation: string) {
  if (affiliation.includes('교사') || affiliation.includes('선생')) {
    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80';
  }
  if (affiliation.includes('학생')) {
    return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80';
  }
  if (affiliation.includes('학부모')) {
    return 'bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300 border-pink-200/80 dark:border-pink-800/80';
  }
  return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/80';
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
  const [selectedRole, setSelectedRole] = useState('현직 교사');
  const [affiliation, setAffiliation] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likesMap, setLikesMap] = useState<Record<string, { count: number; userLiked: boolean }>>({});

  // 1. 공감(하트) 데이터 복원
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(LIKES_STORAGE_KEY);
        if (saved) setLikesMap(JSON.parse(saved));
      } catch {}
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // 2. 방명록 목록 로드
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
    setSelectedRole('현직 교사');
    setAffiliation('');
    setMessage('');
    setWebsite('');
    setShowForm(false);
  };

  // 하트 공감 토글
  const toggleLike = (id: string | number) => {
    const key = String(id);
    setLikesMap((prev) => {
      const current = prev[key] || { count: 0, userLiked: false };
      const nextLiked = !current.userLiked;
      const nextCount = Math.max(0, current.count + (nextLiked ? 1 : -1));
      const nextMap = {
        ...prev,
        [key]: { count: nextCount, userLiked: nextLiked },
      };
      try {
        localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(nextMap));
      } catch {}
      return nextMap;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setFeedback('');

    // 역할 뱃지와 소속 결합
    const finalAffiliation = affiliation.trim()
      ? `${selectedRole} · ${affiliation.trim()}`
      : selectedRole;

    if (mode === 'shared') {
      try {
        const response = await fetch('/api/guestbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            affiliation: finalAffiliation,
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
      affiliation: finalAffiliation.slice(0, 40),
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
            ? '전국의 선생님, 학생, 방문자들과 따뜻한 한마디를 나눠보세요! (이름은 자동 익명 처리됩니다)'
            : '공유 저장소 설정 전까지는 다른 방문자에게 공개되지 않는 방문 메모로 동작합니다.'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PenLine className="w-5 h-5 text-brand-sky" />
          {shared ? '공개 방명록 & 응원 한마디' : '방문 메모'}
        </h4>
        <button
          type="button"
          onClick={() => setShowForm((value) => !value)}
          disabled={mode === 'loading'}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-sm disabled:opacity-50"
          aria-expanded={showForm}
        >
          <Send className="w-4 h-4" />
          한마디 남기기
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 sm:p-6 mb-8 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden space-y-4"
          >
            {/* 1. 역할 뱃지 선택 */}
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
                방문자 역할을 선택해주세요:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ROLE_OPTIONS.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRole === role.value
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-[1.02]'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 이름 및 상세 소속 입력 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="이름 (예: 김선생, 박학생)"
                maxLength={20}
                className="flex-shrink-0 sm:w-48 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
                required
              />
              <input
                type="text"
                value={affiliation}
                onChange={(event) => setAffiliation(event.target.value)}
                placeholder="상세 학교/기관 (선택, 예: 서울초)"
                maxLength={30}
                className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm"
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

            {/* 3. 원클릭 빠른 응원 스티커 칩 */}
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  원클릭 빠른 응원 문구 (클릭 시 자동 입력):
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_STICKERS.map((sticker, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(sticker)}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/60 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. 메시지 본문 */}
            <div>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={shared ? '따뜻한 한마디나 수업 활용 후기를 자유롭게 적어주세요!' : '이 기기에 남길 메모를 적어주세요'}
                maxLength={300}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-brand-sky transition-colors text-sm resize-none"
                required
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                🔒 이름은 자동 익명 처리(예: 홍○동)되어 안전하게 게시됩니다.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl font-bold transition-all shadow-md cursor-pointer text-sm disabled:opacity-60"
              >
                {submitting ? '등록 중...' : '방명록 등록'}
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

      {/* 등록된 방명록 카드 리스트 */}
      <div className="space-y-3.5">
        {entries.length === 0 ? (
          <div className="text-center py-10 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500">
            <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">{shared ? '아직 등록된 방명록이 없습니다.' : '이 브라우저에 저장된 방문 메모가 없습니다.'}</p>
            <p className="text-xs mt-1 text-slate-400">첫 번째로 따뜻한 응원의 한마디를 남겨보세요!</p>
          </div>
        ) : (
          entries.slice(0, 20).map((entry, index) => {
            const entryLikes = likesMap[String(entry.id)] || { count: 0, userLiked: false };

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index, 5) * 0.05 }}
                className="group p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-navy to-brand-sky text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {entry.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {anonymizeName(entry.name)}
                        </span>
                        {entry.affiliation && (
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getRoleBadgeStyle(entry.affiliation)}`}>
                            {entry.affiliation}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">{entry.date}</span>
                    </div>
                  </div>

                  {(!shared || isAdmin) && (
                    <button
                      type="button"
                      onClick={() => setDeleteId(entry.id)}
                      className="shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                      aria-label={shared ? '공개 방명록 관리자 삭제' : '방문 메모 삭제'}
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 메시지 내용 */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-words pl-12">
                  {entry.message}
                </p>

                {/* 하단 공감(좋아요) 리액션 바 */}
                <div className="flex items-center justify-end pt-2 border-t border-slate-100 dark:border-slate-700/60 pl-12">
                  <button
                    type="button"
                    onClick={() => toggleLike(entry.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                      entryLikes.userLiked
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-800 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300 hover:text-rose-500'
                    }`}
                    title="이 글에 공감 및 응원 보내기"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                        entryLikes.userLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                      }`}
                    />
                    <span>공감 {entryLikes.count}</span>
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* 삭제 확인 모달 */}
      <AnimatePresence>
        {deleteId != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[260] bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs"
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
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  aria-label="삭제 확인창 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm"
                >
                  취소
                </button>
                <button
                  type="button"
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
