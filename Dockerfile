FROM node:22-alpine

WORKDIR /app

# Utilidades mínimas
RUN apk add --no-cache bash mysql-client

# Dependencias
COPY package*.json ./
RUN npm ci

# Código y config
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Build
RUN npm run build

# Crear el script de espera dentro de la imagen (sin COPY)
RUN printf '#!/usr/bin/env sh\n' \
    'echo "Esperando a MySQL en $DB_HOST:$DB_PORT ..."\n' \
    'until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" --silent; do\n' \
    '  sleep 2\n' \
    'done\n' \
    'echo "MySQL listo."\n' > /wait-for-db.sh \
 && chmod +x /wait-for-db.sh

EXPOSE 3000

CMD ["/bin/sh", "-c", "/wait-for-db.sh \
  && for i in 1 2 3 4 5; do npm run migration:run && break || (echo 'retrying migrations...' && sleep 3); done \
  && node dist/main.js"]
