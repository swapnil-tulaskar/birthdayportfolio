import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "919399345549";

export function Feedback() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [waitingForReturn, setWaitingForReturn] = useState(false);

  // Detect when user comes back from WhatsApp
  useEffect(() => {
    if (!waitingForReturn) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setSent(true);
        setWaitingForReturn(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [waitingForReturn]);

  const sendFeedback = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    const whatsappMessage =
      `❤️ Birthday Surprise Feedback ❤️\n\n${trimmed}\n\n— From your love ❤️`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    // Mark that we are waiting for the user to return
    setWaitingForReturn(true);

    // Open WhatsApp
    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // After returning from WhatsApp
  if (sent) {
    return (
      <section
        id="feedback"
        className="
          relative z-10 mx-auto w-full max-w-3xl
          overflow-hidden px-4 py-16 text-center
          sm:px-5 sm:py-20
          md:py-24
        "
      >
        <div
          className="
            glass mx-auto w-full rounded-[1.75rem]
            p-6 sm:rounded-[2rem] sm:p-8 md:p-10
          "
          style={{
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div
            aria-hidden="true"
            className="
              animate-heartbeat text-5xl
              sm:text-6xl md:text-7xl
            "
          >
            ❤️
          </div>

          <h2
            className="
              mt-5 font-script text-4xl
              leading-tight text-rose-grad
              sm:text-5xl md:text-6xl
            "
          >
            Thank You My Love! ❤️
          </h2>

          <p
            className="
              mx-auto mt-5 max-w-xl
              font-display text-base
              leading-7 text-muted-foreground
              sm:text-lg md:text-xl
            "
          >
            Your beautiful words mean everything to me.
            <br />
            <span className="text-foreground/90">
              Thank you for sharing your heart with me. 💕
            </span>
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="
              mt-8 w-full rounded-full
              px-6 py-4
              font-display text-base
              font-semibold text-primary-foreground
              transition duration-300
              active:scale-95
              sm:max-w-md sm:px-8
              sm:py-5 sm:text-lg
            "
            style={{
              background: "var(--gradient-rose)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Continue ❤️
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="feedback"
      className="
        relative z-10 mx-auto w-full max-w-3xl
        overflow-hidden px-4 py-16 text-center
        sm:px-5 sm:py-20
        md:py-24
      "
    >
      <div
        className="
          glass mx-auto w-full rounded-[1.75rem]
          p-5 sm:rounded-[2rem] sm:p-8 md:p-10
        "
        style={{ boxShadow: "var(--shadow-glow)" }}
      >
        {/* Heart */}
        <div
          aria-hidden="true"
          className="
            animate-heartbeat text-5xl
            sm:text-6xl md:text-7xl
          "
        >
          💌
        </div>

        {/* Heading */}
        <h2
          className="
            mt-4 font-script text-4xl
            leading-tight text-rose-grad
            sm:text-5xl md:text-6xl
          "
        >
          One Last Thing... ❤️
        </h2>

        <p
          className="
            mx-auto mt-4 max-w-xl
            font-display text-base
            leading-7 text-muted-foreground
            sm:text-lg md:text-xl
          "
        >
          How did you like your surprise?
          <br />
          <span className="text-foreground/90">
            Tell me what you felt in your heart... 💕
          </span>
        </p>

        {/* Message box */}
        <div className="mt-7">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write your message here... ❤️"
            rows={5}
            maxLength={1000}
            className="
              w-full resize-none rounded-2xl
              border border-white/15 bg-black/20
              px-4 py-4 font-display text-base
              leading-7 text-foreground outline-none
              transition
              placeholder:text-muted-foreground/70
              focus:border-white/30
              focus:ring-2 focus:ring-rose-400/20
              sm:px-5 sm:py-5 sm:text-lg
            "
          />

          <div className="mt-2 flex justify-end px-1">
            <span className="text-xs text-muted-foreground">
              {message.length}/1000
            </span>
          </div>
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={sendFeedback}
          disabled={!message.trim() || waitingForReturn}
          className="
            animate-glow-pulse mt-5 w-full
            rounded-full px-6 py-4
            font-display text-base font-semibold
            text-primary-foreground
            transition duration-300
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-40
            sm:max-w-md sm:px-8
            sm:py-5 sm:text-lg
          "
          style={{
            background: "var(--gradient-rose)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          {waitingForReturn
            ? "📱 WhatsApp Opened..."
            : "💚 Send My Message on WhatsApp"}
        </button>

        {/* Waiting hint */}
        {waitingForReturn && (
          <p
            className="
              animate-rise-in mt-5
              font-display text-sm
              leading-6 text-gold
              sm:text-base
            "
          >
            Send your message on WhatsApp ❤️
            <br />
            Then come back here. 💕
          </p>
        )}

        <p
          className="
            mt-5 text-[11px]
            leading-5 text-muted-foreground
            sm:text-xs
          "
        >
          Your message will open directly in WhatsApp. 📱❤️
        </p>
      </div>
    </section>
  );
}