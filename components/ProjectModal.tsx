"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import type { Project } from "@/lib/projects-data";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        setImgIndex((p) => (p - 1 + project.images.length) % project.images.length);
      if (e.key === "ArrowRight")
        setImgIndex((p) => (p + 1) % project.images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-stone-50 overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center hover:bg-stone-100 transition-colors rounded-full"
              aria-label="Fechar"
            >
              <X size={18} className="text-stone-600" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
              {/* Gallery */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-stone-200 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.images[imgIndex]}
                      alt={`${project.title} ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImgIndex(
                          (p) =>
                            (p - 1 + project.images.length) %
                            project.images.length
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                      aria-label="Anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImgIndex((p) => (p + 1) % project.images.length);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
                      aria-label="Próxima"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setImgIndex(i);
                          }}
                          className={`h-px transition-all duration-300 ${
                            i === imgIndex
                              ? "w-8 bg-white"
                              : "w-3 bg-white/50"
                          }`}
                          aria-label={`Imagem ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-8 lg:p-14 flex flex-col justify-center space-y-8">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-3">
                    {project.category}
                  </span>
                  <h2 className="font-serif text-4xl lg:text-5xl font-light text-stone-900 leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-stone-500 italic mt-2">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3 py-7 border-y border-stone-200">
                  <div className="flex items-center gap-3">
                    <MapPin size={13} className="text-stone-400 shrink-0" />
                    <span className="text-sm text-stone-600">
                      {project.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={13} className="text-stone-400 shrink-0" />
                    <span className="text-sm text-stone-600">
                      {project.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-stone-400 text-xs font-mono shrink-0">
                      m²
                    </span>
                    <span className="text-sm text-stone-600">{project.area}</span>
                  </div>
                </div>

                <p className="text-stone-600 leading-relaxed text-[15px]">
                  {project.longDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
