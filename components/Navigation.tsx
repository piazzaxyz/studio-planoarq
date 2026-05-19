"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Projetos", href: "#projetos" },
  { label: "O Escritório", href: "#sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "#contato" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 60);
      setVisible(currentY < lastScrollY.current || currentY < 60);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          atTop
            ? "bg-transparent"
            : "bg-stone-50/95 backdrop-blur-sm border-b border-stone-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={`w-8 h-8 border flex items-center justify-center transition-colors duration-300 ${
                  atTop ? "border-white/60" : "border-stone-400"
                }`}
              >
                <span
                  className={`text-[10px] font-light tracking-widest transition-colors duration-300 ${
                    atTop ? "text-white" : "text-stone-700"
                  }`}
                >
                  SF
                </span>
              </div>
              <span
                className={`font-serif text-lg font-light tracking-[0.2em] uppercase transition-colors duration-300 ${
                  atTop ? "text-white" : "text-stone-900"
                }`}
              >
                Plano Arq
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 hover:opacity-50 ${
                    atTop ? "text-white/90" : "text-stone-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="#contato"
              className={`hidden md:inline-flex text-xs tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300 ${
                atTop
                  ? "border-white/50 text-white hover:bg-white hover:text-stone-900"
                  : "border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white"
              }`}
            >
              Solicitar Orçamento
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="md:hidden flex flex-col gap-[5px] p-2"
            >
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-stone-900"
                } ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
              />
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-stone-900"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  atTop ? "bg-white" : "bg-stone-900"
                } ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-stone-950 flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-4xl font-light text-white tracking-wide hover:opacity-50 transition-opacity"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
            >
              <Link
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.25em] uppercase px-8 py-4 border border-white/30 text-white hover:bg-white hover:text-stone-950 transition-all duration-300"
              >
                Solicitar Orçamento
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
