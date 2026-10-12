'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { EditProductModal } from '@/components/products/edit-product-modal';
import { DeleteProductButton } from '@/components/products/delete-product-button';

interface ProductListTableClientProps {
  products: Product[];
  itemsPerPage?: number;
}

export function ProductListTableClient({
  products,
  itemsPerPage = 7,
}: ProductListTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Cálculo de páginas totales
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;

  // 2. Valor derivado en tiempo de render (Sin useEffect ni renders en cascada)
  // Si la página actual sobrepasa el total (por eliminar un producto), usa la última válida.
  const safePage = Math.min(currentPage, totalPages);

  // 3. Slicing basado en la página segura
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Catálogo de Productos ({products.length})
        </h3>
        {products.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Página {safePage} de {totalPages}
          </span>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">
          No hay productos registrados en Laravel.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase font-semibold text-slate-400 bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Nombre</th>
                  <th className="py-3 px-3">SKU</th>
                  <th className="py-3 px-3">Precio</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Estado</th>
                  <th className="py-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-slate-400">#{product.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{product.name}</div>
                      <div className="text-[11px] text-slate-400">{product.slug}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-slate-500">
                      {product.sku || '-'}
                    </td>
                    <td className="py-3 px-3 font-semibold text-emerald-600">${product.price}</td>
                    <td className="py-3 px-3 font-medium text-slate-700">{product.stock}</td>
                    <td className="py-3 px-3">
                      {product.is_active ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-2">
                        <EditProductModal product={product} />
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Barra de Controles de Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-xs font-medium text-slate-600">
              <span>
                Mostrando {startIndex + 1} - {Math.min(endIndex, products.length)} de{' '}
                {products.length} productos
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