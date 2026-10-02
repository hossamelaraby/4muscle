"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    totalBottles,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const bottlesNeeded = Math.max(0, BRAND.freeShippingThresholdBottles - totalBottles);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    setCouponError("");
    setCouponSuccess("");
    const res = await applyCoupon(couponInput);
    setIsApplying(false);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput("");
    } else {
      setCouponError(res.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-cream-soft flex items-center justify-center mb-4 border border-line">
          <ShoppingBag className="w-10 h-10 text-muted-ink/40" />
        </div>
        <h1 className="text-2xl font-black text-ink mb-2">عربة التسوق فارغة حالياً</h1>
        <p className="text-sm text-muted-ink max-w-sm mb-6">
          تصفح باقات 4 Muscle واختر العرض الأنسب لك للاستمتاع بحلاوة السكر دون أي سعرات.
        </p>
        <Link
          href="/products/4-muscle"
          className="bg-brand-green hover:bg-brand-green-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all"
        >
          تصفح العروض والباقات
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-cream-soft/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-ink">عربة التسوق</h1>
          <p className="text-sm text-muted-ink mt-1">
            راجع مشترياتك قبل إتمام الطلب والدفع عند الاستلام.
          </p>
        </div>

        {/* Free shipping bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-line shadow-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-ink mb-2">
            <span className="flex items-center gap-2 text-brand-green-dark">
              <Truck className="w-4 h-4 text-brand-green" />
              {bottlesNeeded === 0
                ? "تهانينا! طلبيتك مؤهلة للشحن المجاني بالكامل 🎉"
                : `أضف ${bottlesNeeded} عبوة إضافية للحصول على شحن مجاني لكافة المحافظات`}
            </span>
            <span>{totalBottles} / {BRAND.freeShippingThresholdBottles} عبوة</span>
          </div>
          <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-green h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (totalBottles / BRAND.freeShippingThresholdBottles) * 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items list */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-line shadow-xs space-y-4">
            <div className="divide-y divide-line">
              {items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-16 h-16 rounded-xl bg-cream-soft border border-line shrink-0 overflow-hidden p-1 flex items-center justify-center">
                      <Image
                        src={BRAND.productImage}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-ink">{item.name}</h3>
                      {item.badge && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md inline-block mt-0.5">
                          {item.badge}
                        </span>
                      )}
                      <p className="text-xs text-muted-ink mt-1 font-sans">
                        سعر الباقة: {item.unitPrice} {BRAND.currency}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center border border-line rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-sage-wash text-ink transition-colors"
                        aria-label="تقليل"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold font-sans">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-sage-wash text-ink transition-colors"
                        aria-label="زيادة"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <span className="text-base font-bold text-ink font-sans min-w-[80px] text-left">
                      {item.totalPrice} {BRAND.currency}
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-ink hover:text-status-danger transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-line shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-ink border-b border-line pb-3">ملخص الطلب</h3>

            {/* Coupon field */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  كوبون: {appliedCoupon} (-{discount} {BRAND.currency})
                </span>
                <button onClick={removeCoupon} className="text-rose-600 hover:underline font-bold">
                  إلغاء
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="كود الخصم (مثال: MUSCLE10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 border border-line rounded-xl focus:outline-none focus:border-brand-green uppercase font-sans"
                  />
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput.trim()}
                    className="px-4 py-2.5 bg-ink text-white text-xs font-bold rounded-xl hover:bg-ink/90 disabled:opacity-50"
                  >
                    {isApplying ? "..." : "تطبيق"}
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-status-danger">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-600 font-bold">{couponSuccess}</p>}
              </form>
            )}

            {/* Price lines */}
            <div className="space-y-3 text-sm text-muted-ink border-t border-line/60 pt-4">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-ink font-sans">{subtotal} {BRAND.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span className="font-bold text-ink font-sans">
                  {shippingFee === 0 ? <span className="text-emerald-700">مجاني</span> : `${shippingFee} ${BRAND.currency}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>الخصم</span>
                  <span className="font-sans">-{discount} {BRAND.currency}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-ink pt-3 border-t border-line">
                <span>الإجمالي</span>
                <span className="text-brand-green-dark font-sans">{total} {BRAND.currency}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-4 rounded-2xl shadow-md transition-all active:scale-98 text-base"
            >
              <span>متابعة إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-ink">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>الدفع عند الاستلام مع ضمان المعاينة</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
