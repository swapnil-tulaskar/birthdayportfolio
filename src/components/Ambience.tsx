import { useMemo, useEffect, useState } from "react";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function Ambience() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(1, 3),
        delay: rand(0, 4),
        dur: rand(2.5, 6),
      })),
    [isClient],
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        left: rand(0, 100),
        delay: rand(0, 16),
        dur: rand(14, 28),
        scale: rand(0.5, 1.4),
        dx: rand(-60, 60),
        char: ["❤️", "💗", "💖", "🌸"][Math.floor(rand(0, 4))],
      })),
    [isClient],
  );

  const roses = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        left: rand(0, 100),
        delay: rand(0, 24),
        dur: rand(12, 22),
        scale: rand(0.6, 1.2),
      })),
    [isClient],
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: rand(0, 100),
        top: rand(10, 95),
        delay: rand(0, 10),
        dur: rand(9, 20),
      })),
    [isClient],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        left: rand(0, 100),
        top: rand(0, 100),
        delay: rand(0, 6),
        dur: rand(2, 5),
        size: rand(3, 8),
      })),
    [isClient],
  );

  if (!isClient) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={`st${i}`}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`sp${i}`}
          className="absolute text-gold"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "var(--gold)",
            borderRadius: "50%",
            boxShadow: "0 0 12px 2px oklch(0.84 0.13 82 / 0.8)",
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {fireflies.map((f, i) => (
        <span
          key={`ff${i}`}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            background: "var(--gold)",
            boxShadow: "0 0 16px 4px oklch(0.84 0.13 82 / 0.6)",
            animation: `firefly ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}
      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="absolute bottom-[-8vh] select-none"
          style={
            {
              left: `${h.left}%`,
              fontSize: `${h.scale * 22}px`,
              "--dx": `${h.dx}px`,
              "--s": h.scale,
              animation: `floatUp ${h.dur}s linear ${h.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          {h.char}
        </span>
      ))}
      {roses.map((r, i) => (
        <span
          key={`r${i}`}
          className="absolute top-0 select-none"
          style={{
            left: `${r.left}%`,
            fontSize: `${r.scale * 24}px`,
            animation: `fallDown ${r.dur}s linear ${r.delay}s infinite`,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
}