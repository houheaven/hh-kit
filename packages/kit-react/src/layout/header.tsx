
/* eslint-disable import/extensions */
 
 
/* eslint-disable react/function-component-definition */

import React from "react";
import { Link } from "react-router-dom";
import useRouterTitle from "@/hooks/useRouterTitle";
import "./style/header.less";

function Header(): React.ReactElement {
  const title = useRouterTitle();

  return (
    <div className="hh-header">
      <h1>
        <Link className="hh-header__title" to="/">React</Link>
        <p className="hh-header__subtitle">{title ? `> ${title}` : ""}</p>
      </h1>
      <a className="hh-header__more" href="http://studio.houheaven.com" rel="noreferrer" target="_blank">更多插件</a>
    </div>
  );
}

export default Header;
