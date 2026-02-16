export const SuccessCode = {
  OK: "OK",
  CREATED: "CREATED",
} as const;

export type SuccessCodeType = (typeof SuccessCode)[keyof typeof SuccessCode];
