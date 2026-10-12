'use server';

import { revalidatePath } from 'next/cache';
import { productSchema } from '@/schemas/product.schema';
import { ProductsService } from '@/services/products.service';
export interface ProductFormState {
  success: boolean;
  errors?: Record<string, string[]>;
  message: string;
}

function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

export async function createProductAction(
  prevState: ProductFormState | unknown,
  formData: FormData
): Promise<ProductFormState> {
  const name = formData.get('name') as string;
  let slug = formData.get('slug') as string;

  if (!slug && name) {
    slug = generateSlug(name);
  }

  const rawData = {
    name,
    slug,
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock') || 0,
    sku: formData.get('sku') || null,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  };

  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Revisa los campos del formulario.',
    };
  }

  try {
    await ProductsService.create(validation.data);
    revalidatePath('/products');

    return {
      success: true,
      errors: {},
      message: 'Producto creado exitosamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al guardar el producto.',
    };
  }
}

export async function updateProductAction(
  id: number | string,
  prevState: ProductFormState | unknown,
  formData: FormData
): Promise<ProductFormState> {
  const name = formData.get('name') as string;
  let slug = formData.get('slug') as string;

  if (!slug && name) {
    slug = generateSlug(name);
  }

  const rawData = {
    name,
    slug,
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock') || 0,
    sku: formData.get('sku') || null,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  };

  const validation = productSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: 'Revisa los campos del formulario.',
    };
  }

  try {
    await ProductsService.update(id, validation.data);
    revalidatePath('/products');

    return {
      success: true,
      errors: {},
      message: 'Producto actualizado exitosamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar el producto.',
    };
  }
}

export async function deleteProductAction(id: number | string): Promise<ProductFormState> {
  try {
    await ProductsService.delete(id);
    revalidatePath('/products');

    return {
      success: true,
      message: 'Producto eliminado exitosamente.',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar el producto.',
    };
  }
}