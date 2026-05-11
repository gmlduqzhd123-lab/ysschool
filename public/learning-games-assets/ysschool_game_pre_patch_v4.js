// YSSCHOOL Game Pre Patch V9: sound/profile only. No decorative mascot injection.
(function(){
  'use strict';
  function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return Math.abs(h>>>0);}
  const path=(location.pathname||document.title||'game');
  const seed=hash(path);
  const scales=[
    [262,330,392,523,659,523,392,330],
    [294,370,440,587,740,587,440,370],
    [247,311,370,494,622,494,370,311],
    [330,392,494,659,784,659,494,392],
    [220,277,330,440,554,440,330,277],
    [349,440,523,698,880,698,523,440]
  ];
  const scale=scales[seed%scales.length];
  window.YS_V9_AUDIO_PROFILE={seed, scale, style:seed%6, tempo:[260,290,320,350,380,410][seed%6], blip:[720,840,960,1080,640,760][seed%6]};
  if(window.GAME_CONFIG){
    // 캐릭터는 게임의 목표물·플레이어로만 쓰고, 화면 장식용 문구를 덧붙이지 않습니다.
    window.GAME_CONFIG.sound = Object.assign({}, window.GAME_CONFIG.sound||{}, {scale});
    window.GAME_CONFIG.seed = (Number(window.GAME_CONFIG.seed)||0) + (seed%17);
    if(!window.GAME_CONFIG.homeUrl) window.GAME_CONFIG.homeUrl='../learning-games-all/index.html';
  }
  if(window.Arcade && !window.Arcade.__ysV9SetupPatched){
    const orig=window.Arcade.setupShell;
    if(typeof orig==='function'){
      window.Arcade.setupShell=function(cfg){
        cfg=Object.assign({}, cfg||{});
        cfg.seed=(Number(cfg.seed)||0)+(seed%11);
        return orig.call(this,cfg);
      };
      window.Arcade.__ysV9SetupPatched=true;
    }
  }
  if(window.ArcadeMini && !window.ArcadeMini.__ysV9SetupPatched){
    const orig=window.ArcadeMini.setup;
    if(typeof orig==='function'){
      window.ArcadeMini.setup=function(cfg){
        cfg=Object.assign({}, cfg||{});
        cfg.soundSeed=seed%11;
        return orig.call(this,cfg);
      };
      window.ArcadeMini.__ysV9SetupPatched=true;
    }
  }
})();
