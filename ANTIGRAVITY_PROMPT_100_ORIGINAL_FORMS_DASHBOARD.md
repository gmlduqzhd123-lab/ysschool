다음 압축 파일을 프로젝트에 적용해 주세요.

목표: 기존 초등 학습 게임 100개의 장르/게임 형태는 유지하고, 플레이 난이도만 낮춘 버전을 ysschool.vercel.app에 배포합니다.

작업:
1. 압축 파일의 public 폴더를 프로젝트 public 폴더에 병합합니다.
2. /learning-games-all/index.html 경로가 열리는지 확인합니다.
3. 기존 /learning-games, /learning-games-2, ... /learning-games-10 경로는 유지합니다.
4. 홈페이지 Dev Lab 영역에 /learning-games-all/index.html 링크 카드를 추가합니다.
5. 대시보드에서 학년군과 난이도를 선택한 뒤 게임 실행 링크가 query string과 함께 열리는지 확인합니다.
6. 대표 게임 5개 이상을 실행해 브금, 효과음, 모바일 조작, 시작/재시작 버튼을 확인합니다.

주의: 기존 게임을 퀴즈형 단일 엔진으로 바꾸지 말고, 제공된 원본 형태 유지 파일을 그대로 사용합니다.


추가 확인 사항 V3:
- /learning-games-all/index.html 대시보드에서 아무 게임이나 10개 이상 실행해 링크가 깨지지 않는지 확인합니다.
- 로컬 파일로 열어도 대시보드 카드 링크가 ../learning-games... 상대경로로 작동하는지 확인합니다.
- public 폴더 전체를 병합해야 합니다. learning-games-all 폴더만 단독 복사하면 다른 게임 폴더를 찾을 수 없습니다.

## V4 추가 적용 지시

1. 압축 파일의 `public` 폴더 전체를 프로젝트의 `public` 폴더에 병합한다.
2. `/learning-games-all/index.html` 대시보드는 유지한다.
3. 새로 추가된 다음 파일들이 누락되지 않도록 확인한다.
   - `public/learning-games-assets/ysschool_game_pre_patch_v4.js`
   - `public/learning-games-assets/ysschool_game_polish_v4.js`
   - `public/learning-games-assets/ysschool_game_polish_v4.css`
4. 각 게임 파일에는 기존 게임 형태를 바꾸지 않은 상태로 V4 보강 스크립트만 연결되어 있어야 한다.
5. 배포 후 `/learning-games-all/index.html`에서 게임 3개 이상 실행해 보고, 화살표 조작 시 화면이 스크롤되거나 흔들리지 않는지 확인한다.
