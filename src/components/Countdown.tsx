import { useEffect, useState } from "react";

const DEFAULT_START = "2022-02-25T00:00:00";

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const prev = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prev;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

type CountdownProps = {
  visible?: boolean;
};

export function Countdown({ visible = true }: CountdownProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Countdown visible नसताना timer सुरू करू नका
    if (!visible) return;

    setNow(new Date());

    const t = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(t);
  }, [visible]);

  // Love Letter पूर्ण type होईपर्यंत Countdown दिसणार नाही
  if (!visible) return null;

  const from = new Date(DEFAULT_START);

  const valid =
    !Number.isNaN(from.getTime()) &&
    now !== null &&
    from <= now;

  const d = valid ? diff(from, now) : null;

  const cells: [string, number][] = d
    ? [
        ["Years", d.years],
        ["Months", d.months],
        ["Days", d.days],
        ["Hours", d.hours],
        ["Minutes", d.minutes],
        ["Seconds", d.seconds],
      ]
    : [];

  return (
    <section
      className="
        animate-rise-in
        mx-auto w-full max-w-4xl overflow-hidden
        px-3 py-10 text-center
        sm:px-5 sm:py-14
        md:py-20
      "
    >
      <h2
        className="
          font-display text-xl leading-tight text-gold
          sm:text-3xl
          md:text-4xl
        "
      >
        Time Together from
      </h2>

      <p
        className="
          mt-2 break-words
          font-display text-3xl font-semibold leading-tight text-gold
          sm:text-5xl
          md:text-6xl
        "
      >
        ❤️ 25 February 2022 ❤️
      </p>

      <p
        className="
          mx-auto mt-3 max-w-[90vw]
          text-xs leading-relaxed text-muted-foreground
          sm:text-sm
          md:text-base
        "
      >
        Every second with you has been a gift.
      </p>

      <div
        className="
          mx-auto mt-7 grid w-full max-w-3xl grid-cols-3 gap-2
          sm:mt-9 sm:grid-cols-6 sm:gap-3
        "
      >
        {cells.map(([label, value]) => (
          <div
            key={label}
            className="
              glass min-w-0 rounded-xl px-1.5 py-3 text-center
              transition duration-500
              active:scale-[0.98]
              sm:rounded-2xl sm:px-2 sm:py-4
              sm:hover:-translate-y-1
            "
            style={{ boxShadow: "var(--shadow-gold)" }}
          >
            <div
              className="
                font-display text-xl font-bold text-gold tabular-nums
                sm:text-2xl
                md:text-3xl
              "
            >
              {String(value).padStart(2, "0")}
            </div>

            <div
              className="
                mt-1 truncate
                text-[0.48rem] uppercase tracking-[0.12em]
                text-muted-foreground
                sm:text-[0.55rem]
                sm:tracking-[0.18em]
              "
            >
              {label}
            </div>
          </div>
        ))}

        {!d &&
          Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="
                glass h-[72px] rounded-xl
                sm:h-[88px] sm:rounded-2xl
              "
            />
          ))}
      </div>

      <div className="mt-6 text-center sm:mt-8">
        <p
          className="
            text-[0.6rem] uppercase tracking-[0.16em]
            text-muted-foreground
            sm:text-xs sm:tracking-[0.2em]
          "
        >
          Our journey started
        </p>
      </div>
    </section>
  );
}
