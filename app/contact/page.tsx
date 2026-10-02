"use client";

import React, { useState } from "react";
import { BRAND } from "@/lib/brand";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            دعم العملاء
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-ink mb-3">
            تواصل مع فريق 4 Muscle
          </h1>
          <p className="text-sm sm:text-base text-muted-ink">
            نحن هنا لمساعدتك في أي استفسار بشأن الطلبات، الشحن، أو كيفية استخدام قطرات التحلية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-cream-soft/60 rounded-3xl p-6 sm:p-8 border border-line space-y-6">
              <h3 className="text-xl font-black text-ink border-b border-line pb-4">
                قنوات الاتصال المباشرة
              </h3>

              {/* WhatsApp Card */}
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-line hover:border-[#25D366] transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-ink group-hover:text-[#25D366] transition-colors">
                      واتساب خدمة العملاء
                    </h4>
                    <p className="text-xs text-muted-ink">رد فوري طوال أيام الأسبوع</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-lg">
                  محادثة
                </span>
              </a>

              {/* Phone */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-line">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink">الهاتف الموحد</h4>
                  <p className="text-sm font-bold text-ink font-sans mt-0.5" dir="ltr">
                    {BRAND.phone}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-line">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink">مواعيد العمل</h4>
                  <p className="text-xs text-muted-ink mt-0.5">يومياً من 9:00 صباحاً حتى 11:00 مساءً</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-line">
                <div className="w-12 h-12 rounded-xl bg-sage-wash text-brand-green-dark flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink">التغطية والشحن</h4>
                  <p className="text-xs text-muted-ink mt-0.5">نغطي جميع محافظات جمهورية مصر العربية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-xs">
            <h3 className="text-xl font-black text-ink mb-2">أرسل لنا رسالة</h3>
            <p className="text-xs text-muted-ink mb-6">
              سيتواصل معك أحد ممثلي الدعم الفني خلال ساعات قليلة.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-ink">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-xs text-muted-ink">
                  شكراً لتواصلك معنا، سنقوم بالرد عليك عبر رقم الهاتف المسجل في أقرب وقت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-brand-green-dark font-bold underline"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm text-right focus:outline-none focus:border-brand-green font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">رسالتك أو استفسارك</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="اكتب استفسارك هنا بالتفصيل..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl shadow-sm transition-all"
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
