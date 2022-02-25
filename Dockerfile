### BASE ###
FROM node:16-slim as base

WORKDIR /app

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

COPY package.json yarn.lock ./
COPY prisma/schema.prisma ./prisma/
RUN yarn install --pure-lockfile --silent

### BUILDER ###
FROM base AS builder

COPY . ./
RUN yarn build

### RUNNER ###
FROM base

ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0


COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/node_modules/.prisma/client/ node_modules/.prisma/client

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
