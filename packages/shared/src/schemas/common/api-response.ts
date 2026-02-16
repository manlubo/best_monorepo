import type { ErrorCodeType } from "../../errors/error-code";
import type { SuccessCodeType } from "../../success/success-code";
import { z } from "zod";

export type ApiResponse<T> =
  | {
      success: true;
      code: SuccessCodeType;
      data: T;
      message?: never;
    }
  | {
      success: false;
      code: ErrorCodeType;
      message: string;
      data?: never;
    };

export const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.union([
    z.object({
      success: z.literal(true),
      code: z.string(),
      data,
    }),
    z.object({
      success: z.literal(false),
      code: z.string(),
      message: z.string(),
    }),
  ]);
