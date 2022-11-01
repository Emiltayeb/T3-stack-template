import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

const Home: NextPage = (props) => {
  // const hello = trpc.example.getAll.useQuery();
  console.log(props);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Create & share live shooping list with freinds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50   px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={
          sessionData
            ? () => signOut()
            : () => signIn("google", { callbackUrl: "/" })
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
