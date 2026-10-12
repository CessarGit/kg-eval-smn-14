import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/product';

export const ProductsService = {
  // GET /api/products (Público)
  async getAll(): Promise<Product[]> {
    const { data } = await apiClient<Product[]>('/products', {
      next: { tags: ['products'] },
    });
    return data || [];
  },

  // GET /api/products/{id} (Público)
  async getById(id: string | number): Promise<Product | null> {
    const { data } = await apiClient<Product>(`/products/${id}`, {
      next: { tags: [`product-${id}`] },
    });
    return data;
  },

  // POST /api/products (Protegido)
  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const { data, ok, errorData } = await apiClient<Product>('/products', {
      method: 'POST',
      requiresAuth: true,
      body: JSON.stringify(productData),
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al crear el producto');
    }
    return data!;
  },

  // PUT /api/products/{id} (Protegido)
  async update(id: string | number, productData: Partial<Product>): Promise<Product> {
    const { data, ok, errorData } = await apiClient<Product>(`/products/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(productData),
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al actualizar el producto');
    }
    return data!;
  },

  // DELETE /api/products/{id} (Protegido)
  async delete(id: string | number): Promise<boolean> {
    const { ok, errorData } = await apiClient(`/products/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al eliminar el producto');
    }
    return true;
  },
};