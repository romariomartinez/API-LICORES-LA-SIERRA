#!/usr/bin/env sh
set -e

echo "Esperando a MySQL en $DB_HOST:$DB_PORT ..."

# 1) Espera a que el puerto acepte TCP y un SELECT básico funcione
until mysql --protocol=TCP -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1" >/dev/null 2>&1; do
  echo "MySQL no listo aún, reintentando..."
  sleep 2
done

# 2) Pequeño margen por si el server cambia del temporal al definitivo
sleep 2

echo "MySQL listo."
