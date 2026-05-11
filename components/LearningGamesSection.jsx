export default function LearningGamesSection() {
  const games = [
    { icon: "🎮", title: "초등 학습 HTML 게임 10종", desc: "수학·국어·사회·과학 개념을 브금, 효과음, 아이템, 미션이 있는 미니게임으로 익히는 엽쌤스쿨 학습 게임 모음입니다.", href: "/learning-games/index.html", tags: ["HTML Game", "Mobile", "EduTech", "초등학습"] },
  ];

  return (
    <section id="learning-games" className="py-20 px-4 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-sky-300 font-black tracking-widest">LEARNING GAME LAB</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-2">초등 학습 게임 실험실</h2>
          <p className="text-slate-300 mt-4 max-w-3xl leading-7">
            아이들이 익숙한 모바일 게임과 고전 게임 문법을 바탕으로, 교실에서 바로 활용할 수 있는 짧고 재미있는 학습형 HTML 게임을 모았습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <a
              key={game.title}
              href={game.href}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl hover:bg-sky-400/10 transition block"
            >
              <div className="text-5xl mb-5">{game.icon}</div>
              <h3 className="text-2xl font-black group-hover:text-sky-300 transition">{game.title}</h3>
              <p className="text-slate-300 mt-3 leading-7">{game.desc}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {game.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold rounded-full bg-sky-400/10 border border-sky-300/20 px-3 py-1 text-sky-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 font-black text-sky-300">게임 열기 →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
