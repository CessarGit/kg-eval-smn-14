'use client';

import { useState, useTransition } from 'react';
import { deleteUserAction } from '@/actions/user.actions';

export function DeleteUserButton({ userId }: { userId: number | string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setErrorMessage(null);
    startTransition(async () => {
      const res = await deleteUserAction(userId);
      if (!res.success) {
        setErrorMessage(res.message);
      } else {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors cursor-pointer"
      >
        Deshabilitar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-slate-100 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-lg">
                ⚠️
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Deshabilitar Cliente</h3>
                <p className="text-xs text-slate-500">Soft Delete en Laravel</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              ¿Estás seguro de que deseas deshabilitar al cliente{' '}
              <span className="font-bold text-slate-800">#{userId}</span>?
            </p>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                ❌ {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl disabled:opacity-50"
              >
                {isPending ? 'Procesando...' : 'Sí, deshabilitar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}