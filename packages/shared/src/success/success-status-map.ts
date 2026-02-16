import { SuccessCode } from "./success-code";

export const SuccessStatusMap: Record<number, keyof typeof SuccessCode> = {
  200: SuccessCode.OK,
  201: SuccessCode.CREATED,
};
