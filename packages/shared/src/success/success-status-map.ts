import { SuccessCode } from "./success-code";
import type { SuccessCodeType } from "./success-code";

export const SuccessStatusMap: Partial<Record<number, SuccessCodeType>> = {
  200: SuccessCode.OK,
  201: SuccessCode.CREATED,
};
