"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import clsx from "clsx";

interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

export function Section({ id, title, children, className, wide }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id={id} ref={ref} className={clsx("py-14 border-b border-stone-200", className)}>
      <div className={clsx("mx-auto px-5 sm:px-8", wide ? "max-w-[900px]" : "max-w-[900px]")}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeUp}
            className="font-mono text-[10px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-8"
          >
            {title}
          </motion.h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
