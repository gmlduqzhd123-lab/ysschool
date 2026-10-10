'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Search,
  Settings,
  RefreshCw,
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Info,
  X,
} from 'lucide-react';

export interface SchoolProfile {
  officeCode: string;
  schoolCode: string;
  schoolName: string;
  region?: string;
  address?: string;
}

export interface DishItem {
  name: string;
  allergy: string[];
  raw: string;
}

export interface FormattedMeal {
  date: string;
  formattedDate: string;
  mealType: string;
  calories: string;
  dishes: DishItem[];
  rawDishes: string;
}

interface SchoolSearchResult {
  officeCode: string;
  officeName: string;
  schoolCode: string;
  schoolName: string;
  schoolType: string;
  location: string;
  address: string;
}

interface MorningSchoolMealCardProps {
  themeStyles: {
    cardBg: string;
    accentText: string;
    buttonBg: string;
    activeBtn: string;
    headerText: string;
    chalkBorder: string;
  };
}

// 기본 추천 학교 (기본값: 여수한려초등학교)
const QUICK_SAMPLE_SCHOOLS: SchoolProfile[] = [
  {
    officeCode: 'Q10',
    schoolCode: '8512038',
    schoolName: '여수한려초등학교',
    region: '전남 여수',
    address: '전남 여수시 여문1로 80',
  },
  {
    officeCode: 'Q10',
    schoolCode: '8512030',
    schoolName: '여수북초등학교',
    region: '전남 여수',
    address: '전남 여수시 망양로 306',
  },
  {
    officeCode: 'B10',
    schoolCode: '7021151',
    schoolName: '서울대도초등학교',
    region: '서울 강남',
    address: '서울특별시 강남구 도곡로 416',
  },
  {
    officeCode: 'C10',
    schoolCode: '7150119',
    schoolName: '부산해운대초등학교',
    region: '부산 해운대',
    address: '부산광역시 해운대구 중동2로 12',
  },
  {
    officeCode: 'F10',
    schoolCode: '7380196',
    schoolName: '광주수완초등학교',
    region: '광주 광산',
    address: '광주광역시 광산구 수완로 106',
  },
];

// 전자칠판 급식 글씨 크기 3단계 프리셋 (기본 '크게' - 화면에 시원하게 꽉 차도록 대형 폰트 및 높이 적용)
const MEAL_FONT_SIZES = [
  {
    name: '보통',
    dishText: 'text-base sm:text-lg lg:text-xl font-bold',
    emojiText: 'text-2xl sm:text-3xl',
    padding: 'p-3 sm:p-3.5',
    minHeight: 'min-h-[58px] sm:min-h-[66px]',
  },
  {
    name: '크게',
    dishText: 'text-lg sm:text-xl lg:text-2xl font-black',
    emojiText: 'text-3xl sm:text-4xl',
    padding: 'p-3.5 sm:p-4.5',
    minHeight: 'min-h-[66px] sm:min-h-[76px]',
  },
  {
    name: '특대',
    dishText: 'text-xl sm:text-2xl lg:text-3xl font-black',
    emojiText: 'text-4xl sm:text-5xl',
    padding: 'p-4 sm:p-5',
    minHeight: 'min-h-[74px] sm:min-h-[86px]',
  },
];

// 음식 이름에 어울리는 이모지 배정
function getDishEmoji(dishName: string): string {
  if (dishName.includes('밥') || dishName.includes('라이스') || dishName.includes('볶음밥')) return '🍚';
  if (dishName.includes('국') || dishName.includes('찌개') || dishName.includes('탕') || dishName.includes('스프')) return '🍲';
  if (dishName.includes('면') || dishName.includes('스파게티') || dishName.includes('파스타') || dishName.includes('우동')) return '🍜';
  if (dishName.includes('치킨') || dishName.includes('닭') || dishName.includes('너겟')) return '🍗';
  if (dishName.includes('불고기') || dishName.includes('돈육') || dishName.includes('갈비') || dishName.includes('스테이크') || dishName.includes('수육') || dishName.includes('삼겹')) return '🥩';
  if (dishName.includes('생선') || dishName.includes('고등어') || dishName.includes('갈치') || dishName.includes('조기') || dishName.includes('연어') || dishName.includes('오징어')) return '🐟';
  if (dishName.includes('김치') || dishName.includes('깍두기')) return '🥬';
  if (dishName.includes('샐러드') || dishName.includes('나물') || dishName.includes('무침') || dishName.includes('채소')) return '🥗';
  if (dishName.includes('우유') || dishName.includes('요구르트') || dishName.includes('치즈')) return '🥛';
  if (dishName.includes('사과') || dishName.includes('배') || dishName.includes('포도') || dishName.includes('귤') || dishName.includes('딸기') || dishName.includes('수박') || dishName.includes('바나나') || dishName.includes('과일') || dishName.includes('단감')) return '🍎';
  if (dishName.includes('빵') || dishName.includes('케이크') || dishName.includes('도넛') || dishName.includes('쿠키') || dishName.includes('와플')) return '🍞';
  return '🍱';
}

