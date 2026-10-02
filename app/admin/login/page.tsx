"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "كلمة المرور غير صحيحة");
      }
    } catch {
      setLoading(false);
      setError("خطأ في الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-soft via-white to-sage-wash flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-line shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-brand-green shadow-sm">
            <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-black text-ink">
            لوحة تحكم إدارية <span className="text-brand-green">4 Muscle</span>
          </h1>
          <p className="text-xs text-muted-ink">
            يرجى إدخال كلمة المرور السرية للوصول إلى إدارة الطلبات والشحنات.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-status-danger text-xs font-bold rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              كلمة مرور المسؤول (Admin PIN / Password)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                dir="ltr"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-xl border border-line focus:outline-none focus:border-brand-green text-sm font-sans"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-ink" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? "جاري التحقق..." : "تسجيل الدخول"}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-line">
          <p className="text-[11px] text-muted-ink">
            كلمة المرور الافتراضية للتطوير: <code className="bg-sage-wash px-1.5 py-0.5 rounded text-ink font-mono font-bold">admin4muscle2026</code>
          </p>
        </div>
      </div>
    </div>
  );
}
