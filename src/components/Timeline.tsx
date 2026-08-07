import { photos } from "../lib/photos";
import { timelinePhotos } from "../lib/timelinePhotos";
import { timeline } from "../lib/timeline";

export function Timeline() {
  return (
    <section id="timeline" className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <h2 className="text-center font-script text-4xl text-rose-grad sm:text-6xl">Our Memories</h2>
      <p className="mt-3 text-center font-display text-lg text-muted-foreground">
        A little timeline of us.
      </p>

      <div className="relative mt-14">
        <div
          className="absolute left-5 top-0 hidden h-full w-px sm:left-1/2 sm:block"
          style={{ background: "var(--gradient-gold)", opacity: 0.5 }}
        />
        <ol className="space-y-10">
          {timeline.map((item, i) => {
            const photo = timelinePhotos[i % timelinePhotos.length]!;
            const flip = i % 2 === 1;
            return (
              <li
                key={item.title}
                className={`animate-rise-in grid gap-5 sm:grid-cols-2 sm:items-center ${
                  flip ? "sm:[&>*:first-child]:order-2" : ""
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="glass overflow-hidden rounded-3xl p-2">
                  <img
                    src={photo.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-contain transition duration-700 hover:scale-105"
                  />
                </div>
                <div className={`glass rounded-3xl p-6 ${flip ? "sm:text-right" : ""}`}>
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-gold sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-muted-foreground">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
