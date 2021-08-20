import React from "react";

import { splitAndRenderByDivider } from "../utils/textFormatUtils";

const Subtitle = ({ subtitle }) => {
  return subtitle ? (
    <div className=" text-center text-2xl md:text-3xl">
      {splitAndRenderByDivider(subtitle)}
    </div>
  ) : null;
};

export default Subtitle;
