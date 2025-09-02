# Menu API (NestJS + TypeORM + MySQL)

API para menú digital con:
- CRUD (categorías, productos)
- **Uploads** `POST /uploads/image` (Cloudinary o almacenamiento local)
- **Búsquedas y filtros** en `GET /products`
- **Paginación y orden**
- **Migrations** (TypeORM)
- **Rutas públicas** `GET /menu` (sin JWT)
- **RBAC**: `viewer` (solo lectura) y `admin` (CRUD)

## Requisitos
- Node 18+
- Docker / Docker Compose

## Configuración
1. Copia `.env.example` a `.env` y ajusta variables.
2. (Opcional) Configura Cloudinary (`CLOUDINARY_*`). Si no, guardará en `uploads/` local.

## Levantar con Docker
```bash
docker-compose up --build
# el contenedor ejecuta las migraciones y levanta la API en :3000
```

Swagger: **http://localhost:3000/docs**

### Login (semilla automática):
- email: `admin@menu.local`
- password: `admin123`

## Migraciones (manual, si corres fuera de Docker)
```bash
npm ci
# crea la BD 'menuapp' y levanta MySQL (o usa docker-compose db)
npm run migration:run
npm run start:dev
```

## Endpoints clave
- `POST /auth/login` → JWT
- `GET /products` filtros: `?categoryId=&q=&active=&page=&limit=&sort=&dir=`
- `POST /uploads/image` (admin) → `{ imageUrl }`
- `GET /menu` (público) → categorías con productos activos
