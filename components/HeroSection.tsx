"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
    tag: "Casa Horizonte — Florianópolis",
    line1: "Arquitetura que",
    line2: "Transcende o Tempo",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    tag: "Casa Serrana — Campos do Jordão",
    line1: "Espaços que",
    line2: "Revelam Emoções",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80",
    tag: "Edifício Central — São Paulo",
    line1: "Design que",
    line2: "Define Identidades",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-screen w-full bg-stone-900">
        <Image
          src={slides[0].image}
          alt="Hero"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </div>
    );
  }

  const slide = slides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slideshow */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.line1}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 px-6 lg:px-16 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="space-y-3">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="block text-white/60 text-xs tracking-[0.35em] uppercase"
            >
              {slide.tag}
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-[clamp(3rem,9vw,8rem)] font-light text-white leading-[1.05]"
              >
                {slide.line1}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{
                  duration: 0.85,
                  delay: 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="font-serif text-[clamp(3rem,9vw,8rem)] font-light text-white/65 leading-[1.05] italic"
              >
                {slide.line2}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom row */}
        <div className="flex items-end justify-between mt-14">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-500 h-px ${
                  i === current ? "w-10 bg-white" : "w-4 bg-white/35"
                }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-white/40 text-[10px] tracking-[0.3em] uppercase"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ scaleY: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10 bg-white/30 origin-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
