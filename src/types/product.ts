export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  stock: number;
  sku?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}