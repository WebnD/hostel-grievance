import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Trying to check user and create if needed")
      try {
        // Call your create-user API endpoint
        const response = await fetch("http://localhost:3000/api/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
          }),
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("User created/updated:", data);
        if (data.message === "Created new user") {
          return '/signup'; // Trigger redirect
        }

      } catch (error) {
        console.error("Error creating user:", error);
      }

      return true; // Always return true to allow sign-in
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
};