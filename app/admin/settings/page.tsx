"use client";

import React, { useState, useEffect } from "react";
import { StoreSettings } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import {
  Save,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Percent,
  Truck,
  DollarSign,
  Tag,
  RefreshCw,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>({
    id: "default",
    product_price: BRAND.price,
    compare_at_price: BRAND.compareAtPrice,
    partner_discount_percent: 15,
    free_shipping_threshold: BRAND.freeShippingThresholdBottles,
    standard_shipping_fee: BRAND.standardShippingFee,
    bundles: BRAND.bundles,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleBundleChange = (index: number, field: string, value: any) => {
    const updated = [...settings.bundles];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, bundles: updated });
  };

  const handleAddBundle = () => {
    const newId = `bundle-${Date.now()}`;
    const newBundle = {
      id: newId,
      bottles: 2,
      title: "عبوتان",
      subtitle: "توفير إضافي مميز",
      price: 450,
      compareAtPrice: 580,
      freeShipping: false,
      badge: "عرض جديد",
    };
    setSettings({ ...settings, bundles: [...settings.bundles, newBundle] });
  };

  const handleRemoveBundle = (index: number) => {
    if (settings.bundles.length <= 1) {
      alert("يجب الإبقاء على باقة واحدة على الأقل في المتجر");
      return;
    }
    const updated = settings.bundles.filter((_, i) => i !== index);
    setSettings({ ...settings, bundles: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      setSaving(false);
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "تم حفظ باقات التوفير والأسعار ونسبة الخصم بنجاح!" });
      } else {
        setMessage({ type: "error", text: data.message || "فشل حفظ الإعدادات" });
      }
    } catch (err) {
      setSaving(false);
      setMessage({ type: "error", text: "تعذر الاتصال بالخادم لحفظ الإعدادات" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <RefreshCw className="w-8 h-8 text-brand-green animate-spin mb-3" />
        <p className="text-sm font-bold text-ink">جاري تحميل إعدادات المتجر والباقات...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-brand-green" />
            <span>إدارة باقات التوفير وأسعار المنتجات</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-ink mt-1">
            تحكم كامل في أسعار العبوات، باقات الشحن المجاني، أسماء العروض، ونسبة خصم الشركاء.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-green hover:bg-brand-green-dark rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
        </button>
      </div>

      {/* Status Alert Banner */}
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

      {/* General Pricing & Discount Rates Card */}
      <div className="bg-white rounded-2xl p-6 border border-line shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-ink flex items-center gap-2 border-b border-line pb-3">
          <DollarSign className="w-5 h-5 text-brand-green" />
          <span>الأسعار الأساسية ونسب الخصم والشحن</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Product Base Price */}
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              سعر العبوة الواحدة (ج.م)
            </label>
            <input
              type="number"
              min="1"
              value={settings.product_price}
              onChange={(e) => setSettings({ ...settings, product_price: Number(e.target.value) })}
              className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
              required
            />
          </div>

          {/* Compare at Price */}
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              السعر قبل الخصم (مشطوب)
            </label>
            <input
              type="number"
              min="1"
              value={settings.compare_at_price}
              onChange={(e) => setSettings({ ...settings, compare_at_price: Number(e.target.value) })}
              className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
              required
            />
          </div>

          {/* Partner Discount Percentage */}
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5 flex items-center justify-between">
              <span>نسبة خصم الشركاء (%)</span>
              <span className="text-[10px] text-brand-green font-bold">في الشريط والترويج</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={settings.partner_discount_percent}
                onChange={(e) => setSettings({ ...settings, partner_discount_percent: Number(e.target.value) })}
                className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans pl-8"
                required
              />
              <span className="absolute left-3 top-2.5 text-sm font-bold text-muted-ink">%</span>
            </div>
          </div>

          {/* Free Shipping Bottles Threshold */}
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              حد الشحن المجاني (عدد العبوات)
            </label>
            <input
              type="number"
              min="1"
              value={settings.free_shipping_threshold}
              onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
              className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
              required
            />
          </div>
        </div>
      </div>

      {/* Bundles Customizer Section */}
      <div className="bg-white rounded-2xl p-6 border border-line shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div>
            <h2 className="text-lg font-bold text-ink flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green" />
              <span>تخصيص باقات التوفير وعروض الشحن المجاني</span>
            </h2>
            <p className="text-xs text-muted-ink mt-0.5">
              يمكنك تعديل اسم الباقة، السعر، السعر المشطوب، تفعيل الشحن المجاني، وإضافة شارة مميزة (Badge).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddBundle}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-brand-green-dark bg-brand-green/10 hover:bg-brand-green/20 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة باقة جديدة</span>
          </button>
        </div>

        <div className="space-y-4">
          {settings.bundles.map((bundle, idx) => (
            <div
              key={bundle.id || idx}
              className="p-5 rounded-2xl border-2 border-line hover:border-brand-green/40 bg-cream-soft/30 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-brand-green text-white px-2.5 py-1 rounded-md">
                  باقة رقم {idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemoveBundle(idx)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف الباقة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">اسم الباقة المعروض</label>
                  <input
                    type="text"
                    value={bundle.title}
                    onChange={(e) => handleBundleChange(idx, "title", e.target.value)}
                    placeholder="مثال: ثلاث قطع"
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">الوصف الفرعي</label>
                  <input
                    type="text"
                    value={bundle.subtitle}
                    onChange={(e) => handleBundleChange(idx, "subtitle", e.target.value)}
                    placeholder="مثال: تكفي احتياجك وتوفر عليك"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">سعر البيع (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={bundle.price}
                    onChange={(e) => handleBundleChange(idx, "price", Number(e.target.value))}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
                    required
                  />
                </div>

                {/* Compare At Price */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">السعر المشطوب (ج.م)</label>
                  <input
                    type="number"
                    min="1"
                    value={bundle.compareAtPrice}
                    onChange={(e) => handleBundleChange(idx, "compareAtPrice", Number(e.target.value))}
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-line/60">
                {/* Bottles Count */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">عدد العبوات الفعلية</label>
                  <input
                    type="number"
                    min="1"
                    value={bundle.bottles}
                    onChange={(e) => handleBundleChange(idx, "bottles", Number(e.target.value))}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none font-sans"
                    required
                  />
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">شارة الباقة (Badge)</label>
                  <input
                    type="text"
                    value={bundle.badge || ""}
                    onChange={(e) => handleBundleChange(idx, "badge", e.target.value)}
                    placeholder="مثال: الأكثر مبيعاً ⭐"
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-line focus:border-brand-green focus:outline-none text-amber-700"
                  />
                </div>

                {/* Free Shipping Checkbox */}
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id={`free-ship-${idx}`}
                    checked={bundle.freeShipping}
                    onChange={(e) => handleBundleChange(idx, "freeShipping", e.target.checked)}
                    className="w-4 h-4 text-brand-green accent-brand-green rounded"
                  />
                  <label htmlFor={`free-ship-${idx}`} className="text-xs font-bold text-ink cursor-pointer">
                    شحن مجاني لهذه الباقة
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-extrabold text-white bg-brand-green hover:bg-brand-green-dark rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? "جاري الحفظ..." : "حفظ جميع التغييرات الآن"}</span>
        </button>
      </div>
    </form>
  );
}
