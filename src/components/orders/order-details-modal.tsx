'use client';

import { useState } from 'react';
import { Order } from '@/types/orders';

export function OrderDetailsModal({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Completada
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Cancelada
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Pendiente
          </span>
        );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
      >
        Ver Detalle
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{order.order_number}</h3>
                <p className="text-xs text-slate-400">ID de Orden: #{order.id}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-400 font-semibold uppercase">Estado</span>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-400 font-semibold uppercase">ID de Cliente</span>
                <span className="font-semibold text-slate-800">#{order.user_id}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-400 font-semibold uppercase">Monto Total</span>
                <span className="text-base font-bold text-emerald-600">${order.total_amount}</span>
              </div>

              <div className="py-1 border-b border-slate-50">
                <span className="block text-slate-400 font-semibold uppercase mb-1">
                  Dirección de Envío
                </span>
                <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {order.shipping_address}
                </p>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-semibold uppercase">Fecha de Registro</span>
                <span className="text-slate-600 font-mono">
                  {new Date(order.created_at).toLocaleString('es-ES')}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
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