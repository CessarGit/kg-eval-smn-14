'use client';

import { useActionState } from 'react';
import { createProductAction } from '@/actions/product.actions';

const initialState = {
  success: false,
  errors: {} as Record<string, string[]>,
  message: '',
};

export function ProductForm() {
  const [state, formAction, isPending] = useActionState(createProductAction, initialState);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Nuevo Producto</h2>

      {state.message && (
        <div
          className={`mb-4 rounded-xl p-3 text-xs font-medium border ${
            state.success
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Nombre del Producto *
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="Ej. Silla Ergonómica"
          />
          {state.errors?.name && (
            <p className="mt-1 text-xs text-rose-500">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Slug (Opcional)
            </label>
            <input
              type="text"
              name="slug"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="silla-ergonomica"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="PROD-001"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Precio ($) *
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="99.99"
            />
            {state.errors?.price && (
              <p className="mt-1 text-xs text-rose-500">{state.errors.price[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Stock *
            </label>
            <input
              type="number"
              name="stock"
              defaultValue={0}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <label htmlFor="is_active" className="text-xs font-semibold text-slate-700">
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="Detalles sobre el producto..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isPending ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}