
import React from "react";
import "./style/layout.less";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): React.JSX.Element => {
  const { children } = props;
  return (
    <div className="hh-layout">
      <div className="hh-layout-body">
        <main className="hh-layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
