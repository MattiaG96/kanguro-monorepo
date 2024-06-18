#!/bin/bash

echo 'GENERATING ROOT ENV FILE'
echo
echo 'DB_PASSWORD=' >> .env
echo 'DB_USER=' >> .env
echo 'DB_NAME=' >> .env
echo
cat .env
echo
echo 'GENERATING API ENV FILE'
echo 'DB_HOST=' >> ./apps/api/.env
echo 'DB_PORT=5432' >> ./apps/api/.env
echo 'DB_USERNAME=' >> ./apps/api/.env
echo 'DB_PASSWORD=' >> ./apps/api/.env
echo 'DB_DATABASE=' >> ./apps/api/.env
echo 'GENERAL_AUTH_TOKEN=' >> ./apps/api/.env
echo
cat ./apps/api/.env
echo
echo 'GENERATING CLIENT ENV FILE'
echo 'VITE_BASE_URL=http://localhost:5173' >> ./apps/client/.env
echo 'VITE_MAPBOX_TOKEN=' >> ./apps/client/.env
echo 'VITE_AUTH_TOKEN=' >> ./apps/client/.env
echo
cat ./apps/client/.env
echo
cat recomendations.txt

