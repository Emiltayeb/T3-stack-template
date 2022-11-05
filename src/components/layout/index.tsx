import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = function (props: LayoutProps) {
  return <>{props.children}</>;
};

export default Layout;
