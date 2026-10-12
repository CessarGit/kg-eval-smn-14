'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createOrderAction } from '@/actions/order.actions';

export function OrderForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Únicamente datos que el cliente debe especificar
  const [productId, setProductId] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const [state, formAction, isPending] = useActionState(createOrderAction, {
    success: false,
    errors: {},
    message: '',
  });

  // Limpieza diferida de estados para evitar renders síncronos en cascada (ESLint rule)
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();

      const timer = setTimeout(() => {
        setProductId(1);
        setQuantity(1);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [state.success]);

  // Serializado limpio: solo product_id y quantity
  const itemsPayload = JSON.stringify([
    {
      product_id: Number(productId),
      quantity: Number(quantity),
    },
  ]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Nueva Orden de Compra</h2>

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

      <form ref={formRef} action={formAction} className="space-y-4">
        {/* Campo oculto enviado a la Server Action */}
        <input type="hidden" name="items" value={itemsPayload} />

        <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Producto e Inventario
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                ID Producto *
              </label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(Number(e.target.value))}
                min={1}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Cantidad *
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Dirección de Envío *
          </label>
          <textarea
            name="shipping_address"
            rows={3}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            placeholder="Calle San Salvador, Col. Escalón #123"
          />
          {state.errors?.shipping_address && (
            <p className="mt-1 text-xs text-rose-500">{state.errors.shipping_address[0]}</p>
          )}
        </div>

        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100/80 text-[11px] text-blue-700">
          💡 <span className="font-semibold">Nota:</span> El precio unitario, verificación de stock y total de la orden se procesan automáticamente desde el servidor.
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isPending ? 'Procesando...' : 'Crear Orden'}
        </button>
      </form>
    </div>
  );
}