import React from "react";
import { Popover } from "@headlessui/react";
import { useRouteMatch } from "react-router-dom";

import BackButton from "./BackButton";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = ({ setSearchTerm }) => {
  const match = useRouteMatch("/");

  return (
    <nav>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {(
          { open } // eslint-disable-line no-unused-vars
        ) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                {/* LOGO */}
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <Logo />
                  </div>
                </div>
                {/* SEARCH BAR */}
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-8">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <SearchBar setSearchTerm={setSearchTerm} />
                  </div>
                </div>
                {/* BACK BUTTON */}
                <div className="min-w-0 flex mx-auto py-4 xl:col-span-2 xl:flex-row-reverse xl:mx-0">
                  <div className="flex items-center">
                    <BackButton hide={match.isExact} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </nav>
  );
};

export default NavBar;
