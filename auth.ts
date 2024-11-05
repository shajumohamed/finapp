import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { connectDB } from "@/lib/mongdb"
import User from "@/models/User"

export const config = {
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        await connectDB()
        
        // Create or update user in database
        await User.findOneAndUpdate(
          { email: user.email },
          {
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: 'emailVerified' in user ? user.emailVerified : new Date(),
          },
          { upsert: true }
        )

        return true
      } catch (error) {
        console.error("Error saving user to database:", error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string
        
        // Fetch latest user data from database
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: session.user.email })
          if (dbUser) {
            session.user.name = dbUser.name
            session.user.image = dbUser.image
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)