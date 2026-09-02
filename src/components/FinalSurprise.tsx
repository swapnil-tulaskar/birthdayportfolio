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

          return {
            tx: Math.cos(a) * d,
            ty: Math.sin(a) * d,
            id: `${s}-${i}`,
          };
        }),
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {shells.map((sh, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${sh.x}%`,
            top: `${sh.y}%`,
          }}
        >
          {sh.parts.map((p) => (
            <span
              key={p.id}
              className="
                absolute
                h-1.5
                w-1.5
                rounded-full
              "
              style={
                {
                  background:
                    i % 2
                      ? "var(--gold)"
                      : "var(--rose)",
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
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-4xl
        overflow-hidden
        px-3
        py-14
        text-center
        sm:px-5
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      {!opened ? (
        <>
          <h2
            className="
              font-script
              text-4xl
              leading-tight
              text-rose-grad
              sm:text-5xl
              md:text-6xl
            "
          >
            One Last Surprise
          </h2>

          <button
            type="button"
            onClick={() => {
              playChime(660);
              setOpened(true);
            }}
            className="
              glass
              animate-glow-pulse
              mx-auto
              mt-8
              flex
              w-full
              max-w-[320px]
              flex-col
              items-center
              gap-3
              rounded-[1.5rem]
              px-5
              py-6
              transition
              duration-500
              active:scale-[0.98]
              sm:mt-10
              sm:max-w-[380px]
              sm:rounded-[2rem]
              sm:px-10
              sm:py-8
              sm:hover:-translate-y-2
            "
          >
            <span
              className="
                animate-drift
                text-6xl
                sm:text-8xl
              "
              aria-hidden="true"
            >
              🎁
            </span>

            <span
              className="
                font-display
                text-base
                font-semibold
                leading-relaxed
                text-gold
                sm:text-xl
                md:text-2xl
              "
            >
              🎁 Open Final Surprise
            </span>
          </button>
        </>
      ) : (
        <div className="relative animate-rise-in">
          <Fireworks />

          <HeartBurst active />

          <h2
            className="
              relative
              px-2
              font-script
              text-4xl
              leading-tight
              text-rose-grad
              sm:text-5xl
              md:text-6xl
            "
          >
            ❤️ Happy Birthday My Beautiful Wife ❤️
          </h2>

          {/* Love Heart */}
          <div
            className="
              relative
              mx-auto
              mt-9
              grid
              aspect-square
              w-[72vw]
              max-w-[290px]
              place-items-center
              sm:mt-12
              sm:w-[65vw]
              sm:max-w-[380px]
              md:max-w-[420px]
            "
          >
            <div
              className="
                animate-heartbeat
                absolute
                inset-0
              "
              style={{
                ...heartMaskStyle,
                background: "var(--gradient-rose)",
                boxShadow: "var(--shadow-glow)",
              }}
            />

            <p
              className="
                relative
                z-10
                max-w-[62%]
                -translate-y-[8%]
                font-display
                text-base
                font-semibold
                leading-relaxed
                text-primary-foreground
                sm:text-xl
                md:text-2xl
              "
            >
              "I Love You More Than Words Can Ever Say."
            </p>
          </div>

          {/* Best Memory */}
          <div
            className="
              mx-auto
              mt-9
              aspect-square
              w-[72vw]
              max-w-[290px]
              sm:mt-12
              sm:w-[65vw]
              sm:max-w-[380px]
              md:max-w-[420px]
            "
          >
            <div
              className="
                animate-glow-pulse
                h-full
                w-full
              "
              style={{
                ...heartMaskStyle,
                background: "var(--gradient-gold)",
                padding: 8,
              }}
            >
              <img
                src={best.src}
                alt="Our best memory together"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="
                  block
                  h-full
                  w-full
                  select-none
                  object-cover
                "
                style={heartMaskStyle}
              />
            </div>
          </div>

          {/* Forever */}
          <p
            className="
              animate-rise-in
              mt-9
              px-2
              font-script
              text-4xl
              leading-tight
              sm:mt-12
              sm:text-5xl
              md:text-6xl
            "
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

          <p
            className="
              animate-rise-in
              mx-auto
              mt-5
              max-w-[92vw]
              font-display
              text-base
              leading-relaxed
              text-muted-foreground
              sm:mt-6
              sm:text-2xl
              md:text-3xl
            "
          >
            Once Again Happy Birthday My Beautiful Wife ❤️
          </p>
        </div>
      )}
    </section>
  );
}
