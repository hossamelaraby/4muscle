"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/brand";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-cream-soft/40 border-b border-line">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-green" />
            <span>إجابات واضحة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            {BRAND.copy.faqTitle}
          </h2>
          <p className="text-base text-muted-ink">
            كل ما تحتاج معرفته عن طريقة استخدام قطرات 4 Muscle والشحن والتوصيل.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {BRAND.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-line overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 sm:py-5 px-6 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-ink hover:text-brand-green-dark transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-sage-wash text-brand-green-dark text-xs flex items-center justify-center shrink-0 font-sans">
                      {idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-ink shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-green" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-muted-ink leading-relaxed border-t border-line/40 bg-cream-soft/20 animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Support Callout */}
        <div className="mt-12 text-center bg-white rounded-2xl p-6 border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <h4 className="text-base font-bold text-ink">لديك استفسار آخر لم تجد إجابته هنا؟</h4>
            <p className="text-xs text-muted-ink mt-0.5">فريق خدمة العملاء متاح للرد المباشر ومساعدتك في اختيار الباقة المناسبة.</p>
          </div>
          <a
            href={BRAND.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>محادثة واتساب مباشرة</span>
          </a>
        </div>

      </div>
    </section>
  );
}
