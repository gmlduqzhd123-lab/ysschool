'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, MapPin, Clock, Users, Plus, X, Lock, Trash2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ScheduleEvent {
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  time: string;
  target: string;
  type: 'training' | 'lecture' | 'performance' | 'consulting';
}

const defaultEvents: ScheduleEvent[] = [
  { date: '2026-08-14', title: '전남교육청 에듀테크 활용 연수', location: '전남교육연수원', time: '09:00-16:00', target: '초등교사', type: 'training' },
  { date: '2026-08-21', title: '독서인문교육 워크숍', location: '여수교육지원청', time: '14:00-17:00', target: '초등교사', type: 'training' },
  { date: '2026-08-28', title: 'AI 디지털 선도학교 컨설팅', location: '순천 OO초등학교', time: '10:00-12:00', target: '학교 교직원', type: 'consulting' },
  { date: '2026-09-05', title: '아카라카 정기 공연', location: '여수 예울마루', time: '19:00-21:00', target: '일반 관람', type: 'performance' },
  { date: '2026-09-12', title: '발명영재교육 심화과정', location: '전남발명교육센터', time: '09:00-15:00', target: '영재학생', type: 'training' },
  { date: '2026-09-20', title: '에듀테크 크리에이터 특강', location: '광주교육대학교', time: '14:00-16:00', target: '예비교사', type: 'lecture' },
  { date: '2026-10-10', title: '학생 저자 북토크', location: '여수시립도서관', time: '15:00-17:00', target: '학생·학부모', type: 'lecture' },
  { date: '2026-10-25', title: '글로-CAL 교육과정 연수', location: '전남교육연수원', time: '09:00-16:00', target: '초등교사', type: 'training' },
];

const typeColors: Record<string, { bg: string; text: string; dot: string }> = {
  training: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
  lecture: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
  performance: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
  consulting: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
};

