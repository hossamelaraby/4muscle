"use client";

import React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function Comparison() {
  const rows = [
    {
      feature: "سهولة الاستخدام والسرعة",
      fourMuscle: "قطارة سائلة ذكية بلمسة واحدة بدون ملاعق",
      others: "أكياس بودرة تتطاير أو حبوب تحتاج وقتاً للتفتيت",
      advantage: true,
    },
    {
      feature: "وضوح الجرعة والمعايرة",
      fourMuscle: "دقة متناهية: 1 نقطة = 1 معلقة سكر",
      others: "صعوبة ضبط نصف ملعقة أو ربع ملعقة",
      advantage: true,
    },
    {
      feature: "طعم ما بعد التذوق (Aftertaste)",
      fourMuscle: "نقي تماماً بدون أي مرارة أو طعم كيميائي",
      others: "مرارة واضحة وتغير في طعم المشروب الأصلي",
      advantage: true,
    },
    {
      feature: "الذوبان في المشروبات الباردة والساخنة",
      fourMuscle: "سائل فوري الذوبان في الساخن والمثلج والسموذي",
      others: "يتكتل أو يترسب في قاع المشروبات الباردة",
      advantage: true,
    },
    {
      feature: "حجم العبوة وسهولة التنقل",
      fourMuscle: "عبوة جيب صغيرة وعملية 20 مل للجيم والعمل",
      others: "برطمانات وعلب كرتونية كبيرة يصعب حملها",
      advantage: true,
    },
    {
      feature: "كمية التحلية في العبوة",
      fourMuscle: "400 نقطة تحلية مركزة تكفي لأسابيع",
      others: "أكياس قليلة تنتهي سريعاً وتحتاج شراء متكرر",
      advantage: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-cream-soft/40 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            مقارنة الجودة
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            {BRAND.copy.comparisonTitle}
          </h2>
          <p className="text-base text-muted-ink">
            شاهد الفرق بين قطرات 4 Muscle وبدائل السكر التقليدية المتوفرة في الأسواق.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block rounded-3xl overflow-hidden border border-line bg-white shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-line bg-cream-soft">
                <th className="py-5 px-6 text-sm font-bold text-ink w-1/3">
                  وجه المقارنة
                </th>
                <th className="py-5 px-6 text-base font-black text-brand-green-dark bg-brand-green/10 w-1/3 border-x border-brand-green/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-green" />
                    <span>4 Muscle Drops</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-sm font-bold text-muted-ink w-1/3">
                  البدائل التقليدية
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-cream-soft/30 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-ink">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-ink bg-sage-wash/40 border-x border-brand-green/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.fourMuscle}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-ink">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-rose-100 text-status-danger flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards View */}
        <div className="md:hidden space-y-4">
          {rows.map((row, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-line shadow-xs space-y-3"
            >
              <h4 className="text-sm font-bold text-ink pb-2 border-b border-line">
                {row.feature}
              </h4>
              <div className="bg-sage-wash/70 p-3 rounded-xl border border-brand-green/20">
                <div className="flex items-center gap-2 text-xs font-black text-brand-green-dark mb-1">
                  <Check className="w-4 h-4 text-brand-green" />
                  <span>4 Muscle Drops:</span>
                </div>
                <p className="text-xs font-bold text-ink pr-6">{row.fourMuscle}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-line">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-ink mb-1">
                  <X className="w-4 h-4 text-status-danger" />
                  <span>البدائل التقليدية:</span>
                </div>
                <p className="text-xs text-muted-ink pr-6">{row.others}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
