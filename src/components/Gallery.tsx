import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { photos } from "@/lib/photos";

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  // =========================================================
  // RANDOM 21 PHOTOS FROM 50
  // =========================================================
  const [galleryPhotos] = useState(() => {
    const shuffled = [...photos];

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      // TypeScript-safe swap
      const temp = shuffled[i]!;
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp;
    }

    // Show only 21 random photos
    return shuffled.slice(0, 21);
  });

  // =========================================================
  // PRELOAD SELECTED 21 IMAGES
  // =========================================================
  useEffect(() => {
    const timer = window.setTimeout(() => {
      galleryPhotos.forEach((photo) => {
        const img = new Image();
        img.src = photo.src;
      });
    }, 500);

    return () => window.clearTimeout(timer);
  }, [galleryPhotos]);

  // =========================================================
  // LOCK BACKGROUND SCROLL WHEN POPUP IS OPEN
  // =========================================================
  useEffect(() => {
    if (open === null) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // =========================================================
  // PREVENT EASY IMAGE DRAG / RIGHT CLICK
  // =========================================================
  const noSave = {
    onContextMenu: (e: React.MouseEvent) => {
      e.preventDefault();
    },

    onDragStart: (e: React.DragEvent) => {
      e.preventDefault();
    },

    draggable: false,
  };

  return (
    <section
      id="gallery"
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-6xl
        overflow-hidden
        px-3
        py-12
        sm:px-5
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
      {/* =====================================================
          HEADING
      ===================================================== */}

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
        Love Gallery
      </h2>

      <p
        className="
          mx-auto
          mt-3
          max-w-[92vw]
          text-center
          font-display
          text-sm
          leading-relaxed
          text-muted-foreground
          sm:text-base
          md:text-lg
        "
      >
        Every picture, a heartbeat we get to keep.
      </p>

      {/* =====================================================
          GALLERY - 21 RANDOM PHOTOS
      ===================================================== */}

      <div
        className="
          mt-7
          columns-1
          gap-3
          sm:mt-10
          sm:columns-2
          sm:gap-4
          lg:mt-12
          lg:columns-3
          [&>*]:mb-3
          sm:[&>*]:mb-4
        "
      >
        {galleryPhotos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="
              group
              glass
              animate-rise-in
              mb-3
              block
              w-full
              overflow-hidden
              rounded-2xl
              p-1.5
              text-left
              transition
              duration-300
              active:scale-[0.98]
              sm:mb-4
              sm:rounded-3xl
              sm:p-2
              sm:hover:-translate-y-2
            "
            style={{
              animationDelay: `${i * 100}ms`,
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="
                relative
                w-full
                overflow-hidden
                rounded-xl
                sm:rounded-2xl
              "
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                {...noSave}
                className="
                  block
                  h-auto
                  w-full
                  select-none
                  object-contain
                  transition
                  duration-500
                  sm:group-hover:scale-105
                "
              />

              <span
                className="
                  pointer-events-none
                  absolute
                  right-2
                  top-2
                  text-lg
                  opacity-80
                  sm:right-3
                  sm:top-3
                  sm:text-2xl
                  sm:opacity-0
                  sm:transition-opacity
                  sm:duration-500
                  sm:group-hover:opacity-100
                "
              >
                ❤️
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* =====================================================
          FULLSCREEN POPUP
      ===================================================== */}

      {open !== null &&
        createPortal(
          <div
            className="
              fixed
              inset-0
              z-[999999]
              flex
              h-[100dvh]
              w-screen
              items-center
              justify-center
              bg-black/95
              p-2
              sm:p-4
            "
            onClick={() => setOpen(null)}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            {/* SELECTED PHOTO */}

            <img
              src={galleryPhotos[open]!.src}
              alt={galleryPhotos[open]!.alt}
              {...noSave}
              onClick={(e) => e.stopPropagation()}
              className="
                block
                h-auto
                w-auto
                max-h-[92dvh]
                max-w-[96vw]
                select-none
                object-contain
                rounded-xl
                animate-rise-in
                sm:max-h-[94dvh]
                sm:max-w-[94vw]
                sm:rounded-2xl
              "
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                boxShadow:
                  "0 0 50px rgba(255, 50, 100, 0.45)",
              }}
            />

            {/* CLOSE BUTTON */}

            <button
              type="button"
              aria-label="Close photo"
              onClick={() => setOpen(null)}
              className="
                absolute
                right-3
                top-3
                z-[1000000]
                grid
                h-11
                w-11
                place-items-center
                rounded-full
                bg-black/60
                text-xl
                text-white
                backdrop-blur-md
                transition
                hover:bg-black/80
                active:scale-90
                sm:right-5
                sm:top-5
                sm:h-12
                sm:w-12
              "
            >
              ✕
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}