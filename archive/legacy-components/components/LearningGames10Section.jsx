export default function LearningGames10Section() {
  const games = [
  {
    "title": "어휘 몬스터 농장",
    "icon": "👾",
    "subject": "국어",
    "intro": "낱말의 뜻을 모아 몬스터 농장을 키우는 게임",
    "href": "/learning-games-10/01_vocab_monster_farm.html"
  },
  {
    "title": "넓이 성 짓기",
    "icon": "🏰",
    "subject": "수학",
    "intro": "도형 넓이 공식을 순서대로 조립하는 게임",
    "href": "/learning-games-10/02_area_castle_builder.html"
  },
  {
    "title": "물의 순환 롤러",
    "icon": "💧",
    "subject": "과학",
    "intro": "증발 응결 강수 흐름을 따라 달리는 게임",
    "href": "/learning-games-10/03_water_cycle_roller.html"
  },
  {
    "title": "독도 수호 퀴즈",
    "icon": "🌊",
    "subject": "사회",
    "intro": "우리 땅과 바다 지식을 익히는 디펜스 게임",
    "href": "/learning-games-10/04_dokdo_guardian_quiz.html"
  },
  {
    "title": "영어 직업 아케이드",
    "icon": "👩‍🚀",
    "subject": "영어",
    "intro": "직업 영어 단어를 분류하는 아케이드 게임",
    "href": "/learning-games-10/05_english_job_arcade.html"
  },
  {
    "title": "소수 탐험 퀘스트",
    "icon": "🔢",
    "subject": "수학",
    "intro": "소수와 합성수를 구분하며 미로를 통과하는 게임",
    "href": "/learning-games-10/06_prime_number_quest.html"
  },
  {
    "title": "빛과 그림자 추격전",
    "icon": "🔦",
    "subject": "과학",
    "intro": "빛의 직진과 그림자 개념을 리듬으로 익히는 게임",
    "href": "/learning-games-10/07_light_shadow_chase.html"
  },
  {
    "title": "토론 아레나 주니어",
    "icon": "🎤",
    "subject": "국어",
    "intro": "주장과 근거를 골라 토론 보스를 이기는 게임",
    "href": "/learning-games-10/08_debate_arena_junior.html"
  },
  {
    "title": "미래 도시 플래너",
    "icon": "🏙️",
    "subject": "사회",
    "intro": "도시 문제와 해결 방법을 짝맞추는 게임",
    "href": "/learning-games-10/09_future_city_planner.html"
  },
  {
    "title": "마음 안전 구조대",
    "icon": "💛",
    "subject": "안전",
    "intro": "감정 표현과 도움 요청 방법을 분류하는 게임",
    "href": "/learning-games-10/10_emotion_safety_rescue.html"
  }
];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold text-yellow-300">Educational Game Lab</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">초등 학습 HTML 게임 10탄</h2>
        <p className="mt-3 text-slate-200">브금, 효과음, 아이템, 콤보, 레벨업, 배움 기록장을 갖춘 모바일 최적화 학습 게임입니다.</p>
        <a href="/learning-games-10/index.html" className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 font-black text-slate-950">게임 목록 열기</a>
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
