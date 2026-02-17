import { z } from "zod";

// 클라이언트
const clientSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_ENV: z.enum(["development", "production"]),
});

export const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
});

// 서버
const serverSchema = z.object({
  INTERNAL_AUTH_SECRET: z.string().min(10),
  DATABASE_URL: z.string().url(),
});

export const serverEnv = serverSchema.parse({
  INTERNAL_AUTH_SECRET: process.env.INTERNAL_AUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});
