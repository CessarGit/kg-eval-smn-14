import { Suspense } from 'react';
import { OrdersService } from '@/services/orders.service';
import { OrderListTableClient } from '@/components/orders/order-list-table-client';
import { OrderForm } from '@/components/forms/order-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Order } from '@/types/orders';

export const dynamic = 'force-dynamic';


async function OrdersSection() {
  const orders: Order[] = await OrdersService.getAll();

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((acc, curr) => acc + Number(curr.total_amount), 0);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Tarjetas KPI de Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total de Órdenes
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Órdenes Pendientes
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
        </div>
      </div>

      {/* Grid: Formulario + Tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <OrderForm />
        </div>
        <div className="lg:col-span-2">
          <OrderListTableClient orders={orders} itemsPerPage={8} />
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <main className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Órdenes</h1>
        <p className="text-sm text-slate-500">
          Administra las órdenes de compra realizadas por los clientes
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <OrdersSection />
      </Suspense>
    </main>
  );
}