'use client';

import { useActionState, useEffect, useState } from 'react';
import { processPaymentAction } from '@/actions/payment.actions';

interface ProcessPaymentModalProps {
  orderId: number;
  orderNumber: string;
  totalAmount: number | string;
}

export function ProcessPaymentModal({
  orderId,
  orderNumber,
  totalAmount,
}: ProcessPaymentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pm_card_visa');

  const [state, formAction, isPending] = useActionState(processPaymentAction, {
    success: false,
    errors: {},
    message: '',
  });

  // Cerrar modal automáticamente después de un pago exitoso
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-emerald-600/20 transition-colors cursor-pointer"
      >
        💳 Pagar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 text-left border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pasarela de Pago Stripe</h3>
                <p className="text-xs text-slate-500">Orden #{orderNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {state.message && (
              <div
                className={`p-3.5 rounded-xl text-xs font-medium border ${
                  state.success
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                <p className="font-bold">{state.message}</p>
                {state.data && (
                  <div className="mt-2 text-[11px] font-mono bg-white/60 p-2 rounded-lg space-y-0.5 border border-emerald-200/50">
                    <div><span className="font-semibold text-emerald-900">Intent:</span> {state.data.stripe_payment_intent}</div>
                    <div><span className="font-semibold text-emerald-900">Estado:</span> {state.data.status}</div>
                    <div><span className="font-semibold text-emerald-900">Monto:</span> ${Number(state.data.total_paid).toFixed(2)} USD</div>
                  </div>
                )}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <input type="hidden" name="order_id" value={orderId} />

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  <span>Resumen de Cobro</span>
                  <span className="text-slate-900 font-bold text-sm text-emerald-600">
                    ${Number(totalAmount).toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Método de Pago (Stripe ID) *
                </label>
                <select
                  name="payment_method_id"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="pm_card_visa">💳 Visa Exitosa (pm_card_visa)</option>
                  <option value="pm_card_visa_debit">💳 Visa Débito (pm_card_visa_debit)</option>
                  <option value="pm_card_mastercard">💳 Mastercard (pm_card_mastercard)</option>
                  <option value="pm_card_chargeDeclined">❌ Tarjeta Rechazada (pm_card_chargeDeclined)</option>
                </select>
                {state.errors?.payment_method_id && (
                  <p className="mt-1 text-xs text-rose-500">{state.errors.payment_method_id[0]}</p>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
                <span>🔒</span>
                <span>Procesado de forma segura mediante <strong>Stripe Automatic Payment Methods</strong>.</span>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending || state.success}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  {isPending ? 'Confirmando con Stripe...' : `Confirmar Pago ($${Number(totalAmount).toFixed(2)})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}