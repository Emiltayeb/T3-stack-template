import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import '../styles/globals.css';
import type { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import Layout from '../components/layout';
import Auth from '../components/auth';
type AppProps = {
  pageProps: { session: Session | null };
  Component: NextComponentType<NextPageContext, unknown, unknown> & { auth?: boolean };
};
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <WithAuth>
          <Component {...pageProps} />
        </WithAuth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

const WithAuth = function ({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();
  return (
    <Layout>
      {status === 'loading' ? <p>Loading</p> : !sessionData?.user ? <Auth /> : children}
    </Layout>
  );
};
export default trpc.withTRPC(MyApp);
