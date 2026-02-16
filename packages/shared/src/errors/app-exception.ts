import { ErrorStatusMap } from "./error-status-map";
import type { ErrorCodeType } from "./error-code";

export class AppException extends Error {
  constructor(
    public readonly code: ErrorCodeType,
    message?: string,
  ) {
    super(message);
    this.name = "AppException";
  }

  get status(): number {
    return ErrorStatusMap[this.code];
  }
}

export function isAppException(e: unknown): e is AppException {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    "status" in e &&
    (e as { name?: string }).name === "AppException"
  );
}
