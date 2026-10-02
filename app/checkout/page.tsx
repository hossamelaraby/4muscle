"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    clearCart,
    subtotal,
    totalBottles,
    appliedCoupon,
    discount,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [governorate, setGovernorate] = useState(BRAND.governorates[0].name);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  // Calculate shipping fee based on selected governorate and bundle count
  const selectedGovObj =
    BRAND.governorates.find((g) => g.name === governorate) ||
    BRAND.governorates[0];

  const shippingFee =
    totalBottles >= BRAND.freeShippingThresholdBottles
      ? 0
      : selectedGovObj.fee;

  const total = Math.max(0, subtotal + shippingFee - discount);

  // If cart is empty, redirect or prompt
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-ink mb-2">عربة التسوق فارغة</h1>
        <p className="text-sm text-muted-ink mb-6">
          يرجى إضافة باقة 4 Muscle أولاً للمتابعة إلى إتمام الطلب.
        </p>
        <Link
          href="/products/4-muscle"
          className="bg-brand-green text-white font-bold px-6 py-3 rounded-xl hover:bg-brand-green-dark transition-colors"
        >
          اختيار باقة
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().split(" ").length < 2) {
      errs.fullName = "يرجى كتابة الاسم بالكامل (ثنائي على الأقل)";
    }

    const cleanPhone = phone.replace(/\s+/g, "").replace(/^(\+20|0020)/, "0");
    if (!/^01[0125][0-9]{8}$/.test(cleanPhone)) {
      errs.phone = "يرجى إدخال رقم هاتف محمول مصري صحيح (مثال: 01012345678)";
    }

    if (secondaryPhone.trim()) {
      const cleanSec = secondaryPhone
        .replace(/\s+/g, "")
        .replace(/^(\+20|0020)/, "0");
      if (!/^01[0125][0-9]{8}$/.test(cleanSec)) {
        errs.secondaryPhone = "رقم الهاتف الإضافي غير صحيح";
      }
    }

    if (!city.trim()) {
      errs.city = "يرجى إدخال المركز أو الحي / المنطقة";
    }

    if (!address.trim() || address.trim().length < 8) {
      errs.address = "يرجى إدخال العنوان بالتفصيل (اسم الشارع، رقم العمارة، رقم الشقة)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) {
      // scroll to top of form
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: fullName.trim(),
          phone: phone.trim(),
          secondary_phone: secondaryPhone.trim() || undefined,
          governorate: governorate.trim(),
          city: city.trim(),
          address: address.trim(),
          notes: notes.trim() || undefined,
          items,
          subtotal,
          shipping_fee: shippingFee,
          discount,
          total,
          coupon_code: appliedCoupon || undefined,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.ok && data.success && data.order) {
        clearCart();
        router.push(`/order-confirmation?orderId=${data.order.id}&orderNumber=${data.order.order_number}`);
      } else {
        setServerError(data.message || "حدث خطأ أثناء حفظ الطلب، يرجى المحاولة ثانية");
      }
    } catch (err) {
      setIsSubmitting(false);
      setServerError("تعذر الاتصال بالخادم حالياً، يرجى التأكد من اتصال الإنترنت");
    }
  };

  return (
    <div className="py-10 bg-cream-soft/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-ink">إتمام الطلب</h1>
            <p className="text-xs sm:text-sm text-muted-ink mt-1">
              املأ بيانات التوصيل وسنتواصل معك لتأكيد الشحن فوراً.
            </p>
          </div>
          <Link
            href="/cart"
            className="text-xs sm:text-sm font-bold text-brand-green-dark hover:underline flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            <span>العودة للسلة</span>
          </Link>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-status-danger text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Customer Details Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-line">
              <span className="w-7 h-7 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center font-sans">
                1
              </span>
              <h2 className="text-lg font-bold text-ink">بيانات الشحن والتوصيل</h2>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                الاسم بالكامل <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: محمد أحمد علي"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  errors.fullName
                    ? "border-status-danger bg-rose-50/30"
                    : "border-line focus:border-brand-green"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-status-danger mt-1 font-semibold">{errors.fullName}</p>
              )}
            </div>

            {/* Phone numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  رقم الهاتف المحمول الأساسي <span className="text-status-danger">*</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="010xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-right focus:outline-none font-sans transition-colors ${
                    errors.phone
                      ? "border-status-danger bg-rose-50/30"
                      : "border-line focus:border-brand-green"
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-status-danger mt-1 font-semibold">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  رقم هاتف إضافي (اختياري)
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  placeholder="011xxxxxxxx"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-right focus:outline-none font-sans transition-colors ${
                    errors.secondaryPhone
                      ? "border-status-danger bg-rose-50/30"
                      : "border-line focus:border-brand-green"
                  }`}
                />
                {errors.secondaryPhone && (
                  <p className="text-xs text-status-danger mt-1 font-semibold">{errors.secondaryPhone}</p>
                )}
              </div>
            </div>

            {/* Governorate & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  المحافظة <span className="text-status-danger">*</span>
                </label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-line text-sm focus:outline-none focus:border-brand-green bg-white font-medium"
                >
                  {BRAND.governorates.map((gov) => (
                    <option key={gov.name} value={gov.name}>
                      {gov.name} {totalBottles >= BRAND.freeShippingThresholdBottles ? "(شحن مجاني)" : `(+${gov.fee} ج.م)`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  المركز / المدينة / الحي <span className="text-status-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: المعادي، الدقي، سموحة..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                    errors.city
                      ? "border-status-danger bg-rose-50/30"
                      : "border-line focus:border-brand-green"
                  }`}
                />
                {errors.city && (
                  <p className="text-xs text-status-danger mt-1 font-semibold">{errors.city}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                العنوان بالتفصيل <span className="text-status-danger">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="اسم الشارع، رقم العمارة، رقم الشقة، علامة مميزة بجوارك"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${
                  errors.address
                    ? "border-status-danger bg-rose-50/30"
                    : "border-line focus:border-brand-green"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-status-danger mt-1 font-semibold">{errors.address}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                ملاحظات إضافية للتوصيل (اختياري)
              </label>
              <input
                type="text"
                placeholder="مثال: الاتصال قبل الوصول بنصف ساعة، التوصيل بعد الساعة 4 مساءً"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line text-sm focus:outline-none focus:border-brand-green"
              />
            </div>

            {/* Payment Method Section */}
            <div className="pt-4 border-t border-line space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-green text-white font-bold text-xs flex items-center justify-center font-sans">
                  2
                </span>
                <h3 className="text-base font-bold text-ink">طريقة الدفع</h3>
              </div>

              <div className="p-4 rounded-2xl border-2 border-brand-green bg-sage-wash/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-green text-white flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">الدفع عند الاستلام (COD)</h4>
                    <p className="text-xs text-muted-ink">ادفع نقداً لمندوب الشحن بعد معاينة واستلام طلبك.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand-green-dark bg-white px-2.5 py-1 rounded-md border border-brand-green/20">
                  معتمد
                </span>
              </div>
            </div>

          </div>

          {/* Order Summary & Submit Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-ink border-b border-line pb-3">
                ملخص الطلب
              </h3>

              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-lg bg-cream-soft border border-line overflow-hidden p-0.5 shrink-0">
                        <Image src={BRAND.productImage} alt={item.name} fill className="object-contain" />
                      </div>
                      <div>
                        <span className="font-bold text-ink block">{item.name}</span>
                        <span className="text-[11px] text-muted-ink font-sans">
                          الكمية: {item.quantity} × {item.unitPrice} {BRAND.currency}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-ink font-sans">
                      {item.totalPrice} {BRAND.currency}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon applied badge if any */}
              {appliedCoupon && (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between text-xs text-emerald-800 font-bold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    كود الخصم: {appliedCoupon}
                  </span>
                  <span>-{discount} {BRAND.currency}</span>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="space-y-2.5 text-xs sm:text-sm text-muted-ink border-t border-line pt-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-ink font-sans">{subtotal} {BRAND.currency}</span>
                </div>

                <div className="flex justify-between">
                  <span>الشحن ({governorate})</span>
                  <span className="font-bold text-ink font-sans">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">مجاني 🎉</span>
                    ) : (
                      `${shippingFee} ${BRAND.currency}`
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>خصم الكوبون</span>
                    <span className="font-sans">-{discount} {BRAND.currency}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-black text-ink pt-3 border-t border-line">
                  <span>الإجمالي للدفع</span>
                  <span className="text-brand-green-dark font-sans">{total} {BRAND.currency}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:shadow-xl transition-all duration-200 disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل الطلب...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>تأكيد الطلب الآن ({total} {BRAND.currency})</span>
                  </>
                )}
              </button>

              <div className="space-y-2 text-xs text-muted-ink pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>بياناتك محمية تماماً ولن يتم مشاركتها أبداً</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>تأكيد عبر واتساب ورسالة هاتفية فور التسجيل</span>
                </div>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
