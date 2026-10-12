import { Suspense } from 'react';
import { ProfileService } from '@/services/profile.service';
import { ProfileDetailsCard } from '@/components/profile/profile-details-card';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

async function ProfileSection() {
  const user = await ProfileService.getProfile();

  if (!user) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-xs text-rose-700">
        No se pudo obtener la información del perfil. Por favor, vuelve a iniciar sesión.
      </div>
    );
  }

  return <ProfileDetailsCard user={user} />;
}

export default function ProfilePage() {
  return (
    <main className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi Perfil</h1>
        <p className="text-sm text-slate-500">
          Información personal y detalles de tu cuenta de usuario
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-72 w-full rounded-2xl" />}>
        <ProfileSection />
      </Suspense>
    </main>
  );
}