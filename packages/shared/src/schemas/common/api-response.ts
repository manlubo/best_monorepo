import { z } from "zod";

export const apiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    code: z.string(),
    message: z.string().optional(),
    data: data.optional(),
  });

export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message?: string;
  data?: T;
};
