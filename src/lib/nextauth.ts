import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { Provider } from "next-auth/providers/index";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/src/lib/database";

// TODO: Apple API needs to be payed to use it.
import Apple from "next-auth/providers/apple";

const providers: Provider[] = [
  Google,
  Facebook,
  Apple,
  Credentials({
    type: "credentials",
    credentials: {
      email: { label: "Correo", type: "email" },
      password: { label: "Contraseña", type: "password" },
    },
    authorize: async (credentials) => {
      if (
        credentials?.email !== "correo@correo.com" &&
        credentials?.password !== "Password"
      ) {
        return null;
      }

      console.log("succesful");

      return {
        id: "1",
        email: "correo@correo.com",
        name: "correo",
        image: "",
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (provider instanceof Function) {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== "production" ? true : false,
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/authentication/login",
    newUser: "/authentication/register",
  },
});
