# Etapa 1: Constructor
FROM node:18.20.2 as builder
ARG VITE_GOOGLE_API_KEY
ENV VITE_GOOGLE_API_KEY $VITE_GOOGLE_API_KEY
ARG API_BASE_URL
ENV API_BASE_URL $API_BASE_URL


WORKDIR /opt/cine-hub-web
COPY ./web /opt/cine-hub-web
RUN npm ci
RUN npm run build

# Etapa 2: Producción
FROM node:18.20.2-alpine3.19
COPY ./api /opt/cine-hub-api
WORKDIR /opt/cine-hub-api
COPY --from=builder /opt/cine-hub-web/dist /opt/cine-hub-api/web/build
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]