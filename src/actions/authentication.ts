"use server";

import { FormStateResult } from "../types/formState";
import {
  UserLoginForm,
  UserRegistrationForm,
  loginSchema,
  registrationSchema,
} from "../types/authentication";

export async function createAccount(
  userRegistrationForm: UserRegistrationForm
): Promise<FormStateResult> {
  const result = registrationSchema.safeParse(userRegistrationForm);

  if (!result.success) {
    return {
      type: "error",
      message: "",
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    type: "success",
    message: "Autenticando.",
    errors: {},
  };
}

export async function authenticate(
  userLoginForm: UserLoginForm
): Promise<FormStateResult> {
  const result = loginSchema.safeParse(userLoginForm);

  if (!result.success) {
    return {
      type: "error",
      message: "",
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    type: "success",
    message: "Autenticando.",
    errors: {},
  };
}
