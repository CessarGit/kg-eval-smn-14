'use client';

import { useEffect } from 'react';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error capturado en el segmento de productos:', error);
  }, [error]);

  return (
    <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="text-xl font-bold">Ocurrió un problema en la sección de productos</h2>
      <p className="my-2 text-sm">{error.message || 'Fallo inesperado al conectar con el servicio.'}</p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Reintentar proceso
      </button>
    </div>
  );
}