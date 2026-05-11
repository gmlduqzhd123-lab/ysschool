export default function LearningGames2Section() {
  const game = {
    icon: "🎮",
    title: "초등 학습 HTML 게임 10종 2탄",
    desc: "맞춤법 레이싱, 분수 피자 타이쿤, 영어 몬스터 캐처, 과학 슈팅, 역사 러너, 코딩 미로, 도형 타워, 시계 배달, 환경 리듬, 좌표 보물찾기까지 새 장르로 구성한 학습 게임 모음입니다.",
    href: "/learning-games-2/index.html",
    tags: ["HTML Game", "Mobile", "EduTech", "2탄"]
  };
  return (
    <section id="learning-games-2" className="py-20 px-4 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-emerald-300 font-black tracking-widest">LEARNING GAME LAB 2</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2">초등 학습 게임 실험실 2탄</h2>
        <p className="text-slate-300 mt-4 max-w-3xl leading-7">아이들이 익숙한 레이싱, 타이쿤, 슈팅, 리듬, 미로, 보물찾기 형식으로 기초 개념을 즐겁게 반복할 수 있도록 구성했습니다.</p>
        <a href={game.href} className="mt-8 block rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl hover:bg-emerald-400/10 transition">
          <div className="text-5xl mb-5">{game.icon}</div>
          <h3 className="text-2xl font-black hover:text-emerald-300 transition">{game.title}</h3>
          <p className="text-slate-300 mt-3 leading-7">{game.desc}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {game.tags.map((tag) => <span key={tag} className="text-xs font-bold rounded-full bg-emerald-400/10 border border-emerald-300/20 px-3 py-1 text-emerald-100">{tag}</span>)}
          </div>
          <div className="mt-6 font-black text-emerald-300">게임 열기 →</div>
        </a>
      </div>
    </section>
  );
}
