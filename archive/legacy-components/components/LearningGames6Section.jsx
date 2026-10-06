export default function LearningGames6Section() {
  const games = [
  {
    "title": "고대 문자 러너",
    "icon": "🏺",
    "subject": "국어",
    "intro": "받침과 맞춤법 문자를 골라 유적을 통과하는 러너 게임",
    "href": "/learning-games-6/01_ancient_letter_runner.html"
  },
  {
    "title": "소수 잠수함 탐사",
    "icon": "🛟",
    "subject": "수학",
    "intro": "같은 크기의 소수와 분수를 모아 바닷속 보물을 찾는 게임",
    "href": "/learning-games-6/02_decimal_submarine.html"
  },
  {
    "title": "식물 성장 타이쿤",
    "icon": "🌱",
    "subject": "과학",
    "intro": "식물 성장 순서를 맞춰 농장을 키우는 타이쿤 게임",
    "href": "/learning-games-6/03_plant_growth_tycoon.html"
  },
  {
    "title": "우리 동네 직업 디펜스",
    "icon": "🏘️",
    "subject": "사회",
    "intro": "직업과 역할을 맞혀 마을을 지키는 디펜스 게임",
    "href": "/learning-games-6/04_community_helper_defense.html"
  },
  {
    "title": "영어 쿠키 공장",
    "icon": "🍪",
    "subject": "영어",
    "intro": "영어 낱말을 뜻별로 분류해 쿠키를 굽는 게임",
    "href": "/learning-games-6/05_english_cookie_factory.html"
  },
  {
    "title": "삼각형 클라임 오비",
    "icon": "🔺",
    "subject": "수학",
    "intro": "도형 성질 문제를 풀며 오비 탑을 오르는 게임",
    "href": "/learning-games-6/06_triangle_climb_obby.html"
  },
  {
    "title": "소리 파동 DJ",
    "icon": "🎧",
    "subject": "과학",
    "intro": "소리와 진동 개념을 리듬에 맞춰 익히는 게임",
    "href": "/learning-games-6/07_sound_wave_dj.html"
  },
  {
    "title": "독해 유령 호텔",
    "icon": "👻",
    "subject": "국어",
    "intro": "중심 내용과 세부 내용을 맞혀 유령 보스를 물리치는 게임",
    "href": "/learning-games-6/08_reading_ghost_hotel.html"
  },
  {
    "title": "지도 기호 택배왕",
    "icon": "🗺️",
    "subject": "사회",
    "intro": "지도 기호와 뜻을 모아 정확히 배달하는 게임",
    "href": "/learning-games-6/09_map_symbol_delivery.html"
  },
  {
    "title": "디지털 안전 순찰대",
    "icon": "🛡️",
    "subject": "안전",
    "intro": "개인정보와 온라인 예절을 익히는 안전 러너",
    "href": "/learning-games-6/10_digital_safety_patrol.html"
  }
];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold text-yellow-300">Educational Game Lab</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">초등 학습 HTML 게임 6탄</h2>
        <p className="mt-3 text-slate-200">브금, 효과음, 아이템, 콤보, 레벨업, 배움 기록장을 갖춘 모바일 최적화 학습 게임입니다.</p>
        <a href="/learning-games-6/index.html" className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 font-black text-slate-950">게임 목록 열기</a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {games.map((game) => (
          <a key={game.href} href={game.href} className="rounded-3xl border bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="text-4xl">{game.icon}</div>
            <h3 className="mt-3 font-black text-slate-900">{game.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{game.intro}</p>
            <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{game.subject}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
