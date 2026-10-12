'use client';

import { User } from '@/types/user';

interface ProfileDetailsCardProps {
  user: User;
}

export function ProfileDetailsCard({ user }: ProfileDetailsCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No disponible';

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40 space-y-6">
      {/* Cabecera del Perfil */}
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
          <div className="mt-2 flex items-center gap-2">
            {user.email_verified_at ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ✓ Cuenta Verificada
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                ⌛ Pendiente de Verificación
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Detalles de la Cuenta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            ID de Usuario
          </span>
          <p className="font-mono font-bold text-slate-800 text-sm">#{user.id}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            Teléfono
          </span>
          <p className="font-semibold text-slate-800 text-sm">
            {user.phone || 'No especificado'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            Correo Electrónico
          </span>
          <p className="font-semibold text-slate-800 text-sm">{user.email}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-1">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            Fecha de Registro
          </span>
          <p className="font-semibold text-slate-800 text-sm">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}