import { NextResponse } from "next/server";
import { getStoreSettings, updateStoreSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getStoreSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل تحميل إعدادات المتجر" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = await updateStoreSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "فشل حفظ إعدادات المتجر" },
      { status: 500 }
    );
  }
}
