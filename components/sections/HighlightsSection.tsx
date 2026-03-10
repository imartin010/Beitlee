"use client";

import {
  MapPin,
  Home,
  Building2,
  Calendar,
  Wallet,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeInUp, fadeInUpStagger } from "@/lib/motion";
import type { ProjectContent } from "@/types/project";

const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  location: MapPin,
  home: Home,
  building: Building2,
  calendar: Calendar,
  wallet: Wallet,
  chart: BarChart3,
};

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
        {project.highlights.map((point, index) => {
          const Icon = HIGHLIGHT_ICONS[point.icon] ?? BarChart3;
          return (
            <motion.div
              key={`${point.label}-${index}`}
              variants={fadeInUpStagger.item}
              className="p-4 rounded-xl border border-navy/10 bg-background flex gap-3"
            >
              <span className="shrink-0 text-gold" aria-hidden>
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <div>
                <span className="text-muted text-sm">{point.label}</span>
                <p className="font-semibold text-navy mt-1">{point.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
