import { apiClient } from '@/lib/api-client';
import { User, ProfileApiResponse } from '@/types/user';

export const ProfileService = {
  // GET /api/profile (Protegido por JWT)
  async getProfile(): Promise<User | null> {
    const { data } = await apiClient<ProfileApiResponse>('/auth/profile', {
      requiresAuth: true,
      cache: 'no-store',
    });

    return data?.user || null;
  },
};