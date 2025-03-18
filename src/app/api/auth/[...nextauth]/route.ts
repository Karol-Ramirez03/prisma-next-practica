import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter( prisma ) as Adapter,
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials }) {
        console.log(prisma)
        return true 
    },
    async jwt({token, user, account, profile}) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
        token.roles = dbUser?.roles
        return token
    },
    async session({session, token, user}) {
        return session
    }
  }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST }

