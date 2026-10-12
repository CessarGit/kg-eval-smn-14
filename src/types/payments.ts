export interface Payment {
  id?: number;
  order_id: number;
  payment_method_id?: string;
  stripe_payment_id?: string;
  stripe_payment_intent?: string;
  amount?: number | string;
  total_paid?: number | string;
  currency?: string;
  status?: string;
  payment_method?: string;
  created_at?: string;
  updated_at?: string;
}