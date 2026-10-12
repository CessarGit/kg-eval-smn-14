'use server';

import { revalidatePath } from 'next/cache';
import { createOrderSchema } from '@/schemas/order.schema';
import { OrdersService } from '@/services/orders.service';

export interface OrderFormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}

export async function createOrderAction(
  prevState: OrderFormState | unknown,
  formData: FormData
): Promise<OrderFormState> {
  const rawItems = formData.get('items') as string;
  let items = [];

  try {
    items = rawItems ? JSON.parse(rawItems) : [];
  } catch {
    items = [];
  }

  const rawData = {
    shipping_address: formData.get('shipping_address'),
    items,
  };

  const validation = createOrderSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Revisa los campos del formulario.',
    };
  }

  try {
    await OrdersService.create(validation.data);
    revalidatePath('/orders');

    return {
      success: true,
      errors: {},
      message: 'Orden de compra registrada exitosamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al procesar la orden.',
    };
  }
}