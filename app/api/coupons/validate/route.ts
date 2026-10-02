import { NextResponse } from "next/server";

const VALID_COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; min: number; msg: string }> = {
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

    const coupon = VALID_COUPONS[cleanCode];
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "كود الخصم غير صحيح أو منتهي الصلاحية" }, { status: 400 });
    }

    if (subtotal < coupon.min) {
      return NextResponse.json(
        { valid: false, message: `الحد الأدنى لتطبيق هذا الكوبون هو ${coupon.min} ج.م` },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (coupon.type === "percentage") {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discountAmount = Math.min(coupon.value, subtotal);
    }

    return NextResponse.json({
      valid: true,
      code: cleanCode,
      discountAmount,
      message: `تم تفعيل الكوبون بنجاح! (${coupon.msg})`,
    });
  } catch (error) {
    return NextResponse.json({ valid: false, message: "حدث خطأ أثناء معالجة الكود" }, { status: 500 });
  }
}
