FROM node:14-alpine

LABEL version="1.0" description="Aplicación Node.js en producción" maintainer="tu_email@dominio.com"

ARG APP_VERSION=1.0

ENV NODE_ENV=production
ENV APP_VERSION=$APP_VERSION

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["index.js"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD curl -f http://89.116.49.105:3000/ || exit 1
