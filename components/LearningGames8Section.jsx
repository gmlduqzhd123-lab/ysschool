export default function LearningGames8Section() {
  const games = [
  {
    "title": "태양계 카트 투어",
    "icon": "🪐",
    "subject": "과학",
    "intro": "행성 순서와 특징을 익히는 카트 러너",
    "href": "/learning-games-8/01_solar_system_kart.html"
  },
  {
    "title": "요약 닌자",
    "icon": "🥷",
    "subject": "국어",
    "intro": "글의 핵심을 골라 요약력을 키우는 게임",
    "href": "/learning-games-8/02_summary_ninja.html"
  },
  {
    "title": "비율 스무디 가게",
    "icon": "🥤",
    "subject": "수학",
    "intro": "재료 비율을 맞춰 스무디를 만드는 게임",
    "href": "/learning-games-8/03_ratio_smoothie_shop.html"
  },
  {
    "title": "권리와 책임 선거장",
    "icon": "🗳️",
    "subject": "사회",
    "intro": "권리와 책임 사례를 분류하는 민주시민 게임",
    "href": "/learning-games-8/04_rights_vote_arena.html"
  },
  {
    "title": "영어 단어 로켓",
    "icon": "🚀",
    "subject": "영어",
    "intro": "뜻에 맞는 단어 연료를 모아 로켓을 발사하는 게임",
    "href": "/learning-games-8/05_english_word_rocket.html"
  },
  {
    "title": "자석 광산 탈출",
    "icon": "🧲",
    "subject": "과학",
    "intro": "자석의 성질 문제를 풀며 광산을 빠져나가는 게임",
    "href": "/learning-games-8/06_magnet_mine_escape.html"
  },
  {
    "title": "시각 타임머신",
    "icon": "⏰",
    "subject": "수학",
    "intro": "시각과 경과 시간을 박자에 맞춰 맞히는 게임",
    "href": "/learning-games-8/07_time_machine_clock.html"
  },
  {
    "title": "한자 보물방",
    "icon": "🈶",
    "subject": "국어",
    "intro": "한자와 뜻을 짝지어 보물을 여는 게임",
    "href": "/learning-games-8/08_hanja_treasure_room.html"
  },
  {
    "title": "여수 역사 수호자",
    "icon": "⚓",
    "subject": "사회",
    "intro": "지역 역사 퀴즈로 항구를 지키는 디펜스",
    "href": "/learning-games-8/09_local_history_guardian.html"
  },
  {
    "title": "학교 안전 오비",
    "icon": "🚸",
    "subject": "안전",
    "intro": "학교 생활 안전 선택지를 통과하는 오비 게임",
    "href": "/learning-games-8/10_school_safety_obby.html"
  }
];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold text-yellow-300">Educational Game Lab</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">초등 학습 HTML 게임 8탄</h2>
        <p className="mt-3 text-slate-200">브금, 효과음, 아이템, 콤보, 레벨업, 배움 기록장을 갖춘 모바일 최적화 학습 게임입니다.</p>
        <a href="/learning-games-8/index.html" className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 font-black text-slate-950">게임 목록 열기</a>
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
