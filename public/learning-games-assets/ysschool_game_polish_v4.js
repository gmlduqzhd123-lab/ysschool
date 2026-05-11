// YSSCHOOL Game Polish V10: consolidate UI, stable return, scoped no-shake, result bridge, no duplicate BGM layers.
(function(){
  'use strict';
  if(window.__YS_V10_POLISH__) return; window.__YS_V10_POLISH__=true;
  const path = decodeURIComponent(location.pathname || document.title || 'game');
  const isDashboard = /learning-games-all/.test(path);
  const isPackIndex = /learning-games(?:-\d+)?\/index\.html?$/.test(path) && !isDashboard;
  if(isPackIndex) return;
  function hash(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;return Math.abs(h);}
  const seed=(window.YS_V9_AUDIO_PROFILE&&window.YS_V9_AUDIO_PROFILE.seed)||hash(path);
  const palettes=['#38bdf8','#f472b6','#facc15','#34d399','#a78bfa','#fb7185','#60a5fa','#fb923c'];
  document.documentElement.style.setProperty('--ys-v9-accent', palettes[seed%palettes.length]);
  document.body.classList.add(isDashboard?'ys-v9-dashboard':'ys-v4-game-page','ys-v9-game-page');

  function mainboardUrl(){
    try{ const q=new URLSearchParams(location.search); const ret=q.get('return') || q.get('back') || q.get('mainboard'); if(ret) return new URL(ret, location.href).href; }catch(e){}
    try{ return new URL('../learning-games-all/index.html', location.href).href; }catch(e){}
    return '../learning-games-all/index.html';
  }
  function goMainboard(){ if(window.YS_GO_DASHBOARD) window.YS_GO_DASHBOARD(); else location.href = mainboardUrl(); }
  window.YS_MAINBOARD_URL = window.YS_MAINBOARD_URL || mainboardUrl;
  window.YS_RETURN_TO_MAINBOARD = window.YS_RETURN_TO_MAINBOARD || goMainboard;

  function cleanupClutter(){
    document.querySelectorAll('#ys-difficulty-badge,#ys-v8-mainboard-fixed,#ys-v7-tools,.ys-v4-mascot,.ys-v4-corner,.ys-v4-sparkle').forEach(el=>el.remove());
    // Old inline tool rows may contain duplicate mainboard/home links. Leave learning tools, remove only duplicate navigation links.
    if(!isDashboard){
      document.querySelectorAll('.miniTool a[href*="learning-games-all"], .miniTool a[href="https://ysschool.vercel.app/"], .miniTool a[href="/"]').forEach(a=>a.remove());
    }
  }
  function patchLinks(){
    if(isDashboard) return;
    document.querySelectorAll('a[href="./index.html"],a[href="index.html"],a[href="../learning-games-all/index.html"]').forEach(a=>{
      const text=(a.textContent||'').trim();
      if(/목록|게임 목록|홈|돌아|메인보드/.test(text)){
        a.setAttribute('href', mainboardUrl());
        if(/목록|메인보드/.test(text)) a.textContent='🏠 100게임 메인보드';
      }
    });
    document.querySelectorAll('.ys-v8-mainboard-end,#mainboardBtn,#ys-arcade-main').forEach(btn=>{
      if(btn.__ysV9Home) return; btn.__ysV9Home=true;
      btn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); goMainboard(); }, {capture:true});
    });
  }
  function ignoreTarget(t){return t && (t.closest && t.closest('input,textarea,select,[contenteditable="true"]'));}
  function inGameArea(t){return t && t.closest && t.closest('canvas,.ctrl,.pad,.joystick,.gamebox,.playarea,#play,.screen,.stage,.board,.mergeGrid,.controls,.game-shell,.game');}
  function inTouchBlockArea(t){return t && t.closest && t.closest('canvas,.ctrl,.pad,.joystick,.playarea,#play,.board,.mergeGrid,.controls');}
  const blockKeys=new Set(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ']);
  window.addEventListener('keydown', function(e){ if(blockKeys.has(e.key) && !ignoreTarget(e.target) && inGameArea(document.activeElement || e.target || document.body)){ e.preventDefault(); } }, {capture:true});
  window.addEventListener('keyup', function(e){ if(blockKeys.has(e.key) && !ignoreTarget(e.target) && inGameArea(document.activeElement || e.target || document.body)){ e.preventDefault(); } }, {capture:true});
  document.addEventListener('touchmove', function(e){ if(inTouchBlockArea(e.target)) e.preventDefault(); }, {passive:false, capture:true});
  document.addEventListener('pointerdown', function(e){ if(e.target && e.target.closest && e.target.closest('.ctrl,.pad button,.joystick button,[data-act]')){ e.preventDefault(); } }, {capture:true});

  function tidyControls(){
    document.querySelectorAll('.ctrl,.pad button,.joystick button,[data-act]').forEach(b=>{ b.setAttribute('tabindex','-1'); b.addEventListener('focus',()=>{try{b.blur()}catch(_){}}); });
  }
  function patchSound(){
    const S=window.Sound;
    if(S && !S.__ysV9Polished){
      S.__ysV9Polished=true;
      const profile=window.YS_V9_AUDIO_PROFILE||window.YS_V4_AUDIO_PROFILE||{};
      if(typeof S.start==='function'){
        const origStart=S.start.bind(S);
        S.start=function(s,t){ return origStart((Number(s)||0)+(profile.style||seed%6), Math.max(260, Math.round(Number(t)||profile.tempo||330))); };
      }
      // No extra interval: one BGM source per game to avoid overlapping sound layers.
    }
    if(window.Arcade && !window.Arcade.__ysV9AudioPatched){
      const A=window.Arcade; A.__ysV9AudioPatched=true;
      if(typeof A.startMusic==='function'){ const orig=A.startMusic.bind(A); A.startMusic=function(n){ return orig((Number(n)||0)+(seed%11)); }; }
    }
  }
  function ensureResultMainboardButton(){
    if(isDashboard) return;
    const candidates=[...document.querySelectorAll('.overlay:not(.hide), .modal.show, .modal-box, .card, [id*=over], [id*=modal], [class*=result], [class*=finish]')];
    for(const box of candidates){
      if(!box || box.__ysV9ReturnPatched) continue;
      const text=(box.innerText||box.textContent||'').trim();
      const visible=!!(box.offsetWidth || box.offsetHeight || box.getClientRects().length);
      if(!visible) continue;
      const looksEnd=/게임 종료|결과|최종 점수|다시 도전|다시 시작|Game Over|종료/.test(text);
      if(!looksEnd) continue;
      const target=box.querySelector('.btns,.row,.modal-box,.card,.ys-arcade-end-actions') || box;
      if(!(target.querySelector&&target.querySelector('.ys-v9-mainboard-end'))){
        const b=document.createElement('button'); b.type='button'; b.className='btn dark ys-v9-mainboard-end ys-v8-mainboard-end'; b.textContent='🏠 100게임 메인보드'; b.onclick=goMainboard; target.appendChild(b);
      }
      if(window.YS_GAME_FINISH && !document.getElementById('ys-v9-result') && /게임 종료|최종 점수|Game Over/.test(text)){
        // 기존 종료창은 유지하되, 공통 결과 함수에 별 저장 정보만 넘깁니다. 자동 오버레이 남발 방지.
        try{ window.YS_SAVE_LEARNING_STARS && window.YS_SAVE_LEARNING_STARS(false, {score:0}); }catch(e){}
      }
      box.__ysV9ReturnPatched=true;
    }
  }
  function patchCommonFinishers(){
    if(window.Arcade && !window.Arcade.__ysV9FinishPatched){
      window.Arcade.__ysV9FinishPatched=true;
      if(typeof window.Arcade.finish==='function'){
        const orig=window.Arcade.finish.bind(window.Arcade);
        window.Arcade.finish=function(){ const r=orig.apply(this,arguments); try{ if(window.YS_GAME_FINISH) window.YS_GAME_FINISH({score:arguments[0]&&arguments[0].score}); }catch(e){} return r; };
      }
    }
  }
  function decorateDashboard(){
    if(!isDashboard) return;
    document.body.classList.add('ys-v9-dashboard-ready');
    const hero=document.querySelector('.heroBox');
    if(hero && !hero.querySelector('.ys-v9-dashboard-note')){
      const n=document.createElement('div'); n.className='notice ys-v9-dashboard-note';
      n.innerHTML='<b>V10 적용:</b> 공통 UI 안정화는 유지하고, 게임 진행 속도와 적군 등장 템포를 조금 높여 더 다이나믹하게 조정했습니다.';
      hero.appendChild(n);
    }
  }
  function init(){
    cleanupClutter(); patchSound(); patchLinks(); tidyControls(); patchCommonFinishers(); decorateDashboard(); ensureResultMainboardButton();
    const mo=new MutationObserver(()=>{cleanupClutter(); patchLinks(); tidyControls(); ensureResultMainboardButton();});
    mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
    setInterval(()=>{patchSound(); cleanupClutter(); patchLinks(); ensureResultMainboardButton();},1800);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
