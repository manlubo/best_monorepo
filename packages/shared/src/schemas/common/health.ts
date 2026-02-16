import { z } from "zod";

export const HealthSchema = z.object({
  status: z.string(),
  timestamp: z.string(),
});

export type HealthResponse = z.infer<typeof HealthSchema>;
