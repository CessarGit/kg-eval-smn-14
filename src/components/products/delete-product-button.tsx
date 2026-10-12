'use client';

import { useState, useTransition } from 'react';
import { deleteProductAction } from '@/actions/product.actions';

export function DeleteProductButton({ productId }: { productId: number | string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const res = await deleteProductAction(productId);

      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setIsOpen(false);
      }
    });
  };

  const handleClose = () => {
    if (!isPending) {
      setErrorMessage(null);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Botón Principal para Abrir el Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors cursor-pointer"
      >
        Eliminar
      </button>

      {/* Modal Flotante de Confirmación */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-slate-100 text-left">
            
            {/* Encabezado con Icono de Advertencia */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-lg">
                ⚠️
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Eliminar Producto</h3>
                <p className="text-xs text-slate-500">
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            {/* Mensaje de Confirmación */}
            <p className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              ¿Estás seguro de que deseas eliminar permanentemente el producto{' '}
              <span className="font-bold text-slate-800">#{productId}</span>?
            </p>

            {/* Alerta de Error (Reemplazo del alert nativo) */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-center gap-2">
                <span>❌</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Acciones del Modal */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-xl shadow-md shadow-rose-500/20 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Eliminando...</span>
                  </>
                ) : (
                  'Sí, eliminar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}