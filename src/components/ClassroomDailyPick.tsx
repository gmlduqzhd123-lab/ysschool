'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Lightbulb,
  ArrowRight,
  Copy,
  Check,
  QrCode,
  Flame,
  Clock,
  Compass,
  Sparkles,
} from 'lucide-react';
import { learningGamesData, LearningGame } from '@/data/learningGamesData';
import { yscodeApps } from '@/data/yscodeData';

// 31가지 매일 바뀌는 아침 교실 생각거리 (Question of the Day)
const DAILY_QUESTIONS = [
  '만약 오늘 하루 우리 반 모두에게 초능력이 하나 생긴다면 어떤 능력이 좋을까요?',
  '우리 반 친구 중 오늘 가장 고마운 마음을 전하고 싶은 친구는 누구인가요?',
  '오늘 하루 내가 꼭 지키고 싶은 나만의 다짐 한 가지는 무엇인가요?',
  '요즘 나를 가장 기분 좋게 만드는 취미나 관심사는 무엇인가요?',
  '만약 타임머신을 타고 과거로 갈 수 있다면 누구를 만나보고 싶나요?',
  '실패해도 괜찮았던 나의 도전 경험이 있나요? 그때 무엇을 배웠나요?',
  '만약 새로운 학교 교칙을 하나 만들 수 있다면 무엇을 정하고 싶나요?',
  '오늘 급식 메뉴 중 가장 기대되는 것은 무엇인가요? 이유는?',
  '친구에게 들었을 때 가장 힘이 났던 따뜻한 말 한마디는?',
  '세상에 없는 새로운 발명품을 만든다면 어떤 문제를 해결하고 싶나요?',
  '내가 좋아하는 책이나 영화 속 주인공 중 하루 동안 닮고 싶은 인물은?',
  '우리 교실을 더 행복한 공간으로 만들기 위해 내가 할 수 있는 작은 행동은?',
  '어려운 문제를 만났을 때 나만의 극복 방법이나 기분 전환 팁은?',
  '만약 동물과 대화할 수 있다면 어떤 동물에게 무슨 말을 묻고 싶나요?',
  '오늘 하루 짝꿍이나 주변 친구를 위해 베풀 수 있는 작은 친절은?',
  '나에게 만 원이 주어진다면 나 자신과 다른 사람을 위해 어떻게 쓸까요?',
  '지금까지 배운 수업 내용 중 가장 신기하거나 기억에 남는 것은?',
  '10년 뒤의 나에게 한 문장의 응원 메시지를 보낸다면?',
  '만약 우주여행을 떠난다면 지구에서 꼭 가져가고 싶은 물건 3가지는?',
  '내가 가장 집중이 잘 되는 시간과 장소는 언제, 어디인가요?',
  '우리 반 친구들의 공통점 3가지를 찾는다면 무엇일까요?',
  '화가 나거나 속상할 때 내 마음을 차분하게 가라앉히는 나만의 비법은?',
  '계절의 변화를 느끼는 나만의 순간은 언제인가요?',
  '만약 하루 동안 선생님이 된다면 우리 반과 어떤 특별한 수업을 하고 싶나요?',
  '최근에 다른 사람을 도와주고 뿌듯했던 기억이 있나요?',
  '내가 생각하는 "진정한 친구"란 어떤 친구인가요?',
  '세상에서 가장 아름다운 소리는 무엇이라고 생각하나요?',
  '오늘 하루 수업 시간에 가장 적극적으로 참여하고 싶은 과목은?',
  '나에게 슈퍼 컴퓨터가 생긴다면 AI로 무엇을 만들어보고 싶나요?',
  '오늘 하루를 색깔 하나로 표현한다면 어떤 색깔로 칠하고 싶나요?',
  '오늘 하루를 마치고 잠들 때 어떤 기분으로 하루를 마무리하고 싶나요?',
];

interface ClassroomDailyPickProps {
  onOpenPinModal?: (game: LearningGame) => void;
}

