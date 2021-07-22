import React from "react";

const Title = ({ title, missingMsg }) => {
  const hasTitle = title ? true : false;
  const titleToRender = hasTitle ? title : missingMsg;
  const cssClass = hasTitle
    ? "text-center text-3xl md:text-4xl"
    : "text-center text-3xl md:text-4xl italic text-red-400";

  return <h1 className={cssClass}>{titleToRender}</h1>;
};

export default Title;
