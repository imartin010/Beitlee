"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeInUp, fadeInUpStagger } from "@/lib/motion";
import type { ProjectContent } from "@/types/project";

interface HighlightsSectionProps {
  project: ProjectContent;
}

export function HighlightsSection({ project }: HighlightsSectionProps) {
  return (
    <SectionWrapper id="highlights" className="bg-white rounded-2xl shadow-sm">
      <motion.h2
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={fadeInUp.viewport}
        className="text-2xl font-bold text-navy mb-8"
      >
        لماذا {project.projectName}؟
      </motion.h2>
      <motion.div
        variants={fadeInUpStagger.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {project.highlights.map((point, index) => (
          <motion.div
            key={`${point.label}-${index}`}
            variants={fadeInUpStagger.item}
            className="p-4 rounded-xl border border-navy/10 bg-background"
          >
            <span className="text-muted text-sm">{point.label}</span>
            <p className="font-semibold text-navy mt-1">{point.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
