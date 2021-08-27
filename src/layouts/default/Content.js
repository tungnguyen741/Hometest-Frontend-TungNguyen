import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Content = ({ props, component: Component, route }) => {
  return (
    <div className="default-layout">
      {!props?.headerHide ? <Header props={{ ...props }} /> : null}

      <div className="contents-wrapper">
        <Component route={route} props={{ ...props }} />
        <div className="clearfix" />
      </div>

      {props?.footerShow ? <Footer props={{ ...props }} /> : null}
    </div>
  );
};
export default Content;
