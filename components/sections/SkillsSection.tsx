"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { SKILLS, LANGUAGES } from "@/lib/data";
import { fadeUp, staggerContainerFast } from "@/lib/animations";

export function SkillsSection() {
  return (
    <Section id="skills" title="Skills / Stack">
      <motion.div
        variants={staggerContainerFast}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2"
      >
        {SKILLS.map((skill) => (
          <Tag key={skill} label={skill} />
        ))}
      </motion.div>
    </Section>
  );
}

export function LanguagesSection() {
  return (
    <Section title="Languages">
      <div className="-mt-2">
        {LANGUAGES.map(({ language, level }) => (
          <motion.div
            key={language}
            variants={fadeUp}
            className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0"
          >
            <span className="text-[14px] font-medium text-stone-800">{language}</span>
            <span className="font-mono text-[12px] text-stone-400 tracking-wide">{level}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
