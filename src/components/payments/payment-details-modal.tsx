'use client';

import { useState } from 'react';
// ❌ ELIMINAR: import { PaymentsService } from '@/services/payments.service';
// ✅ IMPORTAR LA SERVER ACTION:
import { getPaymentDetailsAction } from '@/actions/payment.actions';
import { Payment } from '@/types/payment';

export function PaymentDetailsModal({ paymentId }: { paymentId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async () => {
    setIsOpen(true);
    setLoading(true);
    setError(null);

    // Ejecuta la Server Action en el servidor sin empaquetar apiClient en el cliente
    const res = await getPaymentDetailsAction(paymentId);

    if (res.success && res.data) {
      setPayment(res.data);
    } else {
      setError(res.message || 'Error al cargar detalles del pago.');
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
      >
        Ver Recibo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 text-left border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Recibo de Transacción</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {loading && <p className="text-xs text-slate-500 py-4 text-center">Cargando recibo de Stripe...</p>}

            {error && <p className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-200">{error}</p>}

            {payment && !loading && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 font-mono border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ID Pago:</span>
                    <span className="font-bold text-slate-800">#{payment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Orden:</span>
                    <span className="font-bold text-slate-800">#{payment.order_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monto:</span>
                    <span className="font-bold text-emerald-600">
                      ${Number(payment.amount || payment.total_paid || 0).toFixed(2)} {payment.currency?.toUpperCase() || 'USD'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estado:</span>
                    <span className="font-semibold uppercase text-emerald-700">{payment.status}</span>
                  </div>
                </div>

                {payment.stripe_payment_id && (
                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p><strong className="text-slate-700">Stripe Payment ID:</strong></p>
                    <p className="font-mono bg-slate-100 p-2 rounded-lg break-all text-[10px] text-slate-800">
                      {payment.stripe_payment_id}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}