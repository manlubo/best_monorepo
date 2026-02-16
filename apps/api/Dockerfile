# ==============================
# 1. deps
# ==============================
FROM node:22-alpine AS deps
RUN corepack enable
WORKDIR /app

COPY pnpm-lock.yaml ./
COPY .npmrc ./
RUN pnpm fetch

COPY pnpm-workspace.yaml package.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --offline

# ==============================
# 2. builder
# ==============================
FROM deps AS builder
WORKDIR /app

COPY packages/config ./packages/config
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

RUN pnpm --filter @best-mono/shared build
RUN pnpm --filter @best-mono/api build

RUN pnpm deploy --filter @best-mono/api --prod /prod

# ==============================
# 3. runtime
# ==============================
FROM node:22-alpine AS runner
WORKDIR /app

# prod 결과만 복사
COPY --from=builder /prod/node_modules ./node_modules
COPY --from=builder /prod/package.json ./package.json
COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
