import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import type { NextComponentType, NextPageContext } from "next";
import React from "react";
import Layout from "../components/layout.tsx";
type AppProps = {
  pageProps : {session: Session | null}
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

  return <Layout>
    {status === "loading" ? (
      <p>Loading</p>
    ) : !sessionData?.user ? (
      <div className="flex flex-col items-center justify-center gap-2 p-10">
        <h1 className="text-xl font-bold">Looks like your not logged in</h1>
        <button
          className="rounded-md border border-black bg-violet-50   px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in
        </button>
      </div>
    ) : (
     children 
    )}
  </Layout>;

};
export default trpc.withTRPC(MyApp);
