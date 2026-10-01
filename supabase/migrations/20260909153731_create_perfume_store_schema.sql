/*
# Create perfume store schema (single-tenant, no auth)

1. New Tables
- `products` — the perfume catalog
  - `id` (uuid, primary key)
  - `name` (text, not null) — perfume name
  - `brand` (text, not null) — brand / house
  - `description` (text, not null) — detailed description
  - `notes` (text, not null) — fragrance notes (e.g. "Bergamot, Cedar, Vanilla")
  - `price` (numeric, not null) — price in USD
  - `volume_ml` (integer, not null) — bottle size in ml
  - `category` (text, not null) — "floral", "woody", "oriental", "fresh", "unisex"
  - `image_url` (text) — product image URL
  - `featured` (boolean, default false) — show on hero / featured section
  - `stock` (integer, default 100) — available inventory
  - `rating` (numeric, default 5.0) — average rating
  - `created_at` (timestamp)
- `orders` — customer orders
  - `id` (uuid, primary key)
  - `customer_name` (text, not null)
  - `customer_email` (text, not null)
  - `shipping_address` (text, not null)
  - `items` (jsonb, not null) — array of {product_id, name, price, quantity}
  - `total` (numeric, not null) — order total
  - `status` (text, default 'pending') — order status
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables.
- Products: allow anon + authenticated to read (public catalog); only authenticated can insert/update/delete.
- Orders: allow anon + authenticated to insert (customers place orders without signing in); no read/update/delete for anon (orders are managed server-side).
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  description text NOT NULL,
  notes text NOT NULL,
  price numeric(10,2) NOT NULL,
  volume_ml integer NOT NULL,
  category text NOT NULL DEFAULT 'unisex',
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  stock integer NOT NULL DEFAULT 100,
  rating numeric(2,1) NOT NULL DEFAULT 5.0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  shipping_address text NOT NULL,
  items jsonb NOT NULL,
  total numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Products: public read
DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Products: authenticated write (admin management)
DROP POLICY IF EXISTS "auth_insert_products" ON products;
CREATE POLICY "auth_insert_products" ON products FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_products" ON products;
CREATE POLICY "auth_update_products" ON products FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_products" ON products;
CREATE POLICY "auth_delete_products" ON products FOR DELETE
  TO authenticated USING (true);

-- Orders: anyone can place an order (insert)
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Orders: only authenticated can read (admin)
DROP POLICY IF EXISTS "auth_read_orders" ON orders;
CREATE POLICY "auth_read_orders" ON orders FOR SELECT
  TO authenticated USING (true);

-- Create index for featured products lookup
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
