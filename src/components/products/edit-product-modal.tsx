'use client';

import { useActionState, useState } from 'react';
import { updateProductAction } from '@/actions/product.actions';
import { Product } from '@/types/product';

export function EditProductModal({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  const updateActionWithId = updateProductAction.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(updateActionWithId, {
    success: false,
    message: '',
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
      >
        Editar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Editar Producto #{product.id}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {state.message && (
              <div
                className={`p-3 rounded-xl text-xs font-medium ${
                  state.success ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}
              >
                {state.message}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={product.slug}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    defaultValue={product.sku || ''}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Precio ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    defaultValue={product.price}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={product.stock}
                    required
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`edit_is_active_${product.id}`}
                  name="is_active"
                  defaultChecked={product.is_active}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`edit_is_active_${product.id}`}
                  className="text-xs font-semibold text-slate-700"
                >
                  Producto Activo
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={product.description || ''}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                >
                  {isPending ? 'Guardando...' : 'Actualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}