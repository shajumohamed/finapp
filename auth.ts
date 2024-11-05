import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { connectDB } from "./lib/mongdb"
import User from "./models/User"
import Account from "./models/Account"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          
          // Check if user exists
          let dbUser = await User.findOne({ email: user.email });
          
          if (!dbUser) {
            // Create new user if doesn't exist
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: new Date(),
            });
          }

          // Create or update account
          await Account.findOneAndUpdate(
            { providerAccountId: account.providerAccountId },
            {
              userId: dbUser._id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state
            },
            { upsert: true }
          );
        } catch (error) {
          console.error("Error saving user to MongoDB:", error);
          return false;
        }
      }
      return true;
    },
  },
})