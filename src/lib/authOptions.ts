import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from 'argon2'
import { db } from "@/db/db"


interface credentialsInterface {
  Email: string
  Password: string
}

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: "perpustakaan",
      credentials: {
        Email: { label: "email", type: "email", placeholder: "example@yourmail.com" },
        Password: { label: "Password", type: "password" }
      },
      async authorize(credentials: credentialsInterface) {
        const { Email, Password } = credentials
        const getExistingUser: any = await db.user.findFirst({
          where: {
            Email: Email
          }
        })

        const verifyPassword = await argon2.verify(getExistingUser?.Password, Password)


        if (!getExistingUser) return null
        if (verifyPassword) return getExistingUser
        return null
      },
    } as any)
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, session }: any) {
      if (user) {
        return {
          ...token,
          UserID: user.UserID,
          Username: user.Username,
          Email: user.email,
          Nama_lengkap: user.Nama_lengkap,
          Alamat: user.Alamat
        }
      }
      return token
    },
    async session({ session, token, user }) {
      return {
        ...session, ...user,
        UserID: token.UserID,
        Username: token.Username,
        Nama_lengkap: token.Nama_lengkap,
        Alamat: token.Alamat,
      }
    },
  }
}