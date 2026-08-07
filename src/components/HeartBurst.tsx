import { useEffect, useMemo, useState } from "react";

type Props = { active: boolean; onDone?: () => void };

export function HeartBurst({ active, onDone }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!active) return;
    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
      onDone?.();
    }, 2400);
    return () => clearTimeout(t);
  }, [active, onDone]);

  const bits = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 180 + Math.random() * 620;
        return {
          id: i,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist,
          dur: 1 + Math.random() * 1.3,
          delay: Math.random() * 0.35,
          size: 12 + Math.random() * 30,
          char: ["❤️", "💖", "🌹", "✨", "💗", "🎉"][i % 6],
        };
      }),
    [active],
  );

  if (!show) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.7 0.2 15 / 0.35), transparent 65%)",
          animation: "riseIn 0.4s ease-out",
        }}
      />
      {bits.map((b) => (
        <span
          key={b.id}
          className="absolute left-1/2 top-1/2 select-none"
          style={
            {
              fontSize: b.size,
              "--tx": `${b.tx}px`,
              "--ty": `${b.ty}px`,
              animation: `burst ${b.dur}s cubic-bezier(0.16,1,0.3,1) ${b.delay}s forwards`,
            } as React.CSSProperties
          }
        >
          {b.char}
        </span>
      ))}
    </div>
  );
}