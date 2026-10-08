import { NextRequest, NextResponse } from 'next/server';

interface NeisSchoolRow {
  ATPT_OFCDC_SC_CODE: string;
  ATPT_OFCDC_SC_NM: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  SCHUL_KND_SC_NM: string;
  LCTN_SC_NM: string;
  ORG_RDNMA: string;
}

interface NeisMealRow {
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  SCHUL_NM: string;
  MMEAL_SC_CODE: string;
  MMEAL_SC_NM: string;
  MLSV_YMD: string;
  DDISH_NM: string;
  CAL_INFO?: string;
  NTR_INFO?: string;
}

export interface DishItem {
  name: string;
  allergy: string[];
  raw: string;
}

export interface FormattedMeal {
  date: string; // YYYYMMDD
  formattedDate: string; // YYYY. MM. DD (요일)
  mealType: string; // 중식, 조식 등
  calories: string;
  dishes: DishItem[];
  rawDishes: string;
}

// 헬퍼: YYYYMMDD 날짜를 한국어 표기로 변환
function formatKoreanDate(ymd: string): string {
  if (ymd.length !== 8) return ymd;
  const y = parseInt(ymd.substring(0, 4), 10);
  const m = parseInt(ymd.substring(4, 6), 10);
  const d = parseInt(ymd.substring(6, 8), 10);
  const dt = new Date(y, m - 1, d);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = weekdays[dt.getDay()] || '';
  return `${m}월 ${d}일 (${dayName})`;
}

// 헬퍼: KST 기준 오늘 날짜 문자열 (YYYYMMDD)
function getTodayKstYmd(): string {
  const now = new Date();
  // 한국 시간대로 변환
  const kstStr = now.toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' }); // YYYY-MM-DD
  return kstStr.replace(/-/g, '');
}

// 헬퍼: 날짜 더하기/빼기 (일 단위)
function offsetDaysYmd(ymd: string, days: number): string {
  const y = parseInt(ymd.substring(0, 4), 10);
  const m = parseInt(ymd.substring(4, 6), 10);
  const d = parseInt(ymd.substring(6, 8), 10);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}${nm}${nd}`;
}

// 헬퍼: DDISH_NM 문자열 파싱
function parseDishes(rawText: string): DishItem[] {
  if (!rawText) return [];
  return rawText
    .split(/<br\s*\/?>/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      // "치킨커틀렛 (1.2.5.6.12.15.16)" 또는 "치킨커틀렛(1.2.5.6)" 파싱
      const match = item.match(/^(.*?)\s*(\([0-9.]+\))?$/);
      const name = (match ? match[1] : item).trim();
      const allergy = match && match[2]
        ? match[2].replace(/[()]/g, '').split('.').filter(Boolean)
        : [];
      return {
        name,
        allergy,
        raw: item,
      };
    });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    // 1. 학교 검색 (action=search)
    if (action === 'search') {
      const query = searchParams.get('query')?.trim();
      if (!query || query.length < 2) {
        return NextResponse.json(
          { error: '검색어를 2글자 이상 입력해주세요.' },
          { status: 400 }
        );
      }

      const neisUrl = `https://open.neis.go.kr/hub/schoolInfo?Type=json&pIndex=1&pSize=20&SCHUL_NM=${encodeURIComponent(query)}`;
      const res = await fetch(neisUrl, { next: { revalidate: 86400 } }); // 24시간 캐싱
      if (!res.ok) {
        return NextResponse.json({ error: '나이스 API 통신 오류' }, { status: 502 });
      }

      const data = await res.json();

      // NEIS 결과 없음 처리
      if (!data.schoolInfo || !data.schoolInfo[1] || !data.schoolInfo[1].row) {
        return NextResponse.json({ schools: [] });
      }

      const rows: NeisSchoolRow[] = data.schoolInfo[1].row;
      const schools = rows.map((r) => ({
        officeCode: r.ATPT_OFCDC_SC_CODE,
        officeName: r.ATPT_OFCDC_SC_NM,
        schoolCode: r.SD_SCHUL_CODE,
        schoolName: r.SCHUL_NM,
        schoolType: r.SCHUL_KND_SC_NM,
        location: r.LCTN_SC_NM,
        address: r.ORG_RDNMA,
      }));

      return NextResponse.json({ schools });
    }

    // 2. 급식 조회 (action=meal 또는 기본)
    const officeCode = searchParams.get('officeCode')?.trim();
    const schoolCode = searchParams.get('schoolCode')?.trim();

    if (!officeCode || !schoolCode) {
      return NextResponse.json(
        { error: 'officeCode와 schoolCode가 필요합니다.' },
        { status: 400 }
      );
    }

    const todayYmd = getTodayKstYmd();
    const targetYmd = searchParams.get('date')?.replace(/-/g, '').trim() || todayYmd;

    // 현재 타깃 날짜 전후 7일 범위를 쿼리하여 오늘 급식 및 주변 급식을 모두 확보
    const fromYmd = offsetDaysYmd(targetYmd, -4);
    const toYmd = offsetDaysYmd(targetYmd, 4);

    const neisMealUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=15&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_FROM_YMD=${fromYmd}&MLSV_TO_YMD=${toYmd}`;

    const res = await fetch(neisMealUrl, { next: { revalidate: 3600 } }); // 1시간 캐싱
    if (!res.ok) {
      return NextResponse.json({ error: '나이스 API 통신 오류' }, { status: 502 });
    }

    const data = await res.json();

    if (!data.mealServiceDietInfo || !data.mealServiceDietInfo[1] || !data.mealServiceDietInfo[1].row) {
      return NextResponse.json({
        hasMeal: false,
        todayYmd,
        targetYmd,
        message: '해당 기간의 급식 정보가 없습니다. (방학, 주말 또는 공휴일)',
        meals: [],
        activeMeal: null,
      });
    }

    const rows: NeisMealRow[] = data.mealServiceDietInfo[1].row;

    // 중식 우선 정렬 (일반적으로 초등은 중식)
    const meals: FormattedMeal[] = rows.map((r) => {
      const dishes = parseDishes(r.DDISH_NM);
      return {
        date: r.MLSV_YMD,
        formattedDate: formatKoreanDate(r.MLSV_YMD),
        mealType: r.MMEAL_SC_NM || '중식',
        calories: r.CAL_INFO || '',
        dishes,
        rawDishes: dishes.map((d) => d.name).join(', '),
      };
    });

    // 타깃 날짜의 급식 찾기 (없으면 타깃 날짜와 가장 가까운 급식)
    let activeMeal = meals.find((m) => m.date === targetYmd) || null;

    if (!activeMeal && meals.length > 0) {
      // targetYmd와 가장 가까운 급식 찾기
      const sorted = [...meals].sort((a, b) => {
        return Math.abs(parseInt(a.date) - parseInt(targetYmd)) - Math.abs(parseInt(b.date) - parseInt(targetYmd));
      });
      activeMeal = sorted[0];
    }

    return NextResponse.json({
      hasMeal: Boolean(activeMeal),
      isExactDate: activeMeal ? activeMeal.date === targetYmd : false,
      todayYmd,
      targetYmd,
      schoolName: rows[0]?.SCHUL_NM || '',
      meals,
      activeMeal,
    });
  } catch (error) {
    console.error('School meal API error:', error);
    return NextResponse.json(
      { error: '식단 정보를 가져오는 중 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
