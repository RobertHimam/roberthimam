"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { PROFILE } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

export function AboutSection() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-start">
        <motion.p variants={fadeUp} className="text-stone-600 text-[14.5px] leading-[1.8] max-w-prose">
          {PROFILE.about}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col gap-2 sm:text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Based in</p>
          <p className="text-stone-700 text-[13.5px] font-medium">{PROFILE.location}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mt-3">Since</p>
          <p className="text-stone-700 text-[13.5px] font-medium">Sep 2014</p>
        </motion.div>
      </div>
    </Section>
  );
}
