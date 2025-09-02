# 🧪 API — <Nombre del Proyecto>
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518.19-green)](#)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](#)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-gray)](#)
[![License](https://img.shields.io/badge/license-MIT-black)](#)

Descripción breve de la API. Explica **qué problema resuelve** y **para quién**.  
Ejemplo: API para gestionar productos y categorías de un punto frío de licores (CRUD, auth JWT, documentación con Swagger, despliegue en Docker).

---

## 🧭 Tabla de contenidos
- [Arquitectura](#arquitectura)
- [Stack y requisitos](#stack-y-requisitos)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Configuración (.env)](#configuración-env)
- [Ejecución local](#ejecución-local)
- [Ejecución con Docker](#ejecución-con-docker)
- [Migraciones y ORM](#migraciones-y-orm)
- [Documentación de la API (Swagger)](#documentación-de-la-api-swagger)
- [Autenticación](#autenticación)
- [Rutas de ejemplo](#rutas-de-ejemplo)
- [Pruebas y calidad](#pruebas-y-calidad)
- [Despliegue](#despliegue)
- [Solución de problemas](#solución-de-problemas)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## 🏗️ Arquitectura
Breve reseña del enfoque:
- **Capas**: `routes` → `controllers` → `services` → `repositories` → `db`
- **Validaciones** con DTO/validators (p. ej., Zod/Joi)
- **Manejo de errores centralizado** (middleware `errorHandler`)
- **Logs** y **observabilidad** (p. ej., morgan, pino)
- **Principios**: SOLID, 12-Factor App

> Si usas NestJS, indica módulos/carpetas. Si usas Express, menciona middlewares clave.

---

## 🧰 Stack y requisitos
- **Node.js** >= **18.19**
- **npm** o **pnpm**
- **Base de datos**: PostgreSQL / MySQL / SQL Server (elige la tuya)
- **Docker** y **Docker Compose** (opcional pero recomendado)

---

## 🗂️ Estructura de carpetas
```text
<root>
├─ src/
│  ├─ config/
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  ├─ repositories/
│  ├─ middlewares/
│  ├─ prisma|typeorm|sequelize/   # ORM (elige uno)
│  └─ app.ts | main.ts
├─ tests/
├─ docker/
│  ├─ Dockerfile
│  └─ docker-compose.yml
├─ .env.example
├─ package.json
└─ README.md
```

---

## 🔧 Configuración (.env)
Copia `.env.example` a `.env` y completa valores:

```bash
# App
PORT=3000
NODE_ENV=development
API_PREFIX=/api/v1

# DB (elige y completa)
DB_CLIENT=postgres         # postgres | mysql | mssql
DB_HOST=localhost
DB_PORT=5432               # 5432 pg | 3306 mysql | 1433 sqlserver
DB_USER=<tu_usuario>
DB_PASSWORD=<tu_password>
DB_NAME=<tu_bd>

# Auth
JWT_SECRET=<cadena-segura>
JWT_EXPIRES_IN=1d

# Swagger
SWAGGER_TITLE="API Punto Frío"
SWAGGER_DESC="Documentación de endpoints"
SWAGGER_VERSION=1.0.0
```

> Sube **.env.example** al repo y **NO** subas `.env`.

---

## ▶️ Ejecución local
```bash
# 1) Instalar dependencias
npm install

# 2) Variables de entorno
cp .env.example .env  # Luego edita .env

# 3) Base de datos (local o Docker)
# Asegúrate de tener la BD corriendo y accesible

# 4) Ejecutar
npm run dev            # modo desarrollo (nodemon)
# o
npm start              # modo producción
```
Abrir: `http://localhost:3000/health` (o el puerto que definas).

---

## 🐳 Ejecución con Docker
Ejemplo de `docker-compose.yml` (PostgreSQL por defecto). Cambia a MySQL/SQL Server si lo prefieres.

```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    container_name: api-db
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    build:
      context: .
      dockerfile: docker/Dockerfile
    container_name: api-app
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "3000:3000"
    command: ["npm","run","start"]
    restart: unless-stopped

volumes:
  db_data:
```

Comandos rápidos:
```bash
docker compose up --build
docker compose down
docker compose logs -f api
```

---

## 🗃️ Migraciones y ORM
Elige tu ORM y ajusta los comandos:

**Prisma**
```bash
npx prisma migrate dev
npx prisma studio
```

**TypeORM**
```bash
npm run typeorm -- migration:run
```

**Sequelize**
```bash
npx sequelize db:migrate
```

---

## 📚 Documentación de la API (Swagger)
Ruta recomendada: `GET /api/docs`

- **JSON**: `/api/docs-json`
- **UI**: `/api/docs`

Ejemplo (Express):
```ts
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
```

---

## 🔐 Autenticación
- **JWT** en `Authorization: Bearer <token>`
- Flujo típico:
  1. `POST /auth/login` → devuelve `access_token`
  2. Usar token en endpoints protegidos
- Middleware `authGuard` para validar y refrescar si aplica

---

## 🔀 Rutas de ejemplo
```http
# Health
GET /health          → 200 OK { status: "ok", uptime }

# Categorías
GET    /api/v1/categories
POST   /api/v1/categories
GET    /api/v1/categories/:id
PATCH  /api/v1/categories/:id
DELETE /api/v1/categories/:id

# Productos
GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:id
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
```

Convención de errores (estándar sugerido):
```json
{
  "message": "Categoría no existe",
  "error": "Not Found",
  "statusCode": 404,
  "path": "/api/v1/categories/123",
  "timestamp": "2025-09-02T18:30:00.000Z"
}
```

---

## ✅ Pruebas y calidad
- **Unitarias**: Jest/Vitest
- **Integración**: Supertest
- **Linter**: ESLint + Prettier
- **Husky**: hooks pre-commit

Comandos típicos:
```bash
npm run test
npm run test:watch
npm run lint
npm run format
```

---

## 🚀 Despliegue
- **Docker Hub**: construye y etiqueta
  ```bash
  docker build -t <usuario>/<repo>:v1 -f docker/Dockerfile .
  docker push <usuario>/<repo>:v1
  ```
- **GitHub Actions**: CI para test/lint/build y CD a tu hosting
- **Entornos**: usa variables de entorno por entorno (DEV/QA/PROD)

---

## 🆘 Solución de problemas
- **Puerto ocupado**: cambia `PORT` en `.env` o libera el puerto
- **DB no responde**: revisa `docker compose logs db`
- **Migraciones fallan**: valida credenciales y estado de la BD
- **Windows + Docker**: activa WSL2 e integra Docker Desktop

---

## 🤝 Contribución
1. Haz un fork y crea una rama: `feat/mi-cambio`
2. Corre pruebas y linters
3. Crea PR con contexto y screenshots si aplica

---

## 📄 Licencia
Distribuido bajo licencia **MIT**. Ver `LICENSE`.

---

## 👤 Autor
- ROMARIO MARTINEZ  — romariomartiinez@gmail.com  — www.linkedin.com/in/romario-martinez • [Portafolio](https://romariomartinez.com/)
