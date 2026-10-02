import { NextResponse } from "next/server";
import { getAllOrders, createOrder } from "@/lib/db";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل تحميل الطلبات" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      phone,
      secondary_phone,
      governorate,
      city,
      address,
      notes,
      items,
      subtotal,
      shipping_fee,
      discount,
      total,
      coupon_code,
    } = body;

    // Server-side validation
    if (!customer_name || !phone || !governorate || !city || !address) {
      return NextResponse.json(
        { success: false, message: "يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، المحافظة، المدينة، العنوان)" },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "عربة التسوق فارغة" },
        { status: 400 }
      );
    }

    // Phone validation for Egyptian numbers
    const cleanPhone = phone.replace(/\s+/g, "").replace(/^(\+20|0020)/, "0");
    if (!/^01[0125][0-9]{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال رقم هاتف محمول مصري صحيح مكون من 11 رقماً (مثال: 010xxxxxxxx)" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customer_name: customer_name.trim(),
      phone: cleanPhone,
      secondary_phone: secondary_phone ? secondary_phone.trim() : undefined,
      governorate: governorate.trim(),
      city: city.trim(),
      address: address.trim(),
      notes: notes ? notes.trim() : undefined,
      items,
      subtotal: Number(subtotal) || 0,
      shipping_fee: Number(shipping_fee) || 0,
      discount: Number(discount) || 0,
      total: Number(total) || 0,
      coupon_code: coupon_code ? coupon_code.trim().toUpperCase() : undefined,
      payment_method: "cod",
      payment_status: "pending",
      status: "new",
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ غير متوقع أثناء تسجيل الطلب، يرجى المحاولة مرة أخرى" },
      { status: 500 }
    );
  }
}
