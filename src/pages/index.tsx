import { signOut } from "next-auth/react";
import Head from "next/head";
import type { ProtectedPage } from "../types/custom";
import { trpc } from "../utils/trpc";
import Trpc from "./api/trpc/[trpc]";

const Home  : ProtectedPage  = () => {
  const {data} = trpc.auth.getSecretMessage.useQuery()
    return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="Create & share live shooping list with freinds"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        Inside Main Secret message: {data}
        <button
          className="bg-teal-400  px-3 py-2"
          type="button"
          onClick={() => signOut()}
        >
          Sign out
        </button>


    </>
  );
};

Home.auth = true
export default Home;
