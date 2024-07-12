import { z } from "zod";

const authSchema = z.object({
  id: z.string(),
  username: z
    .string()
    .min(1, {
      message: "El nombre de usuario es obligatorio.",
    })
    .min(8, {
      message: "El nombre usuario debe tener al menos 8 caracteres.",
    }),
  email: z
    .string()
    .min(1, {
      message: "El correo electronico es obligatorio.",
    })
    .regex(/\S+@\S+\.\S+/, {
      message: "Correo Electronico invalido.",
    }),
  password: z
    .string()
    .min(1, {
      message: "La contraseña es obligatoria.",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
  token: z.string(),
  image: z.any(),
});

export type Auth = z.infer<typeof authSchema>;

// Login schema.

export const loginSchema = authSchema.pick({
  email: true,
  password: true,
});

export type UserLoginForm = z.infer<typeof loginSchema>;

// Registration schema.

export const registrationSchema = authSchema
  .pick({
    username: true,
    email: true,
    password: true,
  })
  .extend({
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Contraseñas no coinciden.",
    path: ["confirm"],
  });

export type UserRegistrationForm = z.infer<typeof registrationSchema>;

// Return schema.

export const userReturn = authSchema.pick({
  id: true,
  username: true,
  email: true,
  image: true,
});

export type UserReturn = z.infer<typeof userReturn>;
