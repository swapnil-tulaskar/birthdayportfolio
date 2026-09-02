import { useState } from "react";
import { Typewriter } from "./Typewriter";

const LETTER = `माझी प्रिय मधू... ❤️

आज तुझा वाढदिवस आहे,
म्हणून तुला काही मोठं किंवा खास सांगण्यापेक्षा
मनातलं थोडंसं सांगावंसं वाटलं.

तू माझ्या आयुष्यात आहेस,
माझ्या प्रत्येक सुख-दुःखात माझ्या सोबत आहेस,
हीच माझ्यासाठी खूप मोठी गोष्ट आहे.

आपण सोबत घालवलेले क्षण,
आपली छोटी छोटी भांडणं,
एकमेकांसोबत केलेल्या गप्पा,
एकत्र हसलेले क्षण...
हे सगळं माझ्यासाठी खूप खास आहे. ❤️

कदाचित मी प्रत्येक वेळी शब्दांतून सांगत नसेन,
पण तू माझ्यासाठी किती महत्त्वाची आहेस
हे माझ्या मनाला नेहमीच माहीत आहे.

तुझ्या वाढदिवशी माझी फक्त एवढीच इच्छा आहे
की तू नेहमी आनंदी राहावी,
तुझ्या चेहऱ्यावरचं हसू असंच कायम राहावं
आणि आयुष्यात कितीही वर्षं पुढे गेली,
तरी आपण असंच एकमेकांच्या सोबत राहावं. ❤️

तुझ्यासोबत अजून खूप आठवणी बनवायच्या आहेत,
अजून खूप हसायचं आहे,
अजून खूप आयुष्य जगायचं आहे...

वाढदिवसाच्या खूप खूप शुभेच्छा मधू. ❤️

तू आहेस,
हेच माझ्यासाठी पुरेसं आहे.

I Love You... Always and Forever. ❤️`;

type LoveLetterProps = {
  onDone?: () => void;
};

export function LoveLetter({ onDone }: LoveLetterProps) {
  const [opened, setOpened] = useState(false);

  return (
    <section
      id="letter"
      className="
        relative z-10 mx-auto w-full max-w-3xl
        overflow-hidden px-3 py-12
        sm:px-5 sm:py-16
        md:py-20
        lg:py-24
      "
    >
      {!opened ? (
        /* ================================
           OPEN LETTER SCREEN
        ================================= */
        <div className="flex w-full flex-col items-center text-center">
          <h2
            className="
              max-w-[95vw]
              font-script text-4xl leading-tight
              text-rose-grad
              sm:text-5xl
              md:text-6xl
            "
          >
            A Little Something For You ❤️
          </h2>

          <p
            className="
              mt-3 max-w-[90vw]
              font-display text-sm leading-relaxed
              text-muted-foreground
              sm:mt-4 sm:text-base
              md:text-lg
            "
          >
            There is something I want to tell you...
          </p>

          <button
            type="button"
            onClick={() => setOpened(true)}
            className="
              glass animate-glow-pulse
              mt-7 flex w-full max-w-[310px]
              flex-col items-center justify-center
              rounded-[1.75rem]
              px-5 py-6
              transition duration-500
              active:scale-95
              sm:mt-9
              sm:max-w-[380px]
              sm:rounded-[2rem]
              sm:px-7 sm:py-7
              sm:hover:-translate-y-2
            "
            style={{
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <span
              className="
                animate-heartbeat
                text-5xl
                sm:text-6xl
                md:text-7xl
              "
            >
              💌
            </span>

            <span
              className="
                mt-3 font-display
                text-base font-semibold
                leading-tight text-gold
                sm:text-xl
                md:text-2xl
              "
            >
              Read My Letter
            </span>

            <span
              className="
                mt-2 max-w-[90%]
                text-[11px] leading-relaxed
                text-muted-foreground
                sm:text-sm
              "
            >
              ❤️ Open it just for you ❤️
            </span>
          </button>
        </div>
      ) : (
        /* ================================
           LOVE LETTER
        ================================= */
        <div className="w-full">
          <h2
            className="
              animate-rise-in
              text-center font-script
              text-4xl leading-tight
              text-rose-grad
              sm:text-5xl
              md:text-6xl
            "
          >
            A Love Letter
          </h2>

          <div
            className="
              glass mt-6 w-full
              overflow-hidden
              rounded-[1.25rem]
              p-4
              sm:mt-9
              sm:rounded-[1.75rem]
              sm:p-7
              md:p-9
              lg:p-11
            "
            style={{
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <div
              className="
                mb-4 text-center text-2xl
                sm:mb-6 sm:text-3xl
              "
              aria-hidden="true"
            >
              💌
            </div>

            <Typewriter
              whenVisible={false}
              speed={22}
              text={LETTER}
              {...(onDone ? { onDone } : {})}
              className="
                w-full max-w-full
                whitespace-pre-wrap break-words
                text-left
                font-display
                text-[14px]
                leading-[1.9]
                text-foreground/90

                sm:text-base
                sm:leading-8

                md:text-lg
                md:leading-relaxed
              "
            />
          </div>
        </div>
      )}
    </section>
  );
}
