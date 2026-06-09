# ── Etapa 1: build ─────────────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Con nginx proxy, el frontend llama a /api (relativo)
ENV REACT_APP_BACKEND_URL=""

RUN yarn build

# ── Etapa 2: serve con nginx ────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
