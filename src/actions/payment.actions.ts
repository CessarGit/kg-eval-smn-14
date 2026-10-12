'use server';

import { revalidatePath } from 'next/cache';
import { processPaymentSchema } from '@/schemas/payment.schema';
import { PaymentsService } from '@/services/payments.service';
import { Payment } from '@/types/payments';

export interface PaymentFormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
  data?: Payment | null;
}

// 1. Procesar Pago con Stripe
export async function processPaymentAction(
  prevState: PaymentFormState | unknown,
  formData: FormData
): Promise<PaymentFormState> {
  const rawData = {
    order_id: formData.get('order_id'),
    payment_method_id: formData.get('payment_method_id') || 'pm_card_visa',
  };

  const validation = processPaymentSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Revisa los datos ingresados.',
    };
  }

  try {
    const result = await PaymentsService.create(validation.data);

    revalidatePath('/orders');
    revalidatePath('/payments');

    return {
      success: true,
      errors: {},
      message: '¡Pago procesado exitosamente con Stripe!',
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al procesar la transacción.',
    };
  }
}

// 2. Obtener Detalle de un Pago
export async function getPaymentDetailsAction(id: number | string) {
  try {
    const payment = await PaymentsService.getById(id);
    return { success: true, data: payment };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al consultar el detalle del pago.',
    };
  }
}