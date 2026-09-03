import { useEffect, useMemo, useRef, useState } from "react";
import { photos } from "@/lib/photos";
import {
  playChime,
  playClap,
  playFirecracker,
  playNo,
} from "@/lib/sfx";
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
      Array.from({ length: 12 }, (_, s) => ({
        x: 8 + Math.random() * 84,
        y: 8 + Math.random() * 48,
        delay: Math.random() * 2.8,
        parts: Array.from({ length: 28 }, (_, i) => {
          const angle = (i / 28) * Math.PI * 2;
          const distance = 65 + Math.random() * 100;

          return {
            tx: Math.cos(angle) * distance,
            ty: Math.sin(angle) * distance,
            id: `${s}-${i}`,
          };
        }),
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {shells.map((shell, shellIndex) => (
        <div
          key={shellIndex}
          className="absolute"
          style={{
            left: `${shell.x}%`,
            top: `${shell.y}%`,
          }}
        >
          {shell.parts.map((part) => (
            <span
              key={part.id}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={
                {
                  background: "var(--rose)",
                  boxShadow: "0 0 10px currentColor",
                  "--tx": `${part.tx}px`,
                  "--ty": `${part.ty}px`,
                  animation: `burst 1.6s ease-out ${shell.delay}s infinite`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const PROMISES = [
  {
    icon: "❤️",
    title: "Promise #1",
    text: "तुझं हसू जपण्यासाठी माझ्याकडून शक्य ते सगळं करण्याचं.",
  },
  {
    icon: "🫶",
    title: "Promise #2",
    text: "आयुष्य कितीही कठीण झालं तरी तुझ्या सोबत उभं राहण्याचं.",
  },
  {
    icon: "🌸",
    title: "Promise #3",
    text: "आपल्या छोट्या छोट्या क्षणांनाही खास बनवत राहण्याचं.",
  },
  {
    icon: "📸",
    title: "Promise #4",
    text: "तुझ्यासोबत अजून खूप सुंदर आठवणी बनवण्याचं.",
  },
  {
    icon: "💍",
    title: "Promise #5",
    text: "परिस्थिती कोणतीही असो... प्रत्येक वेळी तुलाच निवडण्याचं.",
  },
];

const NO_MESSAGES = [
  {
    text: "Are you sure?",
    emoji: "🥺❤️",
  },
  {
    text: "Really?",
    emoji: "😭❤️",
  },
  {
    text: "Madhu... seriously?",
    emoji: "😂",
  },
  {
    text: "Okay... I'll ask one more time.",
    emoji: "❤️",
  },
  {
    text: "I know your answer is YES.",
    emoji: "😌❤️",
  },
];

type FinalSurpriseProps = {
  onDone?: () => void;
};

export function FinalSurprise({ onDone }: FinalSurpriseProps) {
  const [opened, setOpened] = useState(false);
  const [promiseIndex, setPromiseIndex] = useState(-1);
  const [daysOpen, setDaysOpen] = useState(false);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [chosen, setChosen] = useState(false);

  const best = photos[13]!;

  const doneCalled = useRef(false);

  const openSurprise = () => {
    playChime(660);
    setOpened(true);
  };

  const nextPromise = () => {
    playChime(720);

    if (promiseIndex < PROMISES.length - 1) {
      setPromiseIndex((current) => current + 1);
      return;
    }

    setDaysOpen(true);
  };

 const chooseYes = () => {
  playFirecracker();
  playClap();
  setChosen(true);
};

const chooseNo = () => {
  setNoCount((current) => {
    const next = Math.min(
      current + 1,
      NO_MESSAGES.length,
    );

    // current = 0 → No1
    // current = 1 → No2
    // current = 2 → No3
    // current = 3 → No4
    // current = 4 → No5
    playNo(current);

    return next;
  });
};

  const noScale = Math.max(0, 1 - noCount * 0.2);

  /*
   * The final surprise is considered complete after the final
   * HeartBurst area has been displayed for a short moment.
   */
  useEffect(() => {
    if (!chosen || doneCalled.current) return;

    const timer = window.setTimeout(() => {
      if (doneCalled.current) return;

      doneCalled.current = true;
      onDone?.();
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [chosen, onDone]);

  return (
    <section
      id="surprise"
      className="
        relative z-10 mx-auto
        flex w-full max-w-4xl
        flex-col items-center
        overflow-hidden
        px-4 py-14
        text-center
        sm:px-5 sm:py-20
        md:py-24
        lg:py-28
      "
    >
      {/* =========================================================
          OPENING
      ========================================================= */}

      {!opened && (
        <div className="flex w-full min-w-0 flex-col items-center">
          <p
            className="
              mb-3 px-2
              font-display text-xs
              uppercase tracking-[0.16em]
              text-muted-foreground
              sm:text-sm sm:tracking-[0.2em]
              md:text-base
            "
          >
            Just One More Thing...
          </p>

          <h2
            className="
              mx-auto w-full max-w-[95vw]
              break-words
              font-script text-[2.65rem]
              leading-[1.12]
              text-rose-grad
              sm:text-5xl
              md:text-6xl
            "
          >
            One Last Surprise ❤️
          </h2>

          <p
            className="
              mx-auto mt-4 w-full max-w-[92vw]
              break-words
              font-display text-base
              leading-7
              text-muted-foreground
              sm:text-lg sm:leading-relaxed
              md:text-xl
            "
          >
            Something special is waiting for you...
          </p>

          <button
            type="button"
            onClick={openSurprise}
            className="
              glass animate-glow-pulse group relative
              mx-auto mt-8
              flex w-full max-w-[calc(100vw-32px)]
              flex-col items-center
              overflow-hidden
              rounded-[1.75rem]
              px-6 py-8
              transition duration-500
              active:scale-[0.97]
              sm:mt-10 sm:max-w-[420px]
              sm:rounded-[2rem]
              sm:px-8 sm:py-9
              sm:hover:-translate-y-2
            "
            style={{
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0
                rounded-[1.75rem]
                opacity-0
                transition duration-500
                group-hover:opacity-100
              "
              style={{
                background:
                  "radial-gradient(circle, rgba(255,80,120,0.22), transparent 65%)",
              }}
            />

            <span
              aria-hidden
              className="
                relative animate-drift
                text-7xl
                sm:text-8xl
              "
              style={{
                fontFamily:
                  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
              }}
            >
              🎁
            </span>

            <span
              className="
                relative mt-4
                break-words
                font-display text-lg
                font-semibold leading-tight
                text-rose-grad
                sm:text-xl
                md:text-2xl
              "
            >
              Open My Heart ❤️
            </span>

            <span
              className="
                relative mt-3
                text-sm leading-6
                text-muted-foreground
                sm:text-base
              "
            >
              Tap to reveal your surprise
            </span>
          </button>
        </div>
      )}

      {/* =========================================================
          SURPRISE CONTENT
      ========================================================= */}

      {opened && (
        <div
          className="
            relative w-full min-w-0
            text-center
          "
        >
          <Fireworks />

          {/* =====================================================
              PROMISES
          ===================================================== */}

          {!daysOpen && (
            <div className="relative mx-auto w-full min-w-0">
              <p
                className="
                  font-display text-xs
                  uppercase tracking-[0.16em]
                  text-rose-grad
                  sm:text-sm
                  sm:tracking-[0.2em]
                  md:text-base
                "
              >
                Just Between Us ❤️
              </p>

              <h2
                className="
                  mx-auto mt-4 w-full
                  break-words px-1
                  font-script text-[2.55rem]
                  leading-[1.12]
                  text-rose-grad
                  sm:text-5xl
                  md:text-6xl
                "
              >
                A Few Little Promises
              </h2>

              <p
                className="
                  mx-auto mt-4 w-full max-w-[92vw]
                  break-words
                  font-display text-base
                  leading-7
                  text-muted-foreground
                  sm:text-lg sm:leading-relaxed
                "
              >
                Some promises I want to keep...
                <br />
                not just today, but always.
              </p>

              {promiseIndex === -1 && (
                <button
                  type="button"
                  onClick={nextPromise}
                  className="
                    glass animate-glow-pulse
                    mx-auto mt-8
                    flex w-full
                    max-w-[calc(100vw-32px)]
                    flex-col items-center
                    rounded-[1.75rem]
                    px-6 py-8
                    transition duration-500
                    active:scale-[0.97]
                    sm:mt-9 sm:max-w-[420px]
                    sm:rounded-[2rem]
                    sm:px-8 sm:py-9
                    sm:hover:-translate-y-2
                  "
                  style={{
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  <span
                    aria-hidden
                    className="
                      animate-heartbeat
                      text-6xl sm:text-7xl
                    "
                    style={{
                      fontFamily:
                        '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                    }}
                  >
                    💌
                  </span>

                  <span
                    className="
                      mt-4 break-words
                      font-display text-lg
                      font-semibold leading-tight
                      text-rose-grad
                      sm:text-xl md:text-2xl
                    "
                  >
                    Open My First Promise
                  </span>

                  <span
                    className="
                      mt-3
                      text-sm leading-6
                      text-muted-foreground
                      sm:text-base
                    "
                  >
                    I made these just for you ❤️
                  </span>
                </button>
              )}

              {promiseIndex >= 0 && (
                <div
                  className="
                    mx-auto mt-7 w-full min-w-0
                    sm:mt-10
                  "
                >
                  <div
                    key={promiseIndex}
                    className="
                      glass animate-rise-in
                      mx-auto w-full max-w-[540px]
                      min-w-0
                      rounded-[1.5rem]
                      p-6
                      sm:rounded-[2rem]
                      sm:p-8 md:p-10
                    "
                    style={{
                      boxShadow: "var(--shadow-glow)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="
                        text-6xl sm:text-7xl
                      "
                      style={{
                        fontFamily:
                          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                      }}
                    >
                      {PROMISES[promiseIndex]!.icon}
                    </div>

                    <h3
                      className="
                        mt-5 break-words
                        font-display text-xl
                        font-semibold leading-tight
                        text-rose-grad
                        sm:text-2xl md:text-3xl
                      "
                    >
                      {PROMISES[promiseIndex]!.title}
                    </h3>

                    <p
                      className="
                        mt-5 break-words
                        font-display text-base
                        leading-8
                        text-foreground/90
                        sm:text-lg sm:leading-relaxed
                        md:text-xl
                      "
                    >
                      {PROMISES[promiseIndex]!.text}
                    </p>

                    <div className="mx-auto mt-6 h-px w-full bg-white/10" />

                    <p
                      className="
                        mt-5
                        text-xs uppercase
                        tracking-[0.16em]
                        text-muted-foreground
                        sm:text-sm
                      "
                    >
                      {promiseIndex + 1} / {PROMISES.length}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={nextPromise}
                    className="
                      mt-6
                      max-w-[calc(100vw-32px)]
                      rounded-full
                      px-7 py-4
                      font-display text-base
                      font-semibold
                      text-primary-foreground
                      transition active:scale-95
                      sm:px-9 sm:py-4 sm:text-lg
                    "
                    style={{
                      background: "var(--gradient-rose)",
                      boxShadow: "var(--shadow-glow)",
                    }}
                  >
                    {promiseIndex === PROMISES.length - 1
                      ? "Continue ❤️"
                      : "Next Promise →"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =====================================================
              FOR THE DAYS WHEN
          ===================================================== */}

          {daysOpen && !questionOpen && !chosen && (
            <div
              className="
                relative mx-auto
                w-full max-w-2xl
                min-w-0
                animate-rise-in
              "
            >
              <p
                className="
                  font-display text-xs
                  uppercase tracking-[0.16em]
                  text-rose-grad
                  sm:text-sm
                  sm:tracking-[0.2em]
                  md:text-base
                "
              >
                Keep This Close ❤️
              </p>

              <h2
                className="
                  mx-auto mt-4 w-full
                  break-words px-1
                  font-script text-[2.55rem]
                  leading-[1.12]
                  text-rose-grad
                  sm:text-5xl
                  md:text-6xl
                "
              >
                For The Days When...
              </h2>

              <div
                className="
                  mx-auto mt-7 w-full
                  space-y-4
                  sm:mt-10 sm:space-y-5
                "
              >
                {[
                  {
                    title: "When you feel tired... 🌙",
                    text: "Come to me. ❤️",
                  },
                  {
                    title: "When you feel lost... 🫶",
                    text: "I'll find my way to you.",
                  },
                  {
                    title: "When you feel happy... 🌸",
                    text: "Let me celebrate with you.",
                  },
                  {
                    title: "And on every ordinary day... ❤️",
                    text: "Just be you. That's enough.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      glass w-full min-w-0
                      rounded-[1.35rem]
                      p-6 text-left
                      sm:rounded-3xl sm:p-7
                    "
                    style={{
                      boxShadow: "var(--shadow-soft)",
                    }}
                  >
                    <p
                      className="
                        break-words
                        font-display text-base
                        leading-8
                        sm:text-lg
                        sm:leading-relaxed
                        md:text-xl
                      "
                    >
                      <span className="font-semibold text-rose-grad">
                        {item.title}
                      </span>
                      <br />
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setQuestionOpen(true)}
                className="
                  mt-7
                  max-w-[calc(100vw-32px)]
                  rounded-full
                  px-7 py-4
                  font-display text-base
                  font-semibold
                  text-primary-foreground
                  transition active:scale-95
                  sm:mt-10 sm:px-9
                  sm:py-4 sm:text-lg
                "
                style={{
                  background: "var(--gradient-rose)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                One Last Question ❤️
              </button>
            </div>
          )}

          {/* =====================================================
              YES / NO QUESTION
          ===================================================== */}

          {questionOpen && !chosen && (
            <div
              className="
                relative mx-auto
                flex w-full max-w-2xl
                flex-col items-center
                min-w-0
                animate-rise-in
                text-center
              "
            >
              <div
                aria-hidden
                className="
                  animate-heartbeat
                  text-6xl sm:text-8xl
                "
                style={{
                  fontFamily:
                    '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                }}
              >
                🥺❤️
              </div>

             <p
  className="
    mt-6
    font-display text-2xl
    font-semibold
    uppercase tracking-[0.16em]
    text-rose-grad
    sm:text-3xl
    sm:tracking-[0.2em]
    md:text-4xl
  "
>
  Madhu...
</p>

              <h2
                className="
                  mx-auto mt-4 w-full
                  break-words px-1
                  font-script text-[2.55rem]
                  leading-[1.12]
                  text-rose-grad
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Would You Choose Me Again? ❤️
              </h2>

              <p
                className="
                  mx-auto mt-5
                  max-w-[90vw]
                  text-base leading-7
                  text-muted-foreground
                  sm:text-lg
                "
              >
                Be honest... 😌
              </p>

              {/* =================================================
                  NO MESSAGE
              ================================================= */}

              {noCount > 0 && (
                <div
                  key={noCount}
                  className="
                    animate-rise-in
                    mx-auto mt-7
                    flex min-h-[82px]
                    w-full
                    max-w-[calc(100vw-28px)]
                    items-center
                    justify-center
                    rounded-2xl
                    border border-white/10
                    bg-white/5
                    px-4 py-4
                    text-center
                    backdrop-blur-md
                    sm:min-h-[96px]
                    sm:max-w-xl
                    sm:rounded-3xl
                    sm:px-6 sm:py-5
                  "
                  style={{
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <p
                    className="
                      m-0
                      flex w-full
                      flex-wrap
                      items-center
                      justify-center
                      gap-x-3 gap-y-2
                      text-center
                    "
                  >
                    <span
                      className="
                        break-words
                        font-display
                        text-[1.45rem]
                        font-bold
                        leading-tight
                        text-rose-grad
                        sm:text-3xl
                        md:text-4xl
                      "
                    >
                      {NO_MESSAGES[noCount - 1]!.text}
                    </span>

                    <span
                      aria-hidden
                      className="
                        shrink-0
                        animate-heartbeat
                        text-[1.9rem]
                        leading-none
                        sm:text-4xl
                        md:text-5xl
                      "
                      style={{
                        fontFamily:
                          '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                      }}
                    >
                      {NO_MESSAGES[noCount - 1]!.emoji}
                    </span>
                  </p>
                </div>
              )}

              {/* =================================================
                  YES / NO BUTTONS
              ================================================= */}

              <div
                className="
                  mx-auto mt-8
                  flex w-full max-w-[360px]
                  items-center justify-center
                  gap-3 px-2
                  sm:mt-9
                  sm:max-w-none
                  sm:gap-5
                "
              >
                <button
                  type="button"
                  onClick={chooseYes}
                  className="
                    shrink-0
                    rounded-full
                    px-7 py-4
                    font-display
                    text-base
                    font-semibold
                    text-primary-foreground
                    transition-all duration-300
                    active:scale-90
                    sm:px-10
                    sm:py-4
                    sm:text-lg
                  "
                  style={{
                    background: "var(--gradient-rose)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  YES ❤️
                </button>

                {noCount < NO_MESSAGES.length && (
                  <button
                    type="button"
                    onClick={chooseNo}
                    aria-label="No"
                    className="
                      shrink-0
                      whitespace-nowrap
                      rounded-full
                      border border-white/15
                      bg-white/5
                      font-display
                      font-semibold
                      text-muted-foreground
                      backdrop-blur-md
                      transition-all duration-500
                      active:scale-90
                    "
                    style={{
                      paddingLeft: `${Math.max(
                        6,
                        22 - noCount * 3,
                      )}px`,
                      paddingRight: `${Math.max(
                        6,
                        22 - noCount * 3,
                      )}px`,
                      paddingTop: `${Math.max(
                        4,
                        12 - noCount * 1.5,
                      )}px`,
                      paddingBottom: `${Math.max(
                        4,
                        12 - noCount * 1.5,
                      )}px`,
                      fontSize: `${Math.max(
                        0.65,
                        0.95 - noCount * 0.07,
                      )}rem`,
                      opacity: Math.max(
                        0.15,
                        1 - noCount * 0.2,
                      ),
                      transform: `scale(${noScale})`,
                      transformOrigin: "center",
                    }}
                  >
                    NO 🙈
                  </button>
                )}
              </div>

              {noCount >= 2 &&
                noCount < NO_MESSAGES.length && (
                  <p
                    key={`hint-${noCount}`}
                    className="
                      animate-rise-in
                      mt-5 px-2
                      text-xs italic
                      leading-6
                      text-muted-foreground
                      sm:mt-6
                      sm:text-sm
                    "
                  >
                    The NO button is getting shy... 🙈💕
                  </p>
                )}

              {noCount >= NO_MESSAGES.length && (
               <p
  className="
    animate-rise-in
    mx-auto mt-6
    max-w-[92vw]
    break-words px-2
    font-display
    text-base
    font-semibold
    leading-7
    text-rose-grad
    sm:mt-7
    sm:text-lg
    sm:leading-8
    md:text-xl
    md:leading-9
  "
>
  Okay... NO has officially disappeared. 😂❤️
  <br />
  Now there&apos;s only one answer left. 😌
</p>
              )}
            </div>
          )}

          {/* =====================================================
              FINAL YES
          ===================================================== */}

          {chosen && (
            <div
              className="
                relative mx-auto
                flex w-full
                flex-col items-center
                min-w-0
                animate-rise-in
                text-center
              "
            >
              <Fireworks />
              <HeartBurst active />

              <div
                className="
                  relative mx-auto
                  flex w-full max-w-2xl
                  flex-col items-center
                  min-w-0
                  text-center
                "
              >
                <div
                  aria-hidden
                  className="
                    animate-heartbeat
                    text-7xl sm:text-8xl
                  "
                  style={{
                    fontFamily:
                      '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
                  }}
                >
                  ❤️
                </div>

              <p
  className="
    mt-6
    text-center
    font-display
    text-2xl
    font-semibold
    uppercase
    tracking-[0.16em]
    text-rose-grad
    sm:mt-7
    sm:text-3xl
    sm:tracking-[0.2em]
    md:text-4xl
  "
>
  I Knew It{" "}
  <span
    aria-hidden="true"
    className="not-italic"
    style={{
      fontFamily:
        '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif',
    }}
  >
    😌
  </span>
</p>

                <h2
                  className="
                    mx-auto mt-4
                    w-full
                    break-words
                    px-1
                    text-center
                    font-script
                    text-[2.7rem]
                    leading-[1.1]
                    text-rose-grad
                    sm:text-5xl
                    md:text-6xl
                  "
                >
                  I Choose You.
                  <br />
                  Every Single Time. ❤️
                </h2>

                <div
                  className="
                    glass
                    mx-auto mt-8
                    w-full max-w-[540px]
                    min-w-0
                    rounded-[1.5rem]
                    p-6
                    text-center
                    sm:mt-10
                    sm:rounded-[2rem]
                    sm:p-9
                  "
                  style={{
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  <p
                    className="
                      break-words
                      text-center
                      font-display
                      text-base
                      leading-8
                      text-foreground/90
                      sm:text-lg
                      sm:leading-relaxed
                      md:text-xl
                    "
                  >
                    आज, उद्या किंवा कितीही वर्षांनी...
                    <br />
                    माझी निवड बदलणार नाही.
                    <br />
                    <br />

                    <span className="font-semibold text-rose-grad">
                      माझी निवड नेहमी तूच असशील. ❤️
                    </span>
                  </p>
                </div>

                <div
                  className="
                    mt-12
                    w-full
                    text-center
                    sm:mt-16
                  "
                >
                  <p
                    className="
                      text-center
                      font-display
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground
                      sm:text-sm
                      sm:tracking-[0.2em]
                    "
                  >
                    My Final Promise
                  </p>

                  <p
                    className="
                      mx-auto mt-5
                      max-w-[95vw]
                      break-words
                      px-2
                      text-center
                      font-script
                      text-[2.15rem]
                      leading-[1.5]
                      text-rose-grad
                      sm:text-4xl
                      sm:leading-relaxed
                      md:text-5xl
                    "
                  >
                    “तुझ्यासोबत अजून खूप आयुष्य जगायचं आहे...
                    <br />
                    आणि त्या प्रत्येक दिवसात
                    <br />
                    तुलाच माझ्या सोबत पाहायचं आहे.” ❤️
                  </p>
                </div>

                <p
                  className="
                    mt-12
                    px-2
                    text-center
                    font-script
                    text-[2.45rem]
                    leading-tight
                    sm:mt-16
                    sm:text-5xl
                    md:text-6xl
                  "
                  style={{
                    background: "var(--gradient-rose)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    animation: "shimmer 4s linear infinite",
                  }}
                >
                  Promise Made.
                  <br />
                  Forever Kept. ♾️
                </p>

                <div
                  className="
                    relative mt-24
                    w-full
                    border-t border-white/10
                    pt-18
                    text-center
                    sm:mt-32
                    sm:pt-24
                  "
                >
                  <HeartBurst active />

                  <p
                    className="
                      relative
                      text-center
                      font-display
                      text-xs
                      uppercase
                      tracking-[0.16em]
                      text-rose-grad
                      sm:text-sm
                      sm:tracking-[0.2em]
                      md:text-base
                    "
                  >
                    For the woman I love ❤️
                  </p>

                  <h3
                    className="
                      relative
                      mx-auto mt-4
                      w-full
                      break-words
                      px-1
                      text-center
                      font-script
                      text-[2.7rem]
                      leading-[1.1]
                      text-rose-grad
                      sm:text-5xl
                      md:text-6xl
                    "
                  >
                    Happy Birthday
                    <br />
                    My Beautiful Wife ❤️
                  </h3>

                  <div
                    className="
                      relative
                      mx-auto mt-10
                      grid
                      aspect-square
                      w-[78vw]
                      max-w-[310px]
                      place-items-center
                      sm:mt-12
                      sm:w-[62vw]
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

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-[8%]
                        rounded-full
                        opacity-40
                        blur-2xl
                      "
                      style={{
                        background: "var(--rose)",
                      }}
                    />

                    <p
                      className="
                        relative
                        z-10
                        max-w-[68%]
                        -translate-y-[8%]
                        break-words
                        text-center
                        font-display
                        text-base
                        font-semibold
                        leading-7
                        text-primary-foreground
                        sm:text-xl
                        sm:leading-relaxed
                        md:text-2xl
                      "
                    >
                      You are not just a part of my life...
                      <br />
                      You are my life. ❤️
                    </p>
                  </div>

                  <div
                    className="
                      relative
                      mx-auto mt-10
                      aspect-square
                      w-[78vw]
                      max-w-[310px]
                      sm:mt-14
                      sm:w-[62vw]
                      sm:max-w-[380px]
                      md:max-w-[420px]
                    "
                  >
                    <div
                      className="
                        animate-glow-pulse
                        absolute
                        inset-0
                      "
                      style={{
                        ...heartMaskStyle,
                        background: "var(--gradient-rose)",
                        boxShadow: "var(--shadow-glow)",
                      }}
                    />

                    <div
                      className="
                        absolute
                        inset-[2.5%]
                      "
                      style={heartMaskStyle}
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

                  <p
                    className="
                      relative
                      mx-auto mt-5
                      max-w-[92vw]
                      break-words
                      px-2
                      text-center
                      font-display
                      text-sm
                      leading-6
                      text-muted-foreground
                      sm:mt-5
                      sm:text-base
                    "
                  >
                    One of my favourite memories with you ❤️
                  </p>

                  <p
                    className="
                      animate-rise-in
                      relative mt-10
                      px-2
                      text-center
                      font-script
                      text-[2.65rem]
                      leading-tight
                      sm:mt-12
                      sm:text-5xl
                      md:text-6xl
                    "
                    style={{
                      background: "var(--gradient-rose)",
                      backgroundSize: "200% auto",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      animation: "shimmer 4s linear infinite",
                    }}
                  >
                    Forever &amp; Always ❤️
                  </p>

                  <div
                    className="
                      relative
                      mx-auto mt-5
                      w-full
                      max-w-[92vw]
                      px-1
                      text-center
                      sm:mt-7
                    "
                  >
                    <p
                      className="
                        break-words
                        text-center
                        font-display
                        text-base
                        leading-8
                        text-muted-foreground
                        sm:text-xl
                        sm:leading-relaxed
                        md:text-2xl
                      "
                    >
                      No matter where life takes us,
                      <br />
                      I will always choose you. ❤️
                    </p>
                  </div>

                  <p
                    className="
                      animate-rise-in
                      relative
                      mx-auto mt-9
                      w-full
                      break-words
                      px-2
                      text-center
                      font-script
                      text-[2.35rem]
                      leading-[1.2]
                      text-rose-grad
                      sm:mt-10
                      sm:text-4xl
                      md:text-5xl
                    "
                  >
                    Once Again,
                    <br />
                    Happy Birthday My Love ❤️
                  </p>

                  <p
                    className="
                      relative mt-6
                      break-words
                      px-2
                      text-center
                      font-display
                      text-sm
                      leading-7
                      text-muted-foreground
                      sm:mt-6
                      sm:text-base
                    "
                  >
                    With all my love, forever yours. ❤️
                  </p>

                  <div
                    className="
                      relative
                      mx-auto mt-8
                      h-16 w-full
                      sm:mt-8
                      sm:h-24
                    "
                  >
                    <HeartBurst active />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
