"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects, type Project } from "@/lib/projects-data";
import ProjectModal from "./ProjectModal";

// Alternating grid layout for visual rhythm
const colSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-5",
  "lg:col-span-7",
];

const aspects = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[16/9]",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

export default function PortfolioSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <section id="projetos" className="py-32 lg:py-40 px-6 lg:px-8 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-px bg-stone-400" />
                <span className="text-xs tracking-[0.3em] uppercase text-stone-500">
                  Portfólio
                </span>
              </div>
              <h2 className="font-serif text-5xl lg:text-6xl font-light text-stone-900">
                Projetos Selecionados
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-stone-500 text-sm leading-relaxed max-w-xs"
            >
              Uma seleção que representa nossa abordagem multidisciplinar à
              arquitetura e ao design.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 2) * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`group relative overflow-hidden cursor-pointer ${colSpans[i % colSpans.length]} ${aspects[i % aspects.length]}`}
                onClick={() => setActive(project)}
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/55 transition-all duration-500" />

                {/* Info reveal */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[10px] text-white/70 tracking-[0.3em] uppercase mb-2">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-light leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="w-4 h-px bg-white/50" />
                    <span className="text-sm text-white/70">{project.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mt-16"
          >
            <button className="group flex items-center gap-4 text-xs tracking-[0.25em] uppercase text-stone-600 hover:text-stone-900 transition-colors duration-300">
              <span>Ver Todos os Projetos</span>
              <span className="w-10 h-px bg-stone-400 group-hover:w-16 group-hover:bg-stone-900 transition-all duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
