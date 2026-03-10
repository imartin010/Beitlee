"use client";

import {
  MapPin,
  Home,
  Building2,
  Calendar,
  Wallet,
  BarChart3,
  TrendingUp,
  Leaf,
  Star,
  CreditCard,
  LayoutGrid,
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

const WHY_ICONS: LucideIcon[] = [
  MapPin,
  TrendingUp,
  Leaf,
  Star,
  CreditCard,
  LayoutGrid,
];

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
        className="text-2xl font-bold text-navy mb-6"
      >
        لماذا {project.projectName}؟
      </motion.h2>

      {/* Stats highlights */}
      <motion.div
        variants={fadeInUpStagger.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
      >
        {project.highlights.map((point, index) => {
          const Icon = HIGHLIGHT_ICONS[point.icon] ?? BarChart3;
          return (
            <motion.div
              key={`${point.label}-${index}`}
              variants={fadeInUpStagger.item}
              className="p-3 rounded-xl border border-navy/10 bg-background flex gap-2.5 items-start"
            >
              <span className="shrink-0 text-gold mt-0.5" aria-hidden>
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <span className="text-muted text-xs">{point.label}</span>
                <p className="font-semibold text-navy text-sm mt-0.5 leading-snug">{point.value}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Why points */}
      <div className="grid sm:grid-cols-2 gap-3">
        {project.whyPoints.map((point, i) => {
          const Icon = WHY_ICONS[i % WHY_ICONS.length];
          return (
            <motion.div
              key={point.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={fadeInUp.viewport}
              transition={{ delay: i * 0.04 }}
              className="flex gap-3 p-3 rounded-xl border border-navy/10 bg-background"
            >
              <span className="shrink-0 text-gold mt-0.5" aria-hidden>
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-semibold text-navy text-sm">{point.title}</h3>
                <p className="mt-0.5 text-muted text-xs leading-relaxed">{point.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
