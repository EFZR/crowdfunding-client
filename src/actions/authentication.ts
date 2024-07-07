"use server";

import { signIn } from "../lib/nextauth";
import { UserLoginForm } from "../types/authentication";

export async function authenticate(user: UserLoginForm) {
  try {
    const response = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
