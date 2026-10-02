import React from "react";
import ProductShowcase from "@/components/ProductShowcase";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import { Droplet, Sparkles, ShieldCheck, HeartPulse } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "4 Muscle Drops — المنتج وتفاصيل الباقات",
  description: "تسوق قطرات التحلية الصحية 4 Muscle Drops مع عروض الشحن المجاني والخصومات الحصرية.",
};

export default function ProductDetailPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb strip */}
      <div className="bg-cream-soft/60 border-b border-line py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-muted-ink">
          <span>الرئيسية</span>
          <span className="mx-2">/</span>
          <span>المنتجات</span>
          <span className="mx-2">/</span>
          <span className="font-bold text-ink">{BRAND.productName}</span>
        </div>
      </div>

      {/* Main Showcase & Bundle picker */}
      <ProductShowcase />

      {/* Product Details & Ingredients Sheet */}
      <section className="py-14 bg-cream-soft/30 border-b border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3 py-1 rounded-full uppercase">
              المواصفات والتركيبة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink mt-2">
              كل ما تود معرفته عن قطرات 4 Muscle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-line space-y-4">
              <div className="flex items-center gap-3 text-brand-green-dark">
                <Sparkles className="w-6 h-6 text-brand-green" />
                <h3 className="text-lg font-bold text-ink">مواصفات العبوة</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-ink">
                <li className="flex justify-between border-b border-line/50 pb-2">
                  <span>اسم المنتج</span>
                  <span className="font-bold text-ink font-sans">4 Muscle Healthy Sugar Drops</span>
                </li>
                <li className="flex justify-between border-b border-line/50 pb-2">
                  <span>الحجم الصافي</span>
                  <span className="font-bold text-ink font-sans">20 ml</span>
                </li>
                <li className="flex justify-between border-b border-line/50 pb-2">
                  <span>عدد نقاط التحلية</span>
                  <span className="font-bold text-ink">400 نقطة تحلية مركزة</span>
                </li>
                <li className="flex justify-between border-b border-line/50 pb-2">
                  <span>معادلة الجرعة</span>
                  <span className="font-bold text-ink">1 قطرة = 1 ملعقة سكر</span>
                </li>
                <li className="flex justify-between">
                  <span>بلد المنشأ</span>
                  <span className="font-bold text-ink">جمهورية مصر العربية</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-line space-y-4">
              <div className="flex items-center gap-3 text-brand-green-dark">
                <Droplet className="w-6 h-6 text-brand-green" />
                <h3 className="text-lg font-bold text-ink">المكونات وطريقة الحفظ</h3>
              </div>
              <p className="text-sm text-muted-ink leading-relaxed">
                مستخلص محلي سائل فائق النقاء مشتق من سكر القصب الطبيعي وجزر السكر عالي الجودة ومياه نقية معالجة ومواد حافظة غذائية مصرح بها بنسب قياسية.
              </p>
              <div className="bg-sage-wash/60 p-4 rounded-xl border border-brand-green/20 space-y-2">
                <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>إرشادات التخزين والاستخدام</span>
                </h4>
                <p className="text-xs text-muted-ink leading-relaxed">
                  يحفظ في مكان جاف ومعتدل الحرارة بعيداً عن أشعة الشمس المباشرة. رج العبوة برفق قبل الاستخدام. لا تعرض العبوة للتجميد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <Comparison />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
