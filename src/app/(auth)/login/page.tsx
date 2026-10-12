'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction } from '@/actions/auth.actions';

const initialState = {
  success: false,
  message: '',
};

export default function LoginPage() {
  // Conectamos el Server Action con el estado del formulario y el estado de carga (isPending)
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-slate-50/50">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
        <h1 className="mb-6 text-2xl font-bold text-center text-slate-900">Iniciar Sesión</h1>

        {/* Mensaje de error retornado por la Server Action */}
        {state.message && (
          <div className="mb-6 rounded-xl bg-rose-50 p-4 border border-rose-200/60 text-xs font-medium text-rose-700 flex items-center gap-2">
            <span>⚠️</span>
            <span>{state.message}</span>
          </div>
        )}

        {/* Usamos formAction en lugar de loginAction directamente */}
        <form action={formAction} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Ingresando...</span>
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          ¿No tienes una cuenta aún?{' '}
          <Link 
            href="/register" 
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </main>
  );
}