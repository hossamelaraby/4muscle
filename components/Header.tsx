"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Menu, X, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتج", href: "/products/4-muscle" },
    { name: "قصتنا", href: "/our-story" },
    { name: "الأسئلة الشائعة", href: "/faq" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-line"
            : "bg-white py-4 border-b border-line/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-brand-green/30 shadow-sm group-hover:border-brand-green transition-colors">
                  <Image
                    src={BRAND.logo}
                    alt={BRAND.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-ink flex items-center gap-1 font-sans">
                    4 <span className="text-brand-green">MUSCLE</span>
                  </span>
                  <span className="text-[10px] text-muted-ink -mt-1 font-semibold tracking-wider">
                    HEALTHY SUGAR DROPS
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="القائمة الرئيسية">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                      isActive
                        ? "text-brand-green-dark font-bold"
                        : "text-ink hover:text-brand-green"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Admin icon, Cart & Main CTA */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/admin"
                className="hidden lg:flex items-center gap-1 text-xs text-ink/70 hover:text-ink px-2.5 py-1.5 rounded-lg border border-line hover:border-ink/20 transition-colors"
                title="لوحة الإدارة"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                <span>الإدارة</span>
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2.5 text-ink hover:text-brand-green rounded-full hover:bg-sage-wash transition-colors"
                aria-label="عرض عربة التسوق"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-green text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Primary CTA */}
              <Link
                href="/products/4-muscle"
                className="hidden sm:inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                {BRAND.copy.primaryCta}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-ink hover:text-brand-green"
                aria-label="فتح القائمة"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-ink/40 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white shadow-xl p-6 flex flex-col justify-between z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-line">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image src={BRAND.logo} alt={BRAND.name} fill className="object-cover" />
                  </div>
                  <span className="font-bold text-lg text-ink font-sans">
                    4 <span className="text-brand-green">MUSCLE</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-ink/70 hover:text-ink"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-bold text-ink hover:text-brand-green py-2 border-b border-line/40 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-muted-ink hover:text-brand-green py-2 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>لوحة تحكم الإدارة</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-line space-y-3">
              <Link
                href="/products/4-muscle"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white font-bold text-base py-3 rounded-xl shadow-sm text-center"
              >
                {BRAND.copy.primaryCta}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full inline-flex items-center justify-center border border-line hover:bg-sage-wash text-ink font-bold text-sm py-2.5 rounded-xl text-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>عربة التسوق ({totalItems})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
