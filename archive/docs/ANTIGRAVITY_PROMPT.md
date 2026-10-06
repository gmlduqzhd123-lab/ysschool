# Antigravity 작업 지시문

현재 ysschool.vercel.app 홈페이지의 `< Dev Lab />` 또는 `교육 웹앱 실험실` 영역에 `초등 학습 HTML 게임 10종` 카드를 추가해 주세요.

1. 이 패키지의 `public/learning-games` 폴더를 프로젝트의 `public/learning-games` 경로에 그대로 복사합니다.
2. Dev Lab 카드 목록에 다음 카드를 추가합니다.
   - 제목: 초등 학습 HTML 게임 10종
   - 설명: 수학·국어·사회·과학 개념을 브금, 효과음, 아이템, 미션이 있는 미니게임으로 익히는 엽쌤스쿨 학습 게임 모음입니다. 모바일에서도 바로 실행할 수 있어 수업 도입, 짝 활동, 마무리 복습에 활용할 수 있습니다.
   - 태그: HTML Game, Mobile, EduTech, 초등학습
   - 버튼: 게임 열기
   - 링크: /learning-games/index.html
3. 새 창 이동 방식이면 `<a href="/learning-games/index.html" target="_blank" rel="noopener noreferrer">`를 사용합니다.
4. 페이지 내부 미리보기 iframe을 사용할 경우 `allow="fullscreen; autoplay"` 속성을 반드시 넣습니다.
5. 빌드 전에 `/learning-games/index.html`과 10개 게임 파일 링크가 모두 열리는지 확인합니다.
