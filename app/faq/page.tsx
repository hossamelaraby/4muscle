"use client";

import React, { useState } from "react";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import { BRAND } from "@/lib/brand";
import { Search } from "lucide-react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = BRAND.faq.filter(
    (item) =>
      item.question.includes(searchTerm) || item.answer.includes(searchTerm)
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-14 sm:py-18 bg-cream-soft/60 border-b border-line text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase mb-3 inline-block">
            مركز المساعدة
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-ink mb-4">
            الأسئلة الشائعة وإرشادات الاستخدام
          </h1>
          <p className="text-sm sm:text-base text-muted-ink max-w-xl mx-auto mb-6">
            ابحث عن إجابات سريعة لجميع استفساراتك حول قطرات 4 Muscle Drops، المكونات، والشحن.
          </p>

          {/* Search box */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="ابحث عن سؤالك هنا..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-11 py-3.5 rounded-2xl border border-line bg-white shadow-xs focus:outline-none focus:border-brand-green text-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-ink" />
          </div>
        </div>
      </section>

      {/* Accordion or search results */}
      {searchTerm ? (
        <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
          <h3 className="text-base font-bold text-ink mb-6">
            نتائج البحث عن: "{searchTerm}" ({filteredFaq.length})
          </h3>
          {filteredFaq.length === 0 ? (
            <p className="text-sm text-muted-ink text-center py-8">
              لم نجد نتائج مطابقة، يمكنك التواصل معنا مباشرة وسيسعدنا إفادتك.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredFaq.map((item, idx) => (
                <div key={idx} className="bg-cream-soft/40 p-5 rounded-2xl border border-line space-y-2">
                  <h4 className="font-bold text-ink text-base">{item.question}</h4>
                  <p className="text-sm text-muted-ink leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <FAQ />
      )}

      <FinalCTA />
    </div>
  );
}
