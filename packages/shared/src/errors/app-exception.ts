import type { ErrorCodeType } from "./error-code";

export class AppException extends Error {
  constructor(
    public readonly code: ErrorCodeType,
    message?: string,
  ) {
    super(message);
    this.name = "AppException";
  }
}
