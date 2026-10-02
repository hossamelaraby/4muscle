"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { CheckCircle2, Sparkles, ArrowDown, Droplets, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream-soft via-white to-sage-wash/40 pt-8 pb-16 sm:py-20 lg:py-24 border-b border-line/60">
      {/* Subtle organic decorative background elements */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column (Arabic First / Right side in RTL) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-right order-1 lg:order-1">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-sage-wash border border-brand-green/20 text-brand-green-dark px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span>{BRAND.name} — البديل الذكي والصحي للسكر</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.25] sm:leading-[1.2]">
              {BRAND.copy.heroTitle}
            </h1>

            {/* Subtitle & Value Proposition */}
            <p className="text-lg sm:text-xl font-bold text-brand-green-dark">
              {BRAND.copy.heroSubtitle}
            </p>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-muted-ink leading-relaxed max-w-2xl">
              {BRAND.copy.supportingLine}
            </p>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-line shadow-xs">
                <Droplets className="w-5 h-5 text-brand-green shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-ink">1 قطرة = 1 ملعقة سكر</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-line shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-ink">بدون طعم مر نهائياً</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-line shadow-xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-ink">400 نقطة تحلية مركزة</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link
                href="/products/4-muscle"
                className="inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:shadow-xl transition-all duration-200 active:scale-95 text-center"
              >
                {BRAND.copy.primaryCta} — وفر حتى 25%
              </Link>
              <a
                href="#use-cases"
                className="inline-flex items-center justify-center border-2 border-line hover:border-brand-green bg-white hover:bg-sage-wash text-ink font-bold text-base px-7 py-3.5 rounded-2xl transition-all duration-200 text-center gap-2"
              >
                <span>{BRAND.copy.secondaryCta}</span>
                <ArrowDown className="w-4 h-4 text-muted-ink" />
              </a>
            </div>

            {/* Security / Reassurance Notice */}
            <div className="flex items-center gap-6 text-xs text-muted-ink pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                الدفع عند الاستلام متاح
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                توصيل سريع لجميع المحافظات
              </span>
            </div>
          </div>

          {/* Hero Visual Column (Left side in RTL) */}
          <div className="lg:col-span-5 relative order-2 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Product Packshot Image with Travertine / Natural Pedestal aesthetic */}
              <div className="relative rounded-3xl overflow-hidden border border-line/80 shadow-2xl bg-white group">
                <div className="relative aspect-[4/5] sm:aspect-square w-full">
                  <Image
                    src={BRAND.heroImage}
                    alt="4 Muscle Drops - قطرات محلي دايت طبيعي مع العبوة"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Floating 400 Points Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-3 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-gold to-amber-300 text-ink flex items-center justify-center font-black text-sm font-sans">
                    400
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-ink">نقطة في كل عبوة</p>
                    <p className="text-[11px] text-muted-ink">تكفي استخدام أسابيع</p>
                  </div>
                </div>

                {/* Bottom Floating Offer Strip */}
                <div className="absolute bottom-4 inset-x-4 bg-ink/90 backdrop-blur-md rounded-2xl p-3 text-white flex items-center justify-between border border-white/10 shadow-lg">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-bold block">عرض الشحن المجاني</span>
                    <span className="text-xs font-semibold">يبدأ من باقة 3 عبوات</span>
                  </div>
                  <Link
                    href="/products/4-muscle"
                    className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors"
                  >
                    شاهد العروض
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
