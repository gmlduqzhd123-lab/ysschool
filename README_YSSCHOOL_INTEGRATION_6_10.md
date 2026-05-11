# 엽쌤스쿨 초등 학습 HTML 게임 6~10탄 Web Ready Pack

## 적용 경로

압축을 풀어 `public` 폴더 내용을 Vercel/Next.js 프로젝트의 `public` 폴더에 병합합니다.

- `/learning-games-6/index.html`
- `/learning-games-7/index.html`
- `/learning-games-8/index.html`
- `/learning-games-9/index.html`
- `/learning-games-10/index.html`

## 포함 내용

- 총 50개 게임: 6탄~10탄, 각 10개
- 공통 Web Audio 브금/효과음 엔진
- 아이템, 콤보, 레벨업, 최고점 저장, 배움 기록장, 수업 모드, 저사양 모드
- 모바일 터치 조작 및 PC 키보드 조작 지원
- 외부 라이브러리 및 외부 음원 파일 없음

## 홈페이지 삽입

`components/LearningGames6Section.jsx`부터 `LearningGames10Section.jsx`까지 필요한 섹션을 import하여 Dev Lab 영역에 배치하면 됩니다.

## 점검 내용

- 공통 엔진 JavaScript 문법 검사
- 50개 게임 HTML의 GAME_CONFIG JSON 파싱 검사
- 각 index.html 링크와 실제 파일명 대조
- Vercel 정적 public 경로 기준 확인

브라우저 정책상 소리는 사용자가 시작 버튼을 누른 뒤 재생됩니다.
