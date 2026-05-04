import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/users";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials): Promise<any> {
        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email,
        }).lean();

        if (!user) return null;

        if (user.password !== credentials?.password) {
          return null;
        }

        // ✅ RETURN FULL USER
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
          courses: user.courses,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // 🔥 store full user in token
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    // 🔥 send full user to session
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};