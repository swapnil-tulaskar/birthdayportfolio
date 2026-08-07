import { useState } from "react";
import couple from "@/assets/couple.png";
import { heartPhotos } from "@/lib/heartPhotos";
import { playChime } from "@/lib/sfx";
import { Typewriter } from "./Typewriter";
import { heartMaskStyle } from "./FinalSurprise";

const MESSAGE = `माझ्या प्रत्येक धडधडीत तुझंच नाव आहे,
तूच माझा आनंद, तूच माझा श्वास आहेस...
तुझ्या प्रेमाने माझं जग सुंदर झालं,
तू माझ्या आयुष्याची सर्वात सुंदर भेट आहेस...

माझ्या प्रत्येक क्षणाला खास बनवल्याबद्दल धन्यवाद,
वाढदिवसाच्या शुभेच्छा माझ्या राणी... ❤️`;

/** Positions around a heart outline (percent of the frame). */
const RING = [
  { x: 50, y: -2 },
  { x: 82, y: 10 },
  { x: 98, y: 38 },
  { x: 98, y: 70 },
  { x: 82, y: 92 },
  { x: 50, y: 105 },
  { x: 18, y: 92 },
  { x: 2, y: 70 },
  { x: 2, y: 38 },
  { x: 18, y: 10 },
];

export function EntryScreen({ onSurprise }: { onSurprise: () => void }) {
  const [hoverHearts, setHoverHearts] = useState(0);

  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-24 text-center">
      <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[30rem]">
        {/* Heart-shaped frame made from photos */}
        <div className="animate-spin-slow absolute inset-0">
          {RING.map((pos, i) => {
            const photo = heartPhotos[i % heartPhotos.length]!;
            return (
              <div
                key={i}
                className="absolute h-[20%] w-[20%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  animation: `drift ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                <div
                  className="h-full w-full p-[6%]"
                  style={{
                    ...heartMaskStyle,
                    background: "var(--gradient-gold)",
                    filter: "drop-shadow(0 0 14px oklch(0.84 0.13 82 / 0.7))",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={heartMaskStyle}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cartoon couple */}
        <div className="absolute inset-[14%] grid place-items-center -translate-y-40">
          <img
            src={couple}
            alt="Cartoon couple holding a glowing heart"
            width={1024}
            height={1024}
            className="animate-drift animate-glow-pulse h-full w-full object-contain"
          />
        </div>
      </div>

      <h1 className="mt-10 font-script text-5xl leading-tight text-rose-grad sm:text-7xl">
        Happy Birthday My Love ❤️
      </h1>

      <Typewriter
        text={MESSAGE}
        speed={40}
        className="mx-auto mt-6 max-w-2xl whitespace-pre-wrap font-display text-lg leading-relaxed text-foreground/90 sm:text-2xl"
      />

      <button
        onMouseEnter={() => setHoverHearts((n) => n + 1)}
        onClick={() => {
          playChime(880);
          onSurprise();
        }}
        className="animate-heartbeat group relative mt-12 rounded-full px-8 py-5 font-display text-lg font-semibold text-primary-foreground transition sm:text-2xl"
        style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}
      >
        ❤️ Click Here for Your Surprise ❤️
        <span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
          {hoverHearts > 0 &&
            Array.from({ length: 10 }, (_, i) => (
              <span
                key={`${hoverHearts}-${i}`}
                className="absolute bottom-2 text-xl"
                style={
                  {
                    left: `${8 + i * 9}%`,
                    "--dx": `${(i - 5) * 8}px`,
                    "--s": 0.8,
                    animation: `floatUp 2.4s ease-out ${i * 0.08}s forwards`,
                  } as React.CSSProperties
                }
              >
                💜
              </span>
            ))}
        </span>
      </button>
    </section>
  );
}
