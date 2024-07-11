import { z } from "zod";

// Error Schema.

export const errorSchema = z.object({
  message: z.string(),
});

export type ErrorType = z.infer<typeof errorSchema>;

// Response Schema.

export const responseSchema = z.object({
  errors: z.array(errorSchema).nullable(),
  success: z.string().nullable(),
  token: z.string().nullable(),
});

export type Response = z.infer<typeof responseSchema>;
