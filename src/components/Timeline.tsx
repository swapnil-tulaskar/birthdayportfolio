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
        py-14
        sm:px-5
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      <h2
        className="
          text-center
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
          text-center
          font-display
          text-sm
          leading-relaxed
          text-muted-foreground
          sm:text-base
          md:text-lg
        "
      >
        A little timeline of us.
      </p>

      <div className="relative mt-9 sm:mt-14">
        {/* Center timeline line on desktop */}
        <div
          className="
            absolute
            left-1/2
            top-0
            hidden
            h-full
            w-px
            -translate-x-1/2
            sm:block
          "
          style={{
            background: "var(--gradient-gold)",
            opacity: 0.5,
          }}
        />

        <ol className="space-y-8 sm:space-y-10 md:space-y-12">
          {timeline.map((item, i) => {
            const photo =
              timelinePhotos[i % timelinePhotos.length]!;

            const flip = i % 2 === 1;

            return (
              <li
                key={item.title}
                className={`
                  animate-rise-in
                  grid
                  gap-4
                  sm:grid-cols-2
                  sm:items-center
                  sm:gap-8
                  ${
                    flip
                      ? "sm:[&>*:first-child]:order-2"
                      : ""
                  }
                `}
                style={{
                  animationDelay: `${i * 120}ms`,
                }}
              >
                {/* Photo */}
                <div
                  className="
                    glass
                    w-full
                    overflow-hidden
                    rounded-2xl
                    p-1.5
                    sm:rounded-3xl
                    sm:p-2
                  "
                  style={{
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                    <img
                      src={photo.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="
                        block
                        h-auto
                        w-full
                        rounded-xl
                        object-contain
                        transition
                        duration-700
                        active:scale-[0.99]
                        sm:rounded-2xl
                        sm:hover:scale-105
                      "
                    />
                  </div>
                </div>

                {/* Memory text */}
                <div
                  className={`
                    glass
                    w-full
                    overflow-hidden
                    rounded-2xl
                    p-5
                    sm:rounded-3xl
                    sm:p-7
                    md:p-8
                    ${flip ? "sm:text-right" : ""}
                  `}
                  style={{
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div
                    className="
                      text-2xl
                      sm:text-3xl
                    "
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
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

                  <p
                    className="
                      mt-2
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
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
