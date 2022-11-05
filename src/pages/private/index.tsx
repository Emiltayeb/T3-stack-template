import React from 'react';
import Layout from '../../components/layout';
import { ProtectedPage } from '../../types/custom';

const Private: ProtectedPage = function () {
  return (
    <Layout>
      <h1>Should be Private</h1>
    </Layout>
  );
};
Private.auth = true;
export default Private;
