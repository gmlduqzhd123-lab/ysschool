/* YSSCHOOL difficulty bridge V13: dynamic fair balance + faster direct character movement. */
(function(){
  'use strict';
  if(window.__YS_DIFFICULTY_V13__) return; window.__YS_DIFFICULTY_V13__=true;
  const params = new URLSearchParams(location.search);
  const grade = params.get('grade') || localStorage.getItem('ys_game_grade') || 'lower';
  const difficulty = params.get('difficulty') || localStorage.getItem('ys_game_difficulty') || 'easy';
  try{ localStorage.setItem('ys_game_grade', grade); localStorage.setItem('ys_game_difficulty', difficulty); }catch(e){}
  const PRESETS = {
    // V10 balance: V9 was intentionally very gentle; this restores movement speed and enemy pressure
    // while keeping enough lives, items, and mistake grace for elementary students.
    easy: {key:'easy', label:'다이나믹 쉬움', speed:0.70, spawn:1.55, timeMul:2.08, timeAdd:110, lives:11, maxLives:13, answerLimit:2, itemMul:2.35, correctBias:0.86, levelEvery:11, graceMistakes:2, tetrisStartDelay:780, tetrisMinDelay:300, tetrisLevelDrop:30, puzzleEnergy:34, rampMax:1.22, playerMove:1.34, laneSnap:1.38, shooterStep:1.38, note:'쉽지만 캐릭터 이동은 답답하지 않은 활동형 난이도'},
    normal: {key:'normal', label:'균형 보통', speed:0.86, spawn:1.33, timeMul:1.82, timeAdd:85, lives:9, maxLives:11, answerLimit:3, itemMul:1.85, correctBias:0.78, levelEvery:9, graceMistakes:2, tetrisStartDelay:680, tetrisMinDelay:250, tetrisLevelDrop:36, puzzleEnergy:27, rampMax:1.30, playerMove:1.28, laneSnap:1.32, shooterStep:1.32, note:'고학년도 지루하지 않게 즐기는 표준 난이도'},
    challenge: {key:'challenge', label:'신나는 도전', speed:1.02, spawn:1.12, timeMul:1.55, timeAdd:60, lives:8, maxLives:10, answerLimit:3, itemMul:1.45, correctBias:0.70, levelEvery:8, graceMistakes:1, tetrisStartDelay:590, tetrisMinDelay:205, tetrisLevelDrop:42, puzzleEnergy:22, rampMax:1.40, playerMove:1.20, laneSnap:1.24, shooterStep:1.26, note:'빠르고 역동적인 고학년 도전 난이도'}
  };
  const gradeLabels = {lower:'1~2학년 추천', middle:'3~4학년 추천', upper:'5~6학년 추천', all:'전체'};
  const preset = PRESETS[difficulty] || PRESETS.easy;
  const started = Date.now();
  const gameId = params.get('game') || ('game_' + (location.pathname||document.title||'unknown').replace(/[^a-z0-9가-힣]+/gi,'_').slice(-60));
  const title = params.get('title') || document.title || '학습 게임';
  const subject = params.get('subject') || '융합';
  const practice = params.get('practice') === '1' || localStorage.getItem('ys_practice_mode') === '1';
  const teacher = localStorage.getItem('ys_teacher_mode') === '1';
  const mute = localStorage.getItem('ys_teacher_mute') === '1';
  const minutes = Math.max(1, Number(localStorage.getItem('ys_teacher_minutes') || 5));
  const starKey = 'ys_stars_' + gameId;
  const visitKey = 'ys_visit_seconds_' + gameId;

  window.YS_GAME_DIFFICULTY = {grade, gradeLabel:gradeLabels[grade]||'전체', difficulty, preset, practice};
  window.YS_easyTime = base => Math.ceil((Number(base)||0)*preset.timeMul + preset.timeAdd);
  window.YS_easyLives = base => Math.max(Number(base)||0, preset.lives);
  window.YS_maxLives = base => Math.max(Number(base)||0, preset.maxLives || preset.lives);
  window.YS_pace = function(){
    const sec = Math.max(0, (Date.now()-started)/1000);
    const rampMax = Number(preset.rampMax)||1.25;
    // Start already lively, then gradually speed up after students understand the rule.
    const ramp = 1 + Math.min(rampMax-1, sec/110*(rampMax-1));
    return ramp;
  };
  window.YS_speed = base => (Number(base)||0) * preset.speed * window.YS_pace();
  // V13 movement helpers: only the player/controlled character becomes more responsive.
  // Enemy/object tempo is still controlled by YS_speed and YS_spawnGap, so difficulty does not spike unexpectedly.
  window.YS_playerSpeed = base => (Number(base)||0) * (Number(preset.playerMove)||1.25);
  window.YS_laneSnap = base => (Number(base)||0) * (Number(preset.laneSnap)||1.3);
  window.YS_playerStep = base => (Number(base)||0) * (Number(preset.shooterStep)||1.3);
  window.YS_spawnGap = base => Math.max(0.45, (Number(base)||0) * preset.spawn / Math.sqrt(window.YS_pace()));
  let __ysMissCount = 0;
  window.YS_miss = function(current){
    const cur = Number(current)||0; __ysMissCount++;
    const grace = Math.max(1, Number(preset.graceMistakes)||1);
    if(grace>1 && (__ysMissCount % grace)!==0) return cur;
    return Math.max(0, cur-1);
  };
  window.YS_heal = function(current, amount=2){ return Math.min(window.YS_maxLives(preset.maxLives||preset.lives), (Number(current)||0)+amount); };
  window.YS_itemChance = base => Math.min(0.90, (Number(base)||0.25) * (preset.itemMul||1));
  window.YS_limitChoices = function(choices, answer){
    if(!Array.isArray(choices)) return choices;
    const limit = Math.max(2, preset.answerLimit || choices.length);
    if(choices.length<=limit) return choices.slice();
    const ans = choices.find(c=>String(c)===String(answer)) ?? answer;
    const rest = choices.filter(c=>String(c)!==String(ans));
    for(let i=rest.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [rest[i],rest[j]]=[rest[j],rest[i]]; }
    const picked=[ans, ...rest.slice(0, Math.max(0,limit-1))];
    for(let i=picked.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [picked[i],picked[j]]=[picked[j],picked[i]]; }
    return picked;
  };
  window.YS_correctOrDistractor = function(answer, wrongs){ if(Math.random() < preset.correctBias) return answer; wrongs = Array.isArray(wrongs) ? wrongs : []; return wrongs[Math.floor(Math.random()*wrongs.length)] || answer; };

  function safeDashboardUrl(){
    try{ const r = params.get('return'); if(r) return new URL(r, location.href).href; }catch(e){}
    try{ const saved = sessionStorage.getItem('ys_dashboard_url') || localStorage.getItem('ys_dashboard_url'); if(saved) return new URL(saved, location.href).href; }catch(e){}
    try{ return new URL('../learning-games-all/index.html', location.href).href; }catch(e){}
    return '../learning-games-all/index.html';
  }
  window.YS_MAINBOARD_URL = safeDashboardUrl;
  window.YS_GO_DASHBOARD = function(){
    try{sessionStorage.setItem('ys_dashboard_force_render','1');sessionStorage.setItem('ys_dashboard_last_returned_at', String(Date.now()));}catch(e){}
    location.href = safeDashboardUrl();
  };
  window.YS_RETURN_TO_MAINBOARD = window.YS_GO_DASHBOARD;

  function getStars(){ try{return Number(localStorage.getItem(starKey)||0)||0;}catch(e){return 0;} }
  function setStars(n){ try{localStorage.setItem(starKey, String(Math.max(getStars(), Math.min(3,n)))); localStorage.setItem('ys_last_star_game', gameId); localStorage.setItem('ys_last_star_at', String(Date.now()));}catch(e){} }
  function saveVisit(){ try{const sec=Math.round((Date.now()-started)/1000); localStorage.setItem(visitKey, String(Math.max(Number(localStorage.getItem(visitKey)||0)||0, sec)));}catch(e){} }
  function scoreGuess(){
    const ids=['score','points','best','점수'];
    for(const id of ids){ const el=document.getElementById(id); if(el){ const m=String(el.textContent||'').replace(/,/g,'').match(/-?\d+/); if(m) return Number(m[0]); } }
    const txt=(document.body.innerText||'').slice(0,6000); const m=txt.replace(/,/g,'').match(/점수\s*[:：]?\s*(\d+)/); return m?Number(m[1]):0;
  }
  function starByEvidence(details={}){
    const sec = Number(details.time)||Math.round((Date.now()-started)/1000);
    const score = Number(details.score)||scoreGuess()||0;
    const correct = Number(details.correct)||0;
    const wrong = Number(details.wrong)||0;
    const attempts = correct + wrong;
    const rate = attempts>0 ? correct/attempts : 0;
    let n=0;
    if(sec>=60 || attempts>=3 || score>0) n=1;
    if(sec>=120 || correct>=5 || score>=200 || rate>=0.65 && attempts>=5) n=2;
    if(!practice && (sec>=210 || correct>=8 || score>=600 || rate>=0.80 && attempts>=8)) n=3;
    if(practice) n=Math.min(n,2);
    return Math.max(1,n||1);
  }
  function toast(msg){
    let t=document.getElementById('ys-v9-toast');
    if(!t){t=document.createElement('div');t.id='ys-v9-toast';document.body.appendChild(t);}
    t.textContent=msg; t.classList.add('show'); clearTimeout(t._ysT); t._ysT=setTimeout(()=>t.classList.remove('show'),2200);
  }
  function firstSubject(){ return String(subject||'융합').split(/[·/]/)[0]; }
  const subjectTip = {
    '국어':'중심 낱말을 찾고 왜 그 답을 골랐는지 한 문장으로 말해 보세요.',
    '수학':'정답뿐 아니라 계산 과정이나 규칙을 말로 설명해 보세요.',
    '과학':'개념을 생활 속 예시와 연결하면 기억이 오래 남습니다.',
    '사회':'사람·장소·규칙·가치를 함께 떠올리며 선택해 보세요.',
    '영어':'뜻을 먼저 떠올린 뒤 단어를 소리 내어 읽어 보세요.',
    '안전':'나와 친구를 지키는 행동인지 생각하며 선택해 보세요.'
  };
  function recap(){
    let modal=document.getElementById('ys-v9-recap');
    if(!modal){
      modal=document.createElement('div'); modal.id='ys-v9-recap';
      modal.innerHTML='<div class="ys-v9-recap-card"><button class="ys-v9-x" type="button">×</button><h2>🧠 10초 복습 카드</h2><h3></h3><p class="tip"></p><textarea placeholder="오늘 배운 점을 한 문장으로 적어 보세요."></textarea><div class="ys-v9-row"><button type="button" class="ys-v9-star">⭐ 별 저장</button><button type="button" class="ys-v9-home">🏠 메인보드</button></div></div>';
      document.body.appendChild(modal);
      modal.querySelector('.ys-v9-x').onclick=()=>modal.classList.remove('show');
      modal.querySelector('.ys-v9-star').onclick=()=>earnStars(true);
      modal.querySelector('.ys-v9-home').onclick=()=>window.YS_GO_DASHBOARD();
    }
    modal.querySelector('h3').textContent=title;
    modal.querySelector('.tip').textContent=subjectTip[firstSubject()] || '맞힌 것과 헷갈린 것을 하나씩 떠올려 보세요.';
    modal.classList.add('show');
  }
  function earnStars(manual, details){
    const n=starByEvidence(details||{}); setStars(n); saveVisit(); updateHub(); toast((manual?'별 저장 완료! ':'결과 저장 완료! ') + '⭐'.repeat(n)); return n;
  }
  window.YS_SAVE_LEARNING_STARS = earnStars;
  window.YS_SHOW_RECAP = recap;

  function resultOverlay(details={}){
    const n=earnStars(false, details);
    let ov=document.getElementById('ys-v9-result');
    if(!ov){ ov=document.createElement('div'); ov.id='ys-v9-result'; document.body.appendChild(ov); }
    const sc = details.score!=null ? details.score : scoreGuess();
    ov.innerHTML=`<div class="ys-v9-result-card"><h2>🎉 게임 결과</h2><h3>${title}</h3><p>점수 <b>${sc||0}</b>점 · 획득 별 <b>${'⭐'.repeat(n)}</b></p><p class="ys-v9-small">별은 단순 접속이 아니라 플레이 시간, 점수, 정답 시도 기준으로 저장됩니다.</p><div class="ys-v9-row"><button type="button" id="ys-v9-retry">↻ 다시 하기</button><button type="button" id="ys-v9-result-recap">🧠 복습 카드</button><button type="button" id="ys-v9-result-home">🏠 100게임 메인보드</button></div></div>`;
    ov.classList.add('show');
    document.getElementById('ys-v9-retry').onclick=()=>location.reload();
    document.getElementById('ys-v9-result-recap').onclick=recap;
    document.getElementById('ys-v9-result-home').onclick=()=>window.YS_GO_DASHBOARD();
  }
  window.YS_GAME_FINISH = resultOverlay;

  function patchMute(){
    if(!mute) return;
    document.body.classList.add('ys-teacher-muted');
    try{ if(window.Sound){ window.Sound.enabled=false; window.Sound.muted=true; if(window.Sound.stopBgm) window.Sound.stopBgm(); if(window.Sound.stop) window.Sound.stop(); } }catch(e){}
    try{ if(window.ArcadeMini && window.ArcadeMini.AudioKit){ window.ArcadeMini.AudioKit.muted=true; if(window.ArcadeMini.AudioKit.music) window.ArcadeMini.AudioKit.music(false); } }catch(e){}
  }
  function updateHub(){
    const label=document.getElementById('ys-v9-hub-label'); if(label) label.textContent=`${gradeLabels[grade]||'전체'} · ${preset.label}${practice?' · 연습':''}`;
    const s=document.getElementById('ys-v9-star-status'); if(s) s.textContent='저장 별 ' + '⭐'.repeat(getStars()) + '☆'.repeat(Math.max(0,3-getStars()));
  }
  function buildHub(){
    if(document.getElementById('ys-v9-hub')) return;
    const hub=document.createElement('div'); hub.id='ys-v9-hub';
    hub.innerHTML=`<button type="button" id="ys-v9-menu-btn">☰ 수업메뉴</button><div id="ys-v9-menu" hidden><div id="ys-v9-hub-label"></div><div id="ys-v9-star-status"></div><button type="button" id="ys-v9-home">🏠 메인보드</button><button type="button" id="ys-v9-star-save">⭐ 별 저장</button><button type="button" id="ys-v9-recap-open">🧠 복습 카드</button><button type="button" id="ys-v9-restart">↻ 다시 시작</button><button type="button" id="ys-v9-mute">${mute?'🔇 무음 중':'🔊 소리 정리'}</button><span id="ys-v9-class-timer" hidden></span></div>`;
    document.body.appendChild(hub);
    document.getElementById('ys-v9-menu-btn').onclick=()=>{ const m=document.getElementById('ys-v9-menu'); m.hidden=!m.hidden; };
    document.getElementById('ys-v9-home').onclick=()=>window.YS_GO_DASHBOARD();
    document.getElementById('ys-v9-star-save').onclick=()=>earnStars(true);
    document.getElementById('ys-v9-recap-open').onclick=recap;
    document.getElementById('ys-v9-restart').onclick=()=>location.reload();
    document.getElementById('ys-v9-mute').onclick=()=>{ try{localStorage.setItem('ys_teacher_mute','1');}catch(e){}; location.reload(); };
    updateHub();
  }
  function classTimer(){
    if(!teacher) return;
    const el=document.getElementById('ys-v9-class-timer'); if(!el) return;
    el.hidden=false; const total=minutes*60;
    const tick=()=>{ const left=Math.max(0,total-Math.floor((Date.now()-started)/1000)); const m=Math.floor(left/60), s=String(left%60).padStart(2,'0'); el.textContent='⏱ '+m+':'+s; if(left<=0){el.textContent='⏱ 정리 시간'; recap(); return;} setTimeout(tick,1000); };
    tick();
  }
  function cleanupOld(){
    document.querySelectorAll('#ys-difficulty-badge,#ys-v8-mainboard-fixed,#ys-v7-tools,.ys-v4-mascot,.ys-v4-corner,.ys-v4-sparkle').forEach(el=>el.remove());
  }
  function init(){ cleanupOld(); buildHub(); classTimer(); patchMute(); setInterval(()=>{cleanupOld(); patchMute(); saveVisit(); updateHub();},3000); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
