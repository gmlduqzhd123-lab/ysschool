const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const L = require("react-icons/lu");

const NAVY = "0E1A3A", NAVY2 = "1B2B57", GOLD = "C8A15A", TEAL = "1FA39A", SKY = "E9EEF8", INK = "1E2433", MUTED = "6B7385", WHITE = "FFFFFF", LINE = "D9DFEA";
const FONT = "Malgun Gothic";
const IMG = process.env.IMG_DIR || "./images/";

const iconCache = {};
async function icon(name, color) {
  const k = name + color;
  if (iconCache[k]) return iconCache[k];
  const svg = RDS.renderToStaticMarkup(React.createElement(L[name], { color: "#" + color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return (iconCache[k] = "image/png;base64," + buf.toString("base64"));
}

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
pres.title = "여수한려초 AI 디지털 활용 선도학교 · AI 중점학교";

pres.defineSlideMaster({
  title: "CONTENT", background: { color: "F7F8FC" },
  objects: [
    { text: { text: "여수한려초등학교  |  AI 이음 성장 생태계", options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 9, color: MUTED, fontFace: FONT } } },
  ],
  slideNumber: { x: 12.2, y: 7.0, w: 0.6, h: 0.3, fontSize: 9, color: MUTED, fontFace: FONT, align: "right" },
});
pres.defineSlideMaster({ title: "DARK", background: { color: NAVY } });


const ZP = process.env.PHOTO_DIR || "./photos/";
async function pic(s, file, x, y, w, h) {
  const img = sharp(file); const m = await img.metadata();
  const ar = m.width / m.height; let pw = w, ph = w / ar; if (ph > h) { ph = h; pw = h * ar; }
  const px = x + (w - pw) / 2, py = y + (h - ph) / 2;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px - 0.08, y: py - 0.08, w: pw + 0.16, h: ph + 0.16, rectRadius: 0.08, fill: { color: WHITE }, line: { color: "E6EAF2", width: 0.75 }, shadow: sh() });
  const buf = await img.resize({ width: Math.min(m.width, 1800) }).jpeg({ quality: 85 }).toBuffer();
  s.addImage({ data: "image/jpeg;base64," + buf.toString("base64"), x: px, y: py, w: pw, h: ph });
}
async function photoSlide(tag, title, notes, files, points, take, qr) {
  const s = content(tag, title, notes);
  const top = 1.8, H = 4.15, W = points ? 7.5 : qr ? 9.3 : 12.13, n = files.length, gap = 0.35, w = (W - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) await pic(s, ZP + files[i], 0.6 + i * (w + gap), top, w, H);
  if (points) {
    for (let i = 0; i < points.length; i++) {
      const [ic, h, d] = points[i], y = top + i * (H / points.length);
      await badge(s, 8.5, y + 0.15, 0.7, ic, i % 2 ? TEAL : NAVY, i % 2 ? WHITE : GOLD);
      T(s, h, { x: 9.4, y: y + 0.1, w: 3.33, h: 0.4, fontSize: 16, bold: true, color: NAVY });
      T(s, d, { x: 9.4, y: y + 0.52, w: 3.33, h: 0.75, fontSize: 13, color: MUTED });
    }
  }
  if (qr) {
    const [qf, qh, qd] = qr, x = 10.2, w = 2.53;
    card(s, x, top, w, H);
    T(s, "QR 바로가기", { x, y: top + 0.25, w, h: 0.3, fontSize: 11, bold: true, color: GOLD, align: "center", charSpacing: 2 });
    s.addImage({ data: "image/jpeg;base64," + (await sharp(IMG + qf).jpeg().toBuffer()).toString("base64"), x: x + 0.37, y: top + 0.65, w: 1.8, h: 1.8 });
    T(s, qh, { x: x + 0.15, y: top + 2.6, w: w - 0.3, h: 0.7, fontSize: 15, bold: true, color: NAVY, align: "center", valign: "middle" });
    T(s, qd, { x: x + 0.15, y: top + 3.3, w: w - 0.3, h: 0.7, fontSize: 12, color: MUTED, align: "center" });
  }
  takeaway(s, take);
}
let num = 0;
const T = (s, text, o) => s.addText(text, Object.assign({ fontFace: FONT, isTextBox: true, margin: 0, color: INK, valign: "top" }, o));
const sh = () => ({ type: "outer", color: "1E2433", blur: 10, offset: 3, angle: 90, opacity: 0.12 });

function content(tag, title, notes) {
  const s = pres.addSlide({ masterName: "CONTENT" });
  T(s, tag, { x: 0.6, y: 0.45, w: 9, h: 0.35, fontSize: 13, bold: true, color: TEAL, charSpacing: 2 });
  T(s, title, { x: 0.6, y: 0.8, w: 12.1, h: 0.75, fontSize: 30, bold: true, color: NAVY });
  if (notes) s.addNotes(notes);
  return s;
}
function card(s, x, y, w, h, fill = WHITE) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill === WHITE ? "E6EAF2" : fill, width: 0.75 }, shadow: sh() });
}
async function badge(s, x, y, d, name, bg = NAVY, fg = GOLD) {
  s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { color: bg } });
  const p = d * 0.52;
  s.addImage({ data: await icon(name, fg), x: x + (d - p) / 2, y: y + (d - p) / 2, w: p, h: p });
}
function takeaway(s, text) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 6.2, w: 12.13, h: 0.6, rectRadius: 0.3, fill: { color: NAVY }, line: { color: NAVY } });
  T(s, text, { x: 0.9, y: 6.2, w: 11.6, h: 0.6, fontSize: 15, bold: true, color: WHITE, valign: "middle", align: "center" });
}
async function divider(no, title, sub, ic) {
  const s = pres.addSlide({ masterName: "DARK" });
  s.addShape(pres.shapes.OVAL, { x: 8.6, y: -1.2, w: 6.5, h: 6.5, fill: { color: NAVY2 }, line: { color: NAVY2 } });
  s.addShape(pres.shapes.OVAL, { x: 10.2, y: 3.8, w: 4.2, h: 4.2, fill: { color: "16244A" }, line: { color: "16244A" } });
  s.addImage({ data: await icon(ic, GOLD), x: 10.3, y: 1.0, w: 2.2, h: 2.2 });
  T(s, no, { x: 0.9, y: 2.0, w: 3, h: 1.2, fontSize: 66, bold: true, color: GOLD });
  T(s, title, { x: 0.9, y: 3.25, w: 9, h: 0.9, fontSize: 38, bold: true, color: WHITE });
  T(s, sub, { x: 0.9, y: 4.25, w: 9, h: 0.6, fontSize: 17, color: "B9C3DA" });
}
// cards with icon/title/body in a row
async function iconCards(s, items, y = 1.95, h = 3.9, opt = {}) {
  const n = items.length, gap = 0.3, w = (12.13 - gap * (n - 1)) / n;
  for (let i = 0; i < n; i++) {
    const [ic, head, body, num2] = items[i];
    const x = 0.6 + i * (w + gap);
    card(s, x, y, w, h);
    await badge(s, x + 0.35, y + 0.35, 0.85, ic, opt.bg || NAVY, opt.fg || GOLD);
    if (num2) T(s, num2, { x: x + w - 1.0, y: y + 0.38, w: 0.7, h: 0.5, fontSize: 20, bold: true, color: LINE, align: "right" });
    T(s, head, { x: x + 0.35, y: y + 1.4, w: w - 0.7, h: 0.5, fontSize: 19, bold: true, color: NAVY });
    T(s, body.map((b, j) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: j < body.length - 1 } })),
      { x: x + 0.35, y: y + 2.0, w: w - 0.7, h: h - 2.2, fontSize: 14, color: INK, paraSpaceAfter: 6 });
  }
}

