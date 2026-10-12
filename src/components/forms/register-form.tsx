'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction } from '@/actions/auth.actions';

const initialState = {
  success: false,
  errors: {} as Record<string, string[]>,
  message: '',
};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Crear una cuenta</h1>
        <p className="mt-2 text-sm text-slate-500">
          Ingresa tus datos para registrarte en la plataforma
        </p>
      </div>

      {state.message && (
        <div className="mb-6 rounded-xl bg-rose-50 p-4 border border-rose-200/60 text-xs font-medium text-rose-700 flex items-center gap-2">
          <span>⚠️</span>
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
            
          />
          {state.errors?.name && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">{state.errors.name[0]}</p>
          )}
        </div>

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
          {state.errors?.email && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">{state.errors.email[0]}</p>
          )}
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
          {state.errors?.password && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">{state.errors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Registrando...</span>
            </>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-xs text-slate-500">
        ¿Ya tienes una cuenta?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}