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
वाढदिवसाच्या शुभेच्छा माझी राणी... ❤️ `;

/**
 * Responsive heart-shaped photo ring.
 *
 * All positions stay inside the 1:1 container
 * so photos remain visible on mobile and desktop.
 */
const RING = [
  { x: 50, y: 7 },
  { x: 76, y: 13 },
  { x: 93, y: 32 },
  { x: 97, y: 55 },
  { x: 91, y: 78 },
  { x: 74, y: 92 },
  { x: 50, y: 98 },
  { x: 26, y: 92 },
  { x: 9, y: 78 },
  { x: 3, y: 55 },
  { x: 7, y: 32 },
  { x: 24, y: 13 },
];

export function EntryScreen({
  onSurprise,
}: {
  onSurprise: () => void;
}) {
  const [hoverHearts, setHoverHearts] = useState(0);

  return (
    <section
      className="
        relative
        z-10
        mx-auto
        flex
        min-h-screen
        w-full
        max-w-5xl
        flex-col
        items-center
        justify-center
        overflow-hidden
        px-3
        py-12
        text-center
        sm:px-5
        sm:py-16
        md:py-20
        lg:py-24
      "
    >
      {/* =====================================================
          RESPONSIVE HEART AREA
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          aspect-square
          w-[76vw]
          max-w-[290px]
          shrink-0

          sm:w-[68vw]
          sm:max-w-[380px]

          md:w-[55vw]
          md:max-w-[440px]

          lg:w-[480px]
          lg:max-w-[480px]
        "
      >
        {/* ===================================================
            ROTATING HEART PHOTO RING
        =================================================== */}

        <div className="animate-spin-slow absolute inset-0">
          {RING.map((pos, i) => {
            const photo = heartPhotos[i % heartPhotos.length]!;

            return (
              <div
                key={i}
                className="
                  absolute
                  h-[15%]
                  w-[15%]
                  -translate-x-1/2
                  -translate-y-1/2

                  sm:h-[15.5%]
                  sm:w-[15.5%]

                  md:h-[16%]
                  md:w-[16%]
                "
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  animation: `drift ${
                    5 + (i % 4)
                  }s ease-in-out ${i * 0.3}s infinite`,
                }}
              >
                <div
                  className="h-full w-full p-[6%]"
                  style={{
                    ...heartMaskStyle,
                    background:
                      "linear-gradient(135deg, #ff1744, #d50000, #ff4d6d)",
                    filter:
                      "drop-shadow(0 0 10px rgba(255, 0, 50, 0.75))",
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    draggable={false}
                    className="
                      h-full
                      w-full
                      select-none
                      object-cover
                    "
                    style={heartMaskStyle}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            CENTER CARTOON COUPLE
        =================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-10
            h-[56%]
            w-[56%]
            -translate-x-1/2
            -translate-y-1/2

            sm:h-[58%]
            sm:w-[58%]

            md:h-[60%]
            md:w-[60%]
          "
        >
          <img
            src={couple}
            alt="Cartoon couple holding a glowing heart"
            width={1024}
            height={1024}
            draggable={false}
            className="
              animate-drift
              animate-glow-pulse
              h-full
              w-full
              select-none
              object-contain
            "
          />
        </div>
      </div>

      {/* =====================================================
          BIRTHDAY TITLE
      ===================================================== */}

      <h1
        className="
          mt-7
          max-w-[95vw]
          font-script
          text-4xl
          leading-tight
          text-rose-grad

          sm:mt-9
          sm:text-5xl

          md:mt-10
          md:text-6xl

          lg:text-7xl
        "
      >
        Happy Birthday My Love ❤️
      </h1>

      {/* =====================================================
          MESSAGE
      ===================================================== */}

      <Typewriter
        text={MESSAGE}
        speed={40}
        className="
          mx-auto
          mt-4
          w-full
          max-w-[92vw]
          whitespace-pre-wrap
          break-words
          font-display
          text-base
          leading-relaxed
          text-foreground/90

          sm:mt-5
          sm:max-w-2xl
          sm:text-lg

          md:mt-6
          md:text-xl

          lg:text-2xl
        "
      />

      {/* =====================================================
          SURPRISE BUTTON
      ===================================================== */}

      <button
        type="button"
        onMouseEnter={() => setHoverHearts((n) => n + 1)}
        onClick={() => {
          playChime(880);
          onSurprise();
        }}
        className="
          animate-heartbeat
          group
          relative
          mt-8
          w-full
          max-w-[340px]
          rounded-full
          px-5
          py-4
          font-display
          text-sm
          font-semibold
          leading-relaxed
          text-primary-foreground
          transition
          active:scale-95

          sm:mt-10
          sm:max-w-[440px]
          sm:px-7
          sm:py-4
          sm:text-base

          md:mt-12
          md:max-w-[500px]
          md:px-8
          md:py-5
          md:text-lg

          lg:text-2xl
        "
        style={{
          background: "var(--gradient-rose)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        ❤️ Play the Song First, Then Click Here for Your Surprise ❤️

        {/* ===================================================
            FLOATING HEARTS
        =================================================== */}

        <span
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-visible
          "
        >
          {hoverHearts > 0 &&
            Array.from({ length: 10 }, (_, i) => (
              <span
                key={`${hoverHearts}-${i}`}
                className="
                  absolute
                  bottom-2
                  text-lg
                  sm:text-xl
                "
                style={
                  {
                    left: `${8 + i * 9}%`,
                    "--dx": `${(i - 5) * 8}px`,
                    "--s": 0.8,
                    animation: `floatUp 2.4s ease-out ${
                      i * 0.08
                    }s forwards`,
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
