import NextAuth, { type NextAuthOptions } from 'next-auth';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Spotify from 'next-auth/providers/spotify';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 24 * 60 * 60, // 1 hour
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email',
      token: 'https://accounts.spotify.com/api/token',
      userinfo: 'https://api.spotify.com/v1/me',
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
