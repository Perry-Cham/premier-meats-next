import nextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import connectDB from '@/lib/db';
import userModel from '@/models/user-model';

const handler = nextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDB();
        console.log(email, password)
        const user = await userModel.findOne({ email:email });
        console.log(user)
        if (!user) return null;
        const isValid = await compare(password, user.password);
        if (isValid) {
          return { id: user._id, name: user.name, email: user.email };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    }
  }
});

export { handler as GET, handler as POST };