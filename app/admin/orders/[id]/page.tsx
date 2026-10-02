"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Order, AuditLog, OrderStatus, ORDER_STATUS_LABELS } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import {
  ArrowRight,
  Printer,
  MessageCircle,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Save,
  Edit2,
  Phone,
  MapPin,
  FileText,
  ShieldAlert,
  X,
  Package,
} from "lucide-react";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit address & phone state
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editGovernorate, setEditGovernorate] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editInternalNotes, setEditInternalNotes] = useState("");

  // Modals for status transitions
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const [statusReason, setStatusReason] = useState("");
  const [courierName, setCourierName] = useState("شحن محلي سريع");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setAuditLogs(data.auditLogs || []);
        // init edit form
        setEditCustomerName(data.order.customer_name);
        setEditPhone(data.order.phone);
        setEditGovernorate(data.order.governorate);
        setEditCity(data.order.city);
        setEditAddress(data.order.address);
        setEditInternalNotes(data.order.internal_notes || "");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchOrder();
  }, [id]);

  const handleOpenStatusModal = (targetStatus: OrderStatus) => {
    setPendingStatus(targetStatus);
    setStatusReason("");
    setStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!pendingStatus || !order) return;

    // Reason required for cancel, return, or revert
    if (
      (pendingStatus === "cancelled" || pendingStatus === "returned") &&
      !statusReason.trim()
    ) {
      alert("يرجى كتابة سبب الإلغاء أو الإرجاع لتسجيله في سجل التتبع.");
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: pendingStatus,
          reason: statusReason.trim() || undefined,
          tracking_number: pendingStatus === "shipped" ? trackingNumber.trim() : undefined,
          courier_name: pendingStatus === "shipped" ? courierName.trim() : undefined,
          operator: "مسؤول المتجر",
        }),
      });
      const data = await res.json();
      setActionLoading(false);
      setStatusModalOpen(false);

      if (data.success) {
        fetchOrder();
      } else {
        alert(data.message || "فشل تحديث الحالة");
      }
    } catch {
      setActionLoading(false);
      alert("خطأ أثناء الاتصال بالخادم");
    }
  };

  const handleSaveInfoEdits = async () => {
    if (!order) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operator: "مسؤول المتجر",
          reason: "تعديل بيانات الاتصال والعنوان",
          patch: {
            customer_name: editCustomerName.trim(),
            phone: editPhone.trim(),
            governorate: editGovernorate.trim(),
            city: editCity.trim(),
            address: editAddress.trim(),
            internal_notes: editInternalNotes.trim() || undefined,
          },
        }),
      });
      const data = await res.json();
      setActionLoading(false);
      setIsEditingInfo(false);

      if (data.success) {
        fetchOrder();
      } else {
        alert(data.message || "فشل حفظ التعديلات");
      }
    } catch {
      setActionLoading(false);
      alert("خطأ أثناء الاتصال بالخادم");
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center font-bold text-muted-ink">
        جاري تحميل تفاصيل الطلب...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-xl font-bold text-ink">الطلب غير موجود</h2>
        <Link href="/admin" className="text-brand-green-dark underline font-bold">
          العودة لقائمة الطلبات
        </Link>
      </div>
    );
  }

  const statusMeta = ORDER_STATUS_LABELS[order.status] || {
    label: order.status,
    badgeBg: "bg-gray-100",
    color: "text-gray-700",
  };

  // WhatsApp shortcut message
  const prefilledWhatsappMsg = encodeURIComponent(
    `مرحباً أ/ ${order.customer_name}، نود إبلاغك بخصوص طلبك من 4 Muscle رقم (${order.order_number}) بأن الحالة الحالية هي: "${statusMeta.label}".`
  );
  const customerWhatsappUrl = `https://wa.me/2${order.phone.replace(/^0/, "")}?text=${prefilledWhatsappMsg}`;

  return (
    <div className="space-y-8">
      {/* Top Bar with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line no-print">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 bg-white rounded-xl border border-line hover:bg-slate-100 text-ink transition-colors"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5 rtl:rotate-0" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-ink font-sans">
                طلب {order.order_number}
              </h1>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${statusMeta.badgeBg} ${statusMeta.color}`}
              >
                {statusMeta.label}
              </span>
            </div>
            <p className="text-xs text-muted-ink mt-0.5">
              تاريخ التسجيل: {new Date(order.created_at).toLocaleString("ar-EG")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-line text-ink rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Printer className="w-4 h-4 text-brand-green" />
            <span>طباعة إذن الشحن (Packing Slip)</span>
          </button>

          <a
            href={customerWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>مراسلة العميل واتساب</span>
          </a>
        </div>
      </div>

      {/* Status Workflow Action Buttons (Section 10 Requirement) */}
      <div className="bg-white p-5 rounded-3xl border border-line shadow-xs space-y-3 no-print">
        <h3 className="text-xs font-bold text-muted-ink uppercase tracking-wider">
          إجراءات مسار حالة الطلب (Order Workflow Actions):
        </h3>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {order.status === "new" && (
            <button
              onClick={() => handleOpenStatusModal("preparing")}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              ✓ بدء التجهيز (تم التجهيز)
            </button>
          )}

          {(order.status === "new" || order.status === "preparing") && (
            <button
              onClick={() => handleOpenStatusModal("shipped")}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>تسليم لشركة الشحن وإدخال البوليصة</span>
            </button>
          )}

          {order.status === "shipped" && (
            <button
              onClick={() => handleOpenStatusModal("delivered")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>تأكيد الاستليم من العميل والتحصيل</span>
            </button>
          )}

          {order.status !== "cancelled" && order.status !== "delivered" && (
            <button
              onClick={() => handleOpenStatusModal("cancelled")}
              className="px-4 py-2 bg-rose-50 text-status-danger border border-rose-200 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors"
            >
              إلغاء الطلب (يتطلب سبباً)
            </button>
          )}

          {order.status === "shipped" && (
            <button
              onClick={() => handleOpenStatusModal("returned")}
              className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-xl text-xs font-bold transition-colors"
            >
              تسجيل كمرتجع (يتطلب سبباً)
            </button>
          )}

          {/* Revert status action */}
          {(order.status === "shipped" || order.status === "delivered" || order.status === "preparing") && (
            <button
              onClick={() => handleOpenStatusModal("new")}
              className="px-3 py-2 text-xs text-muted-ink hover:text-ink underline"
            >
              إعادة الطلب إلى "جديد"
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Customer Details & Items Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Customer Information Card (Editable) */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-line shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-green" />
              <span>بيانات العميل والشحن</span>
            </h3>

            {!isEditingInfo ? (
              <button
                onClick={() => setIsEditingInfo(true)}
                className="text-xs text-brand-green-dark hover:underline font-bold flex items-center gap-1 no-print"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>تعديل العنوان / الهاتف</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={handleSaveInfoEdits}
                  disabled={actionLoading}
                  className="px-3 py-1 bg-brand-green text-white text-xs font-bold rounded-lg hover:bg-brand-green-dark"
                >
                  حفظ
                </button>
                <button
                  onClick={() => setIsEditingInfo(false)}
                  className="px-3 py-1 bg-slate-100 text-ink text-xs font-bold rounded-lg"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>

          {!isEditingInfo ? (
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted-ink">اسم العميل:</span>
                <span className="font-bold text-ink">{order.customer_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted-ink">رقم الهاتف الأساسي:</span>
                <span className="font-bold text-ink font-sans" dir="ltr">{order.phone}</span>
              </div>
              {order.secondary_phone && (
                <div className="flex justify-between py-1 border-b border-line/60">
                  <span className="text-muted-ink">هاتف إضافي:</span>
                  <span className="font-bold text-ink font-sans" dir="ltr">{order.secondary_phone}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted-ink">المحافظة:</span>
                <span className="font-bold text-ink">{order.governorate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-line/60">
                <span className="text-muted-ink">المدينة / الحي:</span>
                <span className="font-bold text-ink">{order.city}</span>
              </div>
              <div className="py-1">
                <span className="text-muted-ink block mb-1">العنوان التفصيلي:</span>
                <p className="font-bold text-ink bg-slate-50 p-2.5 rounded-xl border border-line">
                  {order.address}
                </p>
              </div>
              {order.notes && (
                <div className="py-1">
                  <span className="text-muted-ink block mb-1">ملاحظات العميل:</span>
                  <p className="text-xs text-ink bg-amber-50/50 p-2.5 rounded-xl border border-amber-200">
                    {order.notes}
                  </p>
                </div>
              )}
              {order.internal_notes && (
                <div className="py-1">
                  <span className="text-brand-gold-dark font-bold block mb-1">ملاحظات الإدارة الداخلية:</span>
                  <p className="text-xs text-ink bg-amber-50 p-2.5 rounded-xl border border-amber-300">
                    {order.internal_notes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-ink mb-1">اسم العميل</label>
                <input
                  type="text"
                  value={editCustomerName}
                  onChange={(e) => setEditCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-line"
                />
              </div>
              <div>
                <label className="block font-bold text-ink mb-1">الهاتف</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-line font-sans text-right"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-ink mb-1">المحافظة</label>
                  <select
                    value={editGovernorate}
                    onChange={(e) => setEditGovernorate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-line bg-white"
                  >
                    {BRAND.governorates.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-ink mb-1">المدينة</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-line"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-ink mb-1">العنوان التفصيلي</label>
                <textarea
                  rows={2}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-line"
                />
              </div>
              <div>
                <label className="block font-bold text-ink mb-1">ملاحظات إدارية داخلية</label>
                <input
                  type="text"
                  placeholder="ملاحظات سرية لفريق العمل..."
                  value={editInternalNotes}
                  onChange={(e) => setEditInternalNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-line"
                />
              </div>
            </div>
          )}
        </div>

        {/* Items & Payment Summary Card */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-line shadow-xs space-y-6">
          <h3 className="text-base font-bold text-ink flex items-center gap-2 pb-4 border-b border-line">
            <Package className="w-4 h-4 text-brand-green" />
            <span>المنتجات والمبالغ المالية</span>
          </h3>

          <div className="divide-y divide-line">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-ink">{item.name}</p>
                  <p className="text-muted-ink text-[11px] font-sans">
                    الكمية: {item.quantity} × {item.unitPrice} ج.م
                  </p>
                </div>
                <span className="font-bold text-ink font-sans">{item.totalPrice} ج.م</span>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-muted-ink border-t border-line pt-4">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-bold text-ink font-sans">{order.subtotal} ج.م</span>
            </div>
            <div className="flex justify-between">
              <span>تكلفة الشحن:</span>
              <span className="font-bold text-ink font-sans">
                {order.shipping_fee === 0 ? "مجاني" : `${order.shipping_fee} ج.م`}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>خصم الكوبون ({order.coupon_code}):</span>
                <span className="font-sans">-{order.discount} ج.م</span>
              </div>
            )}
            <div className="flex justify-between text-base font-black text-ink pt-3 border-t border-line">
              <span>الإجمالي المطلوب تحصيله:</span>
              <span className="text-brand-green-dark font-sans">{order.total} ج.م</span>
            </div>
          </div>

          {/* Shipping & Courier details if set */}
          {order.tracking_number && (
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 space-y-1">
              <span className="font-bold block">بيانات بوليصة الشحن:</span>
              <div className="flex justify-between">
                <span>شركة الشحن:</span>
                <span className="font-bold">{order.courier_name || "محلي"}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span>رقم التتبع:</span>
                <span className="font-bold">{order.tracking_number}</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Audit Log / Timeline Component (Section 6 & 10 Requirement) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-line shadow-xs space-y-4 no-print">
        <div className="flex items-center gap-2 pb-3 border-b border-line">
          <Clock className="w-5 h-5 text-brand-green" />
          <h3 className="text-base font-bold text-ink">سجل تتبع الحالات والتعديلات (Audit Trail)</h3>
        </div>

        <div className="space-y-3 pt-2">
          {auditLogs.length === 0 ? (
            <p className="text-xs text-muted-ink">لا توجد سجلات بعد.</p>
          ) : (
            auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-50 border border-line flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-ink">
                    <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                    <span>
                      {log.action === "order_created"
                        ? "إنشاء الطلب"
                        : log.action === "status_change"
                        ? `تغيير الحالة: من "${ORDER_STATUS_LABELS[log.from_status || "new"]?.label}" إلى "${ORDER_STATUS_LABELS[log.to_status || "new"]?.label}"`
                        : "تعديل بيانات الطلب"}
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      بواسطة: {log.operator}
                    </span>
                  </div>
                  {log.reason && (
                    <p className="text-muted-ink mt-1 pr-4">السبب: {log.reason}</p>
                  )}
                  {log.details && (
                    <p className="text-muted-ink pr-4">{log.details}</p>
                  )}
                </div>

                <span className="text-[11px] text-muted-ink font-sans whitespace-nowrap" dir="ltr">
                  {new Date(log.created_at).toLocaleString("ar-EG")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status Transition Dialog Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-line shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h4 className="text-base font-bold text-ink">
                تأكيد تغيير حالة الطلب
              </h4>
              <button
                onClick={() => setStatusModalOpen(false)}
                className="p-1 text-muted-ink hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-muted-ink">
              هل أنت متأكد من تغيير حالة الطلب إلى:{" "}
              <strong className="text-brand-green-dark">
                "{ORDER_STATUS_LABELS[pendingStatus || "new"]?.label}"
              </strong>
              ؟
            </p>

            {/* If shipped, collect tracking number and courier */}
            {pendingStatus === "shipped" && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="block font-bold text-ink mb-1">اسم شركة الشحن</label>
                  <input
                    type="text"
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    placeholder="مثال: أرامكس، بوسطة، مندوب داخلي..."
                    className="w-full p-2.5 rounded-xl border border-line"
                  />
                </div>
                <div>
                  <label className="block font-bold text-ink mb-1">رقم بوليصة الشحن / التتبع</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="رقم البوليصة..."
                    className="w-full p-2.5 rounded-xl border border-line font-mono"
                  />
                </div>
              </div>
            )}

            {/* If cancelled or returned, require reason */}
            {(pendingStatus === "cancelled" || pendingStatus === "returned" || pendingStatus === "new") && (
              <div className="space-y-1.5 pt-2 text-xs">
                <label className="block font-bold text-ink">
                  سبب تغيير الحالة <span className="text-status-danger">*</span>
                </label>
                <textarea
                  rows={2}
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  placeholder="مثال: العميل طلب الإلغاء، تعذر الوصول، تأجيل موعد الاستلام..."
                  className="w-full p-2.5 rounded-xl border border-line text-xs"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-ink text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirmStatusChange}
                disabled={actionLoading}
                className="px-5 py-2 bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold rounded-xl"
              >
                {actionLoading ? "جاري التحديث..." : "تأكيد وتحديث الحالة"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Packing Slip Component (Visible only when window.print() is executed) */}
      <div className="hidden print-only p-8 text-black bg-white">
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black font-sans">4 MUSCLE DROPS</h1>
            <p className="text-sm">إذن تسليم وشحن طلبيات (Packing Slip)</p>
          </div>
          <div className="text-left font-mono">
            <p className="text-lg font-bold">#{order.order_number}</p>
            <p className="text-xs">{new Date(order.created_at).toLocaleDateString("ar-EG")}</p>
          </div>
        </div>

        <div className="mb-6 space-y-1 text-sm">
          <p><strong>العميل:</strong> {order.customer_name}</p>
          <p><strong>الهاتف:</strong> {order.phone}</p>
          <p><strong>العنوان:</strong> {order.governorate} — {order.city}، {order.address}</p>
          {order.notes && <p><strong>ملاحظات:</strong> {order.notes}</p>}
        </div>

        <table className="w-full border-collapse border border-black text-sm mb-6">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              <th className="p-2 border-r border-black text-right">المنتج / الباقة</th>
              <th className="p-2 border-r border-black text-center">الكمية</th>
              <th className="p-2 text-left">السعر</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it, idx) => (
              <tr key={idx} className="border-b border-black">
                <td className="p-2 border-r border-black">{it.name}</td>
                <td className="p-2 border-r border-black text-center">{it.quantity}</td>
                <td className="p-2 text-left">{it.totalPrice} ج.م</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-left text-base font-bold space-y-1">
          <p>المجموع: {order.subtotal} ج.م</p>
          <p>الشحن: {order.shipping_fee} ج.م</p>
          <p className="text-lg">المبلغ المطلوب تحصيله نقداً: {order.total} ج.م</p>
        </div>
      </div>

    </div>
  );
}
