import { Suspense } from 'react';
import { UsersService } from '@/services/users.service';
import { UserListTableClient } from '@/components/users/user-list-table-client';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/types/user';

export const dynamic = 'force-dynamic';

async function UsersSection() {
  const response = await UsersService.getAll();
  const users: User[] = Array.isArray(response) ? response : [];

  return <UserListTableClient users={users} itemsPerPage={8} />;
}

export default function UsersPage() {
  return (
    <main className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Clientes</h1>
        <p className="text-sm text-slate-500">
          Administra la información de los usuarios y clientes registrados
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
        <UsersSection />
      </Suspense>
    </main>
  );
}