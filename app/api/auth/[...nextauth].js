// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the username and password are correct (you can replace this with your database check)
        if (
          credentials.username === "admin" &&
          credentials.password === "adminpassword"
        ) {
          return { id: 1, name: "Admin", role: "admin" };
        } else if (
          credentials.username === "user" &&
          credentials.password === "userpassword"
        ) {
          return { id: 2, name: "User", role: "user" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
