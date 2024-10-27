import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../prisma";

export const nextAuthOptions: NextAuthOptions = {
  debug:false,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here...https://next-auth.js.org/configuration/providers/oauth
  ],
  //user認証&prismaへのsession保存
  adapter: PrismaAdapter(prisma),
  callbacks: {
      session: ({ session, user }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
        },
      };
    },
  },
};