"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Droplets, CheckCircle2, ShieldCheck, ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center border-b border-line">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="4 Muscle Healthy Sugar Drops"
          fill
          priority
          sizes="100vw"
          className="object-cover object-left md:object-center"
        />
        {/* Soft gradient overlay on RTL right side to guarantee 100% contrast & legibility */}
        <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/85 to-white/20 sm:from-white/90 sm:via-white/75 sm:to-transparent md:w-3/4 lg:w-3/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 sm:py-20">
        <div className="max-w-2xl text-right space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-brand-green/30 text-brand-green-dark px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-green shrink-0" />
            <span className="flex items-center gap-1.5">
              <span dir="ltr" className="inline-block font-sans font-bold">4 Muscle</span>
              <span>— البديل الطبيعي والصحي للسكر العادي</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.25]">
            {BRAND.copy.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl font-bold text-brand-green-dark flex flex-wrap items-center gap-2">
            <span dir="ltr" className="inline-block font-sans font-black text-ink">
              4 Muscle Drops
            </span>
            <span className="text-muted-ink font-normal">—</span>
            <span>400 نقطة في عبوة صغيرة تناسب يومك</span>
          </p>

          {/* Supporting paragraph */}
          <p className="text-base sm:text-lg text-ink/85 leading-relaxed font-medium">
            {BRAND.copy.supportingLine}
          </p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-line shadow-xs">
              <Droplets className="w-5 h-5 text-brand-green shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-ink flex items-center gap-1.5 font-arabic">
                <span className="font-bold">1 نقطة</span>
                <span className="text-muted-ink">=</span>
                <span className="font-bold">1 معلقة سكر</span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-line shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-ink">بدون طعم مر نهائياً</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-line shadow-xs col-span-2 sm:col-span-1">
              <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-ink">400 نقطة تحلية مركزة</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a
              href="#shop"
              className="inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg shadow-brand-green/25 hover:shadow-xl transition-all duration-200 active:scale-95 text-center"
            >
              {BRAND.copy.primaryCta} — وفر حتى 25%
            </a>
            <a
              href="#use-cases"
              className="inline-flex items-center justify-center border-2 border-ink/20 hover:border-brand-green bg-white/90 backdrop-blur-md hover:bg-white text-ink font-bold text-base px-7 py-3.5 rounded-2xl transition-all duration-200 text-center gap-2 shadow-xs"
            >
              <span>{BRAND.copy.secondaryCta}</span>
              <ArrowDown className="w-4 h-4 text-muted-ink" />
            </a>
          </div>

          {/* Reassurance tags */}
          <div className="flex items-center gap-6 text-xs text-ink/75 font-semibold pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              الدفع عند الاستلام متاح
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
              شحن مجاني من 3 عبوات
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
