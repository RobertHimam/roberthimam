"use client";

import { Section } from "@/components/ui/Section";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { EXPERIENCE } from "@/lib/data";

export function ExperienceSection() {
  return (
    <Section id="experience" title="Experience">
      <div className="-mt-2">
        {EXPERIENCE.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </Section>
  );
}
