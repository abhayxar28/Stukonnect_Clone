import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            throw new Error("Please enter your email and password");
          }

          console.log("Checking admin table for email:", credentials.email);

          // First check if user exists in admin table
          const { data: admin, error: adminError } = await supabase
            .from("admin")
            .select("*")
            .eq("email", credentials.email)
            .single();

          if (adminError) {
            console.log("Admin table error:", adminError);
            throw new Error("Database error occurred");
          }

          if (!admin) {
            console.log("No admin found with email:", credentials.email);
            throw new Error("Invalid email or user not found.");
          }

          // Verify password
          const validPassword = await bcrypt.compare(credentials.password, admin.password);

          if (!validPassword) {
            console.log("Invalid password for admin:", credentials.email);
            throw new Error("Invalid password");
          }

          // Return user data for session
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: "admin"
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user && 'role' in user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
