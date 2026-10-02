"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Order } from "@/lib/types";
import {
  CheckCircle,
  Truck,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderNumber = searchParams.get("orderNumber");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrder(data.order);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const whatsappMessage = encodeURIComponent(
    `مرحباً فريق 4 Muscle، أود الاستفسار ومتابعة حالة طلبي رقم: ${orderNumber || orderId || ""}`
  );
  const trackWhatsappUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="py-14 bg-cream-soft/40 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-sm text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div>
            <span className="text-xs font-bold text-brand-green-dark bg-brand-green/10 px-3 py-1 rounded-full uppercase">
              تم تسجيل طلبك بنجاح 🎉
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-ink mt-3">
              شكراً لثقتك في 4 Muscle!
            </h1>
            <p className="text-sm text-muted-ink mt-2">
              رقم الطلب الخاص بك:{" "}
              <span className="font-black text-ink font-sans text-base bg-sage-wash px-2.5 py-1 rounded-md border border-line">
                {orderNumber || orderId || "4M-ORD-SUCCESS"}
              </span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sage-wash/60 border border-brand-green/20 text-xs sm:text-sm text-ink/80 text-right space-y-1.5">
            <p className="font-bold flex items-center gap-1.5 text-brand-green-dark">
              <Clock className="w-4 h-4" />
              <span>الخطوة القادمة:</span>
            </p>
            <p className="text-muted-ink">
              سيقوم فريق خدمة العملاء بالتواصل معك هاتفياً أو عبر واتساب لتأكيد شحن الطلب وتزويدك ببيانات المندوب.
            </p>
          </div>

          {/* Order Snapshot if loaded */}
          {order && (
            <div className="border-t border-line pt-6 text-right space-y-4">
              <h3 className="text-sm font-bold text-ink">تفاصيل الشحنة:</h3>
              <div className="bg-cream-soft rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-ink">الاسم:</span>
                  <span className="font-bold text-ink">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-ink">الهاتف:</span>
                  <span className="font-bold text-ink font-sans" dir="ltr">{order.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-ink">العنوان:</span>
                  <span className="font-bold text-ink">{order.governorate} — {order.city}، {order.address}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-line/60">
                  <span className="text-muted-ink">الإجمالي المستحق عند الاستلام:</span>
                  <span className="font-black text-brand-green-dark text-sm font-sans">{order.total} {BRAND.currency}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-line">
            <a
              href={trackWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>متابعة الطلب عبر واتساب</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cream-soft hover:bg-sage-wash text-ink font-bold text-sm px-6 py-3.5 rounded-xl border border-line transition-colors"
            >
              <span>العودة للرئيسية</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          <div className="text-[11px] text-muted-ink flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
            <span>يمكنك دائماً مراجعة الشحنة والتأكد منها عند وصول مندوب التوصيل</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">جاري تحميل تأكيد الطلب...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
