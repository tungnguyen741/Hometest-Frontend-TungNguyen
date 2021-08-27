import React from "react";
function UniqueSaleBook({ children = () => {} }) {
  return <div className="UniqueSaleBook">{children()}</div>;
}

export default UniqueSaleBook;
