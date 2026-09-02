import { Typewriter } from "./Typewriter";

const LETTER = `माझ्या आयुष्याच्या सर्वात सुंदर व्यक्तीला, माझ्या प्रिय मधूला... ❤️ ❤️

तुझ्यासोबत घालवलेला प्रत्येक दिवस मला एका सुंदर स्वप्नासारखा वाटतो. तुझं हसू माझ्या कठीण दिवसांमध्येही आनंदाची किरणं घेऊन येतं, तुझं प्रेम मला प्रत्येक क्षणी बळ देतं आणि तुझी साथ माझं आयुष्य पूर्ण करते.

तू फक्त माझी पत्नी नाहीस — तू माझी सर्वात चांगली मैत्रीण आहेस, माझ्या आयुष्यातली सर्वात सुंदर भेट आहेस आणि खर्‍या प्रेमावर माझा विश्वास ठेवण्याचं कारण आहेस.

तुझ्या वाढदिवसाच्या या खास दिवशी, देवाकडे माझी एकच प्रार्थना आहे की तुझी प्रत्येक स्वप्नं पूर्ण होवोत, तुझ्या चेहऱ्यावरचं हसू कायम राहो आणि तुझ्या आयुष्यातील प्रत्येक क्षण आनंदाने आणि प्रेमाने भरलेला असो.

मी तुला नेहमी प्रेम करेन, तुझा आदर करेन आणि आयुष्यातील प्रत्येक आनंदात आणि प्रत्येक अडचणीत तुझ्या सोबत खंबीरपणे उभा राहीन.

वाढदिवसाच्या खूप खूप शुभेच्छा माझ्या प्रेमाला... ❤️

मी तुझ्यावर आज, उद्या आणि कायमच प्रेम करत राहीन. ❤️

I Love You Forever ❤️`;

export function LoveLetter() {
  return (
    <section
      id="letter"
      className="
        relative
        z-10
        mx-auto
        w-full
        max-w-3xl
        overflow-hidden
        px-3
        py-14
        sm:px-5
        sm:py-20
        md:py-24
        lg:py-28
      "
    >
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
        A Love Letter
      </h2>

      <div
        className="
          glass
          mt-7
          w-full
          overflow-hidden
          rounded-[1.5rem]
          p-5
          sm:mt-10
          sm:rounded-[2rem]
          sm:p-8
          md:p-10
          lg:p-12
        "
        style={{
          boxShadow: "var(--shadow-glow)",
        }}
      >
        <div
          className="
            mb-5
            text-center
            text-2xl
            sm:mb-6
            sm:text-3xl
          "
          aria-hidden="true"
        >
          💌
        </div>

        <Typewriter
          whenVisible
          speed={22}
          text={LETTER}
          className="
            w-full
            max-w-full
            whitespace-pre-wrap
            break-words
            font-display
            text-[15px]
            leading-8
            text-foreground/90
            sm:text-lg
            sm:leading-relaxed
            md:text-xl
          "
        />
      </div>
    </section>
  );
}
