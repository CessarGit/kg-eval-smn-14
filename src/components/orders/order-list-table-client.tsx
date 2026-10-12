'use client';

import { useState } from 'react';
import { Order } from '@/types/orders';
import { OrderDetailsModal } from '@/components/orders/order-details-modal';
import { ProcessPaymentModal } from '@/components/payments/process-payment-modal';

interface OrderListTableClientProps {
  orders: Order[];
  itemsPerPage?: number;
}

export function OrderListTableClient({
  orders,
  itemsPerPage = 8,
}: OrderListTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Completada
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Cancelada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Pendiente
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Historial de Órdenes ({orders.length})
        </h3>
        {orders.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Página {safePage} de {totalPages}
          </span>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">
          No hay órdenes de compra registradas.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase font-semibold text-slate-400 bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3"># No. Orden</th>
                  <th className="py-3 px-3">Usuario ID</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3">Monto Total</th>
                  <th className="py-3 px-3">Dirección de Envío</th>
                  <th className="py-3 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-xs text-blue-600">
                      {order.order_number}
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-slate-500">
                      #{order.user_id}
                    </td>
                    <td className="py-3 px-3">{renderStatusBadge(order.status)}</td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500 max-w-[220px] truncate">
                      {order.shipping_address}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <OrderDetailsModal order={order} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      {order.status === 'pending' ? (
                        <ProcessPaymentModal
                          orderId={order.id}
                          orderNumber={order.order_number}
                          totalAmount={order.total_amount}
                        />
                      ) : order.status === 'paid' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Pagada
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 capitalize">{order.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-xs font-medium text-slate-600">
              <span>
                Mostrando {startIndex + 1} - {Math.min(endIndex, orders.length)} de{' '}
                {orders.length} órdenes
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={safePage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={safePage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}