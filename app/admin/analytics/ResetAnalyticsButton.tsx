"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

export function ResetAnalyticsButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleReset() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics/reset", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message ?? "Failed to reset analytics.");
        setLoading(false);
        setConfirming(false);
        return;
      }
      setConfirming(false);
      router.refresh();
    } catch {
      alert("Something went wrong.");
      setConfirming(false);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setConfirming(false);
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted">Delete all visits and clicks?</span>
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Resetting…" : "Yes, reset all"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="rounded-lg border border-navy/20 px-3 py-2 text-sm font-medium text-navy hover:bg-navy/5 disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-60"
      title="Delete all page visits and button click data"
    >
      <RotateCcw size={16} className="text-rose-600 shrink-0" aria-hidden />
      Reset analytics
    </button>
  );
}
