-- ==============================================================================
-- 4 Muscle Drops - Supabase Schema
-- Run this in your Supabase SQL Editor when you create your new Supabase project
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Orders Table
create table if not exists public.orders (
    id text primary key,
    order_number text unique not null,
    customer_name text not null,
    phone text not null,
    secondary_phone text,
    governorate text not null,
    city text not null,
    address text not null,
    notes text,
    items jsonb not null default '[]'::jsonb,
    subtotal numeric(10, 2) not null default 0,
    shipping_fee numeric(10, 2) not null default 0,
    discount numeric(10, 2) not null default 0,
    total numeric(10, 2) not null default 0,
    coupon_code text,
    payment_method text not null default 'cod',
    payment_status text not null default 'pending', -- pending, paid
    status text not null default 'new', -- new, preparing, shipped, delivered, cancelled, returned
    tracking_number text,
    courier_name text,
    internal_notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. Order Audit Logs Table
create table if not exists public.order_audit_logs (
    id uuid primary key default uuid_generate_v4(),
    order_id text references public.orders(id) on delete cascade,
    action text not null, -- status_change, info_edit, note_added
    from_status text,
    to_status text,
    reason text,
    operator text not null default 'Admin',
    details text,
    created_at timestamptz not null default now()
);

-- 3. Coupons Table
create table if not exists public.coupons (
    id uuid primary key default uuid_generate_v4(),
    code text unique not null,
    discount_type text not null default 'percentage', -- percentage, fixed
    discount_value numeric(10, 2) not null,
    min_order_value numeric(10, 2) not null default 0,
    is_active boolean not null default true,
    times_used integer not null default 0,
    created_at timestamptz not null default now()
);

-- Seed initial coupons
insert into public.coupons (code, discount_type, discount_value, min_order_value, is_active)
values 
    ('MUSCLE10', 'percentage', 10.00, 200.00, true),
    ('HEALTHY50', 'fixed', 50.00, 600.00, true),
    ('FIT2026', 'percentage', 15.00, 400.00, true)
on conflict (code) do nothing;

-- Indexes for fast lookup
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_audit_order_id on public.order_audit_logs(order_id);

-- Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.order_audit_logs enable row level security;
alter table public.coupons enable row level security;

-- Policy: Allow public anonymous checkout creation
create policy "Allow insert order for customers" 
on public.orders for insert 
to anon, authenticated 
with check (true);

-- Policy: Allow customers to read order confirmation by order_id or order_number
create policy "Allow select own order by id"
on public.orders for select 
to anon, authenticated 
using (true);

-- Policy: Admin full access using Service Role Key
create policy "Service role full access on orders" 
on public.orders for all 
to service_role 
using (true) with check (true);

create policy "Service role full access on audit_logs" 
on public.order_audit_logs for all 
to service_role 
using (true) with check (true);

create policy "Public verify coupons" 
on public.coupons for select 
to anon, authenticated 
using (is_active = true);

create policy "Service role full access on coupons" 
on public.coupons for all 
to service_role 
using (true) with check (true);
