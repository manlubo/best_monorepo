# ==============================
# 1단계: 의존성 설치
# ==============================
FROM node:22-alpine AS deps

WORKDIR /app

# corepack만 enable (버전은 packageManager에서 자동 인식)
RUN corepack enable

COPY pnpm-lock.yaml ./
COPY .npmrc ./

RUN pnpm fetch

COPY pnpm-workspace.yaml package.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile --offline


# ==============================
# 2단계: 빌드 + deploy
# ==============================
FROM deps AS builder

WORKDIR /app

COPY packages/config ./packages/config
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

RUN pnpm --filter @best-mono/shared build
RUN pnpm --filter @best-mono/api build

# production 전용 결과 생성
RUN pnpm deploy --filter @best-mono/api --prod /prod


# ==============================
# 3단계: 실행 전용 이미지
# ==============================
FROM node:22-alpine AS runner

WORKDIR /app

# deploy 결과만 복사
COPY --from=builder /prod /app

EXPOSE 4000

CMD ["node", "dist/main.js"]
