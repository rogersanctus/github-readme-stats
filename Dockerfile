FROM node:18-alpine3.17 AS base
WORKDIR /app

FROM base AS deps

COPY ./package-lock.json ./
COPY ./package.json ./

FROM deps as build-deps

RUN npm i

FROM build-deps AS builder

COPY ./.env ./
COPY ./api ./api
COPY ./src ./src

ENV NODE_ENV=production
RUN npm run build

FROM base

COPY --from=builder /app/dist/ ./dist

ENV HOST=0.0.0.0
CMD ["node", "dist/server/index.js"]
