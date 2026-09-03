import { timelinePhotos } from "../lib/timelinePhotos";
import { timeline } from "../lib/timeline";

export function Timeline() {
  return (
    <section
      id="timeline"
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-5xl
        overflow-hidden
        px-3
        py-16
        sm:px-5
        sm:py-24
        md:py-28
        lg:py-32
      "
    >
      {/* Heading */}
      <div className="relative z-10 text-center">
        <div
          className="
            mx-auto
            mb-3
            flex
            items-center
            justify-center
            gap-3
            text-gold
          "
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-20" />

          <span className="animate-heartbeat text-xl sm:text-2xl">
            ❤️
          </span>

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-20" />
        </div>

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
          Our Memories
        </h2>

        <p
          className="
            mx-auto
            mt-3
            max-w-[90vw]
            font-display
            text-sm
            leading-relaxed
            text-muted-foreground
            sm:max-w-xl
            sm:text-base
            md:text-lg
          "
        >
          A little timeline of us.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-12 sm:mt-16">
        {/* Animated desktop center line */}
        <div
          className="
            absolute
            left-1/2
            top-0
            hidden
            h-full
            w-px
            -translate-x-1/2
            overflow-hidden
            sm:block
          "
          aria-hidden="true"
        >
          {/* Base line */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: "var(--gradient-gold)",
            }}
          />

          {/* Moving glow */}
          <div
            className="
              absolute
              left-1/2
              top-0
              h-24
              w-1
              -translate-x-1/2
              animate-timeline-light
              rounded-full
              blur-[2px]
            "
            style={{
              background: "var(--gold)",
              boxShadow:
                "0 0 12px var(--gold), 0 0 30px var(--gold)",
            }}
          />
        </div>

        {/* Mobile line */}
        <div
          className="
            absolute
            left-[17px]
            top-0
            h-full
            w-px
            sm:hidden
          "
          aria-hidden="true"
          style={{
            background: "var(--gradient-gold)",
            opacity: 0.45,
          }}
        />

        <ol className="space-y-12 sm:space-y-14 md:space-y-16">
          {timeline.map((item, i) => {
            const photo =
              timelinePhotos[i % timelinePhotos.length]!;

            const flip = i % 2 === 1;

            return (
              <li
                key={`${item.title}-${i}`}
                className={`
                  group
                  relative
                  grid
                  gap-5
                  pl-10
                  sm:grid-cols-2
                  sm:items-center
                  sm:gap-8
                  sm:pl-0
                  ${
                    flip
                      ? "sm:[&>*:first-child]:order-2"
                      : ""
                  }
                `}
                style={{
                  animation: "timelineReveal 0.8s ease both",
                  animationDelay: `${i * 140}ms`,
                }}
              >
                {/* =========================
                    MOBILE HEART NODE
                   ========================= */}
                <div
                  className="
                    absolute
                    left-[17px]
                    top-1/2
                    z-20
                    flex
                    h-7
                    w-7
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    sm:hidden
                  "
                  aria-hidden="true"
                >
                  <span
                    className="
                      absolute
                      h-7
                      w-7
                      animate-timeline-pulse
                      rounded-full
                      opacity-50
                    "
                    style={{
                      background:
                        "radial-gradient(circle, var(--gold), transparent 70%)",
                    }}
                  />

                  <span
                    className="
                      relative
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gold/60
                      bg-background
                      text-[10px]
                      shadow-lg
                    "
                  >
                    ❤️
                  </span>
                </div>

                {/* =========================
                    PHOTO
                   ========================= */}
                <div
                  className="
                    relative
                    w-full
                    overflow-visible
                  "
                >
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      p-1.5
                      transition-all
                      duration-700
                      sm:rounded-3xl
                      sm:p-2
                      sm:group-hover:-translate-y-2
                    "
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(1 0 0 / 0.14), oklch(1 0 0 / 0.04))",
                      border:
                        "1px solid oklch(1 0 0 / 0.16)",
                      boxShadow:
                        "var(--shadow-soft)",
                    }}
                  >
                    {/* Photo glow */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-0
                        opacity-0
                        transition-opacity
                        duration-700
                        sm:group-hover:opacity-100
                      "
                      style={{
                        background:
                          "radial-gradient(circle at center, oklch(0.84 0.13 82 / 0.22), transparent 65%)",
                      }}
                    />

                    <div
                      className="
                        relative
                        z-10
                        overflow-hidden
                        rounded-xl
                        bg-black/10
                        sm:rounded-2xl
                      "
                    >
                      <img
  src={photo.src}
  alt={item.title}
  loading={i < 3 ? "eager" : "lazy"}
  decoding="async"
  draggable={false}
  className="
    block
    h-auto
    w-full
    rounded-xl
    object-contain
    transition-transform
    duration-1000
    ease-out
    sm:rounded-2xl
    sm:group-hover:scale-[1.03]
  "
/>

                      {/* Image shine */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          -translate-x-full
                          bg-gradient-to-r
                          from-transparent
                          via-white/10
                          to-transparent
                          transition-transform
                          duration-1000
                          sm:group-hover:translate-x-full
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* =========================
                    MEMORY CARD
                   ========================= */}
                <div
                  className={`
                    relative
                    w-full
                    overflow-hidden
                    rounded-2xl
                    p-5
                    transition-all
                    duration-700
                    sm:rounded-3xl
                    sm:p-7
                    md:p-8
                    sm:group-hover:-translate-y-1
                    ${flip ? "sm:text-right" : ""}
                  `}
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(1 0 0 / 0.08), oklch(1 0 0 / 0.035))",
                    border:
                      "1px solid oklch(1 0 0 / 0.13)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow:
                      "var(--shadow-soft)",
                  }}
                >
                  {/* Card glow */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      opacity-20
                      blur-3xl
                      transition-opacity
                      duration-700
                      sm:group-hover:opacity-50
                    "
                    style={{
                      background: "var(--gold)",
                    }}
                  />

                  {/* Heart connector on desktop */}
                  <div
                    className="
                      absolute
                      top-1/2
                      hidden
                      -translate-y-1/2
                      sm:flex
                    "
                    style={
                      flip
                        ? {
                            left: "-37px",
                          }
                        : {
                            right: "-37px",
                          }
                    }
                    aria-hidden="true"
                  >
                    <span
                      className="
                        relative
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gold/50
                        bg-background
                        text-xs
                        shadow-lg
                        transition-all
                        duration-500
                        group-hover:scale-125
                      "
                    >
                      <span className="animate-timeline-pulse absolute inset-0 rounded-full" />
                      <span className="relative">❤️</span>
                    </span>
                  </div>

                  {/* Small memory number */}
                  <div
                    className={`
                      relative
                      font-body
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-gold/70
                      ${flip ? "sm:text-right" : ""}
                    `}
                  >
                    Memory {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div
                    className="
                      relative
                      mt-3
                      text-2xl
                      transition-transform
                      duration-500
                      sm:text-3xl
                      sm:group-hover:scale-110
                    "
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      relative
                      mt-2
                      break-words
                      font-display
                      text-xl
                      font-semibold
                      leading-tight
                      text-gold
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Text */}
                  <p
                    className="
                      relative
                      mt-3
                      break-words
                      font-body
                      text-sm
                      leading-7
                      text-muted-foreground
                      sm:text-base
                      sm:leading-relaxed
                      md:text-lg
                    "
                  >
                    {item.text}
                  </p>

                  {/* Bottom heart */}
                  <div
                    className={`
                      relative
                      mt-4
                      text-xs
                      opacity-60
                      transition-all
                      duration-500
                      sm:group-hover:opacity-100
                      ${flip ? "sm:text-right" : ""}
                    `}
                    aria-hidden="true"
                  >
                    ✦ &nbsp; ❤️ &nbsp; ✦
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Ending decoration */}
      <div
        className="
          mt-16
          flex
          flex-col
          items-center
          justify-center
          sm:mt-20
        "
      >
        <div
          className="
            animate-heartbeat
            text-3xl
            sm:text-4xl
          "
          aria-hidden="true"
        >
          ❤️
        </div>

        <p
          className="
            mt-3
            text-center
            font-script
            text-2xl
            text-rose-grad
            sm:text-3xl
          "
        >
          And our story continues...
        </p>

        <div
          className="
            mt-4
            h-px
            w-24
            opacity-50
          "
          style={{
            background: "var(--gradient-gold)",
          }}
        />
      </div>
    </section>
  );
}