import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { Provider } from "next-auth/providers/index";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/src/lib/database";
import { checkPassword } from "./bcrypt";

// TODO: Apple API needs to be payed to use it.
import Apple from "next-auth/providers/apple";
import { loginSchema } from "../types/authentication";

const providers: Provider[] = [
  Google,
  Facebook,
  Apple,
  Credentials({
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "password", type: "password" },
    },

    async authorize(credentials) {
      if (credentials === null) return null;

      const result = loginSchema.safeParse(credentials);

      if (!result.success) {
        return null;
      }

      // Search User.
      const userExists = await prisma.user.findUnique({
        where: { email: result.data.email },
      });

      if (!userExists) {
        return null;
      }

      // TODO: Check if user is confirmed

      // Check password.
      if (!userExists.password) {
        return null;
      }

      const isPasswordCorrect = await checkPassword(
        result.data.password,
        userExists.password
      );

      if (!isPasswordCorrect) {
        return null;
      }

      return {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        image: userExists.image,
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/authentication/login",
  },
});
