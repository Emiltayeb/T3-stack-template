import { signOut } from 'next-auth/react';
import Head from 'next/head';
import type { ProtectedPage } from '../types/custom';
import { trpc } from '../utils/trpc';

const Home: ProtectedPage = () => {
  const { data, isLoading } = trpc.auth.getSecretMessage.useQuery();
  const { data: session } = trpc.auth.getSession.useQuery();
  console.log(session);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Create & share live shooping list with freinds' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {isLoading ? 'Loading..' : <h1> Inside Main Secret message: {data}</h1>}

      <button className='bg-teal-400  px-3 py-2' type='button' onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
};

Home.auth = true;
export default Home;
