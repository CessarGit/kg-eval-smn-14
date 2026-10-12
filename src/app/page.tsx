import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirige la raíz automáticamente hacia /products
  redirect('/products');
}