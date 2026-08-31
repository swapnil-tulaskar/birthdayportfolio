
import { useState } from "react";

interface LetterIntroProps {
  onOpen: () => void;
}

export function LetterIntro({ onOpen }: LetterIntroProps) {
  const [opening, setOpening] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (opening) return;

    setOpening(true);

    // Envelope opening animation
    setTimeout(() => {
      setShowLetter(true);
    }, 6000);
  };

  return (
    <main className="letter-screen">
      <div className="letter-scene">

        {/* =========================================
            ENVELOPE SCREEN
        ========================================= */}

        {!showLetter && (
          <>
            {/* Small intro text */}
            <p className="letter-subtitle">
              A little something for you...
            </p>

            {/* Envelope */}
            <div
              className={`envelope ${opening ? "is-opening" : ""}`}
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              aria-label="Open love letter"
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  handleOpen();
                }
              }}
            >
              {/* Envelope back */}
              <div className="envelope-back" />

              {/* =====================================
                  LETTER PAPER INSIDE ENVELOPE
              ===================================== */}

              <div className="paper">
                <div className="paper-inner">

                  {/* Heart */}
                  <div
                    className="paper-heart"
                    aria-hidden="true"
                  >
                    ❤️
                  </div>

                  {/* Heading */}
                  <h2>
                    My Dearest Love
                  </h2>

                  {/* Message */}
                  <p>
                    There is something
                    <br />
                    I want to tell you...
                  </p>

                </div>
              </div>

              {/* Envelope front */}
              <div className="envelope-front" />

              {/* Opening flap */}
              <div className="envelope-flap" />

              {/* Wax seal */}
              <div
                className="wax-seal"
                aria-hidden="true"
              >
                ❤️
              </div>
            </div>

            {/* =====================================
                OPEN BUTTON
            ===================================== */}

            <button
              type="button"
              className="letter-open-btn"
              onClick={handleOpen}
              disabled={opening}
            >
              {opening
                ? "Opening... ❤️"
                : "💌 Open Letter"}
            </button>

            {!opening && (
              <p className="letter-hint">
                Tap the envelope to open
              </p>
            )}
          </>
        )}

        {/* =========================================
            FULL LETTER
        ========================================= */}

        {showLetter && (
          <div className="real-letter">

            <div className="letter-content">

              {/* Heart */}
              <div
                className="letter-top-heart"
                aria-hidden="true"
              >
                ❤️
              </div>

              {/* Greeting */}
              <p className="dear">
                My Dearest Love,
              </p>

              {/* Letter */}
               <p>
                हे सगळं कुणाला दाखवण्यासाठी नाही,
                हे फक्त तुला माझं मन कळावं म्हणून आहे.
              </p>

              <p>
                माझ्या भावना शब्दांत मांडणं सोपं नसतं,
                पण तुझ्यासाठी हा एक छोटासा प्रयत्न आहे.
              </p>

              {/* Letter */}
              <p>
                आज तुझ्यासाठी फक्त हे एक छोटीशी
                वाढदिवसाची भेट नाही...
              </p>

              <p>
                तर त्या सगळ्या भावनांचा एक छोटासा
                भाग आहे, ज्या मी रोज माझ्या मनात
                अनुभवतो.
              </p>

              <p>
                तू माझ्या आयुष्याची ती सुंदर गोष्ट आहेस
                जी मला रोज पुन्हा वाचावीशी वाटते.
              </p>

              <p>
                तुझ्यासोबत घालवलेला प्रत्येक क्षण
                माझ्यासाठी खूप खास आहे.
              </p>

              <p>
                तुझं हसणं माझ्यासाठी जगातल्या
                सर्वात सुंदर गोष्टींपैकी एक आहे.
              </p>

              <p>
                तुझे डोळे बघितले की वाटतं,
                जणू त्यात माझं पूर्ण विश्व सामावलंय.
              </p>

              <p>
                तू नसलीस की दिवसही अपुरा वाटतो,
                आणि तू असलीस की क्षणही पुरेसा वाटतो.
              </p>

              <p>
                हे प्रेम फक्त आजचं नाही,
                हे रोज, प्रत्येक श्वासात वाढतच जाणारं आहे.
              </p>

              <p>
                तुझ्याशिवाय माझी कहाणी अपूर्ण आहे,
                तूच ती जी ही कहाणी पूर्ण करते.
              </p>

              {/* Ending */}
              <p className="letter-ending">
                With all my love ❤️
              </p>

              <p className="signature">
                Your Loving Husband
                
              </p>
              <p className="signature">
                Swapnil
              </p>

              {/* Continue */}
              <button
                type="button"
                className="continue-btn"
                onClick={onOpen}
              >
                click here for Surprise ❤️
              </button>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
