import { useEffect, useState } from "react";
import { photos } from "@/lib/photos";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  // Preload gallery images in the background
  useEffect(() => {
    const timer = window.setTimeout(() => {
      photos.forEach((photo) => {
        const img = new Image();
        img.src = photo.src;
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, []);

  // Keyboard controls
  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
      }

      if (e.key === "ArrowRight") {
        setOpen(
          (i) => ((i ?? 0) + 1) % photos.length
        );
      }

      if (e.key === "ArrowLeft") {
        setOpen(
          (i) =>
            ((i ?? 0) - 1 + photos.length) %
            photos.length
        );
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const noSave = {
    onContextMenu: (e: React.MouseEvent) =>
      e.preventDefault(),

    onDragStart: (e: React.DragEvent) =>
      e.preventDefault(),

    draggable: false,
  };

  return (
    <section
      id="gallery"
      className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:py-28"
    >
      <h2 className="text-center font-script text-4xl text-rose-grad sm:text-6xl">
        Love Gallery
      </h2>

      <p className="mt-3 text-center font-display text-lg text-muted-foreground">
        Every picture, a heartbeat we get to keep.
      </p>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpen(i)}
            className="group glass animate-rise-in block w-full overflow-hidden rounded-3xl p-2 text-left transition duration-500 hover:-translate-y-2"
            style={{
              animationDelay: `${i * 120}ms`,
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                {...noSave}
                className="w-full animate-drift object-cover transition duration-700 group-hover:scale-110"
                style={{
                  animationDelay: `${i * 300}ms`,
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, oklch(0.66 0.2 15 / 0.35))",
                  boxShadow:
                    "inset 0 0 60px oklch(0.84 0.13 82 / 0.45)",
                }}
              />

              <span className="pointer-events-none absolute right-3 top-3 text-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                ❤️
              </span>
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center px-4 py-16"
          style={{
            background: "oklch(0.12 0.04 340 / 0.75)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
          onClick={() => setOpen(null)}
        >
          <img
            src={photos[open]!.src}
            alt={photos[open]!.alt}
            {...noSave}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[76vh] w-auto max-w-full animate-rise-in rounded-3xl object-contain select-none"
            style={{
              boxShadow: "var(--shadow-glow)",
              userSelect: "none",
            }}
          />

          <div
            className="mt-6 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Previous photo"
              onClick={() =>
                setOpen(
                  (i) =>
                    ((i ?? 0) - 1 + photos.length) %
                    photos.length
                )
              }
              className="glass rounded-full px-6 py-3 font-display text-lg transition hover:text-accent"
            >
              ‹ Prev
            </button>

            <button
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="glass rounded-full px-5 py-3 font-display text-lg transition hover:text-accent"
            >
              ✕
            </button>

            <button
              aria-label="Next photo"
              onClick={() =>
                setOpen(
                  (i) => ((i ?? 0) + 1) % photos.length
                )
              }
              className="glass rounded-full px-6 py-3 font-display text-lg transition hover:text-accent"
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
