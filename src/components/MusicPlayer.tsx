import { useEffect, useRef, useState } from "react";
import song from "@/assets/birthday-song.mp3";

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className="glass fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full px-4 py-3 sm:bottom-6 sm:left-6 sm:translate-x-0">

      <button
        aria-label="Play or pause music"
        onClick={toggleMusic}
        className="grid h-12 w-12 place-items-center rounded-full text-lg text-white transition hover:scale-105"
        style={{
          background: "var(--gradient-rose)",
          boxShadow: "var(--shadow-glow)",
        }}
      >
        {playing ? "❚❚" : "▶"}
      </button>

      <span className="font-display text-sm text-muted-foreground">
        ❤️ Beautiful Song for You ❤️
      </span>

    </div>
  );
}