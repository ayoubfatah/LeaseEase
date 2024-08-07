import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import connectDB from "./config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }: any) {
      try {
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const username = profile.email.split("@")[0];
          await User.create({
            username,
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session }: any) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
};

export const { handlers, auth } = NextAuth(authOptions);
