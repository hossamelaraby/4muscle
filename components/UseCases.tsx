"use client";

import React from "react";
import Image from "next/image";
import { BRAND } from "@/lib/brand";

export default function UseCases() {
  return (
    <section id="use-cases" className="py-16 sm:py-24 bg-cream-soft/50 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            استخدامات متعددة
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            {BRAND.copy.useCasesTitle}
          </h2>
          <p className="text-base text-muted-ink">
            سريع الذوبان ويعمل بكفاءة مع المشروبات الساخنة والباردة وأطباقك المفضلة دون أن يغير مذاقها الطبيعي.
          </p>
        </div>

        {/* 6 Circular Lifestyle Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {BRAND.useCases.map((uc) => (
            <div
              key={uc.id}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Circular Card Container with Subtle Ring & Hover Zoom */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl group-hover:border-brand-green/40 transition-all duration-300 mb-4 bg-white">
                <Image
                  src={uc.image}
                  alt={uc.title}
                  fill
                  sizes="(max-width: 768px) 140px, 160px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Text Label */}
              <h3 className="text-base font-bold text-ink group-hover:text-brand-green transition-colors mb-1">
                {uc.title}
              </h3>
              <p className="text-xs text-muted-ink leading-relaxed px-1">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Full Showcase Banner */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-line bg-white shadow-sm p-4 sm:p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full lg:w-1/2 aspect-video rounded-2xl overflow-hidden bg-cream-soft">
            <Image
              src={BRAND.useCasesImage}
              alt="جميع استخدامات قطرات 4 Muscle"
              fill
              className="object-contain"
            />
          </div>
          <div className="lg:w-1/2 space-y-4 text-right">
            <div className="inline-block bg-sage-wash text-brand-green-dark text-xs font-bold px-3 py-1 rounded-md">
              مرونة تامة في كل وصفة
            </div>
            <h4 className="text-2xl font-black text-ink">
              استمتع بكل تفاصيل يومك بحلاوة نقية وبدون حرمان
            </h4>
            <p className="text-sm text-muted-ink leading-relaxed">
              سواء كنت تبدأ يومك بفنجان قهوة الصباح، أو تتناول شيك البروتين بعد تمرين مكثف في الجيم، أو تحضر وجبة شوفان صحية، تمنحك قطرات 4 Muscle الحلاوة المثالية بلمسة واحدة وسهلة.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-bold text-brand-green-dark">
              <span>✓ مقاوم لدرجات الحرارة العالية</span>
              <span>✓ يذوب فوراً في المشروبات الباردة</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
