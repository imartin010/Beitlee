"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ProjectContent } from "@/types/project";
import type { NextSearchParams } from "@/types/next";
import type { LeadFormPayload } from "@/types/lead";
import { isValidEgyptPhone, normalizeEgyptPhone } from "@/lib/validation";
import { getSearchParam } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";

interface LeadFormSectionProps {
  project: ProjectContent;
  searchParams?: NextSearchParams;
}

export function LeadFormSection({ project, searchParams }: LeadFormSectionProps) {
  const router = useRouter();
  const utmSource = getSearchParam(searchParams?.utm_source);
  const utmCampaign = getSearchParam(searchParams?.utm_campaign);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "الاسم مطلوب";
    if (!phone.trim()) next.phone = "رقم الهاتف مطلوب";
    else if (!isValidEgyptPhone(phone)) next.phone = "رقم هاتف مصري صحيح مطلوب";
    if (!consent) next.consent = "يرجى الموافقة على التواصل";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrors({});

    const payload: LeadFormPayload = {
      project_slug: project.slug,
      name: name.trim(),
      phone: normalizeEgyptPhone(phone),
      email: email.trim() || undefined,
      notes: notes.trim() || undefined,
      source: [utmSource, utmCampaign].filter(Boolean).join(" | ") || undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "حدث خطأ، يرجى المحاولة لاحقاً");
      }
      router.push(`/thank-you?project=${encodeURIComponent(project.slug)}`);
    } catch (err) {
      setStatus("error");
      setErrors({
        form: err instanceof Error ? err.message : "حدث خطأ، يرجى المحاولة لاحقاً",
      });
    }
  }

  return (
    <SectionWrapper id="lead-form" className="bg-navy/5 rounded-2xl">
      <motion.div
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={fadeInUp.viewport}
        className="max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-navy mb-2">
          احجز استشارتك الآن
        </h2>
        <p className="text-muted mb-8">
          اترك بياناتك وسنتواصل معك في أقرب وقت بخصوص {project.projectName}.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="lead-name" className="block text-sm font-medium text-navy mb-1">
              الاسم *
            </label>
            <Input
              id="lead-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              disabled={status === "loading"}
              autoComplete="name"
              error={errors.name}
            />
          </div>
          <div>
            <label htmlFor="lead-phone" className="block text-sm font-medium text-navy mb-1">
              رقم الهاتف *
            </label>
            <Input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01xxxxxxxxx"
              disabled={status === "loading"}
              autoComplete="tel"
              error={errors.phone}
            />
          </div>
          <div>
            <label htmlFor="lead-email" className="block text-sm font-medium text-navy mb-1">
              البريد الإلكتروني (اختياري)
            </label>
            <Input
              id="lead-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              disabled={status === "loading"}
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="lead-notes" className="block text-sm font-medium text-navy mb-1">
              ملاحظات (اختياري)
            </label>
            <Textarea
              id="lead-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="أي استفسار إضافي"
              disabled={status === "loading"}
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              id="lead-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-navy/30 text-gold focus:ring-gold"
              disabled={status === "loading"}
            />
            <label htmlFor="lead-consent" className="text-sm text-muted">
              أوافق على أن يتم التواصل معي عبر الهاتف أو الواتساب بخصوص العروض والاستفسارات.
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent}</p>
          )}
          {errors.form && (
            <p className="text-sm text-red-600">{errors.form}</p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={status === "loading"}
          >
            <Send size={18} aria-hidden />
            {status === "loading" ? "جاري الإرسال..." : project.ctaText}
          </Button>
        </form>
      </motion.div>
    </SectionWrapper>
  );
}
