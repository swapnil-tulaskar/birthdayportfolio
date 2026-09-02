import { useEffect, useRef, useState } from "react";
import song from "@/assets/birthday-song.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(song);

    audio.loop = true;
    audio.volume = 0.5;

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);

        // Play होते ही player छोटा होकर left side में चला जाए
        setExpanded(false);
      }
    } catch (error) {
      console.error("Unable to play music:", error);
      setPlaying(false);
    }
  };

  return (
    <div
      className={`
        fixed
        bottom-4
        z-50
        transition-all
        duration-300

        ${
          expanded
            ? "left-1/2 -translate-x-1/2"
            : "left-3 translate-x-0"
        }

        sm:bottom-6
        sm:left-6
        sm:translate-x-0
      `}
    >
      {/* Small Music Button */}
      {!expanded && (
        <button
          type="button"
          aria-label="Show music player"
          onClick={() => setExpanded(true)}
          className="
            grid
            h-11
            w-11
            place-items-center
            rounded-full
            text-lg
            text-white
            transition
            hover:scale-110
            active:scale-95
          "
          style={{
            background: "var(--gradient-rose)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {playing ? "♫" : "♪"}
        </button>
      )}

      {/* Full Music Player */}
      {expanded && (
        <div
          className="
            glass
            flex
            w-[calc(100vw-24px)]
            max-w-[360px]
            items-center
            gap-3
            rounded-full
            px-3
            py-2.5
            animate-rise-in

            sm:w-auto
            sm:max-w-none
            sm:px-4
            sm:py-3
          "
        >
          {/* Play / Pause */}
          <button
            type="button"
            aria-label={playing ? "Pause music" : "Play music"}
            aria-pressed={playing}
            onClick={toggleMusic}
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              rounded-full
              text-base
              text-white
              transition
              hover:scale-105
              active:scale-95
              sm:h-12
              sm:w-12
              sm:text-lg
            "
            style={{
              background: "var(--gradient-rose)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          {/* Song Name */}
          <span
            className="
              min-w-0
              flex-1
              truncate
              font-display
              text-sm
              font-medium
              leading-tight
              text-muted-foreground
              sm:text-base
            "
          >
            ❤️ Beautiful Song for You ❤️
          </span>

          {/* Hide Button */}
          <button
            type="button"
            aria-label="Hide music player"
            onClick={() => setExpanded(false)}
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              text-lg
              text-white/80
              transition
              hover:bg-white/10
              hover:text-white
              active:scale-95
            "
          >
            ↓
          </button>
        </div>
      )}
    </div>
  );
}