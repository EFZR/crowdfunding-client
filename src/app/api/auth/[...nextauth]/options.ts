import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Apple from "next-auth/providers/apple";

import prisma from "@/src/lib/database";
import env from "@/src/env";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // Apple({
    //   clientId: env.APPLE_CLIENT_ID,
    //   clientSecret: env.APPLE_CLIENT_SECRET,
    // }),

    // Credentials({
    //   type: "credentials",
    //   credentials: {},
    //   authorize: (credentials, req) => {
    //     const {email, password }= credentials
    //   }
    // })
  ],

  pages: {
    signIn: "/authentication/login",
    newUser: "/authentication/register",
  },
};

export default authOptions;
