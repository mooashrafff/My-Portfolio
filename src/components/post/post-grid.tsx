"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./use-outside-click";

export function PostGrid() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[650px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={50}
                  height={50}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-40 lg:h-40 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-400 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        <div className="flex flex-col space-y-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center bg-neutral-900 hover:bg-neutral-600 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                {card.mood === "sad" ? (
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-400 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                ) : card.mood === "happy" ? (
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-yellow-400 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                ) : card.mood === "romo" ? (
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-pink-400 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                ) : card.mood === "angry" ? (
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-red-400 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                ) : null}
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </div>
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Shyness",
    mood: "romo",
    title: "Sharm-o-Haya",
    src: "https://images.unsplash.com/photo-1568781269551-3e3baf5ec909?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "View",
    content: () => {
      return (
        <>
          <p className="w-3/4">
            Tarro ki tarah chamakti,
            Par aankhon mein nazakat ki narmi,
            Shabnam si narmi, Magar kabhi kabhi toofan si,
            Resham ke jaise suljhi si, Lekin kabhi bikhri hui si,
            Sukoon mein uski khamoshi, Aur lafzon mein rangti.
          </p>
          <p className="w-3/4">
            Shayari aur deewangi,
            Sirf mere saath uska qareeb,
            Kabhi junoon ka naseeb, Pari si masoomiyat,
            Uske liye khushiyo se bhari mere hayat,
            Toh kabhi hansi mein nigahen chhupaye,
            Har pal naye jazbaat sajaye, Woh mera dastaan ka afsana ban gayi.
          </p>
          <i>~Ayuu</i>
        </>
      );
    },
  },
  {
    description: "Questioning",
    mood: "sad",
    title: "Abh Kyun Likhu",
    src: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "View",
    content: () => {
      return (
        <>
          <p className="w-3/4">
            Uthein ki wajah uski woh muskaan, Meethi si awaaz, jaise baat hai
            pyaar ki, Pyaari si nigahein, jo dekhti hain mujhe, Lagta hai din,
            khushiyon se bhar jaayega.
          </p>
          <p className="w-3/4">
            Ab uthoon kyun, bina uski pukar se, Akeli raat mein, koi baat nahi
            kare pyaar se, Khamoshi chhor gayi, aur hawa bhi tham gayi, Us bin
            yeh zindagi, khushiyon se ruk si gayi
          </p>
          <p className="w-3/4">
          Tha mein besharam, khana aur dhyaan rakhti woh,
Parti thi karti woh, par samjhati bhi mujhe,
Kabhi kabhi choti si baat pe roothi thi woh,
Jab woh hoti dukhi, par takleef hota tha mujhe.
          </p>
          <p className="w-3/4">
          Abh kyun chahiye khana aur dabhai mujhe,
Uski haathon ki likhawat reh gayi khate mein,
Abh kyun likhu kuch, jab sunegi nahi mujhe,
Thodi der khud se, par woh roothi nahi.
          </p>
          <i>~Ayuu</i>
        </>
      );
    },
  },
  {
    description: "Sad",
    mood: "sad",
    title: "Dava-e-Lafz",
    src: "https://images.unsplash.com/photo-1564934304050-e9bb87a29c13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "View",
    content: () => {
      return (
        <>
          <p className="w-3/4">
          Dava bhi thi woh, Zahar bhi woh.
Uski mohabbat, Ek pehla nashar bhi woh.
Ek nazar mein dil mein, Utar gaya.
Uski aankhon mein kho gaya, Mit gaya.
          </p>
          <p className="w-3/4">
          Dava bhi thi woh, Zahar bhi woh.
Uski mohabbat, Ek pehla nashar bhi woh.
Ek nazar mein dil mein, Utar gaya.
Uski aankhon mein kho gaya, Mit gaya.
          </p>
          <p className="w-3/4">
          Ishq mein toote, Dil ke tukde wohi jode.
Zakhm ko usne phir se dhundla diye thode.
Par shifa bhi thi uski har ek baat mein,
Jab bhi dekha usse, Lagta woh paas hai saath mein.
          </p>
          <p className="w-3/4">
          Ishq mein toote, Dil ke tukde wohi jode.
Zakhm ko usne phir se dhundla diye thode.
Par shifa bhi thi uski har ek baat mein,
Jab bhi dekha usse, Lagta woh paas hai saath mein.
          </p>
          <i>~Ayuu</i>
        </>
      );
    },
  },
  {
    description: "Romantic",
    mood: "romo",
    title: "She Can,But I Will",
    src: "https://images.unsplash.com/photo-1517856713891-215e57a13c0d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "View",
    content: () => {
      return (
        <>
          <p className="w-3/4">
          She can’t see the world. I will bring light to her eyes,
She can’t speak to me. I will be the rise of her voice that flies.
          </p>
          <p className="w-3/4">
          She can’t hear my words; I will present each one,
She can’t walk this earth. I will carry her heart.
          </p>
          <p className="w-3/4">
          When life feels cold and still, I will be her warmth and her fire.
And in every silent moment, I will fulfill her desire.
          </p>  
          <i>~Ayuu</i>
        </>
      );
    },
  },
  {
    description: "Missing",
    mood: "sad",
    title: "TU HAI HI NAHI",
    src: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaText: "View",
    content: () => {
      return (
        <>
          <p className="w-3/4">
          Meri galtiyon ne mujhko tujhse alag kar diya,
Teri yaadon ke sang yeh dard kaise sah lu main?
Teri har sabdh gunjte hain raat ki khamoshi mein,
Aur raat bhi lagti hai saalon ke samaan.
          </p>
          <p className="w-3/4">
          Yeh budhu kyun rota hai, jab tu hai hi nahi?
Rota hoon phir kyun, daatne ke liye bhi tu nahi.
Le gayi saari raunak tu apne saath,
Tere bina yeh halat kyun satata hai mujhe?
          </p> 
          <i>~Ayuu</i>
        </>
      );
    },
  },
];
