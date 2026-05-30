import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const visualDir = join(root, "public", "visuals");
const audioDir = join(root, "public", "audio");
const iconDir = join(root, "public", "icons");

for (const dir of [visualDir, audioDir, iconDir]) {
  mkdirSync(dir, { recursive: true });
}

const visuals = [
  {
    file: "extincion.svg",
    title: "La Extinción",
    palette: ["#020307", "#071827", "#123a46", "#d08f43", "#9ff4c8"],
    body: `
      <circle cx="1130" cy="205" r="102" fill="#d08f43" opacity=".96"/>
      <circle cx="1096" cy="172" r="38" fill="#fff2ba" opacity=".55"/>
      <path d="M1038 274 C776 394 578 494 270 692" stroke="#d08f43" stroke-width="32" opacity=".24" filter="url(#blur)"/>
      <path d="M1046 262 C740 360 486 472 138 620" stroke="#fff2ba" stroke-width="7" opacity=".5"/>
      <circle cx="402" cy="714" r="254" fill="url(#earth)" opacity=".94"/>
      <path d="M190 624 C332 548 486 566 600 668 C512 770 326 800 190 724Z" fill="#132d3e" opacity=".8"/>
      <path d="M0 782 C188 700 310 684 514 752 C724 822 978 780 1400 688 L1400 900 L0 900Z" fill="#050609" opacity=".92"/>
    `,
  },
  {
    file: "colonia.svg",
    title: "La Última Colonia",
    palette: ["#020403", "#061516", "#102a2d", "#80ffd2", "#c28b4e"],
    body: `
      <path d="M0 714 C220 602 388 570 590 646 C852 744 1068 650 1400 548 L1400 900 L0 900Z" fill="#060908"/>
      <g opacity=".9">
        ${Array.from({ length: 13 }, (_, i) => {
          const x = 118 + i * 98;
          const h = 130 + (i % 5) * 42;
          return `<path d="M${x} 770 L${x + 32} ${770 - h} L${x + 72} 770 Z" fill="#0b2021" stroke="#80ffd2" stroke-opacity=".22"/>`;
        }).join("")}
      </g>
      <path d="M114 704 C376 430 642 396 962 256 C1124 184 1272 118 1400 36" fill="none" stroke="#80ffd2" stroke-width="9" opacity=".22"/>
      <path d="M0 330 C280 390 528 364 738 250 C946 138 1112 108 1400 140" fill="none" stroke="#c28b4e" stroke-width="4" opacity=".28"/>
      <g fill="#80ffd2">
        ${Array.from({ length: 90 }, (_, i) => `<circle cx="${60 + ((i * 127) % 1280)}" cy="${150 + ((i * 71) % 620)}" r="${1.5 + (i % 4)}" opacity="${0.18 + (i % 5) * 0.08}"/>`).join("")}
      </g>
    `,
  },
  {
    file: "observadores.svg",
    title: "Los Observadores",
    palette: ["#030509", "#071326", "#19334d", "#83ffe2", "#b9874a"],
    body: `
      <rect x="0" y="0" width="1400" height="900" fill="url(#sky)"/>
      <path d="M0 718 C190 664 342 692 496 640 C716 566 862 600 1010 554 C1162 506 1240 466 1400 484 L1400 900 L0 900Z" fill="#050609"/>
      <g stroke="#83ffe2" stroke-opacity=".32" fill="none">
        <circle cx="704" cy="274" r="104"/>
        <circle cx="704" cy="274" r="184" opacity=".45"/>
        <path d="M214 172 L704 274 L1190 144"/>
        <path d="M704 274 L814 610"/>
      </g>
      <rect x="196" y="540" width="58" height="176" fill="#111923"/>
      <rect x="1158" y="470" width="76" height="246" fill="#101820"/>
      <path d="M676 636 L732 636 L718 742 L690 742Z" fill="#c8d2d7" opacity=".7"/>
      <path d="M642 742 L766 742" stroke="#83ffe2" stroke-width="5" opacity=".45"/>
      <circle cx="1120" cy="122" r="18" fill="#b9874a"/>
    `,
  },
  {
    file: "senal.svg",
    title: "La Señal",
    palette: ["#020309", "#06111e", "#142335", "#8fffe0", "#d2a563"],
    body: `
      <circle cx="1032" cy="220" r="182" fill="#d8dde0" opacity=".9"/>
      <circle cx="974" cy="168" r="34" fill="#9ca3aa" opacity=".45"/>
      <circle cx="1110" cy="264" r="50" fill="#8a9298" opacity=".25"/>
      <path d="M0 706 C240 620 450 650 670 596 C904 540 1086 520 1400 564 L1400 900 L0 900Z" fill="#d8dde0" opacity=".86"/>
      <path d="M0 758 C296 686 442 734 690 686 C960 636 1136 654 1400 688 L1400 900 L0 900Z" fill="#080b0e"/>
      <g stroke="#8fffe0" fill="none">
        <path d="M388 626 L506 430 L624 626" stroke-width="7" opacity=".75"/>
        <path d="M506 430 C622 324 728 320 842 430" stroke-width="4" opacity=".35"/>
        <path d="M506 430 C684 224 900 226 1066 428" stroke-width="3" opacity=".24"/>
        <path d="M270 324 C346 290 420 290 494 324 C570 358 644 358 720 324 C796 290 870 290 946 324" stroke-width="5" opacity=".5"/>
      </g>
    `,
  },
  {
    file: "contacto.svg",
    title: "El Contacto",
    palette: ["#010203", "#081013", "#162527", "#8cffd5", "#bf8b52"],
    body: `
      <rect width="1400" height="900" fill="url(#sky)"/>
      <path d="M0 728 C210 650 408 690 626 624 C870 548 1090 580 1400 512 L1400 900 L0 900Z" fill="#030505"/>
      <ellipse cx="703" cy="486" rx="146" ry="238" fill="#020303" opacity=".92"/>
      <path d="M626 342 C560 224 506 178 390 126" stroke="#020303" stroke-width="22" stroke-linecap="round"/>
      <path d="M782 342 C848 224 902 178 1018 126" stroke="#020303" stroke-width="22" stroke-linecap="round"/>
      <path d="M654 512 C514 540 430 604 352 750" stroke="#020303" stroke-width="30" stroke-linecap="round"/>
      <path d="M752 512 C892 540 976 604 1054 750" stroke="#020303" stroke-width="30" stroke-linecap="round"/>
      <path d="M592 454 C648 422 756 422 812 454" stroke="#8cffd5" stroke-width="5" opacity=".45"/>
      <circle cx="654" cy="438" r="8" fill="#8cffd5" opacity=".75"/>
      <circle cx="754" cy="438" r="8" fill="#8cffd5" opacity=".75"/>
      <path d="M0 412 C216 378 374 390 554 420 C794 460 996 452 1400 350" stroke="#bf8b52" stroke-width="3" opacity=".2" fill="none"/>
    `,
  },
];

