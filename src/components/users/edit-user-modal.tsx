'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { updateUserAction } from '@/actions/user.actions';
import { User } from '@/types/user';

export function EditUserModal({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateUserWithId = updateUserAction.bind(null, user.id);

  const [state, formAction, isPending] = useActionState(updateUserWithId, {
    success: false,
    errors: {},
    message: '',
  });

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
      >
        Editar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Editar Cliente #{user.id}</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {state.message && (
              <div
                className={`p-3 rounded-xl text-xs font-medium border ${
                  state.success
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {state.message}
              </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                {state.errors?.name && (
                  <p className="mt-1 text-xs text-rose-500">{state.errors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                />
                {state.errors?.email && (
                  <p className="mt-1 text-xs text-rose-500">{state.errors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={user.phone || ''}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm focus:bg-white focus:border-blue-500 focus:outline-none"
                  placeholder="+503 7000-0000"
                />
                {state.errors?.phone && (
                  <p className="mt-1 text-xs text-rose-500">{state.errors.phone[0]}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50"
                >
                  {isPending ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}