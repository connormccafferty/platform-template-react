import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";

const checkEnv = ({ fin }) => {
  if (!fin) {
    return <div>You are probably running in a Browser</div>;
  }
  return <AppRouter fin={fin} />;
};

ReactDOM.render(checkEnv(window), document.getElementById("root"));
