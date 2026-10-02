import { NextResponse } from "next/server";
import { isSupabaseConfigured, getAdminSupabase } from "@/lib/supabase";

const DEFAULT_COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; min: number; msg: string }> = {
  MUSCLE10: { type: "percentage", value: 10, min: 200, msg: "خصم 10% على طلبك" },
  FIT2026: { type: "percentage", value: 15, min: 400, msg: "خصم خاص 15% على إجمالي الطلب" },
  HEALTHY50: { type: "fixed", value: 50, min: 600, msg: "خصم فوري 50 ج.م" },
};

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();
    const cleanCode = (code || "").trim().toUpperCase();

    if (!cleanCode) {
      return NextResponse.json({ valid: false, message: "يرجى إدخال كود الخصم" }, { status: 400 });
    }

    let couponData: { type: "percentage" | "fixed"; value: number; min: number; msg: string } | null = null;

    if (isSupabaseConfigured) {
      const client = getAdminSupabase();
      if (client) {
        const { data, error } = await client
          .from("coupons")
          .select("*")
          .eq("code", cleanCode)
          .eq("is_active", true)
          .single();

        if (!error && data) {
          couponData = {
            type: data.discount_type as "percentage" | "fixed",
            value: Number(data.discount_value),
            min: Number(data.min_order_value) || 0,
            msg: data.discount_type === "percentage" ? `خصم ${data.discount_value}% على طلبك` : `خصم فوري ${data.discount_value} ج.م`,
          };
        }
      }
    }

    if (!couponData) {
      couponData = DEFAULT_COUPONS[cleanCode] || null;
    }

    if (!couponData) {
      return NextResponse.json({ valid: false, message: "كود الخصم غير صحيح أو منتهي الصلاحية" }, { status: 400 });
    }

    const orderSubtotal = Number(subtotal) || 0;
    if (orderSubtotal < couponData.min) {
      return NextResponse.json(
        { valid: false, message: `الحد الأدنى لتطبيق هذا الكوبون هو ${couponData.min} ج.م` },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (couponData.type === "percentage") {
      discountAmount = Math.round((orderSubtotal * couponData.value) / 100);
    } else {
      discountAmount = Math.min(couponData.value, orderSubtotal);
    }

    return NextResponse.json({
      valid: true,
      code: cleanCode,
      discountAmount,
      message: `تم تفعيل الكوبون بنجاح! (${couponData.msg})`,
    });
  } catch (error) {
    return NextResponse.json({ valid: false, message: "حدث خطأ أثناء معالجة الكود" }, { status: 500 });
  }
}
