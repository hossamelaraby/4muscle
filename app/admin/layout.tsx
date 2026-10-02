"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { BRAND } from "@/lib/brand";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-arabic">
      {/* Admin Top Navigation */}
      <header className="bg-ink text-white sticky top-0 z-40 border-b border-white/10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Admin Badge */}
            <div className="flex items-center gap-3">
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-brand-green">
                  <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="font-black text-lg font-sans tracking-wide">
                    4 <span className="text-brand-green">MUSCLE</span>
                  </span>
                  <span className="text-[10px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded mr-2 font-bold">
                    لوحة الإدارة
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                href="/admin"
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  pathname === "/admin" ? "text-brand-green" : "text-gray-300 hover:text-white"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>إدارة الطلبات</span>
              </Link>

              <Link
                href="/admin/settings"
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  pathname === "/admin/settings" ? "text-brand-green" : "text-gray-300 hover:text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>الباقات والأسعار</span>
              </Link>

              <Link
                href="/admin/coupons"
                className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
                  pathname === "/admin/coupons" ? "text-brand-green" : "text-gray-300 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>أكواد الخصم</span>
              </Link>

              <Link
                href="/"
                target="_blank"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                title="معاينة المتجر المباشر"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">معاينة المتجر</span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
