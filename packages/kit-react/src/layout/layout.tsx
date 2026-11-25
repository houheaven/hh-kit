import React from "react";
import "./layout.css";

interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): React.JSX.Element => {
  const { header, sidebar, children } = props;
  return (
    <div className="hh-layout">
      <header className="hh-layout-header">{header}</header>
      <div className="hh-layout-body">
        <aside className="hh-layout-sidebar">{sidebar}</aside>
        <main className="hh-layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
