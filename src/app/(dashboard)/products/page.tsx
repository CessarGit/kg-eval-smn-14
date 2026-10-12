import { Suspense } from 'react';
import { ProductsService } from '@/services/products.service';
import { ProductForm } from '@/components/forms/product-form';
import { EditProductModal } from '@/components/products/edit-product-modal';
import { DeleteProductButton } from '@/components/products/delete-product-button';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/types/product';
import { ProductListTableClient } from '@/components/products/product-list-table-client';
import { Navbar } from '@/components/layout/navbar';

async function ProductListTable() {
  const products: Product[] = await ProductsService.getAll();

  return <ProductListTableClient products={products} itemsPerPage={8} />;
}

export default function ProductsDashboardPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <ProductForm />
        </div>

        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
            <ProductListTable />
          </Suspense>
        </div>
      </div>
    </main>
  );
}