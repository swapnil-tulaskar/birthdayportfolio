import { useMemo, useState } from "react";
import { photos } from "@/lib/photos";
import { playChime } from "@/lib/sfx";
import { HeartBurst } from "./HeartBurst";

const HEART_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 190' preserveAspectRatio='none'%3E%3Cpath fill='black' d='M100 182C40 140 6 108 6 70 6 38 30 16 58 16c18 0 34 10 42 26 8-16 24-26 42-26 28 0 52 22 52 54 0 38-34 70-94 112z'/%3E%3C/svg%3E\")";

export const heartMaskStyle: React.CSSProperties = {
  WebkitMaskImage: HEART_MASK,
  maskImage: HEART_MASK,
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

function Fireworks() {
  const shells = useMemo(
    () =>
      Array.from({ length: 10 }, (_, s) => ({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 50,
        delay: Math.random() * 3,
        parts: Array.from({ length: 26 }, (_, i) => {
          const a = (i / 26) * Math.PI * 2;
          const d = 70 + Math.random() * 90;
          return { tx: Math.cos(a) * d, ty: Math.sin(a) * d, id: `${s}-${i}` };
        }),
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shells.map((sh, i) => (
        <div key={i} className="absolute" style={{ left: `${sh.x}%`, top: `${sh.y}%` }}>
          {sh.parts.map((p) => (
            <span
              key={p.id}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={
                {
                  background: i % 2 ? "var(--gold)" : "var(--rose)",
                  boxShadow: "0 0 10px currentColor",
                  "--tx": `${p.tx}px`,
                  "--ty": `${p.ty}px`,
                  animation: `burst 1.6s ease-out ${sh.delay}s infinite`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function FinalSurprise() {
  const [opened, setOpened] = useState(false);
  const best = photos[16]!;

  return (
    <section
      id="surprise"
      className="relative z-10 mx-auto max-w-4xl overflow-hidden px-5 py-20 text-center sm:py-28"
    >
      {!opened ? (
        <>
          <h2 className="font-script text-4xl text-rose-grad sm:text-6xl">One Last Surprise</h2>
          <button
            onClick={() => {
              playChime(660);
              setOpened(true);
            }}
            className="glass animate-glow-pulse mx-auto mt-10 flex flex-col items-center gap-3 rounded-[2rem] px-10 py-8 transition duration-500 hover:-translate-y-2"
          >
            <span className="animate-drift text-7xl sm:text-8xl">🎁</span>
            <span className="font-display text-xl font-semibold text-gold sm:text-2xl">
              🎁 Open Final Surprise
            </span>
          </button>
        </>
      ) : (
        <div className="relative animate-rise-in">
          <Fireworks />
          <HeartBurst active />
          <h2 className="relative font-script text-4xl leading-tight text-rose-grad sm:text-6xl">
            ❤️ Happy Birthday My Beautiful Wife ❤️
          </h2>

          <div className="relative mx-auto mt-12 grid h-72 w-72 place-items-center sm:h-96 sm:w-96">
            <div
              className="animate-heartbeat absolute inset-0"
              style={{
                ...heartMaskStyle,
                background: "var(--gradient-rose)",
                boxShadow: "var(--shadow-glow)",
              }}
            />
            <p className="relative z-10 max-w-[62%] translate-y-[-8%] font-display text-lg font-semibold text-primary-foreground sm:text-2xl">
              "I Love You More Than Words Can Ever Say."
            </p>
          </div>

          <div className="mx-auto mt-12 h-72 w-72 sm:h-96 sm:w-96">
            <div
              className="animate-glow-pulse h-full w-full"
              style={{ ...heartMaskStyle, background: "var(--gradient-gold)", padding: 8 }}
            >
              <img
                src={best.src}
                alt="Our best memory together"
                loading="lazy"
                className="h-full w-full object-cover"
                style={heartMaskStyle}
              />
            </div>
          </div>

          <p
            className="animate-rise-in mt-12 font-script text-4xl sm:text-6xl"
            style={{
              background: "var(--gradient-gold)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Forever &amp; Always ❤️
          </p>
          <p className="animate-rise-in mt-6 font-display text-lg text-muted-foreground sm:text-4xl">
            Once Again Happy Birthday My Beautiful Wife ❤️
          </p>
        </div>
      )}
    </section>
  );
}
