"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BRAND, ReviewItem } from "@/lib/brand";
import { Star, ChevronRight, ChevronLeft, Eye, X, ShieldCheck, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);

  const reviews = BRAND.reviews;

  // Auto rotation every 7 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section
      className="py-16 sm:py-24 bg-white border-b border-line overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="آراء وتجارب العملاء"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            تجارب حقيقية موثقة
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            {BRAND.copy.reviewsTitle}
          </h2>
          <p className="text-base text-muted-ink">
            تقييمات واقعية من مستخدمي 4 Muscle بعد تجربة قطرات التحلية في روتينهم اليومي.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="bg-gradient-to-b from-cream-soft via-white to-sage-wash/30 rounded-3xl p-8 sm:p-12 border border-line shadow-sm relative min-h-[320px] flex flex-col justify-between">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-green/15 pointer-events-none" />

            <div>
              {/* Stars & Badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                {current.badge && (
                  <span className="text-xs font-bold bg-brand-green/15 text-brand-green-dark px-3 py-1 rounded-full border border-brand-green/20">
                    {current.badge}
                  </span>
                )}
              </div>

              {/* Quote Arabic Text */}
              <p className="text-xl sm:text-2xl font-bold text-ink leading-relaxed mb-6">
                "{current.text}"
              </p>
            </div>

            {/* Author info & screenshot button */}
            <div className="flex items-center justify-between pt-6 border-t border-line/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage text-brand-green-dark font-black flex items-center justify-center text-sm shadow-xs">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink flex items-center gap-1.5">
                    <span>{current.author}</span>
                    <span title="عميل موثق">
                      <ShieldCheck className="w-4 h-4 text-brand-green" />
                    </span>
                  </h4>
                  <span className="text-xs text-muted-ink">تقييم موثق عبر واتساب / انستغرام</span>
                </div>
              </div>

              {/* View Original Screenshot Action */}
              {current.image && (
                <button
                  onClick={() => setSelectedReviewImage(current.image || null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green-dark hover:text-ink bg-white px-3 py-2 rounded-xl border border-line hover:border-brand-green transition-all shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>مشاهدة صورة المحادثة الأصلية</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-line hover:bg-sage-wash text-ink transition-colors shadow-xs"
              aria-label="التقييم السابق"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-brand-green"
                      : "w-2.5 bg-line hover:bg-muted-ink/40"
                  }`}
                  aria-label={`الانتقال إلى التقييم ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white border border-line hover:bg-sage-wash text-ink transition-colors shadow-xs"
              aria-label="التقييم التالي"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Real Review Screenshot */}
      {selectedReviewImage && (
        <div
          className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedReviewImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-sm w-full p-4 shadow-2xl border border-line"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <span className="text-sm font-bold text-ink">محادثة العميل الأصلية الموثقة</span>
              <button
                onClick={() => setSelectedReviewImage(null)}
                className="p-1 text-muted-ink hover:text-ink rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black/5">
              <Image
                src={selectedReviewImage}
                alt="تقييم العميل الأصلي"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
