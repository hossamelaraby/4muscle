import { NextResponse } from "next/server";
import { getAllCoupons, saveCoupon } from "@/lib/db";

export async function GET() {
  try {
    const coupons = await getAllCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل تحميل الكوبونات" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, discount_type, discount_value, min_order_value, is_active } = body;

    if (!code || !discount_value) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال كود الخصم وقيمة الخصم" },
        { status: 400 }
      );
    }

    const saved = await saveCoupon({
      code: code.trim().toUpperCase(),
      discount_type: discount_type || "percentage",
      discount_value: Number(discount_value),
      min_order_value: Number(min_order_value) || 0,
      is_active: is_active !== undefined ? Boolean(is_active) : true,
    });

    return NextResponse.json({ success: true, coupon: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل حفظ الكوبون" },
      { status: 500 }
    );
  }
}
