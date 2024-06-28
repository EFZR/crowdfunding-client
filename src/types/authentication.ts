import { z } from "zod";

const authSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;

export type UserRegistrationForm = Pick<
  Auth,
  "email" | "username" | "password"
>;
