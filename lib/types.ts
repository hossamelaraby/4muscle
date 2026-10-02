export type OrderStatus =
  | "new"          // جديد
  | "preparing"    // تم التجهيز
  | "shipped"      // تم التسليم لشركة الشحن
  | "delivered"    // تم التسليم للعميل
  | "cancelled"    // ملغي
  | "returned";    // مرتجع

export const ORDER_STATUS_LABELS: Record<OrderStatus, { label: string; color: string; badgeBg: string }> = {
  new: { label: "جديد", color: "text-blue-700", badgeBg: "bg-blue-100 border-blue-200" },
  preparing: { label: "تم التجهيز", color: "text-amber-700", badgeBg: "bg-amber-100 border-amber-200" },
  shipped: { label: "تم التسليم لشركة الشحن", color: "text-purple-700", badgeBg: "bg-purple-100 border-purple-200" },
  delivered: { label: "تم التسليم للعميل", color: "text-emerald-700", badgeBg: "bg-emerald-100 border-emerald-200" },
  cancelled: { label: "ملغي", color: "text-rose-700", badgeBg: "bg-rose-100 border-rose-200" },
  returned: { label: "مرتجع", color: "text-gray-700", badgeBg: "bg-gray-100 border-gray-200" },
};

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  bottlesCount: number;
  unitPrice: number;
  totalPrice: number;
  badge?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  secondary_phone?: string;
  governorate: string;
  city: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  coupon_code?: string;
  payment_method: string;
  payment_status: "pending" | "paid";
  status: OrderStatus;
  tracking_number?: string;
  courier_name?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  order_id: string;
  action: "status_change" | "info_edit" | "note_added" | "order_created";
  from_status?: OrderStatus;
  to_status?: OrderStatus;
  reason?: string;
  operator: string;
  details?: string;
  created_at: string;
}

export interface Coupon {
  id?: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_value: number;
  is_active: boolean;
  times_used?: number;
}

export interface StoreSettings {
  id: string;
  product_price: number;
  compare_at_price: number;
  partner_discount_percent: number;
  free_shipping_threshold: number;
  standard_shipping_fee: number;
  bundles: Array<{
    id: string;
    bottles: number;
    title: string;
    subtitle: string;
    price: number;
    compareAtPrice: number;
    freeShipping: boolean;
    extraGift?: string;
    isPopular?: boolean;
    badge?: string;
  }>;
  updated_at?: string;
}
