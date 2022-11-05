import { signIn } from 'next-auth/react';
import { FaSpotify } from 'react-icons/fa';
import React from 'react';

const providersMap = {
  spotify: <FaSpotify />,
};

const Auth = function () {
  return (
    <div>
      <h1>Looks like your not logged in</h1>
      {Object.entries(providersMap).map(([name, icon]) => {
        return (
          <button key={name} onClick={() => signIn(name)}>
            Sign in with {name} {icon}
          </button>
        );
      })}
    </div>
  );
};

export default Auth;
