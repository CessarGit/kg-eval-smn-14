'use client';

import { useState } from 'react';
import { Order } from '@/types/orders';
import { PaymentDetailsModal } from '@/components/payments/payment-details-modal';
import { ProcessPaymentModal } from '@/components/payments/process-payment-modal';

interface PaymentListTableClientProps {
  orders: Order[];
  itemsPerPage?: number;
}

export function PaymentListTableClient({
  orders,
  itemsPerPage = 8,
}: PaymentListTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar órdenes completadas o pagadas
  const paidOrders = orders.filter((o) => o.status === 'paid' || o.status === 'completed');
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  const totalCollected = paidOrders.reduce(
    (acc, curr) => acc + Number(curr.total_amount || 0),
    0
  );

  // Paginación sobre todas las órdenes para gestión de cobros
  const totalPages = Math.ceil(orders.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Tarjetas KPI de Pagos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Recaudado
          </p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            ${totalCollected.toFixed(2)} USD
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pagos Exitosos
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {paidOrders.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pendientes de Cobro
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {pendingOrders.length}
          </p>
        </div>
      </div>

      {/* Tabla General de Transacciones y Cobros */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Historial de Transacciones Stripe
            </h3>
            <p className="text-xs text-slate-500">
              Gestión de cobros y recibos de pago vinculados a órdenes
            </p>
          </div>
          {orders.length > 0 && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Página {safePage} de {totalPages}
            </span>
          )}
        </div>

        {orders.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-8">
            No hay transacciones ni órdenes registradas.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 text-xs uppercase font-semibold text-slate-400 bg-slate-50/50">
                  <tr>
                    <th className="py-3 px-3">Orden</th>
                    <th className="py-3 px-3">Dirección de Envío</th>
                    <th className="py-3 px-3">Monto Total</th>
                    <th className="py-3 px-3">Estado de Pago</th>
                    <th className="py-3 px-3 text-right">Pasarela Stripe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-mono text-xs font-bold text-slate-800">
                          {order.order_number}
                        </div>
                        <div className="text-[11px] text-slate-400">ID #{order.id}</div>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600 max-w-xs truncate">
                        {order.shipping_address}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        ${Number(order.total_amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        {order.status === 'paid' || order.status === 'completed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ✓ Pagado
                          </span>
                        ) : order.status === 'pending' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            ⌛ Pendiente
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {order.status === 'pending' ? (
                          <ProcessPaymentModal
                            orderId={order.id}
                            orderNumber={order.order_number}
                            totalAmount={order.total_amount}
                          />
                        ) : (
                          <PaymentDetailsModal paymentId={order.id} />
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
    </div>
  );
}