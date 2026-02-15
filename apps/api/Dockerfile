# ==============================
# 1단계: 의존성 설치 단계
# ==============================
FROM node:22-alpine AS deps

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate

# 작업 디렉토리 설정
WORKDIR /app

# lock 파일 기반으로 패키지 사전 다운로드
# 실제 설치 전에 pnpm store에 패키지를 미리 가져온다
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# workspace 구조 및 package.json만 복사
# 소스코드는 아직 복사하지 않음 (Docker 캐시 최적화 목적)
COPY pnpm-workspace.yaml package.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

# 오프라인 모드로 의존성 설치
# fetch 단계에서 다운로드한 store를 사용한다
RUN pnpm install --frozen-lockfile --offline


# ==============================
# 2단계: 빌드 단계
# ==============================
FROM deps AS builder

WORKDIR /app

# 실제 소스 코드 복사
COPY packages/config ./packages/config
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

# shared 패키지 먼저 빌드
# api가 shared를 참조하므로 반드시 먼저 빌드한다
RUN pnpm --filter @best-mono/shared build

# api 빌드
RUN pnpm --filter @best-mono/api build


# ==============================
# 3단계: 실행 전용 경량 이미지
# ==============================
FROM node:22-alpine AS runner

# pnpm 활성화
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate

WORKDIR /app

# builder 결과 전체 복사
COPY --from=builder /app /build

WORKDIR /build

# api에 필요한 production 의존성만 추출
# 불필요한 workspace 패키지 제거
RUN pnpm deploy --filter @best-mono/api --prod --legacy /app

# 실제 실행 경로로 이동
WORKDIR /app

# 애플리케이션 포트 노출
EXPOSE 4000

# NestJS 빌드 결과 실행
CMD ["node", "dist/main.js"]
