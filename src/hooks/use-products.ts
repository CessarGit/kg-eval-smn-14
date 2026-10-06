'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductsService } from '@/src/services/products.service';
import { Product } from '@/src/types/product';

export const QUERY_KEYS = {
  products: ['products'] as const,
};

// Hook de Lectura
export function useProducts() {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: () => ProductsService.getAll(),
  });
}

// Hook de Escritura con Invalidación
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => ProductsService.create(newProduct),
    onSuccess: () => {
      // Invalida la caché para forzar la actualización automática en la UI
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
    },
  });
}