(async () => {
  // 1 Title
  {
    const s = pres.addSlide({ masterName: "DARK" });
    s.addShape(pres.shapes.OVAL, { x: 7.6, y: -1.8, w: 8, h: 8, fill: { color: NAVY2 }, line: { color: NAVY2 } });
    s.addShape(pres.shapes.OVAL, { x: 9.4, y: 3.9, w: 5, h: 5, fill: { color: "16244A" }, line: { color: "16244A" } });
    const ax = [["I", "교육과정"], ["E", "교원 전문성"], ["U", "학생 주도성"], ["M", "확산 구조"]];
    ax.forEach(([l, t], i) => {
      const x = 8.6 + (i % 2) * 2.1, y = 1.4 + Math.floor(i / 2) * 2.1;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 1.85, h: 1.85, rectRadius: 0.15, fill: { color: i % 3 === 0 ? GOLD : WHITE, transparency: i % 3 === 0 ? 0 : 88 }, line: { color: GOLD, width: 1 } });
      T(s, l, { x, y: y + 0.25, w: 1.85, h: 0.9, fontSize: 44, bold: true, align: "center", color: i % 3 === 0 ? NAVY : GOLD });
      T(s, t, { x, y: y + 1.2, w: 1.85, h: 0.4, fontSize: 13, align: "center", color: i % 3 === 0 ? NAVY : WHITE });
    });
    T(s, "여수한려초등학교", { x: 0.8, y: 1.3, w: 7, h: 0.5, fontSize: 18, bold: true, color: GOLD, charSpacing: 3 });
    T(s, "AI 디지털 활용 선도학교\n& AI 중점학교 운영 사례", { x: 0.8, y: 1.95, w: 7.5, h: 1.9, fontSize: 38, bold: true, color: WHITE, lineSpacingMultiple: 1.05 });
    T(s, "배움에서 창작으로, 교실에서 지역으로 — AI 이음(IEUM) 성장 생태계", { x: 0.8, y: 4.05, w: 7.5, h: 0.5, fontSize: 16, color: "B9C3DA" });
    T(s, "여수한려초등학교 교사 김희엽", { x: 0.8, y: 5.6, w: 7, h: 0.4, fontSize: 14, color: WHITE });
    T(s, "2026. 10. 07", { x: 0.8, y: 6.0, w: 7, h: 0.4, fontSize: 14, color: "B9C3DA" });
    s.addNotes("여수한려초등학교 AI 디지털 활용 선도학교 및 AI 중점학교 운영 사례 발표. 발표자: 교사 김희엽.");
  }
  // 2 Contents
  {
    const s = content("CONTENTS", "발표 순서");
    const items = [["01", "걸어온 길", "2021년 ~ 2026년"], ["02", "AI 이음 비전", "I·E·U·M 네 축의 성장 생태계"], ["03", "AI 디지털 활용 선도학교", "AI 코스웨어·에듀테크 수업 적용"], ["04", "AI 중점학교", "1~6학년 정보 교육과 바이브 코딩"], ["05", "연계 시너지", "예산·산출물·코디네이터의 선순환"], ["06", "성과와 확산", "성과 발표회와 2학기 박람회"]];
    items.forEach(([n, h, d], i) => {
      const x = 0.6 + (i % 3) * 4.11, y = 1.95 + Math.floor(i / 3) * 2.1;
      card(s, x, y, 3.85, 1.8);
      T(s, n, { x: x + 0.35, y: y + 0.3, w: 1, h: 0.6, fontSize: 28, bold: true, color: GOLD });
      T(s, h, { x: x + 0.35, y: y + 0.9, w: 3.3, h: 0.4, fontSize: 18, bold: true, color: NAVY });
      T(s, d, { x: x + 0.35, y: y + 1.3, w: 3.3, h: 0.35, fontSize: 13, color: MUTED });
    });
    takeaway(s, "두 사업을 하나의 흐름으로 엮은 ‘AI 이음’ 운영 이야기");
  }
  // 3 divider
  await divider("01", "걸어온 길", "스마트 교실에서 AI 중점학교까지, 6년의 축적", "LuMilestone");
  // 4 Timeline
  {
    const s = content("HISTORY", "AI 교육 6년의 발자취", "2021~2023 AI 선도학교로 스마트 교실 구축 → 2025 학생 맞춤형 선도학교 + 독서인문교육 연구학교 연계 → 2026 AI 디지털 활용 선도학교 + AI 중점학교.");
    s.addShape(pres.shapes.LINE, { x: 0.9, y: 3.35, w: 11.5, h: 0, line: { color: LINE, width: 3 } });
    const ev = [["2021~2023", "AI 선도학교", "스마트 교실 구축\nAI 교육 기반 마련", NAVY], ["2025", "AI 디지털 활용 학생 맞춤형\n교육 선도학교", "지역 역사 기반 독서인문교육\n연구학교 연구 주제와 연계 운영", TEAL], ["2026", "AI 디지털 활용 선도학교\n+ AI 중점학교", "두 사업 통합 운영\nAI 교육 코디네이터 연계", GOLD]];
    for (let i = 0; i < 3; i++) {
      const [yr, h, d, c] = ev[i], x = 0.9 + i * 4.05;
      s.addShape(pres.shapes.OVAL, { x: x + 1.55, y: 3.1, w: 0.5, h: 0.5, fill: { color: c }, line: { color: WHITE, width: 3 } });
      T(s, yr, { x, y: 2.0, w: 3.6, h: 0.8, fontSize: 32, bold: true, color: c, align: "center" });
      card(s, x, 4.0, 3.6, 2.0);
      T(s, h, { x: x + 0.25, y: 4.2, w: 3.1, h: 0.8, fontSize: 16, bold: true, color: NAVY, align: "center", valign: "middle" });
      T(s, d, { x: x + 0.25, y: 5.05, w: 3.1, h: 0.8, fontSize: 13, color: MUTED, align: "center" });
    }
    takeaway(s, "인프라 → 맞춤형 수업 → 창작 중심 정보 교육으로 단계적 확장");
  }
  // 5 2021-2023
  {
    const s = content("2021 ~ 2023", "AI 선도학교: 스마트 교실을 세우다", "3년간 AI 선도학교를 운영하며 스마트 교실과 디지털 기기 기반을 구축함.");
    await iconCards(s, [
      ["LuMonitorSmartphone", "스마트 교실 구축", ["AI·디지털 수업 전용 교실 환경", "무선 네트워크·디스플레이 정비"]],
      ["LuTabletSmartphone", "1인 1기기 기반", ["학생 개별 디지털 기기 활용", "맞춤형 학습의 물리적 토대"]],
      ["LuBrainCircuit", "AI 교육 경험 축적", ["AI 원리 이해 수업 시작", "교원 연수와 수업 나눔"]],
    ], 1.95, 3.95);
    takeaway(s, "3년의 인프라 구축이 이후 모든 AI 수업의 출발점이 되었습니다");
  }
  await photoSlide("2021 ~ 2023 현장", "스마트 교실 구축 및 교원 대상 연수", "스마트 교실 교구·기기 비치, 레고 스파이크, 교원 대상 연수 모습.", ["p3.png"], [["LuPackage", "교구·교재 비치", "다양한 교구와 교재로 풍부한 학습 환경 조성"], ["LuLaptop", "스마트 기기 관리", "기기와 장비를 체계적으로 관리해 안정적 수업 지원"], ["LuBot", "레고 스파이크", "최신 스마트 교구로 창의·융합 교육 실천"], ["LuUsers", "교원 대상 연수", "실습 중심 연수로 스마트 수업 설계 역량 강화"]], "인프라와 교원 역량을 함께 쌓아 온 3년");
  // 6 2025
  {
    const s = content("2025", "맞춤형 선도학교 × 독서인문교육 연구학교", "2025학년도: AI 디지털 활용 학생 맞춤형 교육 선도학교와 독서인문교육 연구학교를 연계 운영.");
    card(s, 0.6, 1.95, 5.4, 3.95); card(s, 7.33, 1.95, 5.4, 3.95);
    await badge(s, 0.95, 2.25, 0.85, "LuSparkles"); await badge(s, 7.68, 2.25, 0.85, "LuBookOpen", TEAL, WHITE);
    T(s, "AI 디지털 활용\n학생 맞춤형 교육 선도학교", { x: 2.0, y: 2.25, w: 3.8, h: 0.9, fontSize: 17, bold: true, color: NAVY, valign: "middle" });
    T(s, "독서인문교육\n연구학교", { x: 8.73, y: 2.25, w: 3.8, h: 0.9, fontSize: 17, bold: true, color: NAVY, valign: "middle" });
    const bl = (a) => a.map((b, j) => ({ text: b, options: { bullet: { indent: 14 }, breakLine: j < a.length - 1 } }));
    T(s, bl(["AI 코스웨어로 수준별 학습", "학습 데이터 기반 개별 피드백", "에듀테크 활용 수업 정착"]), { x: 0.95, y: 3.5, w: 4.7, h: 2.2, fontSize: 15, paraSpaceAfter: 8 });
    T(s, bl(["깊이 읽고 생각을 표현하는 수업", "질문과 토의 중심의 인문 소양", "AI 결과를 비판적으로 읽는 힘"]), { x: 7.68, y: 3.5, w: 4.7, h: 2.2, fontSize: 15, paraSpaceAfter: 8 });
    s.addShape(pres.shapes.OVAL, { x: 6.21, y: 3.45, w: 0.9, h: 0.9, fill: { color: GOLD }, line: { color: WHITE, width: 3 } });
    T(s, "+", { x: 6.21, y: 3.45, w: 0.9, h: 0.9, fontSize: 30, bold: true, color: WHITE, align: "center", valign: "middle" });
    takeaway(s, "기술(AI)과 인문(독서)을 함께 키우는 균형 잡힌 맞춤형 교육");
  }
  // 7 2026 overview
  {
    const s = content("2026", "두 사업, 하나의 생태계", "2026학년도: AI 디지털 활용 선도학교 + AI 중점학교 동시 운영.");
    const cols = [["LuLayers", "AI 디지털 활용 선도학교", "AI 코스웨어·에듀테크를 활용한 수업 적용", ["에듀테크·AI 코스웨어 구매", "정규 수업 적용·맞춤 학습", "교원 연수·역량 강화"], NAVY], ["LuCode", "AI 중점학교", "1~6학년 정보 교육 + 바이브 코딩", ["학년별 교육과정 재구성", "학교 자율시간·방과후 동아리", "AI 교육 코디네이터 연계"], TEAL]];
    for (let i = 0; i < 2; i++) {
      const [ic, h, k, b, c] = cols[i], x = 0.6 + i * 6.27;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.95, w: 5.86, h: 3.95, rectRadius: 0.12, fill: { color: c }, line: { color: c }, shadow: sh() });
      await badge(s, x + 0.4, 2.3, 0.9, ic, WHITE, c);
      T(s, h, { x: x + 1.5, y: 2.3, w: 4.2, h: 0.5, fontSize: 21, bold: true, color: WHITE });
      T(s, k, { x: x + 1.5, y: 2.8, w: 4.2, h: 0.4, fontSize: 13, color: i ? "D8F3EF" : GOLD });
      T(s, b.map((t, j) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: j < 2 } })), { x: x + 0.45, y: 3.65, w: 5.0, h: 2.0, fontSize: 16, color: WHITE, paraSpaceAfter: 10 });
    }
    takeaway(s, "선도학교는 ‘쓰는 힘’, 중점학교는 ‘만드는 힘’ — 두 축을 함께 키웁니다");
  }
  // 8 divider
  await divider("02", "AI 이음 비전", "교육과정 · 교원 · 학생 · 확산을 잇는 성장 생태계", "LuNetwork");
  // 9 IEUM
  {
    const s = content("I · E · U · M", "AI 이음의 네 축", "I 교육과정 → E 교원 전문성 → U 학생 주도성 → M 확산 구조의 선순환.");
    const ax = [["I", "교육과정", "Curriculum", "정규 수업 융합\n차시별 모듈 설계"], ["E", "교원 전문성", "Teacher Growth", "학습공동체 공동 연구\n맞춤 교구 직접 개발"], ["U", "학생 주도성", "Student Agency", "스스로 선택·실행\n프롬프트·코드 수정"], ["M", "확산 구조", "Community", "패들렛 누적 기록\n성과 발표회 공유"]];
    ax.forEach(([l, h, e, d], i) => {
      const x = 0.6 + i * 3.1;
      card(s, x, 1.95, 2.83, 3.95);
      s.addShape(pres.shapes.OVAL, { x: x + 0.86, y: 2.25, w: 1.1, h: 1.1, fill: { color: i % 2 ? TEAL : NAVY }, line: { color: i % 2 ? TEAL : NAVY } });
      T(s, l, { x: x + 0.86, y: 2.25, w: 1.1, h: 1.1, fontSize: 34, bold: true, color: i % 2 ? WHITE : GOLD, align: "center", valign: "middle" });
      T(s, h, { x, y: 3.6, w: 2.83, h: 0.45, fontSize: 19, bold: true, color: NAVY, align: "center" });
      T(s, e, { x, y: 4.05, w: 2.83, h: 0.35, fontSize: 12, color: GOLD, align: "center", italic: true });
      T(s, d, { x: x + 0.2, y: 4.6, w: 2.43, h: 1.0, fontSize: 14, color: INK, align: "center" });
    });
    takeaway(s, "교실의 수업(I)이 교사 연구(E)와 학생 창작(U)을 거쳐 지역(M)으로 순환합니다");
  }
  // 10 divider
  await divider("03", "AI 디지털 활용 선도학교", "AI 코스웨어와 에듀테크로 수업을 바꾸다", "LuLaptop");
  // 11 core
  {
    const s = content("핵심", "AI 코스웨어 · 에듀테크의 수업 적용", "선도학교의 핵심: 구매한 AI 코스웨어와 에듀테크를 정규 수업에 적용.");
    await iconCards(s, [
      ["LuBookMarked", "AI 코스웨어", ["학생 수준 진단과 맞춤 문항", "개별 학습 경로 제공", "학습 결과 데이터 확인"]],
      ["LuBlocks", "에듀테크 플랫폼", ["자작자작·Suno·ZEP", "Blooket·Padlet 전 교과 활용", "교사 제작 앱 탑재·배포"]],
      ["LuGraduationCap", "교원 역량 강화", ["에듀테크 활용 연수", "수업 나눔 워크숍", "학년별 적용 사례 공유"]],
    ]);
    takeaway(s, "도구 구매에서 끝나지 않고, 매일의 정규 수업 속에서 쓰이도록 설계합니다");
  }
  await photoSlide("수업 현장", "AI 디지털 활용 수업 모습", "레고 스파이크·태블릿 블록 코딩·언플러그드 카드 활동 등 정규 수업 장면.", ["p10.png"], [["LuBlocks", "피지컬 교구", "레고 스파이크로 모형을 만들고 코드로 제어"], ["LuTabletSmartphone", "1인 1기기 코딩", "태블릿·노트북으로 블록 코딩 실습"], ["LuPuzzle", "언플러그드 활동", "카드 놀이로 알고리즘 원리 이해"]], "에듀테크와 교구가 매일의 정규 수업 속에서 쓰입니다");
  // 12 lesson flow
  {
    const s = content("수업 적용 모델", "진단 → 맞춤 학습 → 피드백의 순환", "AI 코스웨어 기반 맞춤형 수업 흐름.");
    const st = [["LuScanSearch", "진단", "AI 코스웨어로\n출발점 확인"], ["LuRoute", "맞춤 학습", "수준별 과제와\n개별 학습 경로"], ["LuUsers", "협력 활동", "에듀테크로\n공유·토의"], ["LuMessageSquareText", "피드백", "데이터 기반\n개별 피드백"], ["LuRepeat", "재설계", "다음 차시\n수업에 반영"]];
    for (let i = 0; i < 5; i++) {
      const [ic, h, d] = st[i], x = 0.6 + i * 2.48;
      card(s, x, 2.1, 2.2, 3.6);
      await badge(s, x + 0.6, 2.4, 1.0, ic, i % 2 ? TEAL : NAVY, i % 2 ? WHITE : GOLD);
      T(s, `0${i + 1}`, { x, y: 3.55, w: 2.2, h: 0.35, fontSize: 12, bold: true, color: GOLD, align: "center" });
      T(s, h, { x, y: 3.9, w: 2.2, h: 0.45, fontSize: 19, bold: true, color: NAVY, align: "center" });
      T(s, d, { x: x + 0.15, y: 4.5, w: 1.9, h: 0.9, fontSize: 13, color: MUTED, align: "center" });
      if (i < 4) T(s, "›", { x: x + 2.18, y: 3.4, w: 0.32, h: 0.6, fontSize: 28, bold: true, color: GOLD, align: "center" });
    }
    takeaway(s, "한 명 한 명의 속도에 맞춘 배움, 데이터로 확인하는 성장");
  }
  await photoSlide("에듀테크 활용", "자작자작 · 패들렛으로 쓰고 나누는 수업", "자작자작(JAJAK) 글쓰기 플랫폼으로 국어 수업, 패들렛으로 학급·교과 활동 공유.", ["p8.png", "p9.png"], null, "글쓰기 피드백(자작자작)과 학급 공유(패들렛)로 배움을 기록합니다");
  // 13 student agency
  {
    const s = content("U · 학생 주도성", "학생이 선택하고, 수정하고, 검증합니다", "단순한 기술 습득을 넘어 학생 스스로 선택하고 판단하는 탐구 환경.");
    await iconCards(s, [
      ["LuMousePointerClick", "도구 선택", ["목적에 맞는 AI·교구 선택", "탐구 방법을 스스로 결정"], "01"],
      ["LuPencilLine", "프롬프트 수정", ["오류를 관찰하고 표현 구체화", "원인을 찾아 반복 개선"], "02"],
      ["LuShieldCheck", "결과 검증", ["정확성과 작품 가치 판단", "AI 답변을 비판적으로 확인"], "03"],
    ], 1.95, 3.95, { bg: TEAL, fg: WHITE });
    takeaway(s, "수업의 중심은 학생의 선택과 판단입니다");
  }
  // 14 divider
  await divider("04", "AI 중점학교", "1~6학년 정보 교육과 바이브 코딩", "LuCode");
  // 15 core of AI 중점
  {
    const s = content("핵심", "교육과정 재구성 × 바이브 코딩", "AI 중점학교 핵심: 1~6학년 교육과정 재구성 정보 교육 + 학교 자율시간·방과후 동아리 연계 바이브 코딩.");
    card(s, 0.6, 1.95, 6.0, 3.95, NAVY);
    await badge(s, 0.95, 2.3, 0.9, "LuCalendarRange", GOLD, NAVY);
    T(s, "1~6학년 정보 교육", { x: 2.05, y: 2.4, w: 4.3, h: 0.7, fontSize: 22, bold: true, color: WHITE, valign: "middle" });
    T(s, [{ text: "학년별 교육과정을 재구성하여", options: { breakLine: true } }, { text: "모든 학년이 정규 수업에서 정보 교육을 경험합니다.", options: { breakLine: true } }, { text: " ", options: { breakLine: true } }, { text: "발달 단계에 맞춘 언플러그드 → 블록 → AI 창작", options: { color: GOLD, bold: true } }], { x: 0.95, y: 3.5, w: 5.3, h: 2.2, fontSize: 15, color: "D5DCEB" });
    card(s, 6.86, 1.95, 5.87, 3.95);
    await badge(s, 7.2, 2.3, 0.9, "LuWandSparkles", TEAL, WHITE);
    T(s, "바이브 코딩", { x: 8.3, y: 2.4, w: 4.2, h: 0.7, fontSize: 22, bold: true, color: NAVY, valign: "middle" });
    const rows = [["학교 자율시간", "정규 시간 속 바이브 코딩 프로젝트"], ["방과후 동아리", "창작형·체험형 2개 동아리 운영"]];
    rows.forEach(([a, b], i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.2, y: 3.5 + i * 1.1, w: 5.2, h: 0.9, rectRadius: 0.1, fill: { color: SKY }, line: { color: SKY } });
      T(s, a, { x: 7.45, y: 3.5 + i * 1.1, w: 1.8, h: 0.9, fontSize: 15, bold: true, color: TEAL, valign: "middle" });
      T(s, b, { x: 9.25, y: 3.5 + i * 1.1, w: 3.1, h: 0.9, fontSize: 14, color: INK, valign: "middle" });
    });
    takeaway(s, "모든 학년의 기초 정보 교육 위에, 자연어로 만드는 창작 경험을 더합니다");
  }
  // 16 grade cards
  {
    const s = content("학년별 정보 교육", "1~6학년 교육과정 재구성", "학년별 교육과정 재구성을 통한 정보 교육 운영 개요.");
    const g = [["1학년", "놀이로 만나는 순서", "언플러그드·로봇 놀이", "LuPuzzle"], ["2학년", "규칙과 패턴", "보드 코딩·명령 놀이", "LuShapes"], ["3학년", "블록 코딩 첫걸음", "엔트리 기초·이야기 만들기", "LuBlocks"], ["4학년", "디지털 크리에이터", "AI 도구 탐색·작품 창작", "LuPalette"], ["5학년", "AI 원리 탐구", "데이터·분류·피지컬 교구", "LuCpu"], ["6학년", "디지털 표현", "알고리즘·바이브 코딩", "LuTerminal"]];
    for (let i = 0; i < 6; i++) {
      const [a, b, c, ic] = g[i], x = 0.6 + (i % 3) * 4.11, y = 1.95 + Math.floor(i / 3) * 2.05;
      card(s, x, y, 3.85, 1.8);
      await badge(s, x + 0.3, y + 0.45, 0.9, ic, i < 3 ? TEAL : NAVY, i < 3 ? WHITE : GOLD);
      T(s, a, { x: x + 1.4, y: y + 0.28, w: 2.3, h: 0.35, fontSize: 13, bold: true, color: GOLD });
      T(s, b, { x: x + 1.4, y: y + 0.63, w: 2.35, h: 0.45, fontSize: 17, bold: true, color: NAVY });
      T(s, c, { x: x + 1.4, y: y + 1.12, w: 2.35, h: 0.45, fontSize: 13, color: MUTED });
    }
    s.addNotes("학년별 세부 주제는 실제 운영 계획에 맞게 수정해 사용하세요.");
    takeaway(s, "저학년은 놀이로, 고학년은 창작으로 — 6년간 이어지는 정보 교육");
  }
  // 17 chart
  {
    const s = content("교육과정 융합 시수", "학년별 AI 융합 수업", "4학년 29차시, 6학년 32차시 (공모전 보고서 기재 기준).");
    card(s, 0.6, 1.95, 6.6, 3.95);
    s.addChart(pres.charts.BAR, [{ name: "차시", labels: ["4학년", "6학년"], values: [29, 32] }], {
      x: 0.9, y: 2.15, w: 6.0, h: 3.6, barDir: "col", chartColors: [NAVY, GOLD], barGapWidthPct: 80,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 16, dataLabelColor: NAVY, dataLabelFontBold: true, dataLabelFontFace: FONT,
      catAxisLabelColor: MUTED, catAxisLabelFontSize: 14, catAxisLabelFontFace: FONT, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false, valAxisMaxVal: 38,
    });
    const r = [["29", "차시", "4학년 디지털 크리에이터", "도구 탐색 · 아이디어 시각화", NAVY], ["32", "차시", "6학년 디지털 표현", "알고리즘 · 실생활 문제 해결", GOLD]];
    r.forEach(([n, u, h, d, c], i) => {
      const y = 1.95 + i * 2.05;
      card(s, 7.5, y, 5.23, 1.9);
      T(s, [{ text: n, options: { fontSize: 50, bold: true, color: c } }, { text: " " + u, options: { fontSize: 16, color: MUTED } }], { x: 7.8, y: y + 0.3, w: 2.0, h: 1.2, valign: "middle" });
      T(s, h, { x: 9.9, y: y + 0.5, w: 2.75, h: 0.45, fontSize: 16, bold: true, color: NAVY });
      T(s, d, { x: 9.9, y: y + 0.95, w: 2.75, h: 0.45, fontSize: 13, color: MUTED });
    });
    takeaway(s, "정규 교육과정 안에서 체계적으로 확보한 AI 융합 탐구 시간");
  }
  // 18 4th & 6th steps
  {
    const s = content("학년 사례", "4학년은 창작으로, 6학년은 문제 해결로", "4학년: 도구 탐색→의도 구상→작품 완성 / 6학년: 알고리즘 탐구→문제 발견→프로젝트 구현.");
    const rows = [["4학년", NAVY, [["도구 탐색", "AI·디지털 매체 원리"], ["의도 구상", "생각을 프롬프트로"], ["작품 완성", "미술·글쓰기 융합 창작"]]], ["6학년", TEAL, [["알고리즘 탐구", "데이터·조건문·학습 구조"], ["문제 발견", "학교·지역의 생활 문제"], ["프로젝트 구현", "코딩·피지컬 교구 연동"]]]];
    rows.forEach(([g, c, st], r) => {
      const y = 1.95 + r * 2.05;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 1.8, h: 1.85, rectRadius: 0.12, fill: { color: c }, line: { color: c } });
      T(s, g, { x: 0.6, y, w: 1.8, h: 1.85, fontSize: 22, bold: true, color: WHITE, align: "center", valign: "middle" });
      st.forEach(([h, d], i) => {
        const x = 2.7 + i * 3.4;
        card(s, x, y, 3.13, 1.85);
        T(s, `STEP 0${i + 1}`, { x: x + 0.3, y: y + 0.3, w: 2.5, h: 0.3, fontSize: 11, bold: true, color: GOLD });
        T(s, h, { x: x + 0.3, y: y + 0.65, w: 2.6, h: 0.45, fontSize: 18, bold: true, color: NAVY });
        T(s, d, { x: x + 0.3, y: y + 1.15, w: 2.6, h: 0.4, fontSize: 13, color: MUTED });
      });
    });
    takeaway(s, "탐색에서 창작으로, 창작에서 실생활 문제 해결로 성장합니다");
  }
  // 19 vibe coding process
  {
    const s = content("바이브 코딩", "말로 설계하고, 실행하고, 고칩니다", "바이브 코딩: 자연어로 기능 설명 → 브라우저에서 실행 확인 → 수정 지시 반복.");
    await iconCards(s, [
      ["LuMessageCircle", "기능 설명", ["만들 앱의 기능을 말로 설계", "창의적 구상을 자연어로 입력"], "01"],
      ["LuPlay", "실행 확인", ["브라우저에서 즉시 동작 확인", "의도와 결과의 차이 관찰"], "02"],
      ["LuWrench", "수정 지시", ["오류를 설명하고 재지시", "코드·화면을 반복 보완"], "03"],
    ]);
    takeaway(s, "학생의 설계 의도와 판단이 코드 수정의 기준입니다");
  }
  // 20 two clubs
  {
    const s = content("방과후 동아리", "두 갈래의 바이브 코딩 동아리", "바이브 코딩 동아리 2개: 학생이 직접 산출물을 만드는 창작형, 교사가 만든 산출물로 수업·체험하는 체험형.");
    const c = [["LuHammer", "창작형 동아리", "학생이 직접 만드는 산출물", ["아이디어 기획부터 배포까지", "바이브 코딩으로 웹앱·게임 제작", "친구 피드백으로 반복 개선"], NAVY, GOLD], ["LuGamepad2", "체험형 동아리", "교사가 만든 산출물로 배우기", ["교사 제작 앱으로 수업·체험", "AI·코딩 원리를 놀이처럼 경험", "창작형으로 이어지는 입문 과정"], TEAL, WHITE]];
    for (let i = 0; i < 2; i++) {
      const [ic, h, k, b, bg, fg] = c[i], x = 0.6 + i * 6.27;
      card(s, x, 1.95, 5.86, 3.95);
      await badge(s, x + 0.4, 2.3, 1.0, ic, bg, fg);
      T(s, h, { x: x + 1.65, y: 2.35, w: 4, h: 0.5, fontSize: 22, bold: true, color: NAVY });
      T(s, k, { x: x + 1.65, y: 2.85, w: 4, h: 0.4, fontSize: 14, color: i ? TEAL : GOLD, bold: true });
      T(s, b.map((t, j) => ({ text: t, options: { bullet: { indent: 14 }, breakLine: j < 2 } })), { x: x + 0.45, y: 3.75, w: 5.0, h: 1.9, fontSize: 15, paraSpaceAfter: 10 });
    }
    takeaway(s, "‘체험하며 배우고, 직접 만들며 성장하는’ 두 단계의 동아리 구조");
  }
  await photoSlide("동아리 현장", "우리들의 코딩 창작 시간", "바이브 코딩 창작형 동아리: 학생들이 AI와 함께 레이싱·체스·테트리스 등 게임을 직접 제작.", ["p2.png"], [["LuGamepad2", "게임 만들기", "레이싱·체스·리듬 게임 등 학생 아이디어를 작품으로"], ["LuSparkles", "AI와 함께 코딩", "자연어로 설계하고 실행하며 반복 수정"], ["LuShare2", "산출물 공유", "완성 작품을 패들렛에 올려 서로 피드백"]], "평소의 아이디어가 학생 손에서 특별한 작품이 됩니다");
  await photoSlide("학생 개발 웹앱", "학생이 사용자를 넘어, 개발자가 되다", "AI 중점학교 학생 프로젝트: 레이싱·클리커·핑퐁·Appleten·Hot Candy·끝말잇기 동물 퀴즈·helpmath·텍스트 RPG·bit fit 등 학생이 직접 개발한 웹앱.", ["../images/6.webp"], [["LuSearch", "필요 발견", "생활 속 아이디어와 불편함에서 출발"], ["LuWandSparkles", "AI와 코딩으로 해결", "바이브 코딩으로 직접 설계·구현·수정"], ["LuLayoutGrid", "9개 이상의 웹앱", "게임·수학·국어·체육 등 다양한 분야"]], "배우는 AI에서, 만드는 AI로");
  await photoSlide("동아리 기록", "AI 이음 동아리 패들렛", "2026 AI 중점학교 동아리 「AI」 이음 패들렛: AI 캐치마인드 결과, 교사·학생 산출물, 코딩/IDE·에듀테크 도구 모음.", ["p11.png"], null, "AI 캐치마인드 · 교사 산출물 · 학생 산출물 · 도구 안내를 한 공간에 누적합니다", ["1.jpg", "AI 산출물 패들렛", "동아리 산출물을 바로 확인"]);
  // 21 divider
  await divider("05", "연계 시너지", "두 사업의 예산과 산출물이 하나로 순환합니다", "LuInfinity");
  await photoSlide("도구와 산출물 한눈에", "AI와 함께, 더 넓은 배움의 바다로", "① 선도학교 에듀테크·AI 코스웨어(자작자작, Suno, ZEP, Blooket, Padlet) ② 중점학교 개발 도구(Antigravity, Vercel, Supabase, Git, GitHub, Codex, 딜라이텍스) ③ 중점학교 개발 웹앱 리스트.", ["../images/7.webp"], [["LuLayers", "선도학교 에듀테크", "자작자작 · Suno · ZEP · Blooket · Padlet"], ["LuCode", "중점학교 개발 도구", "Antigravity · Vercel · Supabase · GitHub · Codex · 딜라이텍스"], ["LuAppWindow", "개발 웹앱", "엽쌤스쿨 · 한글 마감실 · 땀방울 원정대 · 역사 퀴즈 여행 등"]], "‘쓰는 도구’와 ‘만드는 도구’가 만나 우리만의 웹앱이 됩니다");
  // 22 budget loop
  {
    const s = content("예산 · 산출물 연계", "만들고, 탑재하고, 수업에서 씁니다", "AI 중점학교 예산으로 구매한 코딩 도구로 산출물 제작 → AI 디지털 활용 선도학교 예산으로 구매한 에듀테크에 탑재·배포 → 각 학년·학급 정규 수업에서 활용.");
    const st = [["LuShoppingCart", "코딩 도구", "AI 중점학교 예산으로 구매", NAVY, GOLD], ["LuCodeXml", "산출물 제작", "교사·학생이 웹앱·교구 제작", NAVY, GOLD], ["LuCloudUpload", "탑재·배포", "선도학교 예산 에듀테크에 탑재", TEAL, WHITE], ["LuSchool", "정규 수업 활용", "각 학년·학급 수업에 적용", TEAL, WHITE]];
    for (let i = 0; i < 4; i++) {
      const [ic, h, d, bg, fg] = st[i], x = 0.6 + i * 3.1;
      card(s, x, 2.0, 2.75, 3.0);
      await badge(s, x + 0.82, 2.3, 1.1, ic, bg, fg);
      T(s, h, { x, y: 3.6, w: 2.75, h: 0.45, fontSize: 19, bold: true, color: NAVY, align: "center" });
      T(s, d, { x: x + 0.2, y: 4.1, w: 2.35, h: 0.7, fontSize: 13, color: MUTED, align: "center" });
      if (i < 3) T(s, "›", { x: x + 2.75, y: 3.0, w: 0.35, h: 0.7, fontSize: 32, bold: true, color: GOLD, align: "center" });
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.2, w: 5.95, h: 0.75, rectRadius: 0.1, fill: { color: SKY }, line: { color: SKY } });
    T(s, "AI 중점학교  ·  ‘만드는’ 예산", { x: 0.6, y: 5.2, w: 5.95, h: 0.75, fontSize: 15, bold: true, color: NAVY, align: "center", valign: "middle" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.8, y: 5.2, w: 5.93, h: 0.75, rectRadius: 0.1, fill: { color: "DDF2EF" }, line: { color: "DDF2EF" } });
    T(s, "AI 디지털 활용 선도학교  ·  ‘쓰는’ 예산", { x: 6.8, y: 5.2, w: 5.93, h: 0.75, fontSize: 15, bold: true, color: TEAL, align: "center", valign: "middle" });
    takeaway(s, "두 예산이 맞물려, 학교에서 만든 도구가 모든 교실의 수업이 됩니다");
  }
  // co-design
  {
    const s = content("E · 교원 전문성", "함께 설계하고, 수업으로 검증합니다", "교사 학습공동체의 공동 설계·모듈 개발·수업 성찰이 웹앱 개발로 이어짐.");
    await iconCards(s, [
      ["LuUsersRound", "공동 설계", ["학습공동체의 교육과정 재구성", "수업 사례 공유·융합 주제 발굴"], "01"],
      ["LuPackage", "모듈 개발", ["차시별 활동·안내서 구성", "발달 단계에 맞는 활동지"], "02"],
      ["LuNotebookPen", "수업 성찰", ["수업 나눔으로 개선점 확인", "필요한 도구를 직접 개발"], "03"],
    ]);
    takeaway(s, "공동 연구에서 찾은 수업의 필요가 교사 제작 도구로 이어집니다");
  }
  // 23 YScode
  {
    const s = content("E · 교원 전문성", "교사의 두 번째 교구함: YScode", "교사 제작 웹앱(YScode 등)을 에듀테크에 탑재해 학급 수업에 활용.");
    await iconCards(s, [
      ["LuLightbulb", "수업의 필요", ["기성 도구의 한계 발견", "우리 수업에 필요한 기능 정의"]],
      ["LuAppWindow", "직접 개발", ["바이브 코딩으로 웹앱 제작", "설치 없이 브라우저에서 사용"]],
      ["LuRefreshCw", "현장 보완", ["학생 반응·피드백 반영", "수업에 맞게 지속 개선"]],
    ], 1.95, 3.95, { bg: GOLD, fg: NAVY });
    takeaway(s, "교사가 수업의 필요를 직접 도구로 구현합니다");
  }
  await photoSlide("교사 제작 산출물", "엽쌤스쿨 16가지 특별한 수업 여행", "바이브 코딩으로 제작한 웹앱 16종 모음.", ["p4.png"], null, "작은 아이디어가 더 큰 배움을 만듭니다", ["3.jpg", "AI 중점학교 제작 웹앱 모음", "16가지 웹앱을 바로 사용"]);
  // comics A
  {
    const s = content("교과 적용 사례 ①", "학급 놀이 · 음악 · 실과 수업으로", "웹앱 설명서: 쉬는시간 오락실 100(학급 운영), 우리 함께 아카펠라(음악), 요리 대백과(실과). QR로 바로 접속.");
    const apps = [["2.webp", "쉬는시간 오락실 100", "학급 운영 · 100가지 미니게임", null], ["4.webp", "우리 함께 아카펠라", "음악 · 파트별 연습", null], ["5.webp", "요리 대백과", "실과 · 레시피 따라 하기", null]];
    for (let k = 0; k < 3; k++) {
      const [f, h, d, qr] = apps[k], x = 0.6 + k * 4.11;
      await pic(s, IMG + f, x, 1.8, 3.85, 3.25);
      T(s, h, { x: x + 0.1, y: 5.25, w: 3.7, h: 0.4, fontSize: 16, bold: true, color: NAVY });
      T(s, d, { x: x + 0.1, y: 5.65, w: 3.7, h: 0.35, fontSize: 12, color: MUTED });
      if (qr) await pic(s, IMG + qr, x + 3.05, 5.22, 0.75, 0.75);
    }
    takeaway(s, "만화 설명서로 사용법을 익히고 바로 수업에 활용합니다");
  }
  await photoSlide("교과 적용 사례 ②", "체육 · 사회 교과 수업으로", "교사 개발 웹앱 설명 예시: 아시안게임 체육 수업(3~6학년 체육), 역사 탐험 퀘스트(4~6학년 사회).", ["p0.png", "p1.png"], [["LuTrophy", "아시안게임 체육 수업", "3~6학년 체육 · 아시안게임 종목을 변형한 팀 게임"], ["LuMap", "역사 탐험 퀘스트", "4~6학년 사회 · 유물과 단서로 푸는 시대별 퀘스트"], ["LuSchool", "정규 수업 적용", "학년·학급별 교과 시간에 바로 활용"]], "교과의 목표에 맞춘 도구가 수업의 몰입을 높입니다");
  await photoSlide("탑재 · 배포", "티픽스에 탑재된 여수한려초 웹앱", "교사 제작 웹앱을 에듀테크 플랫폼 티픽스에 탑재·배포. 땀방울 원정대, 오락실 100, 역사 탐험 퀘스트, 아시안게임 체육 수업, 요리 대백과 등.", ["p5.png", "p6.png"], null, "학교에서 만든 도구가 플랫폼을 통해 학교 밖 교실로도 퍼져 나갑니다");
  // 24 coordinator
  {
    const s = content("AI 교육 코디네이터", "주 14시간, 프로젝트 수업을 함께합니다", "AI 중점학교와 연계한 AI 교육 코디네이터 사업: 주 14시간 프로젝트 수업.");
    card(s, 0.6, 1.95, 4.2, 3.95, NAVY);
    T(s, "주", { x: 0.6, y: 2.35, w: 4.2, h: 0.4, fontSize: 16, color: "B9C3DA", align: "center" });
    T(s, "14", { x: 0.6, y: 2.75, w: 4.2, h: 1.5, fontSize: 88, bold: true, color: GOLD, align: "center", valign: "middle" });
    T(s, "시간 프로젝트 수업", { x: 0.6, y: 4.35, w: 4.2, h: 0.5, fontSize: 18, bold: true, color: WHITE, align: "center" });
    T(s, "AI 중점학교 연계 운영", { x: 0.6, y: 4.95, w: 4.2, h: 0.4, fontSize: 13, color: "B9C3DA", align: "center" });
    const r = [["LuUsers", "협력 수업", "담임교사와 코디네이터가 함께 설계·운영"], ["LuFolderKanban", "프로젝트 중심", "학년별 AI·코딩 프로젝트 수업 지원"], ["LuLifeBuoy", "현장 지원", "기기·도구 활용과 수업 중 학생 지원"]];
    for (let i = 0; i < 3; i++) {
      const [ic, h, d] = r[i], y = 1.95 + i * 1.35;
      card(s, 5.1, y, 7.63, 1.15);
      await badge(s, 5.35, y + 0.18, 0.8, ic, TEAL, WHITE);
      T(s, h, { x: 6.4, y: y + 0.2, w: 6, h: 0.4, fontSize: 17, bold: true, color: NAVY });
      T(s, d, { x: 6.4, y: y + 0.62, w: 6.1, h: 0.4, fontSize: 13, color: MUTED });
    }
    takeaway(s, "전문 인력의 연계로 프로젝트 수업의 깊이와 지속성을 확보합니다");
  }
  // 26 divider
  await divider("06", "성과와 확산", "교실의 배움을 학교와 지역으로", "LuTrophy");
  // 27 1st semester
  {
    const s = content("1학기 성과 발표회", "순천대학교 SW 과정과 함께한 성과 발표회", "1학기 AI 디지털 활용 선도학교 및 AI 중점학교 성과 발표회 실시 (순천대학교 SW 과정 연계).");
    card(s, 0.6, 1.95, 4.0, 3.95, NAVY);
    await badge(s, 0.95, 2.3, 0.9, "LuCalendarCheck", GOLD, NAVY);
    T(s, "2026. 7. 10.", { x: 0.95, y: 3.4, w: 3.4, h: 0.6, fontSize: 26, bold: true, color: GOLD });
    T(s, "1학기 AI 중점학교 및\nAI 디지털 활용 선도학교\n프로젝트 성과 발표회", { x: 0.95, y: 4.05, w: 3.4, h: 1.2, fontSize: 14, color: WHITE });
    T(s, "순천대학교 SW 과정 연계", { x: 0.95, y: 5.3, w: 3.4, h: 0.4, fontSize: 13, bold: true, color: "8FE0D7" });
    const r = [["LuTarget", "제작 의도", "목적과 창작 주제를 학생이 직접 설명"], ["LuPlay", "작동 시연", "레고 모형·코드 동작을 공개 시연"], ["LuMessagesSquare", "질문 나눔", "동료·교사·대학과 발전적 피드백"]];
    for (let i = 0; i < 3; i++) {
      const [ic, h, d] = r[i], y = 1.95 + i * 1.35;
      card(s, 4.9, y, 7.83, 1.15);
      await badge(s, 5.15, y + 0.18, 0.8, ic, TEAL, WHITE);
      T(s, h, { x: 6.2, y: y + 0.2, w: 6, h: 0.4, fontSize: 17, bold: true, color: NAVY });
      T(s, d, { x: 6.2, y: y + 0.62, w: 6.3, h: 0.4, fontSize: 13, color: MUTED });
    }
    takeaway(s, "완성품과 함께 학생의 고민과 해결 과정을 나눴습니다");
  }
  await photoSlide("1학기 현장", "1학기 성과 발표회 모습", "1학기 AI 디지털 활용 및 AI 중점학교 성과 발표회: 작품 시연, 발표, 단체 사진.", ["p7.png"], [["LuPlay", "작품 시연", "모둠별 레고 모형과 코드 작동 시연"], ["LuMic", "학생 발표", "제작 의도와 해결 과정을 직접 설명"], ["LuUsers", "함께한 친구들", "참여 학생 모두가 성장을 나눈 자리"]], "학생이 직접 설명하고 시연하는 성과 발표회");
  // 28 2nd semester expo
  {
    const s = content("2학기 계획", "바이브 코딩 박람회형 성과 발표회", "2학기: 바이브 코딩 동아리 중심, 박람회 형식의 성과 발표회 예정.");
    const b = [["LuStore", "작품 부스", "동아리별 부스에서\n학생 앱·게임 전시"], ["LuHand", "직접 체험", "관람객이 산출물을\n직접 사용·플레이"], ["LuMic", "학생 도슨트", "만든 학생이\n설계 의도 설명"], ["LuStar", "피드백 투표", "관람객 의견을\n다음 개선에 반영"]];
    for (let i = 0; i < 4; i++) {
      const [ic, h, d] = b[i], x = 0.6 + i * 3.1;
      card(s, x, 1.95, 2.83, 3.95, i % 2 ? WHITE : WHITE);
      await badge(s, x + 0.86, 2.3, 1.1, ic, i % 2 ? TEAL : GOLD, i % 2 ? WHITE : NAVY);
      T(s, h, { x, y: 3.7, w: 2.83, h: 0.5, fontSize: 19, bold: true, color: NAVY, align: "center" });
      T(s, d, { x: x + 0.2, y: 4.3, w: 2.43, h: 1.0, fontSize: 14, color: MUTED, align: "center" });
    }
    takeaway(s, "창작형·체험형 동아리가 함께 여는, 배우고 즐기는 AI 박람회");
  }
  // 29 records & next
  {
    const s = content("성찰과 과제", "현재의 기록과 다음 과제", "패들렛 29개 섹션·90개 게시물 (2026.10.7 집계). 다음 과제: 융합 깊이, 형성적 피드백, 지역 네트워크.");
    [["29", "개 섹션", "패들렛 주제·차시별 탐구 공간"], ["90", "개 게시물", "탐구 기록·창작 결과물"]].forEach(([n, u, d], i) => {
      const y = 1.95 + i * 2.05;
      card(s, 0.6, y, 4.2, 1.9, i ? TEAL : NAVY);
      T(s, [{ text: n, options: { fontSize: 50, bold: true, color: i ? WHITE : GOLD } }, { text: " " + u, options: { fontSize: 16, color: WHITE } }], { x: 0.95, y: y + 0.2, w: 3.6, h: 1.0, valign: "middle" });
      T(s, d, { x: 0.95, y: y + 1.25, w: 3.6, h: 0.4, fontSize: 13, color: i ? "E3F7F4" : "B9C3DA" });
    });
    const r = [["교육과정", "1~6학년 정보 교육 체계화", "학년·교과 간 융합의 깊이 확대"], ["학생의 배움", "바이브 코딩 동아리 2개 운영", "관찰·수정을 돕는 형성적 피드백"], ["교사와 지역", "YScode·순천대 연계 발표회", "지속적인 지역 교원 네트워크"]];
    card(s, 5.1, 1.95, 7.63, 3.95);
    T(s, "현재의 기록", { x: 7.0, y: 2.15, w: 2.8, h: 0.4, fontSize: 14, bold: true, color: TEAL });
    T(s, "다음 과제", { x: 9.9, y: 2.15, w: 2.7, h: 0.4, fontSize: 14, bold: true, color: GOLD });
    r.forEach(([a, b, c], i) => {
      const y = 2.75 + i * 1.0;
      if (i) s.addShape(pres.shapes.LINE, { x: 5.4, y: y - 0.12, w: 7.05, h: 0, line: { color: "E6EAF2", width: 1 } });
      T(s, a, { x: 5.4, y, w: 1.5, h: 0.75, fontSize: 15, bold: true, color: NAVY, valign: "middle" });
      T(s, b, { x: 7.0, y, w: 2.8, h: 0.75, fontSize: 13, color: INK, valign: "middle" });
      T(s, c, { x: 9.9, y, w: 2.7, h: 0.75, fontSize: 13, color: INK, valign: "middle" });
    });
    takeaway(s, "누적한 기록을 수업의 질과 지속적인 나눔으로 연결합니다");
  }
  // 30 closing
  {
    const s = pres.addSlide({ masterName: "DARK" });
    s.addShape(pres.shapes.OVAL, { x: 3.67, y: 0.75, w: 6, h: 6, fill: { color: NAVY2 }, line: { color: NAVY2 } });
    s.addImage({ data: await icon("LuSprout", GOLD), x: 6.17, y: 1.35, w: 1.0, h: 1.0 });
    T(s, "함께 만드는 AI 이음 성장 생태계", { x: 1.5, y: 2.6, w: 10.33, h: 0.7, fontSize: 28, bold: true, color: WHITE, align: "center" });
    T(s, "배움에서 창작으로, 교실에서 지역으로", { x: 1.5, y: 3.3, w: 10.33, h: 0.5, fontSize: 17, color: "B9C3DA", align: "center" });
    T(s, "감사합니다", { x: 1.5, y: 4.1, w: 10.33, h: 1.0, fontSize: 48, bold: true, color: GOLD, align: "center" });
    T(s, "여수한려초등학교 교사 김희엽", { x: 1.5, y: 5.3, w: 10.33, h: 0.4, fontSize: 15, color: WHITE, align: "center" });
  }
  await pres.writeFile({ fileName: process.env.OUT || "deck.pptx" });
  console.log("done");
})();
