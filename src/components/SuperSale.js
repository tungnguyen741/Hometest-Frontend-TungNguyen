import React from "react";

function SuperSale({ children = () => {} }) {
  return <div className="SuperSale">{children()}</div>;
}

export default SuperSale;
