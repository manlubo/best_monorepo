import type { ApiResponse } from "./api-response";

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    "code" in value
  );
}
