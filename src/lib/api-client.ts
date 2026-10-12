import { cookies } from 'next/headers';
import { API_BASE_URL } from '@/lib/constants';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  status?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; ok: boolean; status: number; errorData?: ApiErrorResponse }> {
  const { requiresAuth = false, headers, ...restOptions } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(headers as Record<string, string>),
  };

  // Adjuntar el token automáticamente desde cookies si la ruta requiere autenticación
  if (requiresAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: requestHeaders,
      ...restOptions,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return { data: null, ok: false, status: res.status, errorData: data as ApiErrorResponse };
    }

    return {
      data: (data?.data ?? data) as T,
      ok: true,
      status: res.status,
    };
  } catch (error) {
    console.error(`Error en petición API a ${endpoint}:`, error);
    return { data: null, ok: false, status: 500 };
  }
}