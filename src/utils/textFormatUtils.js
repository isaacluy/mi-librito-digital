import React from "react";

export const splitAndRenderByDivider = (text, divider = "*") => {
  const phrases = text ? text.split(divider) : [];

  return phrases.map((phrase, index) => <p key={index}>{phrase}</p>);
};
