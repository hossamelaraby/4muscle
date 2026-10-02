"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BRAND, BundleItem } from "@/lib/brand";
import { useCart } from "@/lib/cart-context";
import {
  ShoppingBag,
  Zap,
  Check,
  Truck,
  ShieldCheck,
  Gift,
  Plus,
  Minus,
} from "lucide-react";

export default function ProductShowcase() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedBundleId, setSelectedBundleId] = useState<string>("bundle-3");
  const [quantity, setQuantity] = useState<number>(1);

  const selectedBundle: BundleItem =
    BRAND.bundles.find((b) => b.id === selectedBundleId) || BRAND.bundles[1];

  const handleAddToCart = () => {
    addItem({
      id: selectedBundle.id,
      name: `${selectedBundle.title} (${BRAND.productShortName})`,
      quantity: quantity,
      bottlesCount: selectedBundle.bottles,
      unitPrice: selectedBundle.price,
      badge: selectedBundle.badge,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <section id="shop" className="py-16 sm:py-24 bg-white border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            عروض وباقات 4 Muscle
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-2">
            اختر الباقة المناسبة لاحتياجاتك ووفر أكثر
          </h2>
          <p className="text-sm sm:text-base text-muted-ink">
            جميع الباقات المكونة من 3 عبوات أو أكثر تشمل <span className="font-bold text-emerald-700">شحناً مجانياً بالكامل</span> لجميع محافظات مصر.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Official 3 Bottles with Ribbon Graphic (Uploaded by client) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-line shadow-lg bg-cream-soft aspect-[4/5] sm:aspect-[3/4] max-h-[580px] w-full flex items-center justify-center p-2">
              <Image
                src="/images/bundle-bottles-ribbon.jpg"
                alt="باقات وعروض 4 Muscle Drops - 3 عبوات وشحن مجاني"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>

            {/* Reassurance Features Bar */}
            <div className="bg-sage-wash/60 rounded-2xl p-4 border border-brand-green/20 flex items-center justify-around text-xs text-ink/80 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                منتج أصلي 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-green" />
                الدفع عند الاستلام
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-brand-green" />
                معاينة الشحنة متاحة
              </span>
            </div>
          </div>

          {/* Interactive Bundle Selector Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Description */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold bg-brand-green text-white px-2.5 py-0.5 rounded-md font-sans">
                  4 MUSCLE DROPS
                </span>
                <span className="text-xs text-muted-ink font-semibold">20 مل — 400 نقطة تحلية</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-ink">
                باقات التوفير والشحن المجاني
              </h3>
            </div>

            {/* Bundle Options List */}
            <div className="space-y-2.5">
              {BRAND.bundles.map((bundle) => {
                const isSelected = selectedBundleId === bundle.id;

                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundleId(bundle.id)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-brand-green bg-sage-wash/50 shadow-sm"
                        : "border-line hover:border-brand-green/30 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* Checkbox indicator & Info */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-brand-green bg-brand-green text-white"
                              : "border-muted-ink/40"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-ink">
                              {bundle.title}
                            </h4>
                            {bundle.badge && (
                              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                                {bundle.badge}
                              </span>
                            )}
                            {bundle.freeShipping && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                                شحن مجاني
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-ink mt-0.5">
                            {bundle.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="text-left font-sans shrink-0">
                        <div className="text-base sm:text-lg font-black text-ink">
                          {bundle.price} {BRAND.currency}
                        </div>
                        <div className="text-xs text-muted-ink line-through">
                          {bundle.compareAtPrice} {BRAND.currency}
                        </div>
                      </div>
                    </div>

                    {/* Free extra gift for 6 bottles */}
                    {bundle.extraGift && (
                      <div className="mt-2 pt-2 border-t border-line/60 flex items-center gap-1.5 text-xs font-bold text-brand-gold-dark">
                        <Gift className="w-4 h-4 text-brand-gold" />
                        <span>هدية خاصة: {bundle.extraGift}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-cream-soft border border-line">
              <span className="text-xs font-bold text-ink">الكمية المطلوبة من الباقة:</span>
              <div className="flex items-center border border-line rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-ink hover:bg-sage-wash transition-colors"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-ink font-sans">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-ink hover:bg-sage-wash transition-colors"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price & CTAs */}
            <div className="space-y-3 pt-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-ink">الإجمالي للدفع:</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-green-dark font-sans">
                  {selectedBundle.price * quantity} {BRAND.currency}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base py-3.5 rounded-2xl shadow-md transition-all active:scale-98"
                >
                  <Zap className="w-5 h-5" />
                  <span>اشترِ الآن (دفع عند الاستلام)</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 border-2 border-line hover:border-brand-green bg-white hover:bg-sage-wash text-ink font-bold text-sm py-3.5 rounded-2xl transition-all"
                >
                  <ShoppingBag className="w-5 h-5 text-brand-green" />
                  <span>أضف إلى عربة التسوق</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-emerald-800 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                {selectedBundle.freeShipping ? "مؤهل للشحن المجاني لجميع محافظات مصر" : "التوصيل سريع لكافة المحافظات"}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
