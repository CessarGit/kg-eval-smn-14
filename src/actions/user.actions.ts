'use server';

import { revalidatePath } from 'next/cache';
import { updateUserSchema } from '@/schemas/user.schema';
import { UsersService } from '@/services/users.service';

export interface UserFormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}

export async function updateUserAction(
  userId: number | string,
  prevState: UserFormState | unknown,
  formData: FormData
): Promise<UserFormState> {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || null,
  };

  const validation = updateUserSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Revisa los campos requeridos.',
    };
  }

  try {
    await UsersService.update(userId, validation.data);
    revalidatePath('/users');

    return {
      success: true,
      errors: {},
      message: 'Información del cliente actualizada exitosamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar usuario.',
    };
  }
}

export async function deleteUserAction(userId: number | string) {
  try {
    await UsersService.delete(userId);
    revalidatePath('/users');
    return { success: true, message: 'Cliente deshabilitado correctamente.' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al deshabilitar cliente.',
    };
  }
}