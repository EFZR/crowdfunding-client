import { z } from "zod";

// Error Schema.

export const errorSchema = z.object({
  message: z.string(),
});

export type ErrorType = z.infer<typeof errorSchema>;

// Response Schema.

export const responseSchema = z.object({
  errors: z.array(errorSchema).optional(),
  success: z.string().optional(),
  token: z.string().optional(),
});

export type Response = z.infer<typeof responseSchema>;
