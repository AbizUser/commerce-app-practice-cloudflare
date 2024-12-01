import { nextAuthOptions } from "@/app/lib/next-auth/options";
import NextAuth from "next-auth/next";
export const runtime = "edge";
const handler = NextAuth( nextAuthOptions );

export { handler as GET, handler as POST };