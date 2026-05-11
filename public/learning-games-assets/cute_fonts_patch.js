/* YSSCHOOL Readable Font Patch V12
   V11에서 canvas와 일부 inline style에 장식 글꼴이 강하게 적용되어 한글이 깨져 보이던 현상을 해결합니다.
   Canvas 글자는 Jua가 아니라 Noto Sans KR 계열로 선명하게 고정합니다. */
(function(){
  'use strict';
  const FONT_CANVAS = "'Noto Sans KR', 'Gowun Dodum', system-ui, sans-serif";
  const BAD_FONTS = /(Bagel\s*Fat\s*One|Gaegu|Gamja\s*Flower|Dongle|Poor\s*Story)/gi;
  function normalizeCanvasFont(value){
    if(typeof value !== 'string') return value;
    let sizeMatch = value.match(/(?:normal\s+|bold\s+|[0-9]{3}\s+)?(\d+(?:\.\d+)?px)(?:\/\d+(?:\.\d+)?)?/i);
    let prefix = value.match(/^(italic\s+|oblique\s+)?(small-caps\s+)?(bold\s+|[1-9]00\s+)?/i);
    const style = prefix ? prefix[0] : '';
    const size = sizeMatch ? sizeMatch[1] : '18px';
    return `${style}${size} ${FONT_CANVAS}`.trim();
  }

  try{
    if(window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype){
      const proto = CanvasRenderingContext2D.prototype;
      const desc = Object.getOwnPropertyDescriptor(proto, 'font');
      if(desc && desc.get && desc.set && !proto.__ysReadableFontPatched){
        Object.defineProperty(proto, 'font', {
          configurable:true,
          enumerable:desc.enumerable,
          get:function(){ return desc.get.call(this); },
          set:function(v){ return desc.set.call(this, normalizeCanvasFont(v)); }
        });
        Object.defineProperty(proto, '__ysReadableFontPatched', {value:true});
      }
    }
  }catch(e){}

  function cleanInlineFonts(){
    try{
      document.querySelectorAll('[style*="font-family"]').forEach(function(el){
        const ff = el.style.fontFamily || '';
        if(BAD_FONTS.test(ff)){
          el.style.fontFamily = "var(--ys-font-main)";
        }
      });
    }catch(e){}
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cleanInlineFonts);
  else cleanInlineFonts();

  if(document.fonts && document.fonts.ready){
    document.fonts.ready.then(function(){
      cleanInlineFonts();
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new CustomEvent('ysReadableFontsReady'));
    }).catch(function(){});
  }
})();
