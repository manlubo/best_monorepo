import { ErrorStatusMap } from "./error-status-map";
import type { ErrorCodeType } from "./error-code";

export function getHttpStatus(code: ErrorCodeType): number {
  return ErrorStatusMap[code] ?? 500;
}
