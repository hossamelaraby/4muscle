"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Order, OrderStatus, ORDER_STATUS_LABELS } from "@/lib/types";
import { BRAND } from "@/lib/brand";
import {
  Package,
  TrendingUp,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [governorateFilter, setGovernorateFilter] = useState<string>("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered orders logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search === "" ||
      order.order_number.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search) ||
      order.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesGov =
      governorateFilter === "all" || order.governorate === governorateFilter;

    return matchesSearch && matchesStatus && matchesGov;
  });

  // Overview metrics calculations
  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === "new").length;
  const preparingOrders = orders.filter((o) => o.status === "preparing").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled" && o.status !== "returned")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  // Export to CSV with UTF-8 BOM for Arabic Excel
  const exportToCSV = () => {
    if (filteredOrders.length === 0) return;

    const headers = [
      "رقم الطلب",
      "تاريخ الطلب",
      "اسم العميل",
      "الهاتف",
      "المحافظة",
      "المدينة",
      "العنوان",
      "المنتجات",
      "الإجمالي (ج.م)",
      "حالة الطلب",
      "شركة الشحن",
      "رقم التتبع",
    ];

    const rows = filteredOrders.map((o) => {
      const itemsSummary = o.items
        .map((i) => `${i.name} (×${i.quantity})`)
        .join(" + ");
      const statusLabel = ORDER_STATUS_LABELS[o.status]?.label || o.status;

      return [
        `"${o.order_number}"`,
        `"${new Date(o.created_at).toLocaleString("ar-EG")}"`,
        `"${o.customer_name}"`,
        `"${o.phone}"`,
        `"${o.governorate}"`,
        `"${o.city}"`,
        `"${o.address.replace(/"/g, '""')}"`,
        `"${itemsSummary}"`,
        `"${o.total}"`,
        `"${statusLabel}"`,
        `"${o.courier_name || ""}"`,
        `"${o.tracking_number || ""}"`,
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `4muscle-orders-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            لوحة قيادة الطلبات والشحنات
          </h1>
          <p className="text-xs sm:text-sm text-muted-ink mt-0.5">
            متابعة دقيقة لكل طلب من لحظة الشراء وحتى استلام العميل وتأكيد التحصيل.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-ink bg-white border border-line rounded-xl hover:bg-slate-100 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>تحديث البيانات</span>
          </button>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير إلى Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* 6 Metrics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Orders */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-line shadow-xs">
          <div className="flex items-center justify-between text-muted-ink mb-2">
            <span className="text-xs font-bold">إجمالي الطلبات</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-ink font-sans">{totalOrders}</p>
        </div>

        {/* New Orders */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-bold">طلبات جديدة</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-800 font-sans">{newOrders}</p>
        </div>

        {/* In Preparation */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-bold">قيد التجهيز</span>
            <RefreshCw className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-800 font-sans">{preparingOrders}</p>
        </div>

        {/* Handed to Shipping */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-purple-200 bg-purple-50/20 shadow-xs">
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-xs font-bold">مع شركة الشحن</span>
            <Truck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-800 font-sans">{shippedOrders}</p>
        </div>

        {/* Delivered to Customer */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold">تم الاستلام</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-800 font-sans">{deliveredOrders}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-line shadow-xs">
          <div className="flex items-center justify-between text-muted-ink mb-2">
            <span className="text-xs font-bold">إجمالي المبيعات</span>
            <TrendingUp className="w-4 h-4 text-brand-green" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-brand-green-dark font-sans">
            {totalRevenue.toLocaleString()} <span className="text-xs font-normal">ج.م</span>
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-line shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="بحث برقم الطلب، اسم العميل، رقم الهاتف، أو المدينة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-line text-xs sm:text-sm focus:outline-none focus:border-brand-green"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-ink" />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-ink whitespace-nowrap">الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-line text-xs font-medium bg-white focus:outline-none focus:border-brand-green"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="preparing">تم التجهيز</option>
            <option value="shipped">تم التسليم لشركة الشحن</option>
            <option value="delivered">تم التسليم للعميل</option>
            <option value="cancelled">ملغي</option>
            <option value="returned">مرتجع</option>
          </select>
        </div>

        {/* Governorate filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-ink whitespace-nowrap">المحافظة:</span>
          <select
            value={governorateFilter}
            onChange={(e) => setGovernorateFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-line text-xs font-medium bg-white focus:outline-none focus:border-brand-green"
          >
            <option value="all">جميع المحافظات</option>
            {BRAND.governorates.map((g) => (
              <option key={g.name} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="bg-white rounded-3xl border border-line shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-green" />
            <p className="text-sm font-bold text-muted-ink">جاري تحميل قائمة الطلبات...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Package className="w-12 h-12 mx-auto text-muted-ink/40" />
            <p className="text-base font-bold text-ink">لم يتم العثور على أي طلبات مطابقة</p>
            <p className="text-xs text-muted-ink">جرب تغيير شروط البحث أو الفلاتر أعلاه.</p>
          </div>
        ) : (
          <>
            {/* Desktop Orders Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-line text-muted-ink font-bold">
                    <th className="py-3.5 px-4">رقم الطلب</th>
                    <th className="py-3.5 px-4">التاريخ</th>
                    <th className="py-3.5 px-4">العميل</th>
                    <th className="py-3.5 px-4">الهاتف</th>
                    <th className="py-3.5 px-4">المحافظة والمدينة</th>
                    <th className="py-3.5 px-4">الباقة والكمية</th>
                    <th className="py-3.5 px-4">الإجمالي</th>
                    <th className="py-3.5 px-4">الحالة</th>
                    <th className="py-3.5 px-4 text-center">إجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredOrders.map((order) => {
                    const statusMeta =
                      ORDER_STATUS_LABELS[order.status] || {
                        label: order.status,
                        badgeBg: "bg-gray-100 border-gray-200",
                        color: "text-gray-700",
                      };

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-ink">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-brand-green-dark hover:underline"
                          >
                            {order.order_number}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 text-muted-ink font-sans">
                          {new Date(order.created_at).toLocaleDateString("ar-EG")}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-ink">
                          {order.customer_name}
                        </td>
                        <td className="py-3.5 px-4 font-sans text-muted-ink" dir="ltr">
                          {order.phone}
                        </td>
                        <td className="py-3.5 px-4 text-ink">
                          {order.governorate} — {order.city}
                        </td>
                        <td className="py-3.5 px-4 text-muted-ink">
                          {order.items.map((it, idx) => (
                            <span key={idx} className="block truncate max-w-[180px]">
                              {it.name} (×{it.quantity})
                            </span>
                          ))}
                        </td>
                        <td className="py-3.5 px-4 font-black text-ink font-sans">
                          {order.total} ج.م
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${statusMeta.badgeBg} ${statusMeta.color}`}
                          >
                            {statusMeta.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-ink px-2.5 py-1.5 rounded-lg border border-line font-bold transition-colors shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5 text-brand-green" />
                            <span>عرض وتعديل</span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Orders Cards */}
            <div className="lg:hidden p-4 space-y-3.5 divide-y divide-line">
              {filteredOrders.map((order) => {
                const statusMeta =
                  ORDER_STATUS_LABELS[order.status] || {
                    label: order.status,
                    badgeBg: "bg-gray-100 border-gray-200",
                    color: "text-gray-700",
                  };

                return (
                  <div key={order.id} className="pt-3.5 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-bold text-sm text-brand-green-dark font-sans"
                      >
                        {order.order_number}
                      </Link>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusMeta.badgeBg} ${statusMeta.color}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs text-ink font-semibold">
                      <span>{order.customer_name}</span>
                      <span className="font-sans text-brand-green-dark font-bold">{order.total} ج.م</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-ink">
                      <span>{order.governorate} — {order.city}</span>
                      <span dir="ltr">{order.phone}</span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-ink"
                      >
                        تفاصيل وتحديث الحالة
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
