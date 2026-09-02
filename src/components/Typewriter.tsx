import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  /** Only start typing once scrolled into view */
  whenVisible?: boolean;
  onDone?: () => void;
};

export function Typewriter({
  text,
  speed = 32,
  startDelay = 300,
  className,
  whenVisible = false,
  onDone,
}: Props) {
  const [shown, setShown] = useState(0);
  const [armed, setArmed] = useState(!whenVisible);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (armed || !ref.current) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    io.observe(ref.current);

    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(i);

        if (i >= text.length) {
          if (interval) {
            clearInterval(interval);
          }

          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);

      if (interval) {
        clearInterval(interval);
      }
    };

    // onDone intentionally excluded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, text, speed, startDelay]);

  return (
    <p
      ref={ref}
      className={className}
    >
      {text.slice(0, shown)}

      {shown < text.length && (
        <span
          className="
            ml-0.5
            inline-block
            w-[2px]
            animate-pulse
            bg-accent
            align-middle
            text-transparent
          "
        >
          |
        </span>
      )}
    </p>
  );
}
