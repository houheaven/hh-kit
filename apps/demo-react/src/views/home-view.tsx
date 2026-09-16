
/* eslint-disable @typescript-eslint/naming-convention */

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HhFooter from "@houheaven/kit-react/hh-footer";
import VButton from "../components/v-button.tsx";
import "./home-view.css";

interface NavEntry {
  path: string;
  label: string;
}

const entries: NavEntry[] = [
  { path: "/hh-footer", label: "hhFooter" },
  { path: "/hh-image-dialog", label: "hhImageDialog" },
];

interface NavItemProps {
  entry: NavEntry;
}

const NavItem = ({ entry }: NavItemProps): React.JSX.Element => {
  const navigate = useNavigate();
  const handleClick = useCallback((): void => {
    navigate(entry.path);
  }, [navigate, entry.path]);
  return (
    <VButton type="primary" onClick={handleClick}>{entry.label}</VButton>
  );
};

const HomeView = (): React.JSX.Element => (
  <div className="home-view">
    <header className="hero">
      <h1>hh-kit React Demo</h1>
      <p className="subtitle">React 18 组件预览与调试</p>
    </header>

    <section className="nav-section">
      <h2>组件导航</h2>
      <div className="nav-grid">
        {entries.map(entry => (
          <NavItem key={entry.path} entry={entry} />
        ))}
      </div>
    </section>

    <HhFooter useHouheavenData />
  </div>
);

export default HomeView;
