"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/brand";
import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="bg-brand-green text-white text-xs sm:text-sm font-medium py-2.5 px-4 overflow-hidden relative border-b border-brand-green-dark/20 z-40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="إعلانات وعروض المتجر"
    >
      <div
        className={`flex items-center gap-12 whitespace-nowrap will-change-transform ${
          isPaused ? "[animation-play-state:paused]" : ""
        } animate-marquee-rtl`}
      >
        {/* Render twice for continuous loop */}
        {[...BRAND.announcements, ...BRAND.announcements].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
            <span className="font-semibold">{text}</span>
            <Sparkles className="w-3.5 h-3.5 text-white/90" />
          </div>
        ))}
      </div>
    </div>
  );
}
