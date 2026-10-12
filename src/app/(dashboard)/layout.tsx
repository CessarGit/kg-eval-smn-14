import { AuthService } from '@/services/auth.service';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthService.getProfile();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Navbar a todo el ancho superior */}
      <Navbar />

      {/* 2. Contenedor horizontal para Sidebar y Contenido */}
      <div className="flex flex-1">
        <Sidebar user={user} />

        <main className="flex-1 overflow-x-hidden p-8">
          {children}
        </main>
      </div>
    </div>
  );
}