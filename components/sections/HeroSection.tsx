"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "2", label: "Products Shipped" },
  { value: "50%", label: "API Perf. Gain" },
];

export function HeroSection() {
  return (
    <section id="hero" className="pt-28 pb-16 border-b border-stone-200">
      <div className="max-w-[900px] mx-auto px-5 sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Top row: h1 + avatar aligned */}
          <div className="flex items-start justify-between gap-6 mb-5">
            <motion.h1
              variants={fadeUp}
              className="font-serif text-[2.8rem] sm:text-[3.8rem] leading-[1.08] font-semibold text-stone-900 tracking-tight max-w-2xl"
            >
              Backend Engineer,
              <br />
              <span className="italic font-normal text-stone-500">building systems</span>
              <br />
              that scale.
            </motion.h1>

            <motion.div
              variants={scaleIn}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100"
              style={{ width: "150px", aspectRatio: "3/4" }}
            >
              <Image
                src="/robert.png"
                alt="Mochammad Robbitul Himam"
                fill
                sizes="150px"
                className="object-cover object-top scale-125 origin-top"
                priority
              />
            </motion.div>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-stone-500 text-[15px] leading-[1.75]  mb-10"
          >
            {PROFILE.about}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-14">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-stone-50 rounded-full text-[13px] font-medium font-sans hover:bg-stone-700 transition-colors"
            >
              View Projects
              <span className="text-stone-400">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-200 text-stone-700 rounded-full text-[13px] font-medium font-sans hover:border-stone-400 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-8 sm:gap-12">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-[1.8rem] font-semibold text-stone-900 leading-none mb-1">{value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}