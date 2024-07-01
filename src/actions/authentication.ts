"use server";

import prisma from "../lib/database";
import { FormStateResult } from "../types/formState";
import {
  UserLoginForm,
  UserRegistrationForm,
  loginSchema,
  registrationSchema,
} from "../types/authentication";
import { checkPassword, hashPassword } from "../lib/bcrypt";
import { Prisma } from "@prisma/client";
import { logError } from "../lib";
import { generateJWT } from "../lib/jwt";

export async function createAccount(
  userRegistrationForm: UserRegistrationForm
): Promise<FormStateResult> {
  const result = registrationSchema.safeParse(userRegistrationForm);
  const { username, email, password } = userRegistrationForm;

  // Validation.
  if (!result.success) {
    return {
      type: "error",
      message: "",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return {
      type: "error",
      message: "",
      errors: { userExists: ["El usuario ya existe."] },
    };
  }

  // Hash password.
  const enc_password = await hashPassword(password);

  // Setup.
  const data: UserRegistrationForm = {
    email,
    username,
    password: enc_password,
  };

  // Create user.
  try {
    await prisma.user.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logError(error);
      return {
        type: "error",
        message: "",
        errors: { serverError: ["Erros interno, intente luego."] },
      };
    }
  }

  return {
    type: "success",
    message: "Usuario creado correctamente.",
    errors: {},
  };
}

export async function authenticate(
  userLoginForm: UserLoginForm
): Promise<FormStateResult> {
  const result = loginSchema.safeParse(userLoginForm);
  const { email, password } = userLoginForm;

  // Validation.
  if (!result.success) {
    return {
      type: "error",
      message: "",
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Search User.
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // User exists.
  if (!userExists) {
    return {
      type: "error",
      message: "",
      errors: { userNotFound: ["Usuario no encontrado."] },
    };
  }

  // Check if user has a password.
  if (!userExists.password) {
    return {
      type: "error",
      message: "",
      errors: {
        passwordMissing: [
          "Contraseña no definida. Revisa tu email para crear una contraseña.",
        ],
      },
    };
  }

  // Check Hashed password
  const isPasswordValid = await checkPassword(password, userExists.password);

  if (!isPasswordValid) {
    return {
      type: "error",
      message: "",
      errors: { incorrectPassword: ["Contraseña Incorrecta."] },
    };
  }

  // Generate JWT
  const token = generateJWT({ id: userExists.id, email: userExists.email });
  console.log(token);

  return {
    type: "success",
    message: "Autenticando.",
    errors: {},
  };
}
