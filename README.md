# 🛒 Sistema de Gestión E-Commerce: API REST (Laravel) & Panel Admin (Next.js)

Este repositorio documenta el despliegue e integración de un ecosistema completo de comercio electrónico compuesto por dos módulos independientes: **API REST Backend (Laravel)** y **Panel de Administración Frontend (Next.js App Router)**.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#️-requisitos-previos)
2. [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)
3. [Instalación del Backend (API Laravel)](#-1-instalación-del-backend-api-laravel)
4. [Instalación del Frontend (Dashboard Next.js)](#️-2-instalación-del-frontend-dashboard-nextjs)
5. [Módulos del Sistema](#-módulos-del-sistema)
6. [Estructura del Proyecto Frontend](#-estructura-del-proyecto-frontend)
7. [Comandos Útiles](#️-comandos-útiles)

---

## 🛠️ Requisitos Previos

Asegúrate de contar con las siguientes herramientas en tu entorno local:

- **PHP** `>= 8.2` y **Composer**
- **Node.js** `>= 18.x`
- **pnpm** `>= 8.x` (`npm install -g pnpm`)
- **MariaDB** o **MySQL**
- **Cuenta de Pruebas de Stripe** (para API Keys públicas y secretas)
- **Git**

---

## 💻 Arquitectura y Tecnologías

### Backend (API REST)

- **Framework:** Laravel 10 / 11
- **Autenticación:** JWT (JSON Web Tokens)
- **Base de Datos:** Eloquent ORM con MariaDB/MySQL
- **Pasarela de Pagos:** Stripe PHP SDK (`PaymentIntent`)
- **Concurrencia:** Bloqueo pesimista (`lockForUpdate`) para control estricto de inventario

### Frontend (Dashboard)

- **Framework:** Next.js (App Router) & React 19
- **Lenguaje:** TypeScript
- **Gestor de Paquetes:** `pnpm`
- **Estilos:** Tailwind CSS
- **Validación de Datos:** Zod Schemas
- **Estrategia de Renderizado:** Server Components, Server Actions (`use server`) y Client Components aislados (`use client`)

---

## 🚀 1. Instalación del Backend (API Laravel)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ecommerce-api.git
cd ecommerce-api
```

### 2. Instalar dependencias de PHP

```bash
composer install
```

### 3. Configurar el archivo de entorno

```bash
cp .env.example .env
```

### 4. Editar la configuración en `.env`

```env
APP_NAME="MiTienda API"
APP_URL=http://localhost:8000

# Configuración de Base de Datos
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_db
DB_USERNAME=root
DB_PASSWORD=secret

# Llaves de API Stripe (Modo Test)
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
```

### 5. Generar claves de la aplicación y JWT

```bash
php artisan key:generate
php artisan jwt:secret
```

### 6. Ejecutar migraciones y carga de datos iniciales

```bash
php artisan migrate --seed
```

### 7. Iniciar el servidor backend

```bash
php artisan serve
```

La API estará activa en `http://localhost:8000/api`.

---

## 🖥️ 2. Instalación del Frontend (Dashboard Next.js)

### 1. Clonar el repositorio Frontend

```bash
git clone https://github.com/tu-usuario/ecommerce-dashboard.git
cd ecommerce-dashboard
```

### 2. Instalar dependencias con pnpm

```bash
pnpm install
```

### 3. Crear el archivo de entorno local

```bash
cp .env.example .env.local
```

### 4. Configurar la URL de la API

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 5. Ejecutar el servidor de desarrollo

```bash
pnpm dev
```

Accede al panel desde tu navegador en `http://localhost:3000`.

---

## 📦 Módulos del Sistema

### 🔐 Autenticación (`/login`, `/register`)

- Manejo de sesión persistente con JWT en cookies `HttpOnly` e inclusiones asíncronas vía `cookies()` de Next.js.
- Server Actions dedicadas para `loginAction`, `registerAction` y `logoutAction`.

### 📦 Productos (`/products`)

- Administración del catálogo, control de precios base e inventario en tiempo real.
- Paginación en cliente y modales de mantenimiento.

### 🛒 Órdenes (`/orders`)

- Creación de órdenes especificando solo la dirección de envío e ítems (`product_id` y `quantity`).
- **Seguridad reforzada:** la API de Laravel consulta directamente los precios en la base de datos, valida stock con `lockForUpdate` y descuenta inventario automáticamente. El cliente no envía precios ni totales a la API.

### 💳 Pagos & Stripe (`/payments`)

- Integración con Stripe `PaymentIntent` para cobros directos (`pm_card_visa`, etc.).
- Confirmación en servidor con `automatic_payment_methods`.
- Actualización inmediata del estado de la orden a `paid` y visualización de recibos detallados.

### 👥 Usuarios y Perfil (`/users`, `/profile`)

- Mantenimiento con borrado lógico (Soft Delete) para la lista de usuarios/clientes.
- Consulta del perfil autenticado (`ProfileService.getProfile`).

---

## 📂 Estructura del Proyecto Frontend

```plaintext
ecommerce-dashboard/
├── src/
│   ├── actions/          # Server Actions ('use server') para mutaciones y formularios
│   ├── app/              # Rutas de App Router ((dashboard), layout, pages)
│   ├── components/       # UI Components (Forms, Modales, Tablas, Layouts)
│   │   ├── layout/       # Sidebar, Navbar
│   │   ├── orders/       # Modales y formularios de órdenes
│   │   ├── payments/     # Modales de cobro Stripe y recibos
│   │   ├── profile/      # Tarjeta de detalles del usuario
│   │   └── users/        # Modales de edición y tablas
│   ├── lib/              # apiClient.ts e integración de cookies del servidor
│   ├── schemas/          # Zod Validations (order.schema, payment.schema, etc.)
│   ├── services/         # Capa de consumo HTTP exclusiva para el servidor
│   └── types/            # Definiciones de TypeScript (User, Order, Payment)
├── public/               # Assets estáticos
├── tailwind.config.ts    # Configuración de Tailwind CSS
└── package.json
```

---

## 🛠️ Comandos Útiles

| Comando      | Descripción                                                         |
| ------------ | ------------------------------------------------------------------- |
| `pnpm dev`   | Inicia el entorno de desarrollo con Turbopack                       |
| `pnpm build` | Compila la aplicación para producción                               |
| `pnpm start` | Inicia el servidor de producción compilado                          |
| `pnpm lint`  | Analiza el código en busca de errores sintácticos y de regla ESLint |
