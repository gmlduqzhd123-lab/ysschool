
/* YS School Elementary Learning Game Engine v6.1 V10 dynamic balance
   - Pure HTML/CSS/Canvas/WebAudio, no external dependencies
   - Mobile first, Vercel public folder ready
*/
(function(){
  'use strict';
  const cfg = window.GAME_CONFIG || {};
  const YS_DIFF = (window.YS_GAME_DIFFICULTY && window.YS_GAME_DIFFICULTY.preset) || {speed:.76, spawn:1.45, timeMul:1.95, timeAdd:95, lives:10, maxLives:12, answerLimit:2, itemMul:2.05, levelEvery:10, graceMistakes:2, rampMax:1.25};
  const $ = (sel, root=document) => root.querySelector(sel);
  const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
  const rand = (min,max)=>Math.random()*(max-min)+min;
  const pick = arr => arr[Math.floor(Math.random()*arr.length)];
  const shuffle = arr => arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
  const safe = fn => { try { return fn(); } catch(e) { reportError(e); } };
  const pace = () => (typeof window.YS_pace === 'function' ? window.YS_pace() : 1);
  function speedMul(){
    // V10: V9 felt too slow in round 1. Keep it fair, but make enemies and falling objects arrive with energy.
    const lv = (typeof state === 'object' && state.level) ? Math.min(0.24, (state.level-1)*0.025) : 0;
    return (Number(YS_DIFF.speed)||1) * pace() * (1+lv);
  }
  function spawnMul(){ return Math.max(0.72, (Number(YS_DIFF.spawn)||1) / Math.sqrt(pace())); }
  let errorBox;
  function reportError(e){
    console.error(e);
    if(errorBox){ errorBox.hidden=false; errorBox.textContent='실행 중 문제가 생겼습니다. 새로고침 후 다시 시작해 주세요. ('+(e && e.message ? e.message : e)+')'; }
  }

  const Sound = {
    ctx:null, enabled:true, bgmOn:false, master:null, lowpass:null, bgmNodes:[], tempo:0,
    init(){
      if(this.ctx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if(!AudioContext) return;
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.11;
      this.lowpass = this.ctx.createBiquadFilter();
      this.lowpass.type='lowpass'; this.lowpass.frequency.value = 4800;
      this.lowpass.connect(this.master); this.master.connect(this.ctx.destination);
    },
    resume(){ this.init(); if(this.ctx && this.ctx.state==='suspended') this.ctx.resume(); },
    tone(freq=440, dur=0.12, type='sine', vol=0.18, bend=0){
      if(!this.enabled) return; this.resume(); if(!this.ctx) return;
      const t=this.ctx.currentTime, osc=this.ctx.createOscillator(), g=this.ctx.createGain();
      osc.type=type; osc.frequency.setValueAtTime(freq,t);
      if(bend) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq+bend), t+dur);
      g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+0.01); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      osc.connect(g); g.connect(this.lowpass); osc.start(t); osc.stop(t+dur+0.02);
    },
    noise(dur=0.12, vol=0.08){
      if(!this.enabled) return; this.resume(); if(!this.ctx) return;
      const buffer=this.ctx.createBuffer(1, this.ctx.sampleRate*dur, this.ctx.sampleRate);
      const data=buffer.getChannelData(0); for(let i=0;i<data.length;i++) data[i]=Math.random()*2-1;
      const src=this.ctx.createBufferSource(); src.buffer=buffer;
      const g=this.ctx.createGain(); const t=this.ctx.currentTime;
      g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
      src.connect(g); g.connect(this.lowpass); src.start(t); src.stop(t+dur);
    },
    fx(name){
      const map={correct:[660,880], wrong:[180,130], item:[520,780,1040], level:[392,523,659,784], click:[420], pop:[720,540], lose:[220,160,100], start:[440,660,880]};
      const seq=map[name]||map.click;
      seq.forEach((f,i)=>setTimeout(()=>this.tone(f, name==='wrong'?0.18:0.1, name==='wrong'?'sawtooth':'triangle', name==='wrong'?0.09:0.12, name==='wrong'?-30:20), i*70));
      if(name==='wrong'||name==='lose') this.noise(0.16,0.035);
    },
    startBgm(){
      if(this.bgmOn || !this.enabled) return; this.resume(); if(!this.ctx) return;
      this.bgmOn=true; const scale=(cfg.sound&&cfg.sound.scale)||[261.63,329.63,392,523.25]; let step=0;
      const loop=()=>{
        if(!this.bgmOn || !this.enabled) return;
        const f=scale[step%scale.length] * (step%8===7?1.5:1);
        this.tone(f,0.16, step%4===0?'square':'triangle', 0.045, 5);
        if(step%4===0) this.tone(f/2,0.22,'sine',0.032,0);
        step++;
        this.tempo=setTimeout(loop, 260);
      };
      loop();
    },
    stopBgm(){ this.bgmOn=false; clearTimeout(this.tempo); },
    toggle(){ this.enabled=!this.enabled; if(!this.enabled) this.stopBgm(); else this.startBgm(); return this.enabled; }
  };
  window.Sound = Sound;

  class Store {
    static key(s){ return 'ys_game_'+(cfg.id||'game')+'_'+s; }
    static get(s, d=''){ try{return localStorage.getItem(Store.key(s)) ?? d;}catch(e){return d;} }
    static set(s,v){ try{localStorage.setItem(Store.key(s), String(v));}catch(e){} }
  }

  const state = {
    running:false, paused:false, low:false, mode: cfg.mode || 'catcher', score:0, best:0, lives:3,
    level:1, combo:0, maxCombo:0, streak:0, wrong:0, time:0, timeLeft:300, mission:'', missionDone:false,
    qIndex:0, activeQ:null, entities:[], particles:[], player:{x:360,y:420,w:56,h:56,lane:1,shield:0,magnet:0,boost:0},
    pressed:{}, selected:[], cards:[], lock:false, sequenceIndex:0, lessonLog:[], nextSpawn:0, bins:null, maze:null, lastTs:0
  };

  const root = document.createElement('div');
  root.id='ys-game-root';
  document.body.innerHTML='';
  document.body.appendChild(root);
  const style = document.createElement('style');
  style.textContent = `
    :root{--bg1:${cfg.theme?.bg1||'#0f172a'};--bg2:${cfg.theme?.bg2||'#1d4ed8'};--accent:${cfg.theme?.accent||'#fbbf24'};--card:rgba(255,255,255,.12);--line:rgba(255,255,255,.2);}
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent} body{margin:0;min-height:100dvh;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:radial-gradient(circle at 20% 10%,rgba(255,255,255,.18),transparent 28%),linear-gradient(135deg,var(--bg1),var(--bg2));color:#fff;overflow:hidden;touch-action:none}.wrap{width:min(1120px,100vw);height:100dvh;margin:0 auto;display:grid;grid-template-rows:auto auto 1fr auto;gap:8px;padding:10px}.top{display:flex;gap:8px;align-items:center;justify-content:space-between}.brand{min-width:0}.eyebrow{font-size:12px;opacity:.8}.title{font-size:clamp(20px,4vw,36px);font-weight:1000;line-height:1.05;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}.chip{background:rgba(0,0,0,.22);border:1px solid var(--line);border-radius:999px;padding:6px 9px;font-size:12px;font-weight:800}.panel{display:grid;grid-template-columns:1.2fr .8fr;gap:8px}.quest,.tip{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:10px;box-shadow:0 12px 40px rgba(0,0,0,.18)}.quest b,.tip b{color:var(--accent)}.gamebox{position:relative;min-height:0;background:rgba(0,0,0,.18);border:1px solid var(--line);border-radius:24px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.28)}canvas{display:block;width:100%;height:100%;min-height:320px}.overlay{position:absolute;inset:0;display:grid;place-items:center;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.55));padding:18px;text-align:center}.modal{width:min(560px,92vw);background:rgba(15,23,42,.9);border:1px solid var(--line);border-radius:26px;padding:20px;backdrop-filter:blur(10px);box-shadow:0 24px 70px rgba(0,0,0,.38)}.modal h2{margin:0 0 10px;font-size:28px}.modal p{line-height:1.55;color:#e5e7eb}.btns,.answers,.tools{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.btn{border:0;border-radius:16px;background:#fff;color:#111827;padding:11px 14px;font-weight:1000;box-shadow:0 8px 20px rgba(0,0,0,.2);cursor:pointer}.btn.primary{background:var(--accent);color:#111}.btn.dark{background:rgba(0,0,0,.35);color:#fff;border:1px solid var(--line)}.btn:active{transform:scale(.96)}.answers{position:absolute;left:8px;right:8px;bottom:8px}.answers .btn{min-width:92px;max-width:31%;flex:1 1 90px}.tools{align-items:center;justify-content:space-between;background:rgba(0,0,0,.18);border:1px solid var(--line);border-radius:20px;padding:8px}.joystick{display:flex;gap:8px}.mini{font-size:12px;padding:8px 10px}.error{position:absolute;z-index:10;left:10px;right:10px;top:10px;padding:10px;border-radius:14px;background:#991b1b;color:white;font-weight:800}.log{white-space:pre-wrap;text-align:left;background:rgba(255,255,255,.08);border-radius:16px;padding:12px;max-height:240px;overflow:auto}.hide{display:none!important}@media (max-width:720px){.wrap{padding:7px;gap:6px}.panel{grid-template-columns:1fr}.tip{display:none}.chips{justify-content:flex-start}.chip{font-size:11px;padding:5px 7px}.tools{gap:6px}.answers .btn{max-width:none;font-size:13px;padding:10px 8px}.title{font-size:22px}canvas{min-height:360px}.btn{padding:10px 11px}.joystick .btn{min-width:44px}}`;
  document.head.appendChild(style);

  root.innerHTML = `
    <div class="wrap">
      <div class="top">
        <div class="brand"><div class="eyebrow">${cfg.pack||'초등 학습 게임'} · ${cfg.subject||'융합'}</div><div class="title">${cfg.icon||'🎮'} ${cfg.title||'학습 게임'}</div></div>
        <div class="chips"><span class="chip">점수 <b id="score">0</b></span><span class="chip">최고 <b id="best">0</b></span><span class="chip">LV <b id="level">1</b></span><span class="chip">❤ <b id="lives">3</b></span><span class="chip">콤보 <b id="combo">0</b></span></div>
      </div>
      <div class="panel"><div class="quest"><b>학습 목표</b> <span id="goal"></span><br><b>현재 문제</b> <span id="question">시작 버튼을 눌러 주세요.</span></div><div class="tip"><b>오늘의 도전</b> <span id="mission"></span><br><b>배움 팁</b> <span id="tip"></span></div></div>
      <div class="gamebox" id="gamebox"><div class="error" id="err" hidden></div><canvas id="canvas" width="960" height="540"></canvas><div class="answers" id="answers"></div><div class="overlay" id="overlay"><div class="modal"><h2>${cfg.icon||'🎮'} ${cfg.title||'학습 게임'}</h2><p>${cfg.intro||'정답을 찾으며 점수와 콤보를 올려 보세요.'}</p><p><b>조작</b> ${cfg.controls||'마우스·터치로 이동하고 정답을 고르세요.'}</p><div class="btns"><button class="btn primary" id="startBtn">▶ 시작하기</button><button class="btn dark" id="soundTest">🔊 소리 테스트</button><a class="btn dark" href="./index.html">목록</a></div></div></div></div>
      <div class="tools"><div class="joystick"><button class="btn dark mini" data-act="left">◀</button><button class="btn dark mini" data-act="up">▲</button><button class="btn dark mini" data-act="down">▼</button><button class="btn dark mini" data-act="right">▶</button></div><div class="btns"><button class="btn dark mini" id="pauseBtn">⏸</button><button class="btn dark mini" id="muteBtn">🔊</button><button class="btn dark mini" id="fullscreenBtn">⛶</button><button class="btn dark mini" id="lowBtn">저사양 OFF</button><button class="btn dark mini" id="classBtn">수업 모드</button><button class="btn dark mini" id="logBtn">기록장</button><a class="btn dark mini" href="${cfg.homeUrl||'/'}">홈</a></div></div>
    </div>`;
  errorBox = $('#err');
  const canvas = $('#canvas'), ctx = canvas.getContext('2d');
  const ui = {score:$('#score'),best:$('#best'),level:$('#level'),lives:$('#lives'),combo:$('#combo'),goal:$('#goal'),question:$('#question'),mission:$('#mission'),tip:$('#tip'),overlay:$('#overlay'),answers:$('#answers'),gamebox:$('#gamebox')};
  let W=960,H=540, DPR=1;
  function resize(){
    const rect=ui.gamebox.getBoundingClientRect(); DPR=Math.min(window.devicePixelRatio||1,2); W=Math.floor(rect.width*DPR); H=Math.floor(rect.height*DPR);
    canvas.width=W; canvas.height=H; ctx.setTransform(DPR,0,0,DPR,0,0); W=rect.width; H=rect.height;
  }
  window.addEventListener('resize', resize); resize();

  const questions = (cfg.questions||[]).slice();
  const missions = cfg.missions || ['콤보 5 달성하기','정답 10개 맞히기','아이템 3개 사용하기','오답 없이 1분 버티기'];
  const tips = cfg.tips || ['정답을 고른 뒤 왜 맞는지 한 문장으로 말해 보세요.'];
  function currentQuestion(){ if(!questions.length) return {q:'2+3은?', a:'5', choices:['4','5','6'], tip:'덧셈은 수를 합하는 계산입니다.'}; if(state.qIndex>=questions.length) state.qIndex=0; const q=questions[state.qIndex++]; state.activeQ=q; return q; }
  function refreshQ(q){ if(q) state.activeQ=q; q=state.activeQ||currentQuestion(); ui.question.textContent=q.q || '정답을 찾아 보세요.'; ui.tip.textContent=q.tip || pick(tips); renderAnswers(q); }
  function renderAnswers(q){
    ui.answers.innerHTML='';
    if(['defense','boss','maze','builder'].includes(state.mode)){
      let choices=shuffle((q.choices&&q.choices.length?q.choices:[q.a]).slice());
      if(window.YS_limitChoices) choices=YS_limitChoices(choices, q.a);
      choices.forEach(ch=>{ const b=document.createElement('button'); b.className='btn'; b.textContent=ch; b.onclick=()=>answer(ch); ui.answers.appendChild(b); });
    }
  }
  function setMission(){ state.mission=pick(missions); ui.mission.textContent=state.mission; }
  function addLog(text){ state.lessonLog.unshift(new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})+' · '+text); if(state.lessonLog.length>12) state.lessonLog.pop(); }
  function updateUI(){ ui.score.textContent=state.score; ui.best.textContent=state.best; ui.level.textContent=state.level; ui.lives.textContent=state.lives; ui.combo.textContent=state.combo; }
  function scoreTitle(){ if(state.score>=2000) return '레전드 마스터'; if(state.score>=1200) return '학습 챔피언'; if(state.score>=600) return '성장왕'; if(state.score>=250) return '도전자'; return '연습생'; }
  function correct(msg='정답!'){
    state.combo++; state.maxCombo=Math.max(state.maxCombo,state.combo); state.streak++;
    const gain=20 + state.level*3 + Math.min(60,state.combo*3) + (state.player.boost>0?20:0);
    state.score += gain; if(state.score>state.best){state.best=state.score; Store.set('best',state.best);}
    if(state.streak>0 && state.streak%(YS_DIFF.levelEvery||9)===0){ state.level++; state.timeLeft+=10; Sound.fx('level'); addFloating('LEVEL UP!', W/2, H*.32, '#fde047'); }
    Sound.fx('correct'); addFloating('+'+gain+' '+msg, W/2, H*.42, '#bbf7d0'); addLog(msg+' 점수 +'+gain);
    refreshQ(currentQuestion()); updateUI();
  }
  function wrong(msg='아쉬워요'){
    if(state.player.shield>0){ state.player.shield--; Sound.fx('pop'); addFloating('방패가 막았어요!', W/2, H*.45, '#93c5fd'); return; }
    state.combo=0; state.wrong++; const before=state.lives; state.lives=(typeof YS_miss==='function'?YS_miss(state.lives):Math.max(0,state.lives-1)); Sound.fx('wrong'); addFloating(before===state.lives?'연습 기회! 생명 유지':msg, W/2, H*.45, '#fecaca'); addLog((before===state.lives?'실수했지만 생명 유지 · ':'')+msg+' 다시 도전');
    if(state.lives<=0) endGame(); updateUI();
  }
  function answer(ch){
    Sound.fx('click'); if(!state.running || state.paused) return;
    const q=state.activeQ || currentQuestion();
    if(String(ch)===String(q.a)) correct('정답 선택'); else wrong('오답 선택');
    if(state.mode==='maze') mazeMovePending();
    if(state.mode==='boss') spawnBurst();
  }
  function item(type,x,y){
    const effects={shield:'방패',magnet:'자석',time:'시간+15',bomb:'폭탄',boost:'더블점수',life:'생명+1',freeze:'빙결'};
    Sound.fx('item'); addFloating('✨ '+(effects[type]||'아이템'), x||W/2, y||H/2, '#fde68a');
    if(type==='shield') state.player.shield+=2;
    if(type==='magnet') state.player.magnet=9;
    if(type==='time') state.timeLeft+=25;
    if(type==='bomb'){ state.entities=state.entities.filter(e=>e.kind==='item'); state.score+=80; }
    if(type==='boost') state.player.boost=10;
    if(type==='life') state.lives=(typeof YS_heal==='function'?YS_heal(state.lives,2):Math.min(YS_DIFF.maxLives||14,state.lives+2));
    if(type==='freeze') state.entities.forEach(e=>e.freeze=2.5);
    addLog('아이템 사용: '+(effects[type]||type)); updateUI();
  }
  function addFloating(text,x,y,color){ state.particles.push({text,x,y,vy:-25,life:1.1,color}); }
  function spawnBurst(){ for(let i=0;i<18;i++) state.particles.push({x:W/2,y:H/2,vx:rand(-80,80),vy:rand(-80,30),life:0.8,r:rand(2,5),color:pick(['#fbbf24','#a7f3d0','#bfdbfe','#fecaca'])}); }

  function start(){ safe(()=>{
    state.running=true; state.paused=false; state.score=0; state.lives=YS_DIFF.lives; state.level=1; state.combo=0; state.streak=0; state.time=0; state.timeLeft=Math.ceil(300*YS_DIFF.timeMul+YS_DIFF.timeAdd); state.entities=[]; state.particles=[]; state.qIndex=0; state.best=Number(Store.get('best','0'))||0;
    ui.goal.textContent=cfg.goal||'놀이 속에서 핵심 개념을 반복 연습합니다.'; setMission(); refreshQ(currentQuestion()); initMode(); ui.overlay.classList.add('hide'); Sound.fx('start'); Sound.startBgm(); updateUI(); requestAnimationFrame(loop);
  }); }
  function endGame(){
    state.running=false; Sound.fx('lose'); Sound.stopBgm();
    ui.overlay.classList.remove('hide');
    const title=scoreTitle();
    ui.overlay.innerHTML=`<div class="modal"><h2>🎉 결과: ${title}</h2><p>점수 <b>${state.score}</b>점 · 최고 콤보 <b>${state.maxCombo}</b> · 레벨 <b>${state.level}</b></p><p>오늘 배운 내용을 기록장에 한 줄로 남기면 학습 효과가 더 좋아집니다.</p><div class="log">${state.lessonLog.slice(0,6).join('\n') || '기록이 아직 없습니다.'}</div><div class="btns" style="margin-top:12px"><button class="btn primary" id="againBtn">다시 도전</button><button class="btn dark ys-v8-mainboard-end" id="mainboardBtn">🏠 100게임 메인보드</button></div></div>`;
    $('#againBtn').onclick=()=>{ ui.overlay.innerHTML=''; location.reload(); }; const mb=$('#mainboardBtn'); if(mb) mb.onclick=()=>{ if(window.YS_RETURN_TO_MAINBOARD) window.YS_RETURN_TO_MAINBOARD(); else location.href=(cfg.homeUrl||'../learning-games-all/index.html'); };
  }
  function pause(){ state.paused=!state.paused; $('#pauseBtn').textContent=state.paused?'▶':'⏸'; if(!state.paused && state.running) requestAnimationFrame(loop); }

  function initMode(){
    state.entities=[]; state.selected=[]; state.cards=[]; state.sequenceIndex=0; state.nextSpawn=0;
    const p=state.player; p.x=W/2; p.y=H-86; p.lane=1; p.shield=0; p.magnet=0; p.boost=0;
    if(state.mode==='memory') initMemory();
    if(state.mode==='builder') initBuilder();
    if(state.mode==='sorting') initSorting();
    if(state.mode==='maze') initMaze();
  }
  function initSorting(){ state.bins={left:cfg.categories?.[0]||'왼쪽', right:cfg.categories?.[1]||'오른쪽'}; ui.question.textContent='떨어지는 카드를 알맞은 분류로 보내세요.'; ui.answers.innerHTML=''; }
  function initBuilder(){
    let seq=(cfg.sequence||['계획','실행','점검']).slice(); if((YS_DIFF.answerLimit||4)<=2) seq=seq.slice(0,3); state.sequence=seq; state.sequenceIndex=0;
    ui.question.textContent='순서에 맞게 블록을 터치하세요: '+seq.join(' → ');
    ui.answers.innerHTML=''; shuffle(seq).forEach(s=>{ const b=document.createElement('button'); b.className='btn'; b.textContent=s; b.onclick=()=>{ if(s===state.sequence[state.sequenceIndex]){state.sequenceIndex++; correct('순서 맞춤'); if(state.sequenceIndex>=state.sequence.length){state.sequenceIndex=0; state.sequence=shuffle(state.sequence); ui.question.textContent='새 순서: '+seq.join(' → ');} }else wrong('순서 확인'); }; ui.answers.appendChild(b); });
  }
  function initMemory(){
    ui.answers.innerHTML=''; const pairs=(cfg.pairs||questions.slice(0,6).map(q=>[q.q,q.a])).slice(0,(YS_DIFF.answerLimit||4)<=2?4:6); let vals=[]; pairs.forEach((p,i)=>{ vals.push({t:p[0],id:i}); vals.push({t:p[1],id:i}); }); vals=shuffle(vals);
    state.cards=vals.map((v,i)=>({ ...v, i, open:false, done:false }));
  }
  function initMaze(){
    state.maze={x:0,y:0,w:5,h:5,pending:null}; ui.answers.innerHTML=''; refreshQ(currentQuestion());
  }
  function spawnFalling(){
    const q=state.activeQ || currentQuestion(); const choices=shuffle((q.choices||[q.a]).slice());
    const text=pick(choices); const kind=Math.random()<(.12*(YS_DIFF.itemMul||1))?'item':'choice';
    const itemType=pick(['shield','magnet','time','bomb','boost','life','freeze']);
    state.entities.push({kind, text:kind==='item'?'?':text, answer:text, correct:String(text)===String(q.a), itemType, x:rand(34,W-34), y:-40, r:rand(24,36), vy:(rand(70,115)+state.level*5)*speedMul(), freeze:0});
  }
  function spawnLane(){
    const q=state.activeQ || currentQuestion(); const laneCount=3; const laneW=W/laneCount;
    const correctLane=Math.floor(rand(0,laneCount));
    const choices=shuffle((q.choices||[q.a]).filter(c=>String(c)!==String(q.a))).slice(0,2);
    for(let l=0;l<laneCount;l++){
      const isC=l===correctLane; const text=isC?q.a:(choices.pop()||pick(q.choices||['?']));
      state.entities.push({kind:Math.random()<(.1*(YS_DIFF.itemMul||1))?'item':'lane', text:isC?q.a:text, correct:isC, itemType:pick(['shield','time','boost','life']), x:laneW*l+laneW/2, y:-50, r:34, vy:(112+state.level*9)*speedMul(), lane:l, freeze:0});
    }
  }
  function spawnDefense(){
    const q=state.activeQ || currentQuestion(); state.entities.push({kind:'enemy', text:q.q.replace(/.*:/,'').slice(0,12)||'몬스터', x:W+50, y:rand(95,H-110), w:90, h:42, vx:-(62+state.level*9)*speedMul(), hp:1+Math.floor(state.level/3), freeze:0});
  }
  function spawnRhythm(){
    const q=state.activeQ || currentQuestion(); const choices=shuffle((q.choices||[q.a]).slice());
    state.entities.push({kind:'note', text:pick(choices), answer:null, correct:null, x:rand(80,W-80), y:-30, r:28, vy:(142+state.level*9)*speedMul(), targetY:H-105, freeze:0});
  }
  function spawnSorting(){
    const items=cfg.sortItems||[]; const it=pick(items.length?items:[{text:'종이',cat:cfg.categories?.[0]||'왼쪽'}]);
    state.entities.push({kind:'sort', text:it.text, cat:it.cat, x:rand(60,W-60), y:-40, r:32, vy:(105+state.level*7)*speedMul(), freeze:0});
  }

  function loop(ts){ safe(()=>{
    if(!state.running || state.paused) return;
    if(!state.lastTs) state.lastTs=ts; let dt=Math.min(0.05,(ts-state.lastTs)/1000||0.016); state.lastTs=ts; state.time+=dt; state.timeLeft-=dt;
    if(state.timeLeft<=0) return endGame();
    state.player.magnet=Math.max(0,state.player.magnet-dt); state.player.boost=Math.max(0,state.player.boost-dt);
    update(dt); draw(); updateUI(); requestAnimationFrame(loop);
  }); }
  function update(dt){
    const p=state.player;
    if(state.pressed.left) p.x-=280*dt; if(state.pressed.right) p.x+=280*dt; if(state.pressed.up) p.y-=280*dt; if(state.pressed.down) p.y+=280*dt;
    p.x=clamp(p.x,28,W-28); p.y=clamp(p.y,60,H-52);
    state.nextSpawn-=dt;
    if(state.nextSpawn<=0){
      if(state.mode==='catcher') spawnFalling();
      if(state.mode==='lane') spawnLane();
      if(state.mode==='defense') spawnDefense();
      if(state.mode==='rhythm') spawnRhythm();
      if(state.mode==='sorting') spawnSorting();
      state.nextSpawn=Math.max(.68, (1.30-state.level*.045)*spawnMul()) * (state.low?1.18:1);
    }
    for(const e of state.entities){
      if(e.freeze>0){e.freeze-=dt; continue;}
      e.y+=(e.vy||0)*dt; e.x+=(e.vx||0)*dt;
      if(p.magnet>0 && (e.kind==='choice'||e.kind==='item'||e.kind==='lane')){ const dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy)||1; if(d<170){ e.x+=dx/d*120*dt; e.y+=dy/d*120*dt; } }
      if(['choice','item','lane'].includes(e.kind) && Math.hypot(e.x-p.x,e.y-p.y)<(e.r+30)){
        e.dead=true; if(e.kind==='item') item(e.itemType,e.x,e.y); else e.correct?correct('획득'):wrong('피해야 할 카드');
      }
      if(e.kind==='enemy' && e.x<80){ e.dead=true; wrong('방어 실패'); }
      if(e.kind==='note' && e.y>H-40){ e.dead=true; wrong('박자 놓침'); }
      if(e.kind==='sort' && e.y>H-40){ e.dead=true; wrong('분류 놓침'); }
      if(e.y>H+80 || e.x<-140) e.dead=true;
    }
    state.entities=state.entities.filter(e=>!e.dead);
    for(const pa of state.particles){ pa.life-=dt; pa.x+=(pa.vx||0)*dt; pa.y+=(pa.vy||0)*dt; }
    state.particles=state.particles.filter(p=>p.life>0);
  }
  function draw(){
    ctx.clearRect(0,0,W,H); drawBg();
    if(state.mode==='memory') return drawMemory();
    if(state.mode==='builder') return drawBuilder();
    if(state.mode==='maze') return drawMaze();
    if(state.mode==='sorting') drawBins();
    if(state.mode==='rhythm') drawRhythmLine();
    drawEntities(); drawPlayer(); drawHud(); drawParticles();
  }
  function drawBg(){
    const g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(1,'rgba(0,0,0,.12)'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.globalAlpha=.18; ctx.fillStyle='#fff'; const size=state.low?80:48; for(let x=0;x<W;x+=size) for(let y=0;y<H;y+=size){ ctx.beginPath(); ctx.arc(x+((y/size)%2)*18,y,1.5,0,Math.PI*2); ctx.fill(); } ctx.globalAlpha=1;
    if(state.mode==='lane'){ ctx.strokeStyle='rgba(255,255,255,.22)'; ctx.lineWidth=3; ctx.setLineDash([8,10]); for(let i=1;i<3;i++){ctx.beginPath();ctx.moveTo(W*i/3,60);ctx.lineTo(W*i/3,H);ctx.stroke();} ctx.setLineDash([]); }
  }
  function drawRoundRect(x,y,w,h,r){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fill(); ctx.stroke(); }
  function drawTextBox(text,x,y,w,h,bg='#fff',fg='#111827'){
    ctx.fillStyle=bg; ctx.strokeStyle='rgba(0,0,0,.18)'; ctx.lineWidth=2; drawRoundRect(x-w/2,y-h/2,w,h,16);
    ctx.fillStyle=fg; ctx.font='900 16px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; wrapText(text,x,y,w-14,18);
  }
  function wrapText(text,x,y,maxWidth,lineHeight){
    text=String(text); const chars=[...text]; let line='', lines=[];
    for(const ch of chars){ const t=line+ch; if(ctx.measureText(t).width>maxWidth && line){lines.push(line); line=ch;} else line=t; }
    lines.push(line); const start=y-(lines.length-1)*lineHeight/2; lines.slice(0,3).forEach((ln,i)=>ctx.fillText(ln,x,start+i*lineHeight));
  }
  function drawEntities(){
    for(const e of state.entities){
      if(e.kind==='enemy'){
        ctx.fillStyle='#ef4444'; ctx.strokeStyle='rgba(255,255,255,.5)'; drawRoundRect(e.x-e.w/2,e.y-e.h/2,e.w,e.h,18);
        ctx.fillStyle='#fff'; ctx.font='900 14px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('👾 '+e.text,e.x,e.y);
      } else {
        const isItem=e.kind==='item'; const bg=isItem?'#fde047':(e.correct?'#86efac':'#fecaca'); const fg='#111827';
        ctx.save(); if(e.freeze>0) ctx.globalAlpha=.55; ctx.beginPath(); ctx.fillStyle=bg; ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=3; ctx.arc(e.x,e.y,e.r||30,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle=fg; ctx.font='900 15px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; wrapText(isItem?'🎁':e.text,e.x,e.y,(e.r||30)*1.7,16); ctx.restore();
      }
    }
  }
  function purposeAvatar(){
    const title=String(cfg.title||'');
    const subject=String(cfg.subject||'');
    const mode=String(state.mode||cfg.mode||'');
    if(/닌자/.test(title)) return '🥷';
    if(/탐정|독해|자료|그래프/.test(title)) return '🕵️';
    if(/러너|런|오비|추격|카트|클라임/.test(title)||mode==='lane') return '🏃';
    if(/우주|로켓|행성|운석|태양계/.test(title)||mode==='shooter') return '🚀';
    if(/로봇|코딩|버그|미로/.test(title)||mode==='maze'||mode==='builder') return '🤖';
    if(/가게|마켓|키친|레시피|타이쿤|공장|배달/.test(title)||mode==='shop') return '🛒';
    if(/과학|회로|전기|소리|빛|물질|연구|몸|기관/.test(title)||subject==='과학') return '🧑‍🔬';
    if(/역사|여수|독도|민주|선거|평화|수호/.test(title)||subject==='사회') return '🛡️';
    if(/영어|단어|문장/.test(title)||subject==='영어') return '🧑‍🏫';
    if(/음표|리듬|음악/.test(title)||mode==='rhythm') return '🎵';
    if(/지도|좌표|드론|지리/.test(title)||mode==='grid') return '🧭';
    if(/도형|넓이|각도|타워/.test(title)||subject==='수학') return '🧩';
    if(/안전|마음/.test(title)) return '🦺';
    return cfg.playerAvatar || cfg.actor || '🎮';
  }
  function drawPlayer(){
    const p=state.player; ctx.save(); ctx.translate(p.x,p.y);
    if(p.shield>0){ ctx.strokeStyle='#93c5fd'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(0,0,43,0,Math.PI*2); ctx.stroke(); }
    ctx.fillStyle=cfg.theme?.player||'#fbbf24'; ctx.strokeStyle='rgba(0,0,0,.22)'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,28,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font='26px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(purposeAvatar(),0,1); ctx.restore();
  }
  function drawHud(){
    ctx.fillStyle='rgba(0,0,0,.28)'; ctx.strokeStyle='rgba(255,255,255,.18)'; drawRoundRect(12,12,190,32,16);
    ctx.fillStyle='#fff'; ctx.font='800 14px system-ui'; ctx.textAlign='left'; ctx.textBaseline='middle'; ctx.fillText('⏱ '+Math.ceil(state.timeLeft)+'초  '+(state.player.boost>0?'⚡':'')+(state.player.magnet>0?'🧲':''),24,28);
  }
  function drawParticles(){
    for(const p of state.particles){ ctx.save(); ctx.globalAlpha=clamp(p.life,0,1); if(p.text){ ctx.fillStyle=p.color||'#fff'; ctx.font='1000 18px system-ui'; ctx.textAlign='center'; ctx.fillText(p.text,p.x,p.y); } else { ctx.fillStyle=p.color||'#fff'; ctx.beginPath(); ctx.arc(p.x,p.y,p.r||3,0,Math.PI*2); ctx.fill(); } ctx.restore(); }
  }
  function drawMemory(){
    drawBg(); const cols=4, rows=3, gap=10; const cw=(W-80-gap*(cols-1))/cols, ch=(H-130-gap*(rows-1))/rows; let i=0;
    state.cards.forEach(c=>{ const col=i%cols,row=Math.floor(i/cols),x=40+col*(cw+gap),y=74+row*(ch+gap); c.rect={x,y,w:cw,h:ch}; ctx.fillStyle=c.done?'rgba(134,239,172,.52)':(c.open?'#fff':'rgba(255,255,255,.18)'); ctx.strokeStyle='rgba(255,255,255,.35)'; drawRoundRect(x,y,cw,ch,18); ctx.fillStyle=c.open||c.done?'#111827':'#fff'; ctx.font='900 16px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; wrapText(c.open||c.done?c.t:'?',x+cw/2,y+ch/2,cw-18,19); i++; });
    drawHud(); drawParticles();
  }
  function drawBuilder(){
    drawBg(); ctx.fillStyle='#fff'; ctx.font='900 24px system-ui'; ctx.textAlign='center'; ctx.fillText('순서 블록을 아래 버튼으로 선택하세요',W/2,90);
    const seq=state.sequence||[]; seq.forEach((s,i)=>{ const x=W*(i+1)/(seq.length+1); ctx.fillStyle=i<state.sequenceIndex?'#86efac':'rgba(255,255,255,.2)'; ctx.strokeStyle='rgba(255,255,255,.35)'; drawRoundRect(x-60,H/2-35,120,70,18); ctx.fillStyle=i<state.sequenceIndex?'#111827':'#fff'; ctx.font='900 16px system-ui'; ctx.textAlign='center'; wrapText(i<state.sequenceIndex?s:(i+1),x,H/2,100,18); }); drawHud(); drawParticles();
  }
  function drawBins(){
    const h=76; ctx.fillStyle='rgba(59,130,246,.55)'; ctx.strokeStyle='rgba(255,255,255,.35)'; drawRoundRect(18,H-h-10,W/2-28,h,18); ctx.fillStyle='rgba(34,197,94,.55)'; drawRoundRect(W/2+10,H-h-10,W/2-28,h,18); ctx.fillStyle='#fff'; ctx.font='900 18px system-ui'; ctx.textAlign='center'; ctx.fillText('⬅ '+state.bins.left,W/4,H-h/2-5); ctx.fillText(state.bins.right+' ➡',W*3/4,H-h/2-5);
  }
  function drawRhythmLine(){ ctx.strokeStyle='#fde047'; ctx.lineWidth=5; ctx.setLineDash([16,10]); ctx.beginPath(); ctx.moveTo(50,H-105); ctx.lineTo(W-50,H-105); ctx.stroke(); ctx.setLineDash([]); }
  function drawMaze(){
    drawBg(); const m=state.maze, cell=Math.min((W-80)/m.w,(H-135)/m.h), ox=(W-cell*m.w)/2, oy=70; ctx.strokeStyle='rgba(255,255,255,.28)'; ctx.lineWidth=2;
    for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){ ctx.fillStyle=(x===m.w-1&&y===m.h-1)?'rgba(250,204,21,.5)':'rgba(255,255,255,.12)'; drawRoundRect(ox+x*cell+3,oy+y*cell+3,cell-6,cell-6,14); }
    ctx.fillStyle='#fff'; ctx.font='28px system-ui'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(purposeAvatar(),ox+m.x*cell+cell/2,oy+m.y*cell+cell/2); ctx.fillText('🏁',ox+(m.w-1)*cell+cell/2,oy+(m.h-1)*cell+cell/2); drawHud(); drawParticles();
  }

  function pointerPos(ev){ const r=canvas.getBoundingClientRect(); const t=ev.touches?ev.touches[0]:ev; return {x:t.clientX-r.left,y:t.clientY-r.top}; }
  canvas.addEventListener('pointerdown', e=>safe(()=>{
    Sound.resume(); const p=pointerPos(e);
    if(state.mode==='memory') clickMemory(p.x,p.y);
    else if(state.mode==='rhythm') tapRhythm(p.x,p.y);
    else if(state.mode==='sorting') tapSorting(p.x);
    else { state.player.x=p.x; state.player.y=p.y; }
  }));
  canvas.addEventListener('pointermove', e=>safe(()=>{ if(e.buttons || e.pointerType==='touch'){ const p=pointerPos(e); if(!['memory','builder','maze','rhythm','sorting'].includes(state.mode)){ state.player.x=p.x; state.player.y=p.y; } } }));
  function clickMemory(x,y){ if(state.lock||!state.running) return; const c=state.cards.find(c=>!c.done && !c.open && x>=c.rect.x&&x<=c.rect.x+c.rect.w&&y>=c.rect.y&&y<=c.rect.y+c.rect.h); if(!c) return; c.open=true; Sound.fx('click'); const open=state.cards.filter(c=>c.open&&!c.done); if(open.length===2){ state.lock=true; setTimeout(()=>{ if(open[0].id===open[1].id){ open.forEach(c=>c.done=true); correct('짝 맞춤'); if(state.cards.every(c=>c.done)){ addFloating('모든 짝 완성!',W/2,H*.45,'#fde047'); initMemory(); } } else { open.forEach(c=>c.open=false); wrong('짝이 달라요'); } state.lock=false; },450); } }
  function tapRhythm(x,y){ const zone=state.entities.find(e=>e.kind==='note' && Math.abs(e.y-(H-105))<48); if(!zone) return wrong('타이밍 확인'); zone.dead=true; const q=state.activeQ||currentQuestion(); String(zone.text)===String(q.a)?correct('리듬 정답'):wrong('다른 음표'); }
  function tapSorting(x){ const near=state.entities.filter(e=>e.kind==='sort').sort((a,b)=>b.y-a.y)[0]; if(!near) return; const chosen=x<W/2?state.bins.left:state.bins.right; near.dead=true; chosen===near.cat?correct('분류 성공'):wrong('분류 확인'); }
  function mazeMove(dx,dy){ if(!state.running||state.paused||state.mode!=='maze') return; state.maze.pending={dx,dy}; refreshQ(currentQuestion()); addFloating('문제를 맞히면 이동!',W/2,62,'#fff'); }
  function mazeMovePending(){ const m=state.maze; if(!m || !m.pending) return; const nx=clamp(m.x+m.pending.dx,0,m.w-1), ny=clamp(m.y+m.pending.dy,0,m.h-1); m.x=nx; m.y=ny; m.pending=null; if(m.x===m.w-1&&m.y===m.h-1){ state.score+=150; state.level++; Sound.fx('level'); addFloating('탈출 성공!',W/2,H*.45,'#fde047'); m.x=0;m.y=0; } }

  function key(down,e){ const k=e.key.toLowerCase(); if(['arrowleft','a'].includes(k)) state.pressed.left=down; if(['arrowright','d'].includes(k)) state.pressed.right=down; if(['arrowup','w'].includes(k)) state.pressed.up=down; if(['arrowdown','s'].includes(k)) state.pressed.down=down; if(down&&state.mode==='maze'){ if(k==='arrowleft'||k==='a') mazeMove(-1,0); if(k==='arrowright'||k==='d') mazeMove(1,0); if(k==='arrowup'||k==='w') mazeMove(0,-1); if(k==='arrowdown'||k==='s') mazeMove(0,1); } if(down&&k===' ') pause(); }
  document.addEventListener('keydown',e=>key(true,e)); document.addEventListener('keyup',e=>key(false,e));
  document.querySelectorAll('[data-act]').forEach(b=>{ const act=b.dataset.act; b.addEventListener('pointerdown',()=>{ Sound.resume(); state.pressed[act]=true; if(state.mode==='maze'){ const map={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}; mazeMove(...map[act]); } }); b.addEventListener('pointerup',()=>state.pressed[act]=false); b.addEventListener('pointerleave',()=>state.pressed[act]=false); });
  $('#startBtn').onclick=start; $('#soundTest').onclick=()=>{Sound.fx('level'); Sound.startBgm();}; $('#pauseBtn').onclick=pause;
  $('#muteBtn').onclick=()=>{ const on=Sound.toggle(); $('#muteBtn').textContent=on?'🔊':'🔇'; };
  $('#fullscreenBtn').onclick=()=>{ const el=document.documentElement; if(!document.fullscreenElement) el.requestFullscreen?.(); else document.exitFullscreen?.(); };
  $('#lowBtn').onclick=()=>{ state.low=!state.low; $('#lowBtn').textContent=state.low?'저사양 ON':'저사양 OFF'; };
  $('#classBtn').onclick=()=>{ state.timeLeft=300; state.lives=5; state.level=Math.max(1,state.level); addFloating('수업 모드 시작: 5분 집중!',W/2,H*.35,'#fde047'); Sound.fx('item'); updateUI(); };
  $('#logBtn').onclick=()=>{ ui.overlay.classList.remove('hide'); ui.overlay.innerHTML=`<div class="modal"><h2>📒 배움 기록장</h2><p>게임 중 맞힌 내용과 아이템 사용 기록입니다.</p><div class="log">${state.lessonLog.join('\n')||'아직 기록이 없습니다. 한 판 플레이해 보세요.'}</div><div class="btns" style="margin-top:12px"><button class="btn primary" id="closeLog">계속하기</button><button class="btn dark" id="resetBest">최고점 초기화</button></div></div>`; $('#closeLog').onclick=()=>ui.overlay.classList.add('hide'); $('#resetBest').onclick=()=>{Store.set('best',0); state.best=0; updateUI(); Sound.fx('pop');}; };

  // mode-specific defense answer bonus: correct button also damages enemy visually by clearing one.
  const oldCorrect = correct;
  correct = function(msg){ oldCorrect(msg); if(state.mode==='defense'){ const e=state.entities.find(e=>e.kind==='enemy'); if(e){e.hp--; if(e.hp<=0){e.dead=true; spawnBurst();}} } };

  state.best=Number(Store.get('best','0'))||0; ui.best.textContent=state.best; ui.goal.textContent=cfg.goal||''; ui.tip.textContent=pick(tips); setMission(); drawBg();
})();
