export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Respuesta devuelta por el endpoint /api/profile de Laravel
export interface ProfileApiResponse {
  status: string;
  user: User;
}