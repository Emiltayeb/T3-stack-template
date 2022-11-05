import React from 'react';

type LayoutProps = {
  children:React.ReactNode
}
const Layout  = function (props:LayoutProps) {
  return (
    <div className="container  mx-auto min-h-screen  p-4">
      {props.children}
    </div>
  );
};

export default Layout;
