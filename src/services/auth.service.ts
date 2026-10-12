import { apiClient } from '@/lib/api-client';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export const AuthService = {
  async getProfile(): Promise<UserProfile | null> {
    const { data } = await apiClient<UserProfile>('/auth/profile', {
      requiresAuth: true,
      next: { tags: ['user-profile'] },
    });
    return data;
  },
};