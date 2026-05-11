# 엽쌤스쿨 배움게임월드 V11 글꼴 적용판

## 적용 내용

- 100개 게임과 통합 대시보드에 아기자기한 웹폰트를 적용했습니다.
- 제목 계열: Bagel Fat One
- 문제, 선택지, 버튼, 점수판: Jua
- 설명, 도움말, 복습 카드: Gaegu
- canvas에 직접 그려지는 글자도 가능한 범위에서 Jua 계열로 보이도록 보정했습니다.
- 기존 V10의 다이나믹 난이도, 대시보드, 메인보드 복귀, 수업 메뉴 기능은 유지했습니다.

## 추가된 파일

```text
public/learning-games-assets/ysschool_cute_fonts.css
public/learning-games-assets/cute_fonts_patch.js
```

## 실행 경로

```text
/learning-games-all/index.html
```

## 참고

Google Fonts를 불러오는 방식이므로 인터넷이 연결된 Vercel 배포 환경에서 가장 예쁘게 보입니다. 인터넷이 없는 로컬 환경에서는 기본 글꼴로 자동 대체됩니다.
