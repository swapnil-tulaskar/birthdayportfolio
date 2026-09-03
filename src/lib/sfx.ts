import clapSound from "@/assets/sounds/clap.mp3";
import firecrackerSound from "@/assets/sounds/firecracker.mp3";

import no1Sound from "@/assets/sounds/No1.mp3";
import no2Sound from "@/assets/sounds/No2.mp3";
import no3Sound from "@/assets/sounds/No3.mp3";
import no4Sound from "@/assets/sounds/No4.mp3";
import no5Sound from "@/assets/sounds/No5.mp3";

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;

  if (!ctx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as {
        webkitAudioContext: typeof AudioContext;
      }).webkitAudioContext;

    if (!Ctx) return null;

    ctx = new Ctx();
  }

  void ctx.resume();

  return ctx;
}

/** Soft romantic click / chime. */
export function playChime(base = 880) {
  const c = getCtx();
  if (!c) return;

  const now = c.currentTime;

  [0, 7, 12].forEach((n, i) => {
    const osc = c.createOscillator();
    const g = c.createGain();

    osc.type = "sine";
    osc.frequency.value = base * Math.pow(2, n / 12);

    g.gain.setValueAtTime(0, now + i * 0.06);

    g.gain.linearRampToValueAtTime(
      0.16,
      now + i * 0.06 + 0.03
    );

    g.gain.exponentialRampToValueAtTime(
      0.001,
      now + i * 0.06 + 1.1
    );

    osc.connect(g);
    g.connect(c.destination);

    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 1.2);
  });
}

/* =========================================
   REAL CLAP MP3
========================================= */

let clapAudio: HTMLAudioElement | null = null;

export function playClap() {
  if (!clapAudio) {
    clapAudio = new Audio(clapSound);
    clapAudio.preload = "auto";
  }

  clapAudio.pause();
  clapAudio.currentTime = 0;
  clapAudio.volume = 1.0;

  void clapAudio.play().catch((error) => {
    console.warn("Clap sound could not play:", error);
  });
}

/* =========================================
   REAL FIRECRACKER MP3
========================================= */

let firecrackerAudio: HTMLAudioElement | null = null;

export function playFirecracker() {
  if (!firecrackerAudio) {
    firecrackerAudio = new Audio(firecrackerSound);
    firecrackerAudio.preload = "auto";
  }

  firecrackerAudio.pause();
  firecrackerAudio.currentTime = 0;
  firecrackerAudio.volume = 1.0;

  void firecrackerAudio.play().catch((error) => {
    console.warn("Firecracker sound could not play:", error);
  });
}

/* =========================================
   NO SOUNDS
========================================= */

const noSounds = [
  no1Sound,
  no2Sound,
  no3Sound,
  no4Sound,
  no5Sound,
];

const noAudios: (HTMLAudioElement | null)[] = [
  null,
  null,
  null,
  null,
  null,
];

export function playNo(index: number) {
  const safeIndex = Math.max(
    0,
    Math.min(index, noSounds.length - 1)
  );

  if (!noAudios[safeIndex]) {
    noAudios[safeIndex] = new Audio(noSounds[safeIndex]);
    noAudios[safeIndex]!.preload = "auto";
  }

  const audio = noAudios[safeIndex]!;

  audio.pause();
  audio.currentTime = 0;
  audio.volume = 1.0;

  void audio.play().catch((error) => {
    console.warn(
      `No${safeIndex + 1} sound could not play:`,
      error
    );
  });
}