const typeLabels: Record<string, string> = {
  training: '연수',
  lecture: '강연',
  performance: '공연',
  consulting: '컨설팅',
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS_KR = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const ADMIN_PASSWORD = '1234';

export default function ScheduleCalendar() {
  const { t } = useLanguage();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Events state (localStorage + default)
  const [customEvents, setCustomEvents] = useState<ScheduleEvent[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem('ysschool-schedule');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        requestAnimationFrame(() => setCustomEvents(parsed));
      } catch {}
    }
  }, []);
  const allEvents = useMemo(() => [...defaultEvents, ...customEvents], [customEvents]);

  // Add form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [addPassword, setAddPassword] = useState('');
  const [addPasswordError, setAddPasswordError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<ScheduleEvent>>({
    date: '', title: '', location: '', time: '', target: '', type: 'training',
  });

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<{ date: string; idx: number } | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDate(null);
  };

  const dateStr = (day: number) => `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const eventsForDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    allEvents.forEach(ev => {
      if (!map[ev.date]) map[ev.date] = [];
      map[ev.date].push(ev);
    });
    return map;
  }, [allEvents]);

  const selectedEvents = selectedDate ? (eventsForDate[selectedDate] || []) : [];

  // Password verification for add
  const handlePasswordSubmit = () => {
    if (addPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAddPasswordError(false);
      // Pre-fill date if a date is selected
      if (selectedDate) {
        setNewEvent(prev => ({ ...prev, date: selectedDate }));
      }
    } else {
      setAddPasswordError(true);
    }
  };

  // Add event
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.title || !newEvent.location || !newEvent.time || !newEvent.target) return;

    const event: ScheduleEvent = {
      date: newEvent.date!,
      title: newEvent.title!,
      location: newEvent.location!,
      time: newEvent.time!,
      target: newEvent.target!,
      type: (newEvent.type as ScheduleEvent['type']) || 'training',
    };

    const updated = [...customEvents, event];
    setCustomEvents(updated);
    localStorage.setItem('ysschool-schedule', JSON.stringify(updated));

    // Reset
    setShowAddForm(false);
    setIsAuthenticated(false);
    setAddPassword('');
    setNewEvent({ date: '', title: '', location: '', time: '', target: '', type: 'training' });
    setSelectedDate(event.date);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setIsAuthenticated(false);
    setAddPassword('');
    setAddPasswordError(false);
    setNewEvent({ date: '', title: '', location: '', time: '', target: '', type: 'training' });
  };

  // Delete event
  const handleDelete = () => {
    if (deletePassword === ADMIN_PASSWORD && deleteTarget) {
      const eventToDelete = eventsForDate[deleteTarget.date]?.[deleteTarget.idx];
      if (eventToDelete) {
        // Only delete from custom events
        const updatedCustom = customEvents.filter(
          ev => !(ev.date === eventToDelete.date && ev.title === eventToDelete.title && ev.time === eventToDelete.time)
        );
        setCustomEvents(updatedCustom);
        localStorage.setItem('ysschool-schedule', JSON.stringify(updatedCustom));
      }
      setDeleteTarget(null);
      setDeletePassword('');
      setDeleteError(false);
    } else {
      setDeleteError(true);
    }
  };

  const isCustomEvent = (ev: ScheduleEvent) => {
    return customEvents.some(c => c.date === ev.date && c.title === ev.title && c.time === ev.time);
  };

  return (
    <section id="schedule" className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Schedule</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t('연수 & 강연 일정', 'Training & Lecture Schedule')}
          </h3>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 break-keep">
            {t('예정된 연수, 강연, 공연 일정을 확인하세요.', 'Check upcoming training, lectures, and performances.')}
          </p>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {Object.entries(typeLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${typeColors[key].dot}`} />
                <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                {viewYear}년 {MONTHS_KR[viewMonth]}
              </h4>
              <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d, i) => (
                <div key={d} className={`text-center text-sm font-bold py-2 ${i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const ds = dateStr(day);
                const hasEvents = !!eventsForDate[ds];
                const isToday = ds === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                const isSelected = ds === selectedDate;
                const dayOfWeek = (firstDayOfWeek + i) % 7;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(ds)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer relative ${
                      isSelected
                        ? 'bg-brand-navy text-white shadow-lg'
                        : isToday
                        ? 'bg-brand-sky/20 text-brand-navy dark:text-brand-sky font-bold ring-2 ring-brand-sky/50'
                        : hasEvents
                        ? 'hover:bg-slate-100 dark:hover:bg-slate-700'
                        : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    } ${dayOfWeek === 0 && !isSelected ? 'text-red-400' : ''} ${dayOfWeek === 6 && !isSelected ? 'text-blue-400' : ''}`}
                  >
                    {day}
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {eventsForDate[ds].map((ev, ei) => (
                          <div key={ei} className={`w-1.5 h-1.5 rounded-full ${typeColors[ev.type].dot}`} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-sky" />
                {selectedDate ? `${parseInt(selectedDate.split('-')[1])}월 ${parseInt(selectedDate.split('-')[2])}일` : '일정 상세'}
              </h4>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                일정 추가
              </button>
            </div>

            {selectedEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedEvents.map((ev, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative p-4 rounded-2xl ${typeColors[ev.type].bg} border border-slate-100 dark:border-slate-700`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColors[ev.type].text} bg-white/50 dark:bg-slate-800/50`}>
                        {typeLabels[ev.type]}
                      </span>
                      {isCustomEvent(ev) && (
                        <button
                          onClick={() => { setDeleteTarget({ date: ev.date, idx }); setDeletePassword(''); setDeleteError(false); }}
                          className="p-1 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-3 break-keep">{ev.title}</h5>
                    <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" />{ev.time}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" />{ev.location}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4 shrink-0" />{ev.target}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{selectedDate ? '이 날에 예정된 일정이 없습니다.' : '날짜를 선택하면 상세 일정을 확인할 수 있습니다.'}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={closeAddForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-navy to-brand-sky px-6 py-4 flex items-center justify-between">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  일정 추가
                </h4>
                <button onClick={closeAddForm} className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isAuthenticated ? (
                /* Password Step */
                <div className="p-6">
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 rounded-full bg-brand-navy/10 dark:bg-brand-sky/10 flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-7 h-7 text-brand-navy dark:text-brand-sky" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">일정을 추가하려면 관리자 비밀번호를 입력하세요.</p>
                  </div>
                  <input
                    type="password"
                    value={addPassword}
                    onChange={e => { setAddPassword(e.target.value); setAddPasswordError(false); }}
                    onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
                    placeholder="비밀번호"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 outline-none text-sm text-center tracking-widest ${
                      addPasswordError ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-brand-sky'
                    } transition-colors`}
                    autoFocus
                  />
                  {addPasswordError && (
                    <p className="text-xs text-red-500 text-center mt-2">비밀번호가 일치하지 않습니다.</p>
                  )}
                  <button
                    onClick={handlePasswordSubmit}
                    className="w-full mt-4 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-bold text-sm transition-colors cursor-pointer"
                  >
                    확인
                  </button>
                </div>
              ) : (
                /* Event Form */
                <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">날짜 *</label>
                    <input
                      type="date"
                      value={newEvent.date || ''}
                      onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm outline-none focus:border-brand-sky transition-colors"
                      required
                    />
                  </div>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">일정 제목 *</label>
                    <input
                      type="text"
                      value={newEvent.title || ''}
                      onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="예: 전남교육청 에듀테크 연수"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-sky transition-colors"
                      required
                    />
                  </div>
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">유형 *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(typeLabels).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setNewEvent(prev => ({ ...prev, type: key as ScheduleEvent['type'] }))}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            newEvent.type === key
                              ? `${typeColors[key].bg} ${typeColors[key].text} ring-2 ring-current`
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full ${typeColors[key].dot}`} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Time & Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">시간 *</label>
                      <input
                        type="text"
                        value={newEvent.time || ''}
                        onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        placeholder="09:00-16:00"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-sky transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">대상 *</label>
                      <input
                        type="text"
                        value={newEvent.target || ''}
                        onChange={e => setNewEvent(prev => ({ ...prev, target: e.target.value }))}
                        placeholder="초등교사"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-sky transition-colors"
                        required
                      />
                    </div>
                  </div>
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">장소 *</label>
                    <input
                      type="text"
                      value={newEvent.location || ''}
                      onChange={e => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="전남교육연수원"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm outline-none focus:border-brand-sky transition-colors"
                      required
                    />
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-navy to-brand-sky text-white font-bold text-sm hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    일정 등록하기
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-3">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">일정 삭제</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">삭제하려면 비밀번호를 입력하세요.</p>
              </div>
              <input
                type="password"
                value={deletePassword}
                onChange={e => { setDeletePassword(e.target.value); setDeleteError(false); }}
                onKeyDown={e => e.key === 'Enter' && handleDelete()}
                placeholder="비밀번호"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 outline-none text-sm text-center tracking-widest ${
                  deleteError ? 'border-red-400' : 'border-slate-200 dark:border-slate-700 focus:border-brand-sky'
                } transition-colors`}
                autoFocus
              />
              {deleteError && (
                <p className="text-xs text-red-500 text-center mt-2">비밀번호가 일치하지 않습니다.</p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(false); }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
