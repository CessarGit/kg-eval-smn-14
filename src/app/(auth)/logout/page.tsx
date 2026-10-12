import { logoutAction } from '@/actions/auth.actions';

export default function LogoutPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50/50">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/50">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
          🚪
        </div>
        <h1 className="text-xl font-bold text-slate-900">¿Deseas cerrar sesión?</h1>
        <p className="mt-2 text-xs text-slate-500">
          Tu token de sesión en Laravel será invalidado y tendrás que volver a autenticarte.
        </p>

        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-500/20 transition-all cursor-pointer"
          >
            Confirmar Cierre de Sesión
          </button>
        </form>
      </div>
    </main>
  );
}