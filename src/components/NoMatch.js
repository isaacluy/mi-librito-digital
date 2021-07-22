import React from "react";
import { Link } from "react-router-dom";

import { language } from "../utils/constants";

const NoMatch = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="font-bold text-4xl">{language.noMatch}</h1>
      <Link to="/" className="mt-4 text-2xl text-blue-600 underline">
        {language.noMatchLink}
      </Link>
    </div>
  );
};

export default NoMatch;
