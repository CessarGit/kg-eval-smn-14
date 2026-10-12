export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  status: 'pending' | 'completed' | 'cancelled' | string;
  total_amount: number;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}