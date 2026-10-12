import { apiClient } from '@/lib/api-client';
import { User } from '@/types/user';

export const UsersService = {
  // GET /api/users
  async getAll(): Promise<User[]> {
    const { data } = await apiClient<User[]>('/users', {
      requiresAuth: true,
      cache: 'no-store',
    });
    return data || [];
  },

  // GET /api/users/{id}
  async getById(id: number | string): Promise<User | null> {
    const { data } = await apiClient<User>(`/users/${id}`, {
      requiresAuth: true,
      cache: 'no-store',
    });
    return data;
  },

  // PUT /api/users/{id}
  async update(id: number | string, userData: Partial<User>): Promise<User> {
    const { data, ok, errorData } = await apiClient<User>(`/users/${id}`, {
      method: 'PUT',
      requiresAuth: true,
      body: JSON.stringify(userData),
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al actualizar la información del cliente');
    }
    return data!;
  },

  // DELETE /api/users/{id} (SoftDelete)
  async delete(id: number | string): Promise<boolean> {
    const { ok, errorData } = await apiClient(`/users/${id}`, {
      method: 'DELETE',
      requiresAuth: true,
    });

    if (!ok) {
      throw new Error(errorData?.message || 'Error al deshabilitar el cliente');
    }
    return true;
  },
};