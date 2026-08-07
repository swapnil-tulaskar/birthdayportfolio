let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    g.gain.linearRampToValueAtTime(0.16, now + i * 0.06 + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 1.1);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 1.2);
  });
}
