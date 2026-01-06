import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const db = await getDatabase();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (!user.password) {
          throw new Error('Please use Google sign-in for this account');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const db = await getDatabase();
          const usersCollection = db.collection('users');

          // Check if user exists
          const existingUser = await usersCollection.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user from Google
            const newUser = {
              email: user.email,
              name: user.name || profile?.name || 'User',
              image: user.image || profile?.picture,
              provider: 'google',
              googleId: account.providerAccountId,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            await usersCollection.insertOne(newUser);
          } else {
            // Update existing user with Google info if needed
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  googleId: account.providerAccountId,
                  image: user.image || profile?.picture,
                  updatedAt: new Date(),
                },
              }
            );
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      // Get user ID from database for Google users
      if (account?.provider === 'google' && token?.email) {
        try {
          const db = await getDatabase();
          const usersCollection = db.collection('users');
          const dbUser = await usersCollection.findOne({ email: token.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error('Error fetching user from database:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

