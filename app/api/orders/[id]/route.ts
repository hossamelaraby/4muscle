import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus, updateOrderDetails, getOrderAuditLogs } from "@/lib/db";
import { OrderStatus } from "@/lib/types";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const order = await getOrderById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "لم يتم العثور على الطلب" },
        { status: 404 }
      );
    }
    const auditLogs = await getOrderAuditLogs(order.id);
    return NextResponse.json({ success: true, order, auditLogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ في جلب بيانات الطلب" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const {
      status,
      reason,
      tracking_number,
      courier_name,
      operator = "مسؤول المتجر",
      patch,
    } = body;

    const existing = await getOrderById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "الطلب غير موجود" },
        { status: 404 }
      );
    }

    // 1. If modifying status
    if (status) {
      const updated = await updateOrderStatus(
        existing.id,
        status as OrderStatus,
        operator,
        reason,
        tracking_number,
        courier_name
      );
      return NextResponse.json({ success: true, order: updated });
    }

    // 2. If editing details (address, phone, internal notes)
    if (patch) {
      const updated = await updateOrderDetails(
        existing.id,
        patch,
        operator,
        reason || "تعديل بيانات الطلب"
      );
      return NextResponse.json({ success: true, order: updated });
    }

    return NextResponse.json(
      { success: false, message: "لا توجد تعديلات محددة" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل تحديث الطلب" },
      { status: 500 }
    );
  }
}
