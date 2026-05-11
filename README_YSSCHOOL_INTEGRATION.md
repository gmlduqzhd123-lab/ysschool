# YSSCHOOL 초등 학습 HTML 게임 10종 - Web Ready V4

## 넣는 위치
현재 ysschool.vercel.app 메인에는 `< Dev Lab />` / `교육 웹앱 실험실` 영역이 있으므로, 기존 HALLYO SWIM 카드 아래에 `초등 학습 HTML 게임 10종` 카드를 추가하는 방식을 권장합니다.

## 파일 배치
Next.js, Vite, React, 정적 Vercel 프로젝트 모두 다음 구조를 권장합니다.

```text
프로젝트 루트/
  public/
    learning-games/
      index.html
      01_math_survivors_plus.html
      ...
      10_money_market_challenge_items.html
      games-manifest.json
```

배포 후 접속 주소는 다음과 같습니다.

```text
https://ysschool.vercel.app/learning-games/index.html
```

## 수정 및 점검 내용
- `const Sound` 객체를 `window.Sound`에도 연결하여 소리 테스트, 미션 버튼, 수업 모드 버튼 효과음이 정상 작동하도록 수정했습니다.
- 게임 목록 링크를 `./index.html`로 바꿔 `/learning-games/` 폴더 안에서 안전하게 이동하도록 수정했습니다.
- 모바일 viewport를 `viewport-fit=cover` 기준으로 수정했습니다.
- `100dvh`와 `overflow-x:hidden`을 보강하여 모바일 주소창 환경에서 화면이 덜 깨지도록 했습니다.
- 홈페이지 복귀 버튼을 추가했습니다.
- Vercel public 폴더 정적 배포 기준으로 파일명을 모두 영문 소문자/숫자/언더바 형태로 유지했습니다.
- 모든 게임은 외부 mp3, 이미지, CDN 없이 단일 HTML로 작동합니다.

## 홈페이지 카드 문구 예시
제목: 초등 학습 HTML 게임 10종
설명: 수학·국어·사회·과학 개념을 브금, 효과음, 아이템, 미션이 있는 미니게임으로 익히는 엽쌤스쿨 학습 게임 모음입니다. 모바일에서도 바로 실행할 수 있어 수업 도입, 짝 활동, 마무리 복습에 활용할 수 있습니다.
태그: HTML Game / Mobile / EduTech / 초등학습
버튼 링크: `/learning-games/index.html`

## iframe 삽입 시 주의
iframe으로 넣을 때는 전체화면 버튼을 위해 다음 속성을 포함하세요.

```html
allow="fullscreen; autoplay"
```

브라우저 정책상 사운드는 사용자의 첫 클릭/터치 이후에만 재생됩니다. 이는 오류가 아니라 브라우저 기본 정책입니다.
