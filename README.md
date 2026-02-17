# @best-mono/root

> **NestJS + Next.js 모노레포 SaaS 템플릿**
>
> shared 패키지를 통해 API와 Web 사이 타입 계약을 보장하는,
> 계약 중심(Contract‑First) 풀스택 모노레포입니다.

---

## 1. 프로젝트 개요

### 목적

이 모노레포는 **SaaS 서비스의 기반 구조**로 설계되었습니다.
백엔드(NestJS)와 프론트엔드(Next.js)가 하나의 저장소 안에서 **동일한 타입 계약**을 공유하고,
빌드·린트·포맷 설정을 중앙에서 관리하여 팀 규모가 커져도 일관성을 유지합니다.

### 설계 철학

| 원칙                                | 설명                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------- |
| **계약 중심 설계 (Contract‑First)** | Zod 스키마를 `shared`에 정의 → API와 Web 양쪽에서 사용                  |
| **Import 경계 강제**                | ESLint `import/no-restricted-paths` 로 앱 간 직접 import 차단           |
| **단일 진실 소스 (Single Source)**  | tsconfig, eslint, prettier 규칙을 `packages/config` 한 곳에서 관리      |
| **의존성 버전 통일**                | pnpm `catalog:`로 공용 패키지 버전을 워크스페이스 루트에서 한 번만 선언 |
| **확장에 열린 구조**                | 새 도메인 추가 시 shared → api → web 순서로 최소한의 파일만 추가하면 됨 |

---

## 2. 기술 스택

### apps/api — NestJS 11

| 카테고리    | 기술                                         |
| ----------- | -------------------------------------------- |
| 프레임워크  | NestJS 11 (`@nestjs/core`, `@nestjs/common`) |
| HTTP 어댑터 | Express (`@nestjs/platform-express`)         |
| 환경 변수   | `@nestjs/config`                             |
| 검증        | Zod (`@best-mono/shared` 스키마 재사용)      |
| 테스트      | Jest + Supertest                             |
| 빌드        | `nest build` → `dist/` 출력                  |
| 컨테이너    | 멀티스테이지 Dockerfile (node:22-alpine)     |

### apps/web — Next.js 16 (App Router)

| 카테고리   | 기술                                              |
| ---------- | ------------------------------------------------- |
| 프레임워크 | Next.js 16 (React 19, App Router)                 |
| 스타일링   | Tailwind CSS 4                                    |
| 상태 관리  | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) |
| 서버 상태  | TanStack React Query 5 (+ DevTools)               |
| 폼 관리    | React Hook Form + `@hookform/resolvers` (Zod)     |
| 검증       | Zod (`@best-mono/shared` 스키마 재사용)           |

### packages/shared — 타입 계약 계층

| 카테고리      | 기술                                           |
| ------------- | ---------------------------------------------- |
| 스키마 검증   | Zod 4                                          |
| 빌드          | tsup (CJS + ESM dual build, `.d.ts` 자동 생성) |
| 내보내기 구조 | `schemas/`, `errors/`, `success/`              |

### packages/config — 설정 중앙 관리

설정 파일들을 한 곳에 모아 앱마다 `extends`/`require` 로 재사용합니다.

| 설정       | 파일                                           |
| ---------- | ---------------------------------------------- |
| TypeScript | `tsconfig/base.json`, `nest.json`, `next.json` |
| ESLint     | `eslint/index.mjs`                             |
| Prettier   | `prettier/index.cjs`                           |

### 빌드 오케스트레이션 — Turborepo

Turbo가 `build`, `dev`, `lint`, `typecheck`, `test` 태스크를 병렬로 실행하고,
`dependsOn: ["^build"]` 설정으로 shared 빌드가 먼저 완료된 뒤 앱 빌드가 진행됩니다.

---

## 3. 폴더 구조

```
@best-mono/root
├── apps/
│   ├── api/                     # NestJS 11 백엔드
│   │   ├── src/                 # 소스 코드
│   │   ├── test/                # E2E 테스트
│   │   ├── Dockerfile           # 멀티스테이지 Docker 빌드
│   │   ├── .env / .env.example  # 환경 변수
│   │   └── tsconfig.json        # packages/config/tsconfig/nest.json 상속
│   │
│   └── web/                     # Next.js 16 프론트엔드
│       ├── src/                 # App Router 기반 소스
│       ├── public/              # 정적 파일
│       ├── .env / .env.example  # 환경 변수
│       └── tsconfig.json        # packages/config/tsconfig/next.json 상속
│
├── packages/
│   ├── shared/                  # Zod 기반 타입 계약 (CJS+ESM)
│   │   ├── src/
│   │   │   ├── schemas/         # 도메인별 Zod 스키마
│   │   │   ├── errors/          # 에러 코드 & 예외 정의
│   │   │   ├── success/         # 성공 코드 정의
│   │   │   └── index.ts         # 통합 re-export
│   │   └── dist/                # tsup 빌드 결과물
│   │
│   └── config/                  # 공유 설정
│       ├── tsconfig/            # base.json, nest.json, next.json
│       ├── eslint/              # ESLint flat config
│       └── prettier/            # Prettier 설정
│
├── turbo.json                   # Turborepo 태스크 설정
├── pnpm-workspace.yaml          # 워크스페이스 + catalog 정의
├── package.json                 # 루트 스크립트 & devDependencies
├── tsconfig.json                # 프로젝트 레퍼런스 (composite)
├── .editorconfig                # 에디터 공통 설정
├── .prettierrc.cjs              # → packages/config/prettier 위임
├── .npmrc                       # pnpm 옵션
├── commitlint.config.cjs        # Conventional Commit 규칙
└── .husky/                      # Git 훅 (lint-staged 등)
```

