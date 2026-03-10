"use client";

import type { ProjectContent } from "@/types/project";
import type { NextSearchParams } from "@/types/next";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { WindowSplashScreen } from "@/components/WindowSplashScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { UnitsCardsSection } from "@/components/sections/UnitsCardsSection";
import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";

interface LandingPageTemplateProps {
  project: ProjectContent;
  searchParams?: NextSearchParams;
}

/**
 * Single landing page layout: header, all sections in order, footer, sticky mobile CTA.
 * Used by the dynamic [slug] route — add new projects by adding content only.
 */
export function LandingPageTemplate({ project, searchParams }: LandingPageTemplateProps) {
  return (
    <>
      {project.slug === "mountainview" && (
        <WindowSplashScreen shutterImageSrc="/shutters.png" />
      )}
      <MinimalHeader
        projectName={project.projectName}
        whatsappNumber={project.whatsappNumber}
        logoSrc={project.slug === "mountainview" ? "/Mountain View Logo.png" : undefined}
        logoAlt={project.slug === "mountainview" ? project.projectName : undefined}
        overHero={!!project.heroVideo}
      />
      <main className="pb-24 md:pb-0">
        <HeroSection project={project} />
        {project.slug === "mountainview" && <UnitsCardsSection project={project} />}
        <HighlightsSection project={project} />
        <LocationSection project={project} />
        <PricingSection project={project} />
        <LeadFormSection project={project} searchParams={searchParams} />
        <FAQSection project={project} />
        <FinalCTASection project={project} />
      </main>
      <StickyMobileCTA
        whatsappNumber={project.whatsappNumber}
        ctaText={project.ctaText}
        projectName={project.projectName}
      />
    </>
  );
}
