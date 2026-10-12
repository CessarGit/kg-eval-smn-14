import { apiClient } from '@/lib/api-client';
import { Order } from '@/types/orders';

export const OrdersService = {
  // GET /api/orders (Protegido)
  async getAll(): Promise<Order[]> {
    const response = await apiClient<Order[]>('/orders', {
      requiresAuth: true,
      cache: 'no-store',
    });

    return response.data || [];
  },

  // GET /api/orders/{id} (Protegido)
  async getById(id: string | number): Promise<Order | null> {
    const { data } = await apiClient<Order>(`/orders/${id}`, {
      requiresAuth: true,
      cache: 'no-store',
    });
    return data;
  },

  // POST /api/orders (Protegido)
  async create(orderData: Partial<Order>): Promise<Order> {
    const { data, ok, errorData } = await apiClient<Order>('/orders', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(orderData),
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al procesar la orden');
    }
    return data!;
  },
};