import { createClient } from "@supabase/supabase-js";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";

// Verify environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          
          // Get user from database
          const { data: user, error: userError } = await supabase
            .from('admin')
            .select('*')
            .eq('email', credentials.email)
            .single();

          if (userError) {
            console.error("Error fetching user:", userError);
            return null;
          }

          if (!user) {
            console.error("User not found");
            return null;
          }


          // Verify password using bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isValidPassword) {
            console.error("Invalid password");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || user.email,
            role: "admin",
          };
        } catch (error) {
          console.error("Unexpected error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 