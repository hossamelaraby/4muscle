"use client";

import React from "react";
import { Droplet, CheckCircle, Activity, Sparkles } from "lucide-react";

export default function BenefitRow() {
  const benefits = [
    {
      icon: Droplet,
      title: "سهل الاستخدام",
      desc: "تصميم قطارة عملي ودقيق للاستخدام اليومي بدون إهدار أو فوضى.",
      highlight: "قطارة سائلة دقيقة",
    },
    {
      icon: CheckCircle,
      title: "جرعة واضحة",
      desc: "نقطة واحدة فقط تعادل معلقة سكر كاملة، لسهولة ضبط تحلية كوبك المفضل بدقة.",
      highlight: "1 نقطة = 1 معلقة سكر",
    },
    {
      icon: Activity,
      title: "مناسب لروتينك الرياضي",
      desc: "أضفه لشيك البروتين، السموذي، والوجبات الصحية دون أي مرارة بعد التذوق.",
      highlight: "0 بعد التذوق (No Aftertaste)",
    },
    {
      icon: Sparkles,
      title: "400 نقطة في العبوة",
      desc: "عبوة 20 مل مركزة تمنحك 400 نقطة تحلية، تدوم معك طويلاً وتوفر ميزانيتك.",
      highlight: "قيمة عالية وتوفير",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-cream-soft/60 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            لماذا تختار 4 Muscle؟
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            مزايا صُممت لتجعل روتينك اليومي أكثر سهولة
          </h2>
        </div>

        {/* Four Cards Grid / Swipeable on mobile */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="min-w-[260px] sm:min-w-0 flex-1 snap-start bg-white rounded-2xl p-6 border border-line shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sage-wash text-brand-green flex items-center justify-center mb-5 border border-brand-green/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-ink leading-relaxed mb-4">{b.desc}</p>
                </div>
                <div className="pt-3 border-t border-line/60">
                  <span className="text-xs font-bold text-brand-green-dark bg-sage-wash px-2.5 py-1 rounded-md inline-block">
                    {b.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
