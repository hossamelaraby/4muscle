"use client";

import React, { useState, useEffect } from "react";
import { Coupon } from "@/lib/types";
import {
  Tag,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  Percent,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
} from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New coupon form
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "fixed">("percentage");
  const [newValue, setNewValue] = useState<number>(15);
  const [newMinOrder, setNewMinOrder] = useState<number>(200);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (data.success && data.coupons) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error("Failed to load coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleToggleActive = async (coupon: Coupon) => {
    const updated = { ...coupon, is_active: !coupon.is_active };
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setCoupons(coupons.map((c) => (c.code === coupon.code ? updated : c)));
      }
    } catch (err) {
      alert("فشل تحديث حالة الكوبون");
    }
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    setSaving(true);
    setMessage(null);

    const payload = {
      code: newCode.trim().toUpperCase(),
      discount_type: newType,
      discount_value: Number(newValue),
      min_order_value: Number(newMinOrder),
      is_active: true,
    };

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setSaving(false);

      if (res.ok && data.success) {
        setMessage({ type: "success", text: `تم إنشاء كود الخصم (${payload.code}) بنجاح!` });
        setNewCode("");
        setNewValue(15);
        setNewMinOrder(200);
        fetchCoupons();
      } else {
        setMessage({ type: "error", text: data.message || "فشل إضافة الكوبون" });
      }
    } catch (err) {
      setSaving(false);
      setMessage({ type: "error", text: "تعذر الاتصال بالخادم" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <RefreshCw className="w-8 h-8 text-brand-green animate-spin mb-3" />
        <p className="text-sm font-bold text-ink">جاري تحميل أكواد الخصم...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink flex items-center gap-2">
            <Tag className="w-7 h-7 text-brand-green" />
            <span>إدارة أكواد الخصم الترويجية (Coupons)</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-ink mt-1">
            أنشئ أكواد خصم للشركاء والمؤثرين وتحكم في نسبة الخصم أو الخصم الثابت بالجنيه.
          </p>
        </div>

        <button
          onClick={fetchCoupons}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-ink bg-white border border-line rounded-xl hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>تحديث القائمة</span>
        </button>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-bold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add New Coupon Form Card */}
      <form onSubmit={handleAddCoupon} className="bg-white rounded-2xl p-6 border border-line shadow-xs space-y-4">
        <h2 className="text-base font-bold text-ink flex items-center gap-2 border-b border-line pb-3">
          <Plus className="w-4 h-4 text-brand-green" />
          <span>إضافة كود خصم جديد</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">كود الخصم (Promo Code)</label>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="مثال: PARTNER15"
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none uppercase font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">نوع الخصم</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as "percentage" | "fixed")}
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none"
            >
              <option value="percentage">نسبة مئوية (%)</option>
              <option value="fixed">مبلغ ثابت (ج.م)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              قيمة الخصم {newType === "percentage" ? "(%)" : "(ج.م)"}
            </label>
            <input
              type="number"
              min="1"
              value={newValue}
              onChange={(e) => setNewValue(Number(e.target.value))}
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">الحد الأدنى للطلب (ج.م)</label>
            <input
              type="number"
              min="0"
              value={newMinOrder}
              onChange={(e) => setNewMinOrder(Number(e.target.value))}
              className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-green hover:bg-brand-green-dark rounded-xl shadow-xs transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "جاري الإضافة..." : "حفظ وتفعيل الكود"}</span>
          </button>
        </div>
      </form>

      {/* Existing Coupons Table */}
      <div className="bg-white rounded-2xl border border-line shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-line flex items-center justify-between">
          <h2 className="text-sm font-bold text-ink">أكواد الخصم الحالية المسجلة ({coupons.length})</h2>
          <span className="text-xs text-muted-ink">يتم التحقق منها تلقائياً في شاشة إتمام الطلب</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-100/70 text-ink/80 font-bold border-b border-line">
              <tr>
                <th className="p-3.5">الكود</th>
                <th className="p-3.5">نوع وقيمة الخصم</th>
                <th className="p-3.5">الحد الأدنى للطلب</th>
                <th className="p-3.5">الحالة</th>
                <th className="p-3.5 text-center">التحكم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-ink text-sm">
                    {coupon.code}
                  </td>
                  <td className="p-3.5 font-bold text-emerald-800">
                    {coupon.discount_type === "percentage" ? (
                      <span className="inline-flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-brand-green" />
                        <span>{coupon.discount_value}% خصم</span>
                      </span>
                    ) : (
                      <span>{coupon.discount_value} ج.م خصم فوري</span>
                    )}
                  </td>
                  <td className="p-3.5 text-muted-ink font-sans">
                    {coupon.min_order_value} ج.م
                  </td>
                  <td className="p-3.5">
                    {coupon.is_active ? (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        مفعل وشغال
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                        معطل مؤقتاً
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => handleToggleActive(coupon)}
                      className="text-xs font-bold text-ink hover:text-brand-green transition-colors px-2 py-1 rounded hover:bg-slate-100"
                    >
                      {coupon.is_active ? "تعطيل الكود" : "إعادة تفعيل"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
