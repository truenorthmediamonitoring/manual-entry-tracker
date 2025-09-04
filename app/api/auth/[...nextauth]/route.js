import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        country: { label: "Country", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/checkcredentials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!res.ok) return null;

          const user = await res.json();
          console.log("Authorize returning user:", user);
          return user || null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback - before:", { token, user });
      if (user) {
        token.id = user.id;
        token.country = user.country;
      }
      // console.log("JWT callback - after:", token);
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback - before:", session);
      session.user.id = token.id;
      session.user.country = token.country;
      // console.log("Session callback - after:", session);
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
});

export { handler as GET, handler as POST };
