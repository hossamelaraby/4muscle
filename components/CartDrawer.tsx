"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { BRAND } from "@/lib/brand";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
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

  if (!isOpen) return null;

  const bottlesNeededForFreeShipping = Math.max(
    0,
    BRAND.freeShippingThresholdBottles - totalBottles
  );

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 pr-10 sm:pr-0">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-5 border-b border-line flex items-center justify-between bg-cream-soft">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-brand-green/10 text-brand-green rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-ink">سلة التسوق</h2>
              <span className="text-xs bg-brand-green text-white font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-muted-ink hover:text-ink rounded-lg hover:bg-white transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-sage-wash/80 px-5 py-3 border-b border-line text-xs">
            <div className="flex items-center justify-between mb-1.5 font-semibold">
              <span className="flex items-center gap-1.5 text-brand-green-dark">
                <Truck className="w-4 h-4" />
                {bottlesNeededForFreeShipping === 0
                  ? "تهانينا! حصلت على شحن مجاني بالكامل 🎉"
                  : `أضف ${bottlesNeededForFreeShipping} عبوة إضافية للحصول على شحن مجاني`}
              </span>
              <span className="font-bold text-ink">
                {totalBottles} / {BRAND.freeShippingThresholdBottles} عبوات
              </span>
            </div>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-line">
              <div
                className="bg-brand-green h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    (totalBottles / BRAND.freeShippingThresholdBottles) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Drawer Items Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-sage-wash flex items-center justify-center text-muted-ink">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <p className="text-base font-bold text-ink">سلة مشترياتك فارغة حالياً</p>
                <p className="text-sm text-muted-ink max-w-xs mx-auto">
                  اختر الباقة المناسبة لك واستمتع ببديل السكر الصحي مع أفضل عروض التوفير.
                </p>
                <Link
                  href="/products/4-muscle"
                  onClick={closeCart}
                  className="inline-block bg-brand-green text-white font-bold px-6 py-2.5 rounded-xl hover:bg-brand-green-dark transition-colors text-sm"
                >
                  تسوق الآن
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-line bg-cream-soft/40 hover:border-brand-green/30 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-xl bg-white border border-line shrink-0 overflow-hidden p-1 flex items-center justify-center">
                    <Image
                      src={BRAND.productImage}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="object-contain max-h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-ink truncate">{item.name}</h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-ink hover:text-status-danger p-1 transition-colors"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.badge && (
                      <span className="inline-block text-[10px] font-bold text-brand-green-dark bg-brand-green/10 px-2 py-0.5 rounded-md mt-0.5">
                        {item.badge}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-bold text-sm text-ink font-sans">
                        {item.totalPrice} {BRAND.currency}
                      </span>
                      <div className="flex items-center border border-line rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-sage-wash text-ink transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-ink min-w-[24px] text-center font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-sage-wash text-ink transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with coupon & checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-line bg-cream-soft space-y-4">
              {/* Coupon section */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    كوبون مفعل: {appliedCoupon} (-{discount} {BRAND.currency})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-bold"
                  >
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
                      className="flex-1 text-xs px-3 py-2 border border-line rounded-xl focus:outline-none focus:border-brand-green bg-white uppercase font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isApplying || !couponInput.trim()}
                      className="px-3.5 py-2 bg-ink text-white text-xs font-bold rounded-xl hover:bg-ink/90 disabled:opacity-50 transition-colors"
                    >
                      {isApplying ? "..." : "تطبيق"}
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-status-danger">{couponError}</p>}
                  {couponSuccess && <p className="text-[11px] text-emerald-600 font-bold">{couponSuccess}</p>}
                </form>
              )}

              {/* Price summary */}
              <div className="space-y-2 text-xs text-muted-ink pt-1">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold text-ink font-sans">
                    {subtotal} {BRAND.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>تكلفة الشحن</span>
                  <span className="font-bold text-ink font-sans">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">مجاني</span>
                    ) : (
                      `${shippingFee} ${BRAND.currency}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>قيمة الخصم</span>
                    <span className="font-sans">-{discount} {BRAND.currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-ink pt-2 border-t border-line">
                  <span>الإجمالي النهائي</span>
                  <span className="text-brand-green-dark font-sans">
                    {total} {BRAND.currency}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-98 text-base"
                >
                  <span>متابعة إتمام الطلب</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div className="flex justify-between items-center text-[11px] text-muted-ink px-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-brand-green" />
                    دفع نقداً عند الاستلام
                  </span>
                  <span>معاينة الشحنة متاحة</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
