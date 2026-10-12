import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  phone: z.string().max(30, 'El teléfono no puede exceder los 30 caracteres').optional().nullable(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;