
import React from "react";
import loading from "@/images/react-logo.svg";
import "./loading.less";

const Loading = (): React.ReactElement => (
  <div className="page-loading">
    <img className="logo" src={loading} />
  </div>
);

export default Loading;