function baseSvg({ title, palette, body }) {
  const [bg0, bg1, bg2, accent, bio] = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
  <defs>
    <radialGradient id="sky" cx="58%" cy="35%" r="78%">
      <stop offset="0" stop-color="${bg2}"/>
      <stop offset=".48" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg0}"/>
    </radialGradient>
    <radialGradient id="earth" cx="40%" cy="35%" r="65%">
      <stop offset="0" stop-color="${bio}"/>
      <stop offset=".5" stop-color="#12384a"/>
      <stop offset="1" stop-color="#07101d"/>
    </radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="18"/></filter>
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="1400" height="900" fill="url(#sky)"/>
  <rect width="1400" height="900" filter="url(#noise)" opacity=".08"/>
  <circle cx="1010" cy="214" r="410" fill="${accent}" opacity=".06"/>
  ${body}
  <text x="74" y="818" fill="#d6e8e2" opacity=".2" font-family="serif" font-size="34" letter-spacing="8">${title.toUpperCase()}</text>
</svg>`;
}

for (const visual of visuals) {
  writeFileSync(join(visualDir, visual.file), baseSvg(visual));
}

const clamp = (value, min = -1, max = 1) => Math.max(min, Math.min(max, value));
const midiToHz = (note) => 440 * 2 ** ((note - 69) / 12);
const sine = (hz, t, phase = 0) => Math.sin(2 * Math.PI * hz * t + phase);
const triangle = (hz, t) => (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * hz * t));
const smoothStep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
};

function noteEnvelope(localTime, duration) {
  const attack = smoothStep(0, 0.08, localTime);
  const release = 1 - smoothStep(duration - 0.22, duration, localTime);
  return Math.max(0, Math.min(attack, release));
}

function delayedMelody(history, index, delaySamples, feedback = 0.34) {
  const delayed = index >= delaySamples ? history[index - delaySamples] : 0;
  return delayed * feedback;
}

function writeStereoWav(file, seconds, renderSample) {
  const sampleRate = 44100;
  const count = Math.floor(seconds * sampleRate);
  const channels = 2;
  const dataSize = count * channels * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * channels * 2, 28);
  buffer.writeUInt16LE(channels * 2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < count; i += 1) {
    const t = i / sampleRate;
    const fade = Math.min(1, t / 2.4, (seconds - t) / 2.4);
    const [left, right] = renderSample(t, i, sampleRate);
    buffer.writeInt16LE(clamp(left * fade) * 32767, 44 + i * 4);
    buffer.writeInt16LE(clamp(right * fade) * 32767, 44 + i * 4 + 2);
  }

  writeFileSync(join(audioDir, file), buffer);
}

function makeParanormalLoop({
  file,
  seconds,
  rootNote,
  motif,
  pulseRate,
  bassWeight = 0.24,
  signalWeight = 0.18,
  noiseWeight = 0.035,
  detune = 0.006,
}) {
  const root = midiToHz(rootNote);
  const fifth = midiToHz(rootNote + 7);
  const minorThird = midiToHz(rootNote + 3);
  const delayLeft = Math.floor(0.34 * 44100);
  const delayRight = Math.floor(0.48 * 44100);
  const melodyHistory = new Float32Array(Math.floor(seconds * 44100));
  let tapeNoise = 0;
  let lowRumble = 0;

  writeStereoWav(file, seconds, (t, index) => {
    tapeNoise = tapeNoise * 0.985 + (Math.random() * 2 - 1) * 0.015;
    lowRumble = lowRumble * 0.995 + (Math.random() * 2 - 1) * 0.005;

    const phraseLength = 8;
    const stepLength = phraseLength / motif.length;
    const phraseTime = t % phraseLength;
    const motifIndex = Math.floor(phraseTime / stepLength);
    const localTime = phraseTime - motifIndex * stepLength;
    const note = motif[motifIndex];
    const noteHz = midiToHz(note);
    const envelope = noteEnvelope(localTime, stepLength);
    const vibrato = sine(5.7, t) * 0.006 + sine(0.19, t) * 0.01;
    const whistle =
      sine(noteHz * (1 + vibrato), t) * 0.58 +
      sine(noteHz * 2.01, t, 0.4) * 0.12 +
      triangle(noteHz * 0.5, t) * 0.08;
    const breath = 0.65 + sine(0.08, t) * 0.22;
    const melody = whistle * envelope * signalWeight * breath;
    melodyHistory[index] = melody;

    const coldPad =
      sine(root, t) * 0.32 +
      sine(root * (1 + detune), t, 0.8) * 0.22 +
      sine(minorThird, t, 1.7) * 0.18 +
      sine(fifth * 0.5, t, 2.2) * 0.2;
    const padSwell = 0.5 + sine(0.035, t) * 0.32 + sine(0.011, t + 3) * 0.18;
    const pulse = Math.max(0, sine(pulseRate, t)) ** 6;
    const sub = (sine(root * 0.25, t) * 0.65 + sine(root * 0.125, t) * 0.35) * bassWeight;
    const codedTicks = pulse * sine(920 + sine(0.17, t) * 80, t) * 0.018;
    const interference = (tapeNoise * noiseWeight + lowRumble * 0.08) * (0.9 + sine(0.13, t) * 0.1);
    const delayL = delayedMelody(melodyHistory, index, delayLeft, 0.28);
    const delayR = delayedMelody(melodyHistory, index, delayRight, 0.36);

    const base = coldPad * padSwell * 0.15 + sub + interference + codedTicks;
    const left = base + melody * 0.84 + delayL + sine(root * 1.5, t, 1.1) * 0.018;
    const right = base * 0.96 + melody * 0.7 + delayR + sine(root * 1.51, t, 2.5) * 0.018;

    return [left, right];
  });
}

makeParanormalLoop({
  file: "extincion.wav",
  seconds: 20,
  rootNote: 38,
  motif: [74, 77, 73, 69, 71, 67, 69, 62],
  pulseRate: 0.28,
  bassWeight: 0.28,
  signalWeight: 0.16,
});
makeParanormalLoop({
  file: "colonia.wav",
  seconds: 22,
  rootNote: 41,
  motif: [76, 79, 74, 72, 67, 70, 72, 65],
  pulseRate: 0.18,
  bassWeight: 0.22,
  signalWeight: 0.2,
  detune: 0.009,
});
makeParanormalLoop({
  file: "observadores.wav",
  seconds: 20,
  rootNote: 45,
  motif: [81, 78, 76, 73, 76, 71, 69, 73],
  pulseRate: 0.34,
  bassWeight: 0.18,
  signalWeight: 0.18,
});
makeParanormalLoop({
  file: "senal.wav",
  seconds: 18,
  rootNote: 42,
  motif: [83, 86, 81, 78, 80, 76, 73, 76],
  pulseRate: 1.12,
  bassWeight: 0.16,
  signalWeight: 0.22,
  noiseWeight: 0.05,
});
makeParanormalLoop({
  file: "contacto.wav",
  seconds: 24,
  rootNote: 36,
  motif: [72, 75, 79, 78, 75, 70, 67, 70],
  pulseRate: 0.12,
  bassWeight: 0.3,
  signalWeight: 0.19,
  detune: 0.012,
});

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#020407"/>
  <circle cx="256" cy="256" r="176" fill="#071827" stroke="#8cffd5" stroke-width="8" opacity=".95"/>
  <path d="M154 310 C205 185 309 185 358 310" fill="none" stroke="#c28b4e" stroke-width="18" stroke-linecap="round"/>
  <path d="M188 252 L106 150 M324 252 L406 150" stroke="#8cffd5" stroke-width="16" stroke-linecap="round" opacity=".68"/>
  <circle cx="214" cy="272" r="14" fill="#8cffd5"/>
  <circle cx="298" cy="272" r="14" fill="#8cffd5"/>
</svg>`;

writeFileSync(join(iconDir, "icon.svg"), icon);
writeFileSync(join(root, "public", "favicon.svg"), icon);

console.log("Generated visuals, audio loops, and icons.");
