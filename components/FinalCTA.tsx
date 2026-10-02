"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Truck, ShieldCheck, Zap } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-sage-wash via-cream-soft to-sage-wash border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-green/20 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Product Thumbnail & Visual */}
          <div className="flex items-center gap-6 text-right">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cream-soft p-2 border border-line shrink-0 flex items-center justify-center">
              <Image
                src={BRAND.productImage}
                alt="4 Muscle Drops"
                width={85}
                height={85}
                className="object-contain max-h-full"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-2.5 py-0.5 rounded-md inline-block mb-1.5">
                جاهز لتجربة أسهل؟
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-ink">
                ابدأ رحلتك مع 4 Muscle Drops اليوم
              </h3>
              <p className="text-xs sm:text-sm text-muted-ink mt-1 max-w-md">
                400 نقطة من الحلاوة النقية بدون سعرات وبدون مرارة. اختر باقتك المفضلة واستفد من عروض الشحن المجاني.
              </p>
            </div>
          </div>

          {/* Action & Trust */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0 w-full lg:w-auto">
            <Link
              href="/products/4-muscle"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 text-center"
            >
              <Zap className="w-5 h-5" />
              <span>اطلب باقتك الآن</span>
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs font-bold text-muted-ink">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-green" />
                شحن مجاني من 3 عبوات
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                الدفع عند الاستلام
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
