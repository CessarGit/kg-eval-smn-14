import { ProductsService } from '@/services/products.service';

// Función auxiliar para obtener usuarios
async function getUsers() {
  try {
    const res = await fetch('https://api.example.com/users', {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// IMPORTANTE: Debe incluir "export default"
export default async function ProductsDashboardPage() {
  // Manejo de peticiones paralelas
  let products = [];
  let users = [];

  try {
    const [productsData, usersData] = await Promise.all([
      ProductsService.getAll(),
      getUsers(),
    ]);
    products = productsData || [];
    users = usersData || [];
  } catch (error) {
    console.error('Error al cargar datos en el servidor:', error);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Panel de Administración de Productos</h1>
      <div className="mt-4 flex gap-4">
        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Productos</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Usuarios</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>
    </main>
  );
}