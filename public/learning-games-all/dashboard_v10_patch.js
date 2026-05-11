// YSSCHOOL Dashboard V10 patch: dynamic balance labels and lightweight rendering.
(function(){
  'use strict';
  if(window.__YS_DASHBOARD_V10__) return; window.__YS_DASHBOARD_V10__=true;
  try{sessionStorage.setItem('ys_dashboard_url', location.href); localStorage.setItem('ys_dashboard_url', location.href);}catch(e){}
  function safe(fn){try{return fn();}catch(e){console.warn('[V9 dashboard patch]',e);}}
  safe(()=>{
    document.title='엽쌤스쿨 배움게임월드 100종 대시보드 V10';
    const eyebrow=document.querySelector('.eyebrow'); if(eyebrow) eyebrow.textContent='YSSCHOOL LEARNING GAME WORLD · V10';
    const notice=document.querySelector('.heroBox .notice'); if(notice) notice.innerHTML='<b>V10 적용:</b> V9보다 게임 속도와 적군 등장 템포를 높였습니다. 초반부터 기다림이 길지 않도록 다이나믹하게 조정했습니다.';
    document.querySelectorAll('.filterRow strong').forEach(el=>{ if(el.textContent.includes('학년')) el.textContent='추천 학년'; });
    const result=document.getElementById('resultInfo'); if(result) result.insertAdjacentHTML('afterend','<div class="tools" id="v9MoreWrap" style="justify-content:center;margin:12px 0"><button class="btn dark" id="v9MoreBtn" type="button">더 보기</button><button class="btn dark" id="v9CollapseBtn" type="button">처음 24개만 보기</button></div>');
  });
  safe(()=>{
    if(typeof state==='object'){
      state.visible = Number(sessionStorage.getItem('ys_dashboard_visible')||24) || 24;
      if(state.teacher && localStorage.getItem('ys_teacher_mute')===null){ state.mute=true; localStorage.setItem('ys_teacher_mute','1'); }
    }
    if(typeof gradeLabel==='object'){
      gradeLabel.lower='1~2학년 추천'; gradeLabel.middle='3~4학년 추천'; gradeLabel.upper='5~6학년 추천'; gradeLabel.all='전체';
    }
    if(typeof diffLabel==='object'){
      diffLabel.easy='다이나믹 쉬움'; diffLabel.normal='균형 보통'; diffLabel.challenge='신나는 도전';
    }
    document.querySelectorAll('[data-difficulty="easy"]').forEach(el=>{ if(el.textContent.includes('쉬움')) el.textContent='다이나믹 쉬움'; });
    document.querySelectorAll('[data-difficulty="normal"]').forEach(el=>{ if(el.textContent.includes('보통')) el.textContent='균형 보통'; });
    document.querySelectorAll('[data-difficulty="challenge"]').forEach(el=>{ if(el.textContent.includes('도전')) el.textContent='신나는 도전'; });
    if(typeof matchesGrade==='function'){
      matchesGrade=function(g){ return state.grade==='all' || g.grade===state.grade; };
    }
    if(typeof gameUrl==='function'){
      const oldGameUrl=gameUrl;
      gameUrl=function(g,override={}){
        const u=oldGameUrl(g,override);
        try{ sessionStorage.setItem('ys_dashboard_url', location.href); localStorage.setItem('ys_dashboard_url', location.href); }catch(e){}
        return u;
      };
    }
    if(typeof renderGrid==='function'){
      renderGrid=function(){
        const list=filtered();
        const shown=list.slice(0, state.visible || 24);
        const info=document.getElementById('resultInfo');
        if(info) info.innerHTML=`현재 조건: <b>${gradeLabel[state.grade]}</b> · <b>${diffLabel[state.difficulty]}</b> · <b>${state.practice?'연습모드':'일반모드'}</b> · 전체 ${list.length}개 중 ${shown.length}개 표시`;
        const empty=document.getElementById('empty'); if(empty) empty.hidden=list.length>0;
        const grid=document.getElementById('grid'); if(grid) grid.innerHTML=shown.map(gameCard).join('');
        const more=document.getElementById('v9MoreBtn'), collapse=document.getElementById('v9CollapseBtn');
        if(more){ more.hidden=shown.length>=list.length; more.onclick=()=>{state.visible=Math.min(list.length,(state.visible||24)+24);sessionStorage.setItem('ys_dashboard_visible',String(state.visible));renderAll();}; }
        if(collapse){ collapse.hidden=(state.visible||24)<=24; collapse.onclick=()=>{state.visible=24;sessionStorage.setItem('ys_dashboard_visible','24');renderAll();window.scrollTo({top:0,behavior:'smooth'});}; }
      };
    }
    if(typeof renderTeacher==='function'){
      renderTeacher=function(){
        const area=document.getElementById('teacherArea'); if(!area) return;
        area.innerHTML=`<div class="switch"><label><input type="checkbox" id="tm" ${state.teacher?'checked':''}> 교사 모드 켜기</label><p>수업 타이머와 복습 카드를 사용합니다. 교사 모드를 켜면 무음 수업을 기본 권장합니다.</p></div><div class="switch"><label><input type="checkbox" id="mute" ${state.mute?'checked':''}> 전체 무음 수업</label><p>교실에서 여러 기기가 동시에 켜질 때 브금을 줄이는 설정입니다.</p></div><div class="switch"><label>수업 시간 <select id="mins"><option value="3">3분</option><option value="5">5분</option><option value="10">10분</option><option value="15">15분</option></select></label><p>게임 안의 수업메뉴에 남은 시간이 표시됩니다.</p></div><div class="switch"><b>추천 운영</b><p>① 오늘의 추천 게임 3분<br>② 짝에게 전략 말하기 1분<br>③ 복습 카드 읽고 배운 점 1문장 쓰기</p></div><div class="switch"><b>별 기준</b><p>별은 단순 접속이 아니라 플레이 시간·정답 시도·점수 기준으로 저장됩니다.</p></div><div class="switch"><b>모바일 화면</b><p>게임 안에서는 좌측 상단 ☰ 수업메뉴 하나로 메인보드·복습·별 저장을 정리했습니다.</p></div>`;
        document.getElementById('mins').value=String(state.minutes);
        document.getElementById('tm').onchange=e=>{state.teacher=e.target.checked;localStorage.setItem('ys_teacher_mode',state.teacher?'1':'0'); if(state.teacher && localStorage.getItem('ys_teacher_mute')===null){state.mute=true;localStorage.setItem('ys_teacher_mute','1');} renderAll();};
        document.getElementById('mute').onchange=e=>{state.mute=e.target.checked;localStorage.setItem('ys_teacher_mute',state.mute?'1':'0');};
        document.getElementById('mins').onchange=e=>{state.minutes=Number(e.target.value)||5;localStorage.setItem('ys_teacher_minutes',String(state.minutes));};
      };
    }
    if(typeof renderStickers==='function'){
      const old=renderStickers;
      renderStickers=function(){ old(); const box=document.querySelector('#stickerArea .feature p'); if(box) box.innerHTML='게임 안의 <b>별 저장</b> 또는 종료 결과에서 별이 저장됩니다. 기준은 플레이 시간·정답 시도·점수입니다.'; };
    }
    if(typeof renderAll==='function') renderAll();
  });
})();
