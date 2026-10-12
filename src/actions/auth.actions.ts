'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/constants';
import { registerSchema } from '@/schemas/auth.schema';

export interface AuthFormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}

// 1. Iniciar Sesión
export async function loginAction(
  prevState: AuthFormState | unknown,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // En lugar de hacer 'throw', retornamos la respuesta estructurada
    if (!res.ok) {
      return {
        success: false,
        message: 'Credenciales inválidas. Verifica tu correo y contraseña.',
      };
    }

    const data = await res.json();

    // Extraemos la propiedad que nos devuelve Laravel
    const token =
      data.authorization?.token ||
      data.access_token ||
      data.token;

    if (!token) {
      return {
        success: false,
        message: 'No se recibió el token de autenticación desde Laravel.',
      };
    }

    // Guardamos la cookie de sesión de forma segura
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error de conexión con el servidor.',
    };
  }

  // Se ejecuta fuera del try/catch para no interrumpir la redirección interna de Next.js
  redirect('/products');
}

// 2. Registrar Usuario
export async function registerAction(
  prevState: AuthFormState | unknown,
  formData: FormData
): Promise<AuthFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // Validar campos en el servidor con Zod
  const validation = registerSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Por favor corrige los errores del formulario.',
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(validation.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errors: data.errors || {},
        message: data.message || 'Error al registrar el usuario en Laravel.',
      };
    }

    // Extraer token soportando el formato authorization.token de Laravel
    const token =
      data.authorization?.token ||
      data.access_token ||
      data.token;

    if (token) {
      const cookieStore = await cookies();
      cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
      });
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error de conexión con Laravel.',
    };
  }

  // Redirigir al dashboard si se autologueó al registrarse
  redirect('/products');
}
// 3. Cerrar Sesión
export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
    } catch (error) {
      console.error('Error al invalidar token en Laravel:', error);
    }
  }

  cookieStore.delete('token');
  redirect('/login');
}