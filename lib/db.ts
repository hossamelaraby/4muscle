import fs from "fs";
import path from "path";
import { Order, AuditLog, OrderStatus, StoreSettings, Coupon } from "./types";
import { getAdminSupabase, isSupabaseConfigured } from "./supabase";
import { BRAND } from "./brand";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const AUDIT_FILE = path.join(DATA_DIR, "audit_logs.json");

function ensureLocalFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    // Seed with two demo orders for initial admin preview if empty
    const initialOrders: Order[] = [
      {
        id: "ORD-1001",
        order_number: "4M-2026-1001",
        customer_name: "أحمد محمود سالم",
        phone: "01012345678",
        governorate: "القاهرة",
        city: "المعادي",
        address: "شارع 9، عمارة 42، الدور 3، شقة 6",
        notes: "برجاء الاتصال قبل الوصول",
        items: [
          {
            id: "bundle-3",
            name: "باقة 3 عبوات (4 Muscle Drops)",
            quantity: 1,
            bottlesCount: 3,
            unitPrice: 660,
            totalPrice: 660,
            badge: "الأكثر مبيعاً",
          },
        ],
        subtotal: 660,
        shipping_fee: 0,
        discount: 0,
        total: 660,
        payment_method: "cod",
        payment_status: "pending",
        status: "new",
        created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        updated_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      },
      {
        id: "ORD-1002",
        order_number: "4M-2026-1002",
        customer_name: "مريم عبد الرحمن",
        phone: "01198765432",
        governorate: "الإسكندرية",
        city: "سموحة",
        address: "شارع ألبرت الأول، برج النور، الدور 5",
        items: [
          {
            id: "bundle-6",
            name: "باقة 6 عبوات + عبوة مجانية",
            quantity: 1,
            bottlesCount: 7,
            unitPrice: 1320,
            totalPrice: 1320,
            badge: "أفضل قيمة",
          },
        ],
        subtotal: 1320,
        shipping_fee: 0,
        discount: 0,
        total: 1320,
        payment_method: "cod",
        payment_status: "pending",
        status: "preparing",
        created_at: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        updated_at: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
      },
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(initialOrders, null, 2), "utf8");
  }

  if (!fs.existsSync(AUDIT_FILE)) {
    const initialLogs: AuditLog[] = [
      {
        id: "log-1",
        order_id: "ORD-1001",
        action: "order_created",
        operator: "العميل عبر الموقع",
        details: "تم تسجيل الطلب من الموقع",
        created_at: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      },
      {
        id: "log-2",
        order_id: "ORD-1002",
        action: "status_change",
        from_status: "new",
        to_status: "preparing",
        reason: "بدء تجهيز الشحنة والتغليف",
        operator: "مدير المتجر",
        created_at: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
      },
    ];
    fs.writeFileSync(AUDIT_FILE, JSON.stringify(initialLogs, null, 2), "utf8");
  }
}

