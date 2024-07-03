import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { Provider } from "next-auth/providers/index";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/src/lib/database";
import env from "@/src/env";

// TODO: Apple API needs to be payed to use it.
// import Apple from "next-auth/providers/apple";

const providers: Provider[] = [
  Google({
    clientId: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
  }),

  Facebook({
    clientId: env.FACEBOOK_CLIENT_ID!,
    clientSecret: env.FACEBOOK_CLIENT_SECRET!,
  }),

  // Apple({
  //   clientId: env.APPLE_CLIENT_ID,
  //   clientSecret: env.APPLE_CLIENT_SECRET,
  // }),

  Credentials({
    type: "credentials",
    credentials: {
      email: { label: "Correo", type: "email" },
      password: { label: "Contraseña", type: "password" },
    },
    authorize: async (credentials) => {
      if (credentials?.email !== "correo@correo.com") {
        return null;
      }

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
  debug: env.NODE_ENV !== "production" ? true : false,
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/authentication/login",
    newUser: "/authentication/register",
  },
});
