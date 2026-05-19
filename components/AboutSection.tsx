"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "15+", label: "Anos de Experiência" },
  { value: "180", label: "Projetos Concluídos" },
  { value: "4", label: "Prêmios IAB" },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-32 lg:py-40 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="w-12 h-px bg-stone-400" />
          <span className="text-xs tracking-[0.3em] uppercase text-stone-500">
            O Escritório
          </span>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <h2 className="font-serif text-5xl lg:text-6xl font-light leading-tight text-stone-900">
              Acreditamos que a <em>beleza</em> nasce da precisão.
            </h2>
            <div className="space-y-5 text-stone-600 leading-relaxed text-[15px]">
              <p>
                Fundado com uma visão clara, o Plano Arq emergiu para criar
                espaços que respeitem o tempo, o lugar e as pessoas que os habitam.
              </p>
              <p>
                Nossa prática se funda no diálogo entre rigor técnico e
                sensibilidade poética. Cada projeto é uma investigação única —
                sobre materiais, luz, proporção e a experiência humana do
                espaço.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-4xl font-light text-stone-900">
                    {s.value}
                  </div>
                  <div className="text-xs text-stone-500 tracking-wide leading-snug mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[5/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce9bf14a83a8?auto=format&fit=crop&w=1400&q=80"
                alt="Plano Arq — Espaço de trabalho"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-5 -left-5 w-36 h-36 border border-stone-300 -z-10" />
            <div className="flex items-center gap-3 mt-6">
              <span className="w-6 h-px bg-stone-400" />
              <span className="text-xs text-stone-500 tracking-widest uppercase">
                São Paulo, 2024
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