function readLocalOrders(): Order[] {
  ensureLocalFiles();
  try {
    const data = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeLocalOrders(orders: Order[]) {
  ensureLocalFiles();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

function readLocalAudit(): AuditLog[] {
  ensureLocalFiles();
  try {
    const data = fs.readFileSync(AUDIT_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeLocalAudit(logs: AuditLog[]) {
  ensureLocalFiles();
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(logs, null, 2), "utf8");
}

// -----------------------------------------------------------------------------
// PUBLIC DATABASE METHODS
// -----------------------------------------------------------------------------

export async function getAllOrders(): Promise<Order[]> {
  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data as Order[];
      }
    }
  }
  return readLocalOrders().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getOrderById(idOrNumber: string): Promise<Order | null> {
  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("orders")
        .select("*")
        .or(`id.eq.${idOrNumber},order_number.eq.${idOrNumber}`)
        .single();
      if (!error && data) {
        return data as Order;
      }
    }
  }
  const orders = readLocalOrders();
  const match = orders.find(
    (o) => o.id === idOrNumber || o.order_number === idOrNumber
  );
  return match || null;
}

export async function createOrder(
  orderData: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">
): Promise<Order> {
  const count = (await getAllOrders()).length + 1;
  const timestamp = Date.now().toString().slice(-4);
  const id = `ORD-${Date.now()}`;
  const order_number = `4M-${new Date().getFullYear()}-${1000 + count}`;
  const now = new Date().toISOString();

  const newOrder: Order = {
    ...orderData,
    id,
    order_number,
    created_at: now,
    updated_at: now,
  };

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("orders")
        .insert([newOrder])
        .select()
        .single();
      if (!error && data) {
        try {
          await logOrderAudit({
            order_id: newOrder.id,
            action: "order_created",
            operator: "العميل",
            details: `تم إنشاء الطلب برقم ${order_number}`,
          });
        } catch (auditErr) {
          console.error("Audit log error:", auditErr);
        }
        return data as Order;
      }
      if (error) {
        console.error("Supabase insert error:", error);
      }
    }
  }

  // Fallback to local file if not on read-only serverless environment
  try {
    const orders = readLocalOrders();
    orders.unshift(newOrder);
    writeLocalOrders(orders);
  } catch (err) {
    console.warn("Could not write to local orders file (serverless environment):", err);
  }

  try {
    await logOrderAudit({
      order_id: newOrder.id,
      action: "order_created",
      operator: "العميل عبر الموقع",
      details: `تم إنشاء الطلب بقيمة ${newOrder.total} ج.م`,
    });
  } catch (auditErr) {
    console.error("Audit log error:", auditErr);
  }

  return newOrder;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  operator: string,
  reason?: string,
  trackingNumber?: string,
  courierName?: string
): Promise<Order | null> {
  const current = await getOrderById(orderId);
  if (!current) return null;

  const fromStatus = current.status;
  const now = new Date().toISOString();

  const patch: Partial<Order> = {
    status: newStatus,
    updated_at: now,
  };

  if (trackingNumber !== undefined) patch.tracking_number = trackingNumber;
  if (courierName !== undefined) patch.courier_name = courierName;

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("orders")
        .update(patch)
        .eq("id", current.id)
        .select()
        .single();
      if (!error && data) {
        await logOrderAudit({
          order_id: current.id,
          action: "status_change",
          from_status: fromStatus,
          to_status: newStatus,
          reason,
          operator,
          details: trackingNumber ? `رقم التتبع: ${trackingNumber}` : undefined,
        });
        return data as Order;
      }
    }
  }

  const orders = readLocalOrders();
  const index = orders.findIndex((o) => o.id === current.id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...patch };
    writeLocalOrders(orders);

    await logOrderAudit({
      order_id: current.id,
      action: "status_change",
      from_status: fromStatus,
      to_status: newStatus,
      reason,
      operator,
      details: trackingNumber ? `شركة الشحن: ${courierName || "غير محدد"} - رقم التتبع: ${trackingNumber}` : undefined,
    });

    return orders[index];
  }

  return null;
}

export async function updateOrderDetails(
  orderId: string,
  patch: Partial<Order>,
  operator: string,
  reason?: string
): Promise<Order | null> {
  const current = await getOrderById(orderId);
  if (!current) return null;

  const now = new Date().toISOString();
  const updatedPatch = { ...patch, updated_at: now };

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("orders")
        .update(updatedPatch)
        .eq("id", current.id)
        .select()
        .single();
      if (!error && data) {
        await logOrderAudit({
          order_id: current.id,
          action: "info_edit",
          operator,
          reason,
          details: `تحديث بيانات الطلب`,
        });
        return data as Order;
      }
    }
  }

  const orders = readLocalOrders();
  const index = orders.findIndex((o) => o.id === current.id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedPatch };
    writeLocalOrders(orders);

    await logOrderAudit({
      order_id: current.id,
      action: "info_edit",
      operator,
      reason,
      details: "تعديل تفاصيل العميل أو العنوان",
    });

    return orders[index];
  }

  return null;
}

export async function logOrderAudit(
  entry: Omit<AuditLog, "id" | "created_at">
): Promise<AuditLog> {
  const now = new Date().toISOString();

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("order_audit_logs")
        .insert([{
          order_id: entry.order_id,
          action: entry.action,
          from_status: entry.from_status,
          to_status: entry.to_status,
          reason: entry.reason,
          operator: entry.operator,
          details: entry.details,
          created_at: now,
        }])
        .select()
        .single();
      if (!error && data) return data as AuditLog;
    }
  }

  const newLog: AuditLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    created_at: now,
  };

  try {
    const logs = readLocalAudit();
    logs.unshift(newLog);
    writeLocalAudit(logs);
  } catch (e) {
    // Read-only filesystem in serverless environments like Vercel
  }
  return newLog;
}

