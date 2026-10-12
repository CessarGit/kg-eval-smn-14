import { Suspense } from 'react';
import { OrdersService } from '@/services/orders.service';
import { PaymentListTableClient } from '@/components/payments/payment-list-table-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Order } from '@/types/orders';

export const dynamic = 'force-dynamic';

async function PaymentsSection() {
  const response = await OrdersService.getAll();
  const orders: Order[] = Array.isArray(response) ? response : [];

  return <PaymentListTableClient orders={orders} itemsPerPage={8} />;
}

export default function PaymentsPage() {
  return (
    <main className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Módulo de Pagos & Stripe</h1>
        <p className="text-sm text-slate-500">
          Procesa transacciones con PaymentIntent de Stripe y consulta el historial de cobros
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <PaymentsSection />
      </Suspense>
    </main>
  );
}