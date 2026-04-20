"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { PROJECTS } from "@/lib/data";
import { fadeUp } from "@/lib/animations";

const PROJECT_TAGS: Record<string, string[]> = {
  "proj-1": ["Golang", "Kafka", "PostgreSQL", "Redis"],
  "proj-2": ["Vue 3", "Tailwind CSS", "REST API"],
};

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROJECTS.map((project) => (
          <motion.article
            key={project.id}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="group flex flex-col p-6 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white hover:shadow-sm transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-serif text-[17px] font-semibold text-stone-900 leading-tight mb-1">
                  {project.name}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  {project.type}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                  project.period === "Present"
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                    : "text-stone-400 border-stone-200"
                }`}>
                  {project.period}
                </span>
                {project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 1, y: -1 }}
                    transition={{ duration: 0.15 }}
                    className="text-[11px] font-mono text-stone-400 hover:text-stone-800 transition-colors"
                  >
                    {project.url.replace("https://", "")} ↗
                  </motion.a>
                )}
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-1.5 flex-1 mb-5">
              {project.bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-stone-500 leading-[1.65]">
                  <span className="text-stone-300 mt-[0.4em] flex-shrink-0">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-stone-100">
              {(PROJECT_TAGS[project.id] || []).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-stone-200 text-stone-500 bg-stone-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
