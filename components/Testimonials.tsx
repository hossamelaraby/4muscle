"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, X, ChevronRight, ChevronLeft, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // All 16 authentic customer review screenshots from materials
  const reviewImages = Array.from({ length: 16 }, (_, i) => `/images/reviews/review-${i + 1}.png`);

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-cream-soft/50 border-b border-line overflow-hidden"
      aria-label="آراء وتجارب العملاء"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
          تجارب حقيقية موثقة بالصور
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
          ماذا يقول عملاؤنا؟
        </h2>
        <p className="text-sm sm:text-base text-muted-ink max-w-2xl mx-auto">
          لقطات حية ومحادثات أصلية من عملائنا على واتساب وانستغرام بعد تجربة قطرات 4 Muscle Drops. (حرّك المؤشر للإيقاف المؤقت أو انقر للتكبير)
        </p>
      </div>

      {/* Infinite Seamless Scrolling Track (Marquee Loop) */}
      <div
        className="relative w-full overflow-hidden py-4 group"
        dir="ltr"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge blur masks */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-cream-soft to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-cream-soft to-transparent z-10 pointer-events-none" />

        <div
          className={`flex gap-5 sm:gap-6 w-max will-change-transform animate-marquee-infinite ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {/* Duplicate images array twice to guarantee endless continuous loop without breaks */}
          {[...reviewImages, ...reviewImages].map((imgSrc, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(imgSrc)}
              className="relative w-[210px] sm:w-[240px] md:w-[260px] aspect-[9/18] rounded-3xl overflow-hidden border-2 border-line/80 shadow-md hover:shadow-2xl hover:border-brand-green bg-white cursor-pointer transition-all duration-300 hover:scale-[1.03] group/card shrink-0"
            >
              <Image
                src={imgSrc}
                alt="رأي عميل موثق 4 Muscle"
                fill
                sizes="(max-width: 768px) 240px, 260px"
                className="object-cover"
                loading="lazy"
              />

              {/* Hover Overlay with View Icon */}
              <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-white/95 text-ink font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-brand-green" />
                  <span>تكبير الصورة</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reassurance Badge below marquee */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-line shadow-xs text-xs font-bold text-ink">
          <ShieldCheck className="w-4 h-4 text-brand-green" />
          <span>جميع المحادثات والتقييمات موثقة وحقيقية من عملاء المتجر</span>
        </div>
      </div>

      {/* Lightbox Modal for Full View */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-4 shadow-2xl border border-line animate-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <span className="text-sm font-bold text-ink flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>رأي العميل الأصلي الموثق</span>
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 text-muted-ink hover:text-ink hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[9/18] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <Image
                src={selectedImage}
                alt="تقييم العميل بالحجم الكامل"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-3 text-center">
              <button
                onClick={() => setSelectedImage(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-ink text-xs font-bold rounded-xl transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
