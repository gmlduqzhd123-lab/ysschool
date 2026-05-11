window.GAME_CONFIG = {
  "emoji": "🏭",
  "title": "단위 변환 공장",
  "subject": "수학",
  "genre": "퀴즈 공장",
  "mode": "quiz",
  "goal": "기본 단위 사이의 관계를 이해할 수 있습니다.",
  "mission": "단위 변환 8문제 성공",
  "questions": [
    {
      "q": "1m는 몇 cm인가요?",
      "a": "100cm",
      "bad": [
        "10cm",
        "1000cm",
        "1cm"
      ]
    },
    {
      "q": "1kg은 몇 g인가요?",
      "a": "1000g",
      "bad": [
        "100g",
        "10g",
        "1g"
      ]
    },
    {
      "q": "2L는 몇 mL인가요?",
      "a": "2000mL",
      "bad": [
        "200mL",
        "20mL",
        "1000mL"
      ]
    },
    {
      "q": "300cm는 몇 m인가요?",
      "a": "3m",
      "bad": [
        "30m",
        "300m",
        "0.3m"
      ]
    }
  ],
  "subtitle": "길이·무게·들이 단위를 변환해 공장을 작동시키는 퀴즈",
  "time": 100,
  "lives": 3
};
ArcadeMini.setup(window.GAME_CONFIG);
