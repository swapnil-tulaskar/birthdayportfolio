import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Ambience } from "@/components/Ambience";
import { Countdown } from "@/components/Countdown";
import { EntryScreen } from "@/components/EntryScreen";
import { FinalSurprise } from "@/components/FinalSurprise";
import { Gallery } from "@/components/Gallery";
import { HeartBurst } from "@/components/HeartBurst";
import { LetterIntro } from "@/components/LetterIntro";
import { LoveLetter } from "@/components/LoveLetter";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Timeline } from "@/components/Timeline";

const title = "Happy Birthday My Love — A Romantic Surprise";

const description =
  "A cinematic birthday surprise for my wife: love gallery, memory timeline, a handwritten love letter, our time together, and a final magical surprise.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),

  component: Index,
});

function Index() {
  const [letterOpened, setLetterOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [bursting, setBursting] = useState(false);

  const surprise = useCallback(() => {
    setBursting(true);

    setTimeout(() => {
      setRevealed(true);

      setTimeout(() => {
        document
          .getElementById("gallery")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 250);
    }, 900);
  }, []);

  // FIRST SCREEN:
  // Only LetterIntro is shown.
  if (!letterOpened) {
    return (
      <LetterIntro
        onOpen={() => {
          setLetterOpened(true);
        }}
      />
    );
  }

  // AFTER LETTER:
  // Your existing birthday website starts here.
  return (
    <main className="relative min-h-screen">
      <Ambience />

      <MusicPlayer />

      <HeartBurst
        active={bursting}
        onDone={() => setBursting(false)}
      />

      <EntryScreen onSurprise={surprise} />

      {revealed && (
        <div className="animate-rise-in">
          <Gallery />
          <Timeline />
          <LoveLetter />
          <Countdown />
          <FinalSurprise />
        </div>
      )}

      <footer className="relative z-10 border-t border-border/40 px-5 py-12 text-center">
        <p className="font-script text-3xl text-rose-grad">
          Made With Endless Love ❤️
        </p>

        <p className="mt-2 font-display text-lg text-muted-foreground">
          By Your Loving Husband
        </p>
      </footer>
    </main>
  );
}