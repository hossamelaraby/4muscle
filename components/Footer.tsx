"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { Send, Phone, MessageCircle, Instagram, ShieldCheck, Truck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-ink text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-green">
                <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
              </div>
              <span className="text-xl font-black font-sans tracking-wider">
                4 <span className="text-brand-green">MUSCLE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              4 Muscle Drops — قطرات التحلية الصحية المركزة بدون سعرات وبدون أي مرارة بعد التذوق. 400 نقطة تحلية نقية تمنحك الحرية الكاملة في روتينك اليومي والرياضي.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-green flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-brand-green flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products/4-muscle" className="hover:text-brand-green transition-colors">
                  المنتج والباقات
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-brand-green transition-colors">
                  قصتنا ورؤيتنا
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-green transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition-colors">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Policies */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              خدمة العملاء والسياسات
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-brand-green" />
                <span>شحن سريع لجميع المحافظات</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                <span>الدفع عند الاستلام مع المعاينة</span>
              </li>
              <li>
                <span className="text-gray-400">سياسة الاستبدال: خلال 14 يوماً</span>
              </li>
              <li>
                <span className="text-gray-400">فترة التوصيل: 24 - 48 ساعة للمدن الرئيسية</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              النشرة البريدية والعروض
            </h4>
            <p className="text-xs text-gray-400">
              اشترك لتصلك أحدث العروض الحصرية وكوبونات الخصم فور إطلاقها.
            </p>

            {subscribed ? (
              <p className="text-xs text-emerald-400 font-bold bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800">
                شكراً لاشتراكك! ستصلك أحدث العروض قريباً.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green"
                  />
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-dark text-white p-2.5 rounded-xl transition-colors"
                    aria-label="اشتراك"
                  >
                    <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span dir="ltr">{BRAND.phone}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-center space-y-4">
          <p className="text-[11px] text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {BRAND.copy.disclaimer}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/5 gap-3">
            <p>© {new Date().getFullYear()} 4 Muscle — جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-4">
              <span>الدفع عند الاستلام (COD)</span>
              <span>•</span>
              <span>توصيل معتمد</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