export async function getOrderAuditLogs(orderId: string): Promise<AuditLog[]> {
  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("order_audit_logs")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: false });
      if (!error && data) return data as AuditLog[];
    }
  }
  const logs = readLocalAudit();
  return logs
    .filter((l) => l.order_id === orderId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// -----------------------------------------------------------------------------
// STORE SETTINGS & BUNDLES MANAGEMENT
// -----------------------------------------------------------------------------

const SETTINGS_FILE = path.join(DATA_DIR, "store_settings.json");

export async function getStoreSettings(): Promise<StoreSettings> {
  const defaultSettings: StoreSettings = {
    id: "default",
    product_price: BRAND.price,
    compare_at_price: BRAND.compareAtPrice,
    partner_discount_percent: 15,
    free_shipping_threshold: BRAND.freeShippingThresholdBottles,
    standard_shipping_fee: BRAND.standardShippingFee,
    bundles: BRAND.bundles,
  };

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("store_settings")
        .select("*")
        .eq("id", "default")
        .single();

      if (!error && data) {
        return {
          id: data.id,
          product_price: Number(data.product_price) || defaultSettings.product_price,
          compare_at_price: Number(data.compare_at_price) || defaultSettings.compare_at_price,
          partner_discount_percent: Number(data.partner_discount_percent) || defaultSettings.partner_discount_percent,
          free_shipping_threshold: Number(data.free_shipping_threshold) || defaultSettings.free_shipping_threshold,
          standard_shipping_fee: Number(data.standard_shipping_fee) || defaultSettings.standard_shipping_fee,
          bundles: Array.isArray(data.bundles) && data.bundles.length > 0 ? data.bundles : defaultSettings.bundles,
          updated_at: data.updated_at,
        };
      } else if (error && error.code === "PGRST116") {
        // Not found, seed default row
        await client.from("store_settings").insert([defaultSettings]);
        return defaultSettings;
      }
    }
  }

  try {
    ensureLocalFiles();
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
      return { ...defaultSettings, ...data };
    }
  } catch {}

  return defaultSettings;
}

export async function updateStoreSettings(settings: Partial<StoreSettings>): Promise<StoreSettings> {
  const current = await getStoreSettings();
  const updated: StoreSettings = {
    ...current,
    ...settings,
    id: "default",
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("store_settings")
        .upsert(updated)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          product_price: Number(data.product_price),
          compare_at_price: Number(data.compare_at_price),
          partner_discount_percent: Number(data.partner_discount_percent),
          free_shipping_threshold: Number(data.free_shipping_threshold),
          standard_shipping_fee: Number(data.standard_shipping_fee),
          bundles: data.bundles,
          updated_at: data.updated_at,
        };
      }
    }
  }

  try {
    ensureLocalFiles();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf8");
  } catch {}

  return updated;
}

// -----------------------------------------------------------------------------
// COUPONS MANAGEMENT
// -----------------------------------------------------------------------------

export async function getAllCoupons(): Promise<Coupon[]> {
  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data as Coupon[];
      }
    }
  }

  return [
    { code: "MUSCLE10", discount_type: "percentage", discount_value: 10, min_order_value: 200, is_active: true },
    { code: "FIT2026", discount_type: "percentage", discount_value: 15, min_order_value: 400, is_active: true },
    { code: "HEALTHY50", discount_type: "fixed", discount_value: 50, min_order_value: 600, is_active: true },
  ];
}

export async function saveCoupon(coupon: Coupon): Promise<Coupon> {
  const cleanCode = coupon.code.trim().toUpperCase();
  const payload = {
    ...coupon,
    code: cleanCode,
  };

  if (isSupabaseConfigured) {
    const client = getAdminSupabase();
    if (client) {
      const { data, error } = await client
        .from("coupons")
        .upsert(payload, { onConflict: "code" })
        .select()
        .single();
      if (!error && data) {
        return data as Coupon;
      }
    }
  }

  return payload;
}
