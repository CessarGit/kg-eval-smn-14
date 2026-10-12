import Link from 'next/link';
import { AuthService } from '@/services/auth.service';
import { logoutAction } from '@/actions/auth.actions';

export async function Navbar() {
  const user = await AuthService.getProfile();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/products" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-all">
            M
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            MiTienda
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Productos
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-colors group"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {initials}
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 max-w-[120px] truncate">
                  {user.name}
                </span>
              </Link>

              {/* Formulario de Logout directo */}
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] px-4 py-2 rounded-xl shadow-sm shadow-blue-500/20 transition-all"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}