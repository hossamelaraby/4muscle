"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BRAND } from "./brand";
import { OrderItem } from "./types";

interface CartContextType {
  items: OrderItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<OrderItem, "totalPrice">) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalBottles: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string; discount?: number }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("4muscle_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("4muscle_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<OrderItem, "totalPrice">) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + item.quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: updatedQty,
          totalPrice: updatedQty * next[existingIndex].unitPrice,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            ...item,
            totalPrice: item.quantity * item.unitPrice,
          },
        ];
      }
    });
    setIsOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: nextQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as OrderItem[];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    try {
      localStorage.removeItem("4muscle_cart");
    } catch {}
  };

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalBottles = items.reduce((acc, i) => acc + i.bottlesCount * i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.totalPrice, 0);

  // Free shipping rule: if total bottles >= 3, shipping is 0, else standard shipping
  const shippingFee =
    items.length === 0 || totalBottles >= BRAND.freeShippingThresholdBottles
      ? 0
      : BRAND.standardShippingFee;

  const total = Math.max(0, subtotal + shippingFee - couponDiscount);

  const applyCoupon = async (code: string) => {
    const trimmed = code.trim().toUpperCase();
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed, subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setAppliedCoupon(trimmed);
        setCouponDiscount(data.discountAmount);
        return { success: true, message: data.message, discount: data.discountAmount };
      } else {
        return { success: false, message: data.message || "كود الخصم غير صالح" };
      }
    } catch {
      // Local fallback
      if (trimmed === "MUSCLE10") {
        const disc = Math.round(subtotal * 0.1);
        setAppliedCoupon(trimmed);
        setCouponDiscount(disc);
        return { success: true, message: "تم تطبيق خصم 10% بنجاح", discount: disc };
      }
      return { success: false, message: "تعذر التحقق من كود الخصم حالياً" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  return (
    <CartContext.Provider
      value
      ={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalBottles,
        subtotal,
        shippingFee,
        discount: couponDiscount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
