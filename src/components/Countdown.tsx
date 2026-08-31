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

export function Countdown() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const t = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const from = new Date(DEFAULT_START);

  const valid = !Number.isNaN(from.getTime()) && now && from <= now;
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
    <section className="mx-auto max-w-4xl px-4 text-center">

      <h2 className="font-display text-2xl text-gold sm:text-4xl">
        Time Together from
      </h2>
      
        <p className="mt-2 font-display text-6xl text-gold">
          ❤️ 25 February 2022 ❤️
        </p>

      <p className="mt-2 text-sm text-muted-foreground">
        Every second with you has been a gift.
      </p>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {cells.map(([label, value]) => (
          <div
            key={label}
            className="glass rounded-xl px-2 py-3 text-center transition duration-500 hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow-gold)" }}
          >
            <div className="font-display text-2xl font-bold text-gold tabular-nums sm:text-3xl">
              {String(value).padStart(2, "0")}
            </div>

            <div className="mt-1 text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
              {label}
            </div>
          </div>
        ))}

        {!d &&
          Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="glass h-[80px] rounded-xl"
            />
          ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Our journey started
        </p>
      </div>

    </section>
  );
}