"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[900px] mx-auto px-5 sm:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#hero" className="font-serif text-[15px] font-semibold text-stone-900 tracking-tight hover:opacity-70 transition-opacity">
            RH<span className="text-stone-400">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-mono text-[11px] uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-stone-800 origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-stone-800"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-stone-800 origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: -8, pointerEvents: "none" }}
        transition={{ duration: 0.22 }}
        className="fixed top-14 left-0 right-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 sm:hidden"
      >
        <nav className="flex flex-col px-5 py-4 gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-[11px] uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors py-1"
            >
              {label}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
