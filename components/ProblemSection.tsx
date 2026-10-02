"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function ProblemSection() {
  const frictions = [
    {
      bad: "طعم مر ومزعج بعد التذوق",
      badDetail: "معظم أنواع سكر الدايت تترك مرارة (Aftertaste) غير محببة في الفم وتغير نكهة القهوة والشاي.",
      good: "طعم سكر طبيعي متوازن",
      goodDetail: "تركيبة 4 Muscle تمنحك حلاوة صافية بدون أي مرارة أو تغير في نكهة مشروبك الأصلي.",
    },
    {
      bad: "صعوبة المعايرة والجرعات",
      badDetail: "الحبوب تحتاج وقت للذوبان، والبودرة تتطاير ويصعب ضبط نصف ملعقة أو ملعقة ونصف بدقة.",
      good: "تحكم فوري بالقطرة",
      goodDetail: "قطارة سائلة ذكية: قطرة = ملعقة. تضبط حلاوة كوبك في ثانية واحدة بالضبط كما تحبها.",
    },
    {
      bad: "عبوات كبيرة وغير عملية بالخارج",
      badDetail: "صعوبة حمل برطمانات السكر أو أكياس البودرة في الجيم، العمل، أو أثناء السفر.",
      good: "حجم جيب عملي 20 مل",
      goodDetail: "عبوة أنيقة صغيرة الحجم تسع جيبك أو حقيبة الجيم لترافقك أينما ذهبت بكل ثقة.",
    },
    {
      bad: "إهدار سريع وتكلفة متكررة",
      badDetail: "الأكياس تنتهي سريعاً وتكلف مبالغ مستمرة دون إحساس بالقيمة الحقيقية.",
      good: "400 نقطة تحلية مركزة",
      goodDetail: "عبوة واحدة تكفيك حتى 400 مشروب! أعلى إنتاجية وتوفير مضمون لميزانيتك الشهرية.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            المقارنة والحل العملي
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            خلّي روتينك اليومي أبسط وألذ
          </h2>
          <p className="text-base text-muted-ink">
            ودّع المشاكل التقليدية لبدائل السكر، واكتشف تجربة تحلية ذكية ونقية صُممت لتناسب حياتك السريعة.
          </p>
        </div>

        {/* 4 Cards Friction vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {frictions.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-line bg-cream-soft/40 p-6 flex flex-col justify-between hover:border-brand-green/40 transition-all duration-200"
            >
              {/* The Old Way */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-line/70">
                <div className="p-2 rounded-xl bg-rose-50 text-status-danger shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink line-through decoration-rose-400">
                    {f.bad}
                  </h4>
                  <p className="text-xs text-muted-ink mt-1 leading-relaxed">
                    {f.badDetail}
                  </p>
                </div>
              </div>

              {/* The 4 Muscle Way */}
              <div className="flex items-start gap-3.5 pt-4">
                <div className="p-2 rounded-xl bg-emerald-50 text-brand-green shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-green-dark">
                    مع 4 Muscle: {f.good}
                  </h4>
                  <p className="text-xs text-muted-ink mt-1 leading-relaxed">
                    {f.goodDetail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sage-tinted Callout Band */}
        <div className="bg-gradient-to-r from-sage-wash via-sage/40 to-sage-wash rounded-3xl p-6 sm:p-8 border border-brand-green/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-white p-2 border border-brand-green/20 shadow-xs flex items-center justify-center">
              <Image
                src={BRAND.productImage}
                alt="4 Muscle Drops"
                width={70}
                height={70}
                className="object-contain max-h-full"
              />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-ink">
                قطرة واحدة يومياً تصنع الفارق في كل مشروب
              </h3>
              <p className="text-xs sm:text-sm text-muted-ink mt-1">
                استمتع بحلاوة السكر دون التنازل عن صحتك أو طاقتك. اطلب باقتك المفضلة اليوم مع شحن مجاني.
              </p>
            </div>
          </div>

          <Link
            href="/products/4-muscle"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
          >
            <span>شاهد باقات التوفير</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

      </div>
    </section>
  );
}
