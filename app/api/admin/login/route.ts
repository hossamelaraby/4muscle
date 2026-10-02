import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "admin4muscle2026";

    if (password === correctPassword) {
      cookies().set("admin_session", "authenticated_4muscle_admin", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return NextResponse.json({ success: true, message: "تم تسجيل الدخول بنجاح" });
    }

    return NextResponse.json(
      { success: false, message: "كلمة المرور غير صحيحة" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء تسجيل الدخول" },
      { status: 500 }
    );
  }
}
