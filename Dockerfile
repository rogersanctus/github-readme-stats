FROM node:20.12-alpine3.18 AS base
WORKDIR /app

COPY ./.env ./

FROM base AS deps

COPY ./package-lock.json ./
COPY ./package.json ./

RUN npm install

FROM deps AS builder

COPY ./api ./api
COPY ./src ./src
COPY ./themes ./themes
COPY ./express.js ./
COPY ./rollup.config.js ./

ENV NODE_ENV=production
RUN npm run build

FROM base

COPY --from=builder /app/dist/ ./dist
COPY ./package.json ./

ENV HOST=0.0.0.0
CMD ["node", "dist/server/index.js"]
