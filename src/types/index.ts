export interface VolumeOption {
  volume_ml: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  notes: string;
  price: number;
  volume_ml: number;
  volume_options: VolumeOption[] | null;
  category: string;
  image_url: string | null;
  featured: boolean;
  stock: number;
  rating: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume: number;
  selectedPrice: number;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  volume_ml: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  items: OrderItem[];
  total: number;
  status: string;
  created_at: string;
}
