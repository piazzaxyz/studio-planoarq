"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Props {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const selected = value || null;

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between pb-3 text-sm text-left border-b transition-colors duration-300 focus:outline-none ${
          error
            ? "border-red-400"
            : open
            ? "border-stone-900"
            : "border-stone-300 hover:border-stone-500"
        }`}
      >
        <span className={selected ? "text-stone-900" : "text-stone-400"}>
          {selected || placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-stone-400 shrink-0 ml-2"
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ originY: "top" }}
            className="absolute top-full left-0 right-0 z-30 bg-white border border-stone-200 shadow-xl shadow-stone-900/8 mt-1 py-1 max-h-56 overflow-auto"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                    opt === value
                      ? "bg-stone-100 text-stone-900 font-medium"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
