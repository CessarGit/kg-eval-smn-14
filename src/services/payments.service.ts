import { apiClient } from '@/lib/api-client';
import { Payment } from '@/types/payments';

export const PaymentsService = {
  // GET /api/payments/{id} (Protegido)
  async getById(id: string | number): Promise<Payment | null> {
    const { data } = await apiClient<Payment>(`/payments/${id}`, {
      requiresAuth: true,
      cache: 'no-store',
    });
    return data;
  },

  // POST /api/payments (Protegido - Procesar Pago en Stripe)
  async create(paymentData: Partial<Payment>): Promise<Payment> {
    const { data, ok, errorData } = await apiClient<Payment>('/payments', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(paymentData),
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al procesar el pago con Stripe');
    }

    return data!;
  },
};