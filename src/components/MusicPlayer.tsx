import { useEffect, useRef, useState } from "react";
import song from "@/assets/birthday-song.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
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
      }
    } catch (error) {
      console.error("Unable to play music:", error);
      setPlaying(false);
    }
  };

  return (
    <div
      className="
        glass
        fixed
        bottom-4
        left-1/2
        z-50
        flex
        w-[calc(100%-24px)]
        max-w-[360px]
        -translate-x-1/2
        items-center
        justify-center
        gap-3
        rounded-full
        px-3
        py-2.5

        sm:bottom-6
        sm:left-6
        sm:w-auto
        sm:max-w-none
        sm:translate-x-0
        sm:justify-start
        sm:px-4
        sm:py-3
      "
    >
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

      <span
        className="
          min-w-0
          truncate
          font-display
          text-xs
          leading-tight
          text-muted-foreground
          sm:text-sm
        "
      >
        ❤️ Beautiful Song for You ❤️
      </span>
    </div>
  );
}