import React from "react";

const Subtitle = ({ subtitle }) => {
  return subtitle ? (
    <h2 className=" text-center text-2xl md:text-3xl">{subtitle}</h2>
  ) : null;
};

export default Subtitle;
