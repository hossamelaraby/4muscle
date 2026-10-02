import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Sparkles, ShieldCheck, Heart, Zap, Award } from "lucide-react";

export const metadata = {
  title: "قصتنا — 4 Muscle",
  description: "تعرف على قصة ورؤية 4 Muscle في تقديم بديل صحي ونقي للسكر يناسب الرياضيين ومحبي أسلوب الحياة الصحي.",
};

export default function OurStoryPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="py-16 sm:py-20 bg-cream-soft/60 border-b border-line text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase mb-4 inline-block">
            رؤيتنا ورسالتنا
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-ink mb-6">
            قصة 4 Muscle: حلاوة طبيعية بدون تنازلات
          </h1>
          <p className="text-base sm:text-lg text-muted-ink leading-relaxed max-w-2xl mx-auto">
            بدأت فكرة 4 Muscle من تجربة شخصية واحتياج حقيقي: لماذا يجب على كل رياضي أو مهتم بصحته أن يتحمل الطعم المر لبدائل السكر التقليدية؟
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[550px] rounded-3xl overflow-hidden border border-line shadow-md bg-cream-soft flex items-center justify-center p-3">
            <Image
              src="/images/bottle-400-spoons.jpg"
              alt="4 Muscle Drops - يعادل 400 معلقة سكر"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-4 text-right">
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              البداية: البحث عن النقاء التام
            </h2>
            <p className="text-sm sm:text-base text-muted-ink leading-relaxed">
              لسنوات طويلة، واجه متبعو الحميات الصحية والرياضيون صعوبة في إيجاد بديل سكر يمنحهم الحلاوة الحقيقية التي اعتادوا عليها دون طعم جانبي مر بعد التذوق (No Aftertaste).
            </p>
            <p className="text-sm sm:text-base text-muted-ink leading-relaxed">
              من هنا، عملنا على ابتكار تركيبة سائلة نقية مشتقة من مصادر سكر طبيعية، معبأة في قطارة عملية 20 مل تعادل 400 ملعقة سكر كاملة. قطرة واحدة فقط كافية لضبط مذاق مشروبك المفضل بدقة فائقة.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cream-soft/40 p-6 rounded-2xl border border-line text-right space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink">الجودة والأمان</h3>
            <p className="text-xs sm:text-sm text-muted-ink leading-relaxed">
              نلتزم بأعلى معايير سلامة الأغذية والنقاء الكيميائي لنقدم لك منتجاً تثق به يومياً في وجباتك ومشروباتك.
            </p>
          </div>

          <div className="bg-cream-soft/40 p-6 rounded-2xl border border-line text-right space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink">الحياة بدون حرمان</h3>
            <p className="text-xs sm:text-sm text-muted-ink leading-relaxed">
              نؤمن بأن الالتزام بنظام صحي أو رياضي لا يعني التنازل عن متعة التحلية ونكهة القهوة والشاي والمخبوزات.
            </p>
          </div>

          <div className="bg-cream-soft/40 p-6 rounded-2xl border border-line text-right space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sage-wash text-brand-green-dark flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink">العملية والسرعة</h3>
            <p className="text-xs sm:text-sm text-muted-ink leading-relaxed">
              تصميم العبوة بحجم الجيب يجعله جاهزاً لمرافقتك في صالة الألعاب الرياضية والعمل وأثناء السفر دون أي إزعاج.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-sage-wash/60 rounded-3xl p-10 border border-brand-green/20 space-y-4">
          <h3 className="text-2xl font-black text-ink">انضم إلى مجتمع 4 Muscle اليوم</h3>
          <p className="text-sm text-muted-ink max-w-md mx-auto">
            آلاف العملاء في مصر استبدلوا السكر العادي بقطرات 4 Muscle واستمتعوا بحياة أكثر نشاطاً وتوازناً.
          </p>
          <Link
            href="/products/4-muscle"
            className="inline-block bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all"
          >
            تسوق باقات التوفير
          </Link>
        </div>
      </section>
    </div>
  );
}