export default function ClassroomDailyPick({ onOpenPinModal }: ClassroomDailyPickProps) {
  const [recentGames, setRecentGames] = useState<LearningGame[]>([]);
  const [copiedQuestion, setCopiedQuestion] = useState(false);

  // 날짜 기반 결정론적 추천 (매일 자동 변경)
  const { todayGame, todayApp, todayQuestion } = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );

    const game =
      learningGamesData.length > 0
        ? learningGamesData[Math.abs(dayOfYear * 7 + today.getDate()) % learningGamesData.length]
        : null;

    const app =
      yscodeApps.length > 0
        ? yscodeApps[Math.abs(dayOfYear * 3 + today.getDate()) % yscodeApps.length]
        : null;

    const q = DAILY_QUESTIONS[today.getDate() % DAILY_QUESTIONS.length];

    return { todayGame: game, todayApp: app, todayQuestion: q };
  }, []);

  // 최근 플레이한 게임 불러오기
  useEffect(() => {
    try {
      const savedRecent = localStorage.getItem('ys_recent_games');
      if (savedRecent) {
        const parsed: string[] = JSON.parse(savedRecent);
        const games = parsed
          .map((pin) => learningGamesData.find((g) => g.pin === pin))
          .filter((g): g is LearningGame => Boolean(g))
          .slice(0, 3);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecentGames(games);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCopyQuestion = async () => {
    if (!todayQuestion) return;
    try {
      await navigator.clipboard.writeText(`[오늘의 아침 생각거리]\n💡 ${todayQuestion}`);
      setCopiedQuestion(true);
      setTimeout(() => setCopiedQuestion(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleGameLaunch = (game: LearningGame) => {
    try {
      const savedRecent = localStorage.getItem('ys_recent_games');
      const pins: string[] = savedRecent ? JSON.parse(savedRecent) : [];
      const updated = [game.pin, ...pins.filter((p) => p !== game.pin)].slice(0, 5);
      localStorage.setItem('ys_recent_games', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
      {/* 1. 오늘의 교실 아침 생각거리 배너 */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-200/60 dark:border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-full">
                오늘의 1일 1생각
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                아침 자습 & 학급 자치 대화거리
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
              &ldquo;{todayQuestion}&rdquo;
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyQuestion}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          {copiedQuestion ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>복사 완료!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>질문 복사</span>
            </>
          )}
        </button>
      </div>

      {/* 2. 오늘의 배움게임 픽 & 추천 웹앱 픽 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 오늘의 추천 배움게임 */}
        {todayGame && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-black tracking-wide">
                  <Flame className="w-3.5 h-3.5 text-emerald-500" />
                  <span>오늘의 배움게임 PICK</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] font-extrabold">
                  PIN: {todayGame.pin}
                </span>
              </div>

              <div className="flex items-start gap-3 mt-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 shadow-sm border border-slate-200/70 dark:border-slate-600 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  {todayGame.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-brand-sky/15 text-brand-navy dark:text-brand-sky">
                      {todayGame.subject}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      {todayGame.gradeLabel}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                    {todayGame.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {todayGame.description}
                  </p>
                </div>
              </div>

              <div className="mt-3 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{todayGame.curriculumUnit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href={todayGame.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGameLaunch(todayGame)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>지금 3분 플레이</span>
              </a>

              {onOpenPinModal && (
                <button
                  type="button"
                  onClick={() => onOpenPinModal(todayGame)}
                  className="flex items-center gap-1 py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                  title="학생 QR 코드 띄우기"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR 띄우기</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 오늘의 추천 에듀테크 도구 / 웹앱 */}
        {todayApp && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between hover:border-purple-500/40 transition-colors group">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-700 dark:text-purple-300 text-[11px] font-black tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>오늘의 수업 도구 PICK</span>
                </span>
                <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">
                  YScode 웹앱
                </span>
              </div>

              <div className="flex items-start gap-3 mt-3">
                <div
                  className="w-12 h-12 rounded-2xl shadow-sm border border-slate-200/70 dark:border-slate-600 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: `${todayApp.accent}15` }}
                >
                  {todayApp.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                      {todayApp.category}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
                      설치 없이 바로 실행
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                    {todayApp.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {todayApp.desc}
                  </p>
                </div>
              </div>

              {todayApp.tip && (
                <div className="mt-3 px-3 py-1.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 text-[11px] text-purple-800 dark:text-purple-300 flex items-start gap-1.5">
                  <span className="font-extrabold shrink-0">💡 활용 팁:</span>
                  <span className="line-clamp-2">{todayApp.tip}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <a
                href={todayApp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-sm transition-colors cursor-pointer"
              >
                <span>웹앱 바로 실행하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 3. 최근 플레이한 게임 빠른 이어하기 바 (재방문 사용자용) */}
      {recentGames.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4 text-brand-sky" />
            <span>최근에 한 배움게임 바로 이어하기:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {recentGames.map((game) => (
              <a
                key={game.id}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGameLaunch(game)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 text-xs font-extrabold shadow-sm border border-slate-200 dark:border-slate-600 transition-all cursor-pointer group"
              >
                <span>{game.icon}</span>
                <span>{game.title}</span>
                <span className="text-[10px] opacity-70 font-mono">({game.pin})</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
