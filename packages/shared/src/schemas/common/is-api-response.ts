import type { ApiResponse } from "./api-response";

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return typeof obj.success === "boolean" && typeof obj.code === "string";
}
