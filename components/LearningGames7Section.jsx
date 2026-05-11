export default function LearningGames7Section() {
  const games = [
  {
    "title": "구구단 드래곤 레이드",
    "icon": "🐉",
    "subject": "수학",
    "intro": "곱셈 정답으로 드래곤의 공격을 막는 보스 레이드",
    "href": "/learning-games-7/01_multiplication_dragon_raid.html"
  },
  {
    "title": "속담 낚시왕",
    "icon": "🎣",
    "subject": "국어",
    "intro": "속담 뜻 물고기를 낚는 국어 게임",
    "href": "/learning-games-7/02_proverb_fishing.html"
  },
  {
    "title": "날씨 실험실 구조대",
    "icon": "🌦️",
    "subject": "과학",
    "intro": "날씨 현상과 설명을 분류하는 과학 게임",
    "href": "/learning-games-7/03_weather_lab_rescue.html"
  },
  {
    "title": "세계 예절 파티",
    "icon": "🌏",
    "subject": "사회",
    "intro": "세계 문화와 예절을 짝지어 기억하는 게임",
    "href": "/learning-games-7/04_global_manners_party.html"
  },
  {
    "title": "영어 문장 기차",
    "icon": "🚂",
    "subject": "영어",
    "intro": "영어 어순에 맞게 문장 칸을 연결하는 게임",
    "href": "/learning-games-7/05_english_sentence_train.html"
  },
  {
    "title": "분수 캔디 매치",
    "icon": "🍬",
    "subject": "수학",
    "intro": "분수와 그림 표현을 짝맞추는 기억 게임",
    "href": "/learning-games-7/06_fraction_candy_match.html"
  },
  {
    "title": "몸속 기관 러시",
    "icon": "🫀",
    "subject": "과학",
    "intro": "기관과 역할을 찾아 달리는 생명 과학 러너",
    "href": "/learning-games-7/07_body_organ_rush.html"
  },
  {
    "title": "평화 다리 퀘스트",
    "icon": "🌉",
    "subject": "사회",
    "intro": "갈등 해결 선택지를 고르며 다리를 완성하는 게임",
    "href": "/learning-games-7/08_peace_bridge_quest.html"
  },
  {
    "title": "맞춤법 버블 구조대",
    "icon": "🫧",
    "subject": "국어",
    "intro": "올바른 표현을 박자에 맞춰 터뜨리는 게임",
    "href": "/learning-games-7/09_spelling_bubble_rescue.html"
  },
  {
    "title": "거스름돈 마켓",
    "icon": "💰",
    "subject": "수학",
    "intro": "거스름돈 계산으로 마켓 보스를 이기는 게임",
    "href": "/learning-games-7/10_money_change_market.html"
  }
];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
        <p className="text-sm font-bold text-yellow-300">Educational Game Lab</p>
        <h2 className="mt-2 text-3xl font-black md:text-5xl">초등 학습 HTML 게임 7탄</h2>
        <p className="mt-3 text-slate-200">브금, 효과음, 아이템, 콤보, 레벨업, 배움 기록장을 갖춘 모바일 최적화 학습 게임입니다.</p>
        <a href="/learning-games-7/index.html" className="mt-5 inline-flex rounded-full bg-yellow-300 px-5 py-3 font-black text-slate-950">게임 목록 열기</a>
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
