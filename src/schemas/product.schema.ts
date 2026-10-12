import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  slug: z.string().min(2, 'El slug debe tener al menos 2 caracteres'),
  description: z.string().optional().nullable(),
  price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
  sku: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;