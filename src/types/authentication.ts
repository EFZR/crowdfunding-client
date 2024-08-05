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
  token: z
    .string()
    .min(1, {
      message: "Llena el token de confirmación.",
    })
    .max(6, {
      message: "Token invalido",
    }),
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

// Confirmation token schema.

export const confirmationTokenSchema = authSchema.pick({
  token: true,
});

export type ConfirmationToken = z.infer<typeof confirmationTokenSchema>;

// Request new Confirmation token schema.

export const requestConfirmationTokenSchema = authSchema.pick({
  email: true,
});

export type RequestConfirmationToken = z.infer<
  typeof requestConfirmationTokenSchema
>;

// Request new Password token schema.

export const requestNewPasswordTokenSchema = authSchema.pick({
  email: true,
});

export type RequestNewPasswordToken = z.infer<
  typeof requestConfirmationTokenSchema
>;

// New Password token schema.

export const newPasswordTokenSchema = authSchema.pick({
  token: true,
});

export type NewPasswordToken = z.infer<typeof newPasswordTokenSchema>;

// New Password schema

export const newPasswordSchema = authSchema
  .pick({
    password: true,
    token: true,
  })
  .extend({
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Contraseñas no coinciden.",
    path: ["confirm"],
  });

export type NewPassword = z.infer<typeof newPasswordSchema>;