---

## 4. 설정 관리 위치

### TypeScript

```
packages/config/tsconfig/base.json   ← 공통 strict 옵션
packages/config/tsconfig/nest.json   ← API 전용 (decorator, CJS)
packages/config/tsconfig/next.json   ← Web 전용 (JSX, ESNext)

apps/api/tsconfig.json               → extends "../../packages/config/tsconfig/nest.json"
apps/web/tsconfig.json               → extends "../../packages/config/tsconfig/next.json"
루트 tsconfig.json                    → composite 프로젝트 레퍼런스만 선언
```

### ESLint

```
packages/config/eslint/index.mjs     ← baseConfig, tsStrictConfig 정의
apps/api/eslint.config.mjs            → config 패키지에서 import 하여 사용
apps/web/eslint.config.mjs            → config 패키지에서 import 하여 사용
```

**주요 규칙:** `import/no-restricted-paths`로 `api ↔ web` 간 직접 import 차단, `packages → apps` 역방향 참조 차단.

### Prettier

```
packages/config/prettier/index.cjs   ← 실제 설정 (printWidth: 80, double quotes, semi 등)
.prettierrc.cjs                       → require("./packages/config/prettier/index.cjs") 위임
```

### EditorConfig

루트 `.editorconfig` 에서 indent 2 spaces, LF 개행, UTF-8 등을 일괄 관리합니다.

### Turbo

루트 `turbo.json`에서 `dev`, `build`, `lint`, `typecheck`, `test` 태스크를 정의합니다.
`globalDependencies`로 tsconfig 변경 시 전체 캐시가 무효화됩니다.

### 환경 변수

| 앱  | 파일 위치       | 설명                                              |
| --- | --------------- | ------------------------------------------------- |
| api | `apps/api/.env` | `NODE_ENV`, `PORT` 등 서버 변수                   |
| web | `apps/web/.env` | `NEXT_PUBLIC_*` (클라이언트), 서버 전용 변수 구분 |

> 각 앱에 `.env.example`이 포함되어 있습니다. 클론 후 `.env.example`을 복사하여 `.env`로 사용하세요.

### pnpm Catalog

`pnpm-workspace.yaml`의 `catalog:` 섹션에 공용 패키지 버전을 선언하면,
각 앱의 `package.json`에서 `"zod": "catalog:"` 형태로 참조하여 **버전을 한 곳에서 통일** 합니다.

```yaml
# pnpm-workspace.yaml
catalog:
  "@types/node": ^22.0.0
  zod: ^4.3.6
```

---

## 5. 실행 방법

### 사전 준비

```bash
# Node 22 + pnpm 10 이상이 필요합니다
corepack enable
pnpm install
```

### 개발 서버 (API + Web 동시)

```bash
pnpm dev        # Turbo가 api (4000) + web (3000) 동시 실행
```

### 개별 앱 실행

```bash
pnpm --filter @best-mono/api dev     # API만 실행
pnpm --filter @best-mono/web dev     # Web만 실행
```

### 타입 체크

```bash
pnpm typecheck  # 전체 워크스페이스 타입 체크
```

### 린트

```bash
pnpm lint       # 전체 워크스페이스 린트
```

### 포맷

```bash
pnpm format         # Prettier로 전체 포맷
pnpm format:check   # 포맷 검사만 (CI용)
```

---

## 6. 빌드 방법

### 전체 빌드

```bash
pnpm build      # shared → api, web 순서로 빌드 (Turbo dependsOn)
```

### API Docker 빌드

```bash
# 프로젝트 루트에서 실행
docker build -f apps/api/Dockerfile -t best-mono-api .
docker run -p 4000:4000 best-mono-api
```

**빌드 전략 (3-Stage):**

1. **deps** — `pnpm fetch` + `install --frozen-lockfile`으로 의존성만 캐싱
2. **builder** — shared 빌드 → API 빌드 → `pnpm deploy --prod`로 프로덕션 의존성 추출
3. **runner** — `node:22-alpine` 최소 이미지에 dist + node_modules만 복사

---

## 7. 환경 변수 설정

### API (`apps/api/.env`)

```env
NODE_ENV=development
PORT=4000
```

### Web (`apps/web/.env`)

