import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

import { language } from "../utils/constants";

const SearchBar = ({ setSearchTerm }) => {
  const handleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        {language.searchFieldLabel}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          placeholder={language.searchFieldLabel}
          type="search"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
