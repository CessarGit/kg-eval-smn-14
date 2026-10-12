import { z } from 'zod';

export const processPaymentSchema = z.object({
  order_id: z.coerce.number().min(1, 'Selecciona una orden de compra válida'),
  payment_method_id: z
    .string()
    .min(1, 'El método de pago es requerido (ej. pm_card_visa)'),
});

export type ProcessPaymentInput = z.infer<typeof processPaymentSchema>;