```env
# 클라이언트 (브라우저에 노출)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_APP_ENV=development

# 서버 (서버 컴포넌트/API Route에서만 접근)
INTERNAL_AUTH_SECRET=super-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/db
```

> 💡 각 앱 디렉토리의 `.env.example`을 `.env`로 복사한 뒤 값을 채워 넣으세요.
>
> ```bash
> cp apps/api/.env.example apps/api/.env
> cp apps/web/.env.example apps/web/.env
> ```

---

## 8. 의존성 설치

루트에 편의 스크립트가 준비되어 있습니다.

```bash
# 프로덕션 의존성 추가
pnpm api:i <패키지명>         # @best-mono/api에 추가
pnpm web:i <패키지명>         # @best-mono/web에 추가
pnpm shared:i <패키지명>      # @best-mono/shared에 추가

# devDependency로 추가
pnpm api:i -D <패키지명>
pnpm web:i -D <패키지명>

# 패키지 제거
pnpm api:r <패키지명>
pnpm web:r <패키지명>

# 루트 devDependency 추가 (빌드 도구, 린터 등)
pnpm add -Dw <패키지명>
```

> ⚠️ **직접 앱 디렉토리로 이동하여 `pnpm add` 하지 마세요.** 루트 스크립트를 사용해야 lockfile이 올바르게 관리됩니다.

---

## 9. 새 도메인 추가하기

예시: `post` (게시글) 도메인을 추가하는 흐름입니다.

### Step 1. shared — 스키마 정의

```
packages/shared/src/schemas/post/
├── create-post.schema.ts
└── index.ts
```

```ts
// create-post.schema.ts
import { z } from "zod/v4";

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
});

export type CreatePostDto = z.infer<typeof CreatePostSchema>;
```

`schemas/index.ts`에서 re-export 후 `pnpm --filter @best-mono/shared build` 실행.

### Step 2. api — 모듈 생성

```
apps/api/src/post/
├── post.module.ts
├── post.controller.ts
└── post.service.ts
```

```ts
// post.controller.ts
import { CreatePostSchema } from "@best-mono/shared";
// 컨트롤러에서 스키마로 요청 검증
```

### Step 3. web — 도메인 컴포넌트 작성

도메인 중심 구조에 맞게 구성합니다.

```
apps/web/src/domains/post/
├── api/          # API 호출 함수
├── hooks/        # React Query 훅
├── components/   # 게시글 관련 UI
└── types/        # 프론트 전용 타입 (shared 스키마 기반)
```

```ts
// domains/post/hooks/useCreatePost.ts
import type { CreatePostDto } from "@best-mono/shared";
// → shared 스키마 타입을 그대로 참조
```

> **핵심 포인트:** API 요청/응답의 타입은 항상 shared에서 정의하고,
> 프론트와 백엔드 양쪽에서 동일한 스키마를 import 하여 계약을 보장합니다.

---

## 10. 이 템플릿이 적합한 프로젝트

| ✅ 적합                                        | ❌ 부적합                              |
| ---------------------------------------------- | -------------------------------------- |
| B2B / B2C SaaS 서비스                          | 정적 사이트, 랜딩 페이지               |
| API + 관리자 페이지를 함께 운영하는 서비스     | 마이크로서비스 수십 개를 관리하는 경우 |
| 2~10명 규모의 풀스택 팀                        | 프론트·백 팀이 완전히 분리된 조직      |
| MVP를 빠르게 만들고 점진적으로 확장하려는 경우 | 모바일 앱 전용 백엔드 (별도 BFF 필요)  |
| 프론트-백 간 타입 일관성이 중요한 서비스       | 배치 처리 전용 서비스                  |

---

## 사용 시나리오 예시

> **"회원가입 API와 폼을 추가해야 한다"** 라는 요구사항이 들어왔을 때:

```
1. packages/shared/src/schemas/auth/signup.schema.ts
   → SignupSchema(Zod) + SignupDto(타입) 정의

2. pnpm --filter @best-mono/shared build
   → CJS + ESM으로 빌드, 타입 자동 생성

3. apps/api/src/auth/auth.controller.ts
   → import { SignupSchema } from "@best-mono/shared"
   → 요청 body를 SignupSchema.parse()로 검증

4. apps/web/src/domains/auth/hooks/useSignup.ts
   → import type { SignupDto } from "@best-mono/shared"
   → useMutation에 SignupDto 타입 적용

5. apps/web/src/domains/auth/components/SignupForm.tsx
   → React Hook Form + zodResolver(SignupSchema)
   → 프론트 검증도 동일한 스키마 사용

6. pnpm dev → API(4000) + Web(3000) 동시 실행하여 확인
```

**결과:** 프론트와 백엔드가 **동일한 Zod 스키마**를 사용하므로,
DTO가 변경되면 양쪽에서 즉시 타입 에러가 발생합니다.
"API는 수정했는데 프론트를 깜빡했다" 같은 사고를 구조적으로 방지합니다.

---