export default function MorningSchoolMealCard({ themeStyles }: MorningSchoolMealCardProps) {
  // 학교 설정 상태 (기본값으로 시작하여 SSR 수화 불일치 방지)
  const [selectedSchool, setSelectedSchool] = useState<SchoolProfile>(QUICK_SAMPLE_SCHOOLS[0]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // 식단 데이터 상태
  const [isLoadingMeal, setIsLoadingMeal] = useState(false);
  const [meals, setMeals] = useState<FormattedMeal[]>([]);
  const [activeMealIndex, setActiveMealIndex] = useState<number>(0);
  const [showAllergy, setShowAllergy] = useState(false);
  const [mealErrorMessage, setMealErrorMessage] = useState<string | null>(null);

  // 식단 글씨 크기 상태 (기본 '크게' = 1)
  const [mealFontSizeLevel, setMealFontSizeLevel] = useState<number>(1);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const savedSchool = localStorage.getItem('ysschool_morning_school');
        if (savedSchool) {
          const parsed = JSON.parse(savedSchool);
          if (parsed.officeCode && parsed.schoolCode) {
            // 이전 기본 샘플이었던 여수북초(8512030)인 경우 새로운 기본값 여수한려초등학교로 자동 전환
            if (parsed.schoolCode === '8512030') {
              setSelectedSchool(QUICK_SAMPLE_SCHOOLS[0]);
              localStorage.setItem('ysschool_morning_school', JSON.stringify(QUICK_SAMPLE_SCHOOLS[0]));
            } else {
              setSelectedSchool(parsed);
            }
          }
        }
        const savedSize = localStorage.getItem('ysschool_morning_meal_fontsize');
        if (savedSize) {
          const parsed = parseInt(savedSize, 10);
          if (!isNaN(parsed) && parsed >= 0 && parsed < MEAL_FONT_SIZES.length) {
            setMealFontSizeLevel(parsed);
          }
        }
      } catch {
        // ignore
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateMealFontSize = (level: number) => {
    const clamped = Math.max(0, Math.min(MEAL_FONT_SIZES.length - 1, level));
    setMealFontSizeLevel(clamped);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ysschool_morning_meal_fontsize', String(clamped));
      } catch {
        // ignore
      }
    }
  };

  // 학교 검색 모달 내부 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SchoolSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // 학교 변경 시 식단 데이터 조회
  const fetchMealData = useCallback(async (school: SchoolProfile) => {
    setIsLoadingMeal(true);
    setMealErrorMessage(null);
    try {
      const res = await fetch(
        `/api/school-meal?officeCode=${school.officeCode}&schoolCode=${school.schoolCode}`
      );
      if (!res.ok) throw new Error('식단 정보를 가져오지 못했습니다.');
      const data = await res.json();

      if (!data.hasMeal || !data.meals || data.meals.length === 0) {
        setMeals([]);
        setMealErrorMessage(data.message || '현재 등록된 급식 식단이 없습니다.');
      } else {
        setMeals(data.meals);
        // activeMeal이 위치한 index 찾기
        const activeIdx = data.meals.findIndex(
          (m: FormattedMeal) => m.date === data.activeMeal?.date
        );
        setActiveMealIndex(activeIdx >= 0 ? activeIdx : 0);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '네트워크 오류가 발생했습니다.';
      setMealErrorMessage(msg);
      setMeals([]);
    } finally {
      setIsLoadingMeal(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      const timer = setTimeout(() => {
        fetchMealData(selectedSchool);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedSchool, fetchMealData]);

  // 학교 저장 핸들러
  const handleSelectSchool = (school: SchoolProfile) => {
    setSelectedSchool(school);
    try {
      localStorage.setItem('ysschool_morning_school', JSON.stringify(school));
    } catch {
      // 저장 실패 무시
    }
    setIsSearchModalOpen(false);
  };

  // 학교 검색 API 호출
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchError('학교 이름을 2글자 이상 입력해주세요.');
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);

    try {
      const res = await fetch(
        `/api/school-meal?action=search&query=${encodeURIComponent(searchQuery.trim())}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '검색 중 오류가 발생했습니다.');
      }
      if (!data.schools || data.schools.length === 0) {
        setSearchError(`'${searchQuery}'(으)로 검색된 학교가 없습니다.`);
      } else {
        setSearchResults(data.schools);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '학교 검색 중 오류가 발생했습니다.';
      setSearchError(msg);
    } finally {
      setIsSearching(false);
    }
  };

  const currentMeal = meals[activeMealIndex] || null;

  return (
    <>
      <div
        className={`rounded-3xl p-5 sm:p-6 border ${themeStyles.cardBg} shadow-xl flex flex-col justify-between flex-1`}
      >
        {/* 상단 헤더: 타이틀 & 글씨 크기 조절 & 학교 설정 버튼 */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
              <Utensils className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base sm:text-lg lg:text-xl">오늘의 급식 식단</h3>
                {currentMeal && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black">
                    {currentMeal.mealType}
                  </span>
                )}
              </div>
              {selectedSchool && (
                <p className="text-xs sm:text-sm opacity-85 font-bold truncate max-w-[200px] sm:max-w-[280px] mt-0.5">
                  🏫 {selectedSchool.schoolName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 급식 글씨 크기 조절기 */}
            <div className="flex items-center rounded-xl bg-black/20 p-1 border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => updateMealFontSize(mealFontSizeLevel - 1)}
                disabled={mealFontSizeLevel === 0}
                className="px-2 py-0.5 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer text-[11px]"
                title="식단 글씨 축소"
              >
                가-
              </button>
              <span suppressHydrationWarning className="px-1.5 opacity-90 font-mono text-[11px] font-bold text-amber-300">
                {MEAL_FONT_SIZES[mealFontSizeLevel].name}
              </span>
              <button
                type="button"
                onClick={() => updateMealFontSize(mealFontSizeLevel + 1)}
                disabled={mealFontSizeLevel === MEAL_FONT_SIZES.length - 1}
                className="px-2 py-0.5 rounded hover:bg-white/10 font-bold disabled:opacity-30 cursor-pointer text-[11px]"
                title="식단 글씨 확대"
              >
                가+
              </button>
            </div>

            {selectedSchool && (
              <button
                type="button"
                onClick={() => fetchMealData(selectedSchool)}
                disabled={isLoadingMeal}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer opacity-80 hover:opacity-100"
                title="식단 새로고침"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMeal ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setSearchError(null);
                setIsSearchModalOpen(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
              title="학교 변경하기"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>학교 설정</span>
            </button>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="py-3 flex-1 flex flex-col justify-between">
          {isLoadingMeal ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 opacity-70">
              <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
              <span className="text-xs font-bold">나이스(NEIS) 급식 식단 불러오는 중...</span>
            </div>
          ) : currentMeal ? (
            <div className="flex flex-col flex-grow">
              {/* 날짜 선택 및 칼로리 표시 바 */}
              <div className="flex items-center justify-between mb-3.5 bg-black/25 p-3 rounded-2xl text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMealIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeMealIndex === 0}
                    className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    title="이전 급식"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="font-black text-base sm:text-lg lg:text-xl text-amber-300">
                    {currentMeal.formattedDate}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveMealIndex((prev) => Math.min(meals.length - 1, prev + 1))}
                    disabled={activeMealIndex === meals.length - 1}
                    className="p-1.5 rounded-lg hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    title="다음 급식"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {currentMeal.calories && (
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-black text-orange-300">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <span>{currentMeal.calories}</span>
                  </div>
                )}
              </div>

              {/* 반찬 리스트 (2열 그리드, 넉넉한 공간과 대형 글씨로 화면에 가득 참) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 flex-grow overflow-y-auto pr-1 max-h-[480px] sm:max-h-[580px]">
                {currentMeal.dishes.map((dish, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between ${MEAL_FONT_SIZES[mealFontSizeLevel].padding} ${MEAL_FONT_SIZES[mealFontSizeLevel].minHeight} rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors shadow-sm`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className={`${MEAL_FONT_SIZES[mealFontSizeLevel].emojiText} shrink-0`}>
                        {getDishEmoji(dish.name)}
                      </span>
                      <span
                        className={`${MEAL_FONT_SIZES[mealFontSizeLevel].dishText} truncate tracking-tight`}
                        title={dish.name}
                      >
                        {dish.name}
                      </span>
                    </div>
                    {showAllergy && dish.allergy.length > 0 && (
                      <span className="text-xs sm:text-sm text-amber-300 font-mono font-bold ml-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
                        {dish.allergy.join('.')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-2xl mb-2">
                🍱
              </div>
              <p className="text-sm font-bold mb-1">
                {mealErrorMessage || '급식 정보가 없습니다.'}
              </p>
              <p className="text-xs opacity-60 mb-4">
                주말이나 공휴일, 방학 기간에는 식단이 등록되지 않습니다.
              </p>
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors cursor-pointer"
              >
                다른 학교 검색하기
              </button>
            </div>
          )}
        </div>

        {/* 하단 바: 알레르기 토글 & 나이스 출처 */}
        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] opacity-70">
          <button
            type="button"
            onClick={() => setShowAllergy((prev) => !prev)}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3" />
            <span>{showAllergy ? '알레르기 번호 숨기기' : '알레르기 번호 보기'}</span>
          </button>
          <span>나이스(NEIS) 실시간 급식</span>
        </div>
      </div>

      {/* 학교 설정 모달 */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 text-white shadow-2xl relative"
            >
              {/* 모달 닫기 */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 헤더 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400">
                  <Utensils className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black">우리 학교 급식 설정</h3>
                  <p className="text-xs text-slate-400">
                    전국 초·중·고등학교 나이스(NEIS) 급식 식단을 연동합니다.
                  </p>
                </div>
              </div>

              {/* 학교 검색 폼 */}
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="학교 이름을 입력하세요 (예: 한려초, 여수한려초)"
                    className="w-full pl-10 pr-24 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-slate-500"
                    autoFocus
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors cursor-pointer"
                  >
                    {isSearching ? '검색 중...' : '검색'}
                  </button>
                </div>
              </form>

              {/* 추천/샘플 학교 퀵버튼 */}
              <div className="mb-4">
                <span className="text-[11px] text-slate-400 font-bold block mb-1.5">
                  빠른 선택:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_SAMPLE_SCHOOLS.map((s) => (
                    <button
                      key={s.schoolCode}
                      type="button"
                      onClick={() => handleSelectSchool(s)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSchool?.schoolCode === s.schoolCode
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {s.schoolName}
                    </button>
                  ))}
                </div>
              </div>

              {/* 검색 결과 리스트 */}
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {searchError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{searchError}</span>
                  </div>
                )}

                {searchResults.map((school) => {
                  const isCurrent = selectedSchool?.schoolCode === school.schoolCode;
                  return (
                    <div
                      key={school.schoolCode}
                      onClick={() =>
                        handleSelectSchool({
                          officeCode: school.officeCode,
                          schoolCode: school.schoolCode,
                          schoolName: school.schoolName,
                          region: school.location,
                          address: school.address,
                        })
                      }
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-400/10 border-amber-400/40'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white truncate">
                            {school.schoolName}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-300">
                            {school.schoolType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {school.address}
                        </p>
                      </div>

                      {isCurrent ? (
                        <span className="flex items-center gap-1 text-xs font-black text-amber-400 shrink-0">
                          <Check className="w-4 h-4" />
                          <span>선택됨</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold text-slate-200 transition-colors shrink-0 cursor-pointer"
                        >
                          선택
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
