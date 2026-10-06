export default function LearningGames9Section() {
  const games = [
  {
    "title": "그래프 탐정 사무소",
    "icon": "📊",
    "subject": "수학",
    "intro": "표와 그래프를 읽고 사건을 해결하는 게임",
    "href": "/learning-games-9/01_graph_detective_agency.html"
  },
  {
    "title": "시 상상 스튜디오",
    "icon": "🎨",
    "subject": "국어",
    "intro": "시어와 장면을 연결해 감상력을 키우는 게임",
    "href": "/learning-games-9/02_poem_imagination_studio.html"
  },
  {
    "title": "생태계 밸런스",
    "icon": "🦊",
    "subject": "과학",
    "intro": "생산자 소비자 분해자를 분류하는 생태계 게임",
    "href": "/learning-games-9/03_ecosystem_balance.html"
  },
  {
    "title": "경제 섬 타이쿤",
    "icon": "🏝️",
    "subject": "사회",
    "intro": "희소성과 선택 개념을 아이템으로 익히는 게임",
    "href": "/learning-games-9/04_economy_island_tycoon.html"
  },
  {
    "title": "영어 동물 사파리",
    "icon": "🦁",
    "subject": "영어",
    "intro": "동물 영어 낱말을 찾아 달리는 사파리 게임",
    "href": "/learning-games-9/05_english_animal_safari.html"
  },
  {
    "title": "각도 궁수",
    "icon": "🏹",
    "subject": "수학",
    "intro": "각도 크기를 리듬 타이밍으로 맞히는 게임",
    "href": "/learning-games-9/06_angle_archer.html"
  },
  {
    "title": "물질 상태 연구소",
    "icon": "🧊",
    "subject": "과학",
    "intro": "고체 액체 기체와 예시를 짝맞추는 게임",
    "href": "/learning-games-9/07_matter_state_lab.html"
  },
  {
    "title": "미디어 리터러시 실드",
    "icon": "📰",
    "subject": "국어",
    "intro": "사실과 의견을 구분해 가짜뉴스를 막는 게임",
    "href": "/learning-games-9/08_media_literacy_shield.html"
  },
  {
    "title": "문화 지도 러너",
    "icon": "🧭",
    "subject": "사회",
    "intro": "문화유산과 지역 특징을 찾아 달리는 게임",
    "href": "/learning-games-9/09_culture_map_runner.html"
  },
  {
    "title": "비밀번호 금고",
    "icon": "🔐",
    "subject": "안전",
    "intro": "안전한 비밀번호와 보안 습관을 익히는 게임",
    "href": "/learning-games-9/10_internet_password_vault.html"
  }
];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold text-yellow-300">Educational Game Lab</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">초등 학습 HTML 게임 9탄</h2>
        <p className="mt-3 text-slate-200">브금, 효과음, 아이템, 콤보, 레벨업, 배움 기록장을 갖춘 모바일 최적화 학습 게임입니다.</p>
        <a href="/learning-games-9/index.html" className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 font-black text-slate-950">게임 목록 열기</a>
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
