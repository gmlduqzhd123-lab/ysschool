// ========== Web Audio API 기반 광고 제로 교실 앰비언트 사운드 엔진 ==========

let audioCtx: AudioContext | null = null;
let currentLoopTimeout: NodeJS.Timeout | null = null;
let isAmbientPlaying = false;
let currentMode: 'peaceful' | 'rain' | 'bell' = 'peaceful';
let masterGain: GainNode | null = null;
let rainSource: AudioBufferSourceNode | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. 맑고 따뜻한 펜타토닉 피아노/차임 앰비언트 (아침 명상 & 자습 BGM)
const pentatonicNotes = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
];

function scheduleChimeNote(ctx: AudioContext, gainNode: GainNode) {
  if (!isAmbientPlaying || currentMode !== 'peaceful') return;

  const now = ctx.currentTime;
  // 무작위로 2~3개 화음 음표 선택
  const noteCount = Math.floor(Math.random() * 2) + 1;
  for (let i = 0; i < noteCount; i++) {
    const freq = pentatonicNotes[Math.floor(Math.random() * pentatonicNotes.length)];
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + i * 0.15);

    // 부드러운 어택과 긴 릴리즈 (은은한 울림)
    const startTime = now + i * 0.15;
    const duration = 2.8 + Math.random() * 1.5;

    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.08, startTime + 0.12);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  // 다음 노트 간격 (2.5초 ~ 4.5초)
  const nextInterval = 2500 + Math.random() * 2000;
  currentLoopTimeout = setTimeout(() => {
    scheduleChimeNote(ctx, gainNode);
  }, nextInterval);
}

// 2. 집중을 돕는 부드러운 빗소리 / 화이트 노이즈
function createRainBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2; // 2초 루프
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  // 핑크/브라운 노이즈 필터링
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // 게인 보정
  }
  return buffer;
}

function startRain(ctx: AudioContext, gainNode: GainNode) {
  stopRain();
  const buffer = createRainBuffer(ctx);
  rainSource = ctx.createBufferSource();
  rainSource.buffer = buffer;
  rainSource.loop = true;

  // 로우패스 필터로 부드러운 빗소리 구현
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1000;

  rainSource.connect(filter);
  filter.connect(gainNode);
  rainSource.start();
}

function stopRain() {
  if (rainSource) {
    try {
      rainSource.stop();
      rainSource.disconnect();
    } catch {
      // 무시
    }
    rainSource = null;
  }
}

// 3. 차분한 사찰 종소리 / 싱잉볼 (15초 주기)
function scheduleSingingBowl(ctx: AudioContext, gainNode: GainNode) {
  if (!isAmbientPlaying || currentMode !== 'bell') return;

  const now = ctx.currentTime;
  const baseFreq = 216; // A3보다 깊고 차분한 진동 주파수

  [baseFreq, baseFreq * 1.5, baseFreq * 2.01].forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    const volume = 0.1 / (idx + 1);
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.0);

    osc.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(now);
    osc.stop(now + 8.5);
  });

  currentLoopTimeout = setTimeout(() => {
    scheduleSingingBowl(ctx, gainNode);
  }, 9000);
}

// ===== 외부 제어 API =====

export function startAmbientSound(
  mode: 'peaceful' | 'rain' | 'bell' = 'peaceful',
  volume: number = 0.5
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopAmbientSound();
  isAmbientPlaying = true;
  currentMode = mode;

  if (!masterGain) {
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.4)), ctx.currentTime);

  if (mode === 'peaceful') {
    scheduleChimeNote(ctx, masterGain);
  } else if (mode === 'rain') {
    startRain(ctx, masterGain);
  } else if (mode === 'bell') {
    scheduleSingingBowl(ctx, masterGain);
  }
}

export function stopAmbientSound() {
  isAmbientPlaying = false;
  if (currentLoopTimeout) {
    clearTimeout(currentLoopTimeout);
    currentLoopTimeout = null;
  }
  stopRain();
}

export function setAmbientVolume(volume: number) {
  if (masterGain && audioCtx) {
    const clamped = Math.max(0, Math.min(1, volume * 0.4));
    masterGain.gain.setValueAtTime(clamped, audioCtx.currentTime);
  }
}

export function isAmbientActive() {
  return isAmbientPlaying;
}
