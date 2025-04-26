# Etapa de build
FROM node:18-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar archivos de Angular al contenedor Nginx
COPY --from=build-stage /app/dist/seminario_front /usr/share/nginx/html

# Copiar configuración custom de Nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
