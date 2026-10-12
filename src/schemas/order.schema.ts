import { z } from 'zod';

export const orderItemSchema = z.object({
  product_id: z.coerce.number().min(1, 'Selecciona un producto válido'),
  quantity: z.coerce.number().min(1, 'La cantidad debe ser al menos 1'),
});

export const createOrderSchema = z.object({
  shipping_address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  items: z.array(orderItemSchema).min(1, 'Debes incluir al menos un producto'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;