"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import {
  Droplets,
  CheckCircle2,
  ShieldCheck,
  ArrowDown,
  Sparkles,
  ShoppingBag,
  HeartHandshake,
  Flame,
  Truck,
  Leaf,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-line">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        
        {/* Main Grid: Responsive layout matching the client's creative design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Desktop) / Visual Packshot Presentation */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none">
              
              {/* Product Creative Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-brand-green/20 shadow-xl bg-gradient-to-b from-stone-50 via-white to-stone-100 p-2 sm:p-3 group">
                <div className="relative aspect-[4/5] sm:aspect-[472/540] w-full rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src="/images/hero-creative-top.jpg"
                    alt="4 Muscle Drops - علبة وعبوة قطرة التحلية الصحية"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Subtle Sweet Life badge watermark */}
                  <div className="absolute bottom-3 left-3 bg-white/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand-green-dark border border-brand-green/20 shadow-xs flex items-center gap-1">
                    <span>Sweet Life</span>
                    <span className="text-brand-green">💚</span>
                  </div>
                </div>

                {/* Floating Highlight Pill */}
                <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md border border-line px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span className="text-xs font-bold text-ink">20 مل = 400 نقطة</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (RTL Start) / Content & Value Proposition */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-right space-y-5 sm:space-y-6">
            
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 border-b-2 border-brand-green pb-1 text-xs sm:text-sm font-extrabold text-brand-green-dark tracking-wide">
              <span>مذاق حلو .. بدون سعرات</span>
            </div>

            {/* Main Creative Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.15]">
                حلوة أسهل
                <span className="block text-brand-green-dark mt-1">في كل لحظة</span>
              </h1>
            </div>

            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-green text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
              <span dir="ltr" className="font-sans font-black tracking-wide">Muscle Healthy Sugar Drops</span>
              <Leaf className="w-3.5 h-3.5 fill-current text-white" />
            </div>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg lg:text-xl text-ink/85 font-medium leading-relaxed max-w-xl">
              استمتع بمشروباتك وأكلاتك المفضلة بطريقة صحية .. بدون ما تضر جسمك، مع بديل السكر الطبيعي فائق النقاء.
            </p>

            {/* 3 Core Infographic Cards (Identical to User's Creative Mockup + Feedback Update) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Card 1: Taste & No Aftertaste (UPDATED AS REQUESTED) */}
              <div className="bg-sage-wash/40 hover:bg-sage-wash/70 border border-brand-green/20 rounded-2xl p-4 text-center transition-all shadow-xs flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-white text-brand-green flex items-center justify-center mb-2.5 shadow-xs border border-brand-green/20">
                  <ShieldCheck className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-ink mb-1">
                  مذاق طبيعي وطعم رائع
                </h3>
                <p className="text-xs text-ink/80 font-bold leading-normal">
                  بنفس حلاوة السكر
                </p>
                <p className="text-xs text-brand-green-dark font-black mt-0.5">
                  وبدون افتر تيست أو مرارة نهائياً
                </p>
              </div>

              {/* Card 2: Suitable for Diabetics & Family */}
              <div className="bg-sage-wash/40 hover:bg-sage-wash/70 border border-brand-green/20 rounded-2xl p-4 text-center transition-all shadow-xs flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-white text-brand-green flex items-center justify-center mb-2.5 shadow-xs border border-brand-green/20">
                  <Droplets className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-ink mb-1">
                  مناسب لمرضى السكر
                </h3>
                <p className="text-xs text-ink/80 font-semibold leading-normal">
                  حل مثالي وآمن
                </p>
                <p className="text-xs text-muted-ink font-medium mt-0.5">
                  لجميع أفراد العائلة
                </p>
              </div>

              {/* Card 3: Zero Calories */}
              <div className="bg-sage-wash/40 hover:bg-sage-wash/70 border border-brand-green/20 rounded-2xl p-4 text-center transition-all shadow-xs flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-white text-brand-green flex items-center justify-center mb-2.5 shadow-xs border border-brand-green/20">
                  <Leaf className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-ink mb-1">
                  بدون سعرات حرارية
                </h3>
                <p className="text-xs text-ink/80 font-semibold leading-normal">
                  استمتع بالحلاوة
                </p>
                <p className="text-xs text-muted-ink font-medium mt-0.5">
                  بدون قلق
                </p>
              </div>

            </div>

            {/* Primary Order CTA Button (Styled exactly like the mockup) */}
            <div className="pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-green hover:bg-brand-green-dark text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg shadow-brand-green/25 hover:shadow-xl transition-all duration-200 active:scale-98 text-center"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>اطلب الآن – وفر حتى 25%</span>
              </a>
            </div>

            {/* Bottom 3 Trust Pillars Bar (From mockup) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-line/80 text-center sm:text-right">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <Truck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink">شحن سريع وآمن</p>
                  <p className="text-[11px] text-muted-ink hidden sm:block">لكل أنحاء مصر</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink">منتج أصلي 100%</p>
                  <p className="text-[11px] text-muted-ink hidden sm:block">جودة مضمونة</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <Leaf className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-ink">مكونات طبيعية</p>
                  <p className="text-[11px] text-muted-ink hidden sm:block">وآمنة تماماً</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
