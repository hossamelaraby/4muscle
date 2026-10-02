import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "4 Muscle — Healthy Sugar Drops | قطرات التحلية الصحية",
  description:
    "4 Muscle Drops — بديل السكر الصحي الخالي من السعرات والبدون أي مرارة بعد التذوق. 400 نقطة تحلية مركزة في عبوة 20 مل تناسب مشروباتك اليومية والرياضية.",
  icons: {
    icon: "/images/brand-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-ink font-arabic antialiased selection:bg-brand-green/20 selection:text-brand-green-dark">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
