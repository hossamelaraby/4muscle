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
  Sparkles,
  Gift,
  Plus,
  Minus,
} from "lucide-react";

export default function ProductShowcase() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedBundleId, setSelectedBundleId] = useState<string>("bundle-3");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(BRAND.productImage);

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
            تسوق 4 Muscle
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-2">
            اختر الباقة المناسبة لاحتياجك ووفر أكثر
          </h2>
          <p className="text-sm sm:text-base text-muted-ink">
            جميع الباقات المكونة من 3 عبوات أو أكثر تشمل <span className="font-bold text-emerald-700">شحناً مجانياً بالكامل</span> لجميع محافظات مصر.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image Frame */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-3xl bg-cream-soft/60 border border-line overflow-hidden flex items-center justify-center p-6 shadow-sm">
              <Image
                src={activeImage}
                alt="4 Muscle Drops Healthy Sugar"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 transition-all duration-300"
                priority
              />

              {/* 400 Points Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-green/30 text-xs font-bold text-brand-green-dark shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                <span>400 نقطة تحلية مركزة</span>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { src: BRAND.productImage, label: "المنتج والعبوة" },
                { src: BRAND.lifestyleImage, label: "العبوة والقهوة" },
                { src: BRAND.heroImage, label: "العبوة بالطبيعة" },
                { src: BRAND.bundlesBanner, label: "جميع العروض" },
              ].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img.src)}
                  className={`relative aspect-square rounded-2xl border-2 overflow-hidden bg-cream-soft transition-all ${
                    activeImage === img.src
                      ? "border-brand-green shadow-sm scale-95"
                      : "border-line hover:border-brand-green/40 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="bg-sage-wash/50 rounded-2xl p-4 border border-line flex items-center justify-around text-xs text-ink/80 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                منتج أصلي 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-green" />
                دفع عند الاستلام
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-brand-green" />
                معاينة قبل الدفع
              </span>
            </div>
          </div>

          {/* Details & Interactive Bundle Selector Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Reviews summary */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-brand-green text-white px-2.5 py-0.5 rounded-md">
                  الأصلي 4 Muscle
                </span>
                <span className="text-xs text-muted-ink">حجم العبوة: 20 مل</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-ink">
                {BRAND.productName}
              </h1>
              <p className="text-sm text-muted-ink mt-2 leading-relaxed">
                بديل السكر الصحي الخالي من السعرات والبدون أي مرارة بعد التذوق. قطرة واحدة تساوي ملعقة سكر كاملة.
              </p>
            </div>

            {/* Bundle Selection Options */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-ink">
                اختر الباقة المناسبة لك:
              </label>

              <div className="space-y-2.5">
                {BRAND.bundles.map((bundle) => {
                  const isSelected = selectedBundleId === bundle.id;
                  const discountPercent = Math.round(
                    ((bundle.compareAtPrice - bundle.price) / bundle.compareAtPrice) * 100
                  );

                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setSelectedBundleId(bundle.id)}
                      className={`relative p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand-green bg-sage-wash/40 shadow-sm"
                          : "border-line hover:border-brand-green/30 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Radio indicator + title */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-brand-green bg-brand-green text-white"
                                : "border-muted-ink/40"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-ink">
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

                        {/* Price */}
                        <div className="text-left font-sans">
                          <div className="text-base sm:text-lg font-black text-ink">
                            {bundle.price} {BRAND.currency}
                          </div>
                          <div className="text-xs text-muted-ink line-through">
                            {bundle.compareAtPrice} {BRAND.currency}
                          </div>
                        </div>
                      </div>

                      {/* Extra Gift Alert for bundle 6 */}
                      {bundle.extraGift && (
                        <div className="mt-2 pt-2 border-t border-line/60 flex items-center gap-1.5 text-xs font-bold text-brand-gold-dark">
                          <Gift className="w-4 h-4 text-brand-gold" />
                          <span>هدية العرض: {bundle.extraGift}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Pricing Total for Selected */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-cream-soft border border-line">
              <div>
                <span className="text-xs text-muted-ink block">الكمية المطلوبة من الباقة:</span>
                <span className="text-sm font-bold text-ink">
                  {quantity > 1 ? `${quantity} باقات` : "باقة واحدة"}
                </span>
              </div>
              <div className="flex items-center gap-3">
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
            </div>

            {/* Total Price Display */}
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs text-muted-ink block">إجمالي هذه الباقة:</span>
                <span className="text-xs text-emerald-700 font-bold">
                  {selectedBundle.freeShipping ? "✓ مؤهل للشحن المجاني" : "+ مصاريف الشحن العادية"}
                </span>
              </div>
              <div className="text-right font-sans">
                <span className="text-2xl sm:text-3xl font-black text-brand-green-dark">
                  {selectedBundle.price * quantity} {BRAND.currency}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base sm:text-lg py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:shadow-xl transition-all duration-200 active:scale-98"
              >
                <Zap className="w-5 h-5" />
                <span>اشترِ الآن — الدفع عند الاستلام</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2.5 border-2 border-line hover:border-brand-green bg-white hover:bg-sage-wash text-ink font-bold text-base py-3.5 rounded-2xl transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5 text-brand-green" />
                <span>أضف إلى عربة التسوق</span>
              </button>
            </div>

            {/* Stock and Shipping note */}
            <div className="space-y-2 text-xs text-muted-ink border-t border-line/60 pt-4">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>متوفر في المخزون — جاهز للشحن اليوم</span>
              </div>
              <p>
                🚚 التوصيل خلال 24 - 48 ساعة داخل القاهرة والجيزة والإسكندرية، وخلال 3 - 4 أيام لباقي المحافظات.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
