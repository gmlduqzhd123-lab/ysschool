(() => {
  const Arcade = {};
  let audioCtx = null;
  let musicTimer = null;
  let muted = localStorage.getItem('lg3_muted') === '1';
  const now = () => performance.now();

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    return audioCtx;
  }

  function tone(freq = 440, dur = 0.12, type = 'sine', gain = 0.045, slide = 0) {
    if (muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.03);
  }

  Arcade.sfx = (name = 'click') => {
    const map = {
      click: [[520, 0.04, 'square', 0.025]],
      good: [[660, 0.07, 'triangle', 0.05], [880, 0.08, 'triangle', 0.04]],
      bad: [[190, 0.16, 'sawtooth', 0.04, -60]],
      item: [[780, 0.08, 'sine', 0.05], [1170, 0.1, 'sine', 0.035]],
      level: [[523, 0.08, 'triangle', 0.05], [659, 0.08, 'triangle', 0.05], [784, 0.12, 'triangle', 0.045]],
      boom: [[90, 0.18, 'sawtooth', 0.06, -45]],
      finish: [[392, 0.1, 'triangle', 0.05], [523, 0.1, 'triangle', 0.05], [784, 0.18, 'triangle', 0.05]],
    };
    (map[name] || map.click).forEach((p, i) => setTimeout(() => tone(...p), i * 45));
  };

  Arcade.startMusic = (seed = 0) => {
    if (musicTimer) return;
    ensureAudio();
    const scales = [
      [262, 330, 392, 523, 392, 330],
      [294, 370, 440, 587, 440, 370],
      [247, 311, 370, 494, 370, 311],
      [330, 392, 494, 659, 494, 392],
    ];
    const scale = scales[seed % scales.length];
    let step = 0;
    musicTimer = setInterval(() => {
      if (!muted) {
        tone(scale[step % scale.length], 0.09, step % 4 === 0 ? 'triangle' : 'sine', 0.018);
        if (step % 3 === 0) tone(scale[(step + 2) % scale.length] / 2, 0.12, 'sine', 0.012);
      }
      step += 1;
    }, 210);
  };

  Arcade.stopMusic = () => {
    if (musicTimer) clearInterval(musicTimer);
    musicTimer = null;
  };

  Arcade.toggleMute = () => {
    muted = !muted;
    localStorage.setItem('lg3_muted', muted ? '1' : '0');
    return muted;
  };
  Arcade.isMuted = () => muted;

  Arcade.shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  Arcade.choice = (arr) => arr[Math.floor(Math.random() * arr.length)];
  Arcade.clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  Arcade.fmt = (n) => String(Math.max(0, Math.floor(n))).padStart(2, '0');

  Arcade.setupShell = (cfg) => {
    document.title = `${cfg.title} | 엽쌤스쿨 학습게임 3탄`;
    const app = document.querySelector('#app');
    app.innerHTML = `
      <header class="topbar">
        <a class="back" href="../learning-games-all/index.html">🏠 100게임 메인보드</a>
        <div>
          <p class="eyebrow">YSSCHOOL Learning Games 3</p>
          <h1>${cfg.emoji || '🎮'} ${cfg.title}</h1>
          <p class="subtitle">${cfg.subtitle}</p>
        </div>
        <button id="muteBtn" class="ghost">${muted ? '🔇' : '🔊'}</button>
      </header>
      <section class="panel goal">
        <b>학습 목표</b><span>${cfg.goal}</span>
        <b>게임 미션</b><span id="missionText">${cfg.mission || '정답을 빠르게 찾고 콤보를 이어가세요.'}</span>
      </section>
      <section class="hud">
        <div><span>점수</span><strong id="score">0</strong></div>
        <div><span>콤보</span><strong id="combo">0</strong></div>
        <div><span>레벨</span><strong id="level">1</strong></div>
        <div><span>시간</span><strong id="time">00</strong></div>
        <div><span>생명</span><strong id="lives">7</strong></div>
        <div><span>최고</span><strong id="best">0</strong></div>
      </section>
      <main class="game-card ${cfg.layout || ''}">
        <div id="gameRoot"></div>
      </main>
      <section class="toolbox">
        <button id="startBtn">▶ 시작 / 다시하기</button>
        <button id="missionBtn">🎲 미션 뽑기</button>
        <button id="soundTestBtn">♪ 소리 테스트</button>
        <button id="focusBtn">⏱ 5분 집중</button>
        <button id="lowBtn">🌙 저사양</button>
        <button id="clearBestBtn">최고점 초기화</button>
        <button id="fullBtn">⛶ 전체화면</button>
      </section>
      <section class="panel learn-log">
        <b>배움 기록장</b>
        <textarea id="learnLog" placeholder="오늘 새로 알게 된 것, 헷갈렸던 것, 다음에 더 도전할 점을 적어보세요."></textarea>
      </section>
      <div id="toast" aria-live="polite"></div>
    `;
    const els = {
      score: document.querySelector('#score'), combo: document.querySelector('#combo'), level: document.querySelector('#level'),
      time: document.querySelector('#time'), lives: document.querySelector('#lives'), best: document.querySelector('#best'), toast: document.querySelector('#toast'),
      root: document.querySelector('#gameRoot'), start: document.querySelector('#startBtn'), low: document.querySelector('#lowBtn')
    };
    const key = `lg3_best_${cfg.id}`;
    els.best.textContent = localStorage.getItem(key) || '0';
    document.querySelector('#muteBtn').onclick = () => {
      const state = Arcade.toggleMute();
      document.querySelector('#muteBtn').textContent = state ? '🔇' : '🔊';
      Arcade.sfx('click');
    };
    document.querySelector('#soundTestBtn').onclick = () => { Arcade.startMusic(cfg.seed || 0); Arcade.sfx('level'); };
    document.querySelector('#missionBtn').onclick = () => {
      const missions = cfg.missions || ['콤보 5 달성하기', '오답 없이 5문제 맞히기', '아이템 3개 사용하기', '배움 기록장 한 줄 쓰기'];
      document.querySelector('#missionText').textContent = Arcade.choice(missions);
      Arcade.sfx('item');
    };
    document.querySelector('#focusBtn').onclick = () => {
      window.dispatchEvent(new CustomEvent('arcade-focus', {detail: 300}));
      Arcade.sfx('click');
      Arcade.toast('5분 집중 타이머가 켜졌습니다.' , els.toast);
    };
    document.querySelector('#lowBtn').onclick = () => {
      document.body.classList.toggle('low-mode');
      Arcade.sfx('click');
    };
    document.querySelector('#clearBestBtn').onclick = () => {
      localStorage.removeItem(key);
      els.best.textContent = '0';
      Arcade.toast('최고점을 초기화했습니다.', els.toast);
    };
    document.querySelector('#fullBtn').onclick = () => document.documentElement.requestFullscreen?.();
    const learnKey = `lg3_log_${cfg.id}`;
    const log = document.querySelector('#learnLog');
    log.value = localStorage.getItem(learnKey) || '';
    log.addEventListener('input', () => localStorage.setItem(learnKey, log.value));
    return {
      els,
      setHud(data = {}) {
        ['score', 'combo', 'level', 'time', 'lives'].forEach(k => {
          if (data[k] !== undefined) els[k].textContent = k === 'time' ? Arcade.fmt(data[k]) : data[k];
        });
        if (data.score !== undefined) {
          const best = Math.max(Number(localStorage.getItem(key) || 0), data.score);
          localStorage.setItem(key, best);
          els.best.textContent = best;
        }
      },
      toast(msg) { Arcade.toast(msg, els.toast); },
      end(score) {
        Arcade.sfx('finish');
        Arcade.stopMusic();
        const best = Math.max(Number(localStorage.getItem(key) || 0), score || 0);
        localStorage.setItem(key, best);
        els.best.textContent = best;
        Arcade.toast(`게임 종료! 점수 ${score}점`, els.toast);
        let ov=document.querySelector('#ys-arcade-end-overlay');
        if(!ov){ ov=document.createElement('div'); ov.id='ys-arcade-end-overlay'; ov.innerHTML='<div class="ys-arcade-end-box"><h2>🎉 게임 종료</h2><p id="ys-arcade-end-score"></p><div class="ys-arcade-end-actions"><button id="ys-arcade-replay" class="btn">다시하기</button><button id="ys-arcade-main" class="btn ys-v8-mainboard-end">🏠 100게임 메인보드</button></div></div>'; document.body.appendChild(ov); }
        const p=ov.querySelector('#ys-arcade-end-score'); if(p) p.innerHTML=`최종 점수 <b>${score||0}</b>점 · 최고점 <b>${best}</b>점`;
        ov.classList.add('show');
        const replay=ov.querySelector('#ys-arcade-replay'); if(replay) replay.onclick=()=>{ov.classList.remove('show'); document.querySelector('#startBtn')?.click();};
        const main=ov.querySelector('#ys-arcade-main'); if(main) main.onclick=()=>{ if(window.YS_RETURN_TO_MAINBOARD) window.YS_RETURN_TO_MAINBOARD(); else location.href='../learning-games-all/index.html'; };
      },
      startAudio() { Arcade.startMusic(cfg.seed || 0); }
    };
  };

  Arcade.toast = (msg, el) => {
    const box = el || document.querySelector('#toast');
    if (!box) return;
    box.textContent = msg;
    box.classList.add('show');
    clearTimeout(box._t);
    box._t = setTimeout(() => box.classList.remove('show'), 1800);
  };

  Arcade.difficulty = window.YS_GAME_DIFFICULTY || {preset:{speed:.62,spawn:1.65}};
  window.Arcade = Arcade;
  window.addEventListener('pointerdown', () => ensureAudio(), {once: true});
})();
