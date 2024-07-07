"use server";

import { signIn } from "../lib/nextauth";
import { hashPassword } from "../lib/bcrypt";
import { UserLoginForm, UserRegistrationForm } from "../types/authentication";

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

export async function createAccount(user: UserRegistrationForm) {
  const { email, password, name } = user;
  // Prevent duplicate records.
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Usuario con ese correo, ya esta registrado.");
  }

  // Hash password.
  const hashedPassword = await hashPassword(password);

  // Init creation user.
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return "Usuario creado correctamente";
}
