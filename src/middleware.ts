import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Obtener la cookie del token de sesión
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // 2. Definir rutas protegidas y de autenticación
  const isAuthPage = pathname.startsWith('/login');
  const isProtectedRoute = pathname.startsWith('/products') || pathname.startsWith('/dashboard');

  // 3. Usuario NO autenticado intentando acceder a ruta privada
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    // Preservar la URL original para redirigir tras autenticarse
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Usuario autenticado intentando acceder al login
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  return NextResponse.next();
}

// Configuración del Matcher para acotar la ejecución del Middleware
export const config = {
  matcher: ['/products/:path*', '/dashboard/:path*', '/login'],
};