'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { EditUserModal } from '@/components/users/edit-user-modal';
import { DeleteUserButton } from '@/components/users/delete-user-button';

interface UserListTableClientProps {
  users: User[];
  itemsPerPage?: number;
}

export function UserListTableClient({
  users,
  itemsPerPage = 8,
}: UserListTableClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Clientes Registrados ({users.length})
        </h3>
        {users.length > 0 && (
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Página {safePage} de {totalPages}
          </span>
        )}
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">
          No hay clientes registrados en la base de datos.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 text-xs uppercase font-semibold text-slate-400 bg-slate-50/50">
                <tr>
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Cliente</th>
                  <th className="py-3 px-3">Teléfono</th>
                  <th className="py-3 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono text-xs text-slate-400">#{user.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-800">{user.name}</div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-slate-600">
                      {user.phone || '-'}
                    </td>
                    
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-2">
                        <EditUserModal user={user} />
                        <DeleteUserButton userId={user.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-xs font-medium text-slate-600">
              <span>
                Mostrando {startIndex + 1} - {Math.min(endIndex, users.length)} de{' '}
                {users.length} clientes
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