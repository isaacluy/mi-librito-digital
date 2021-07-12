import React from "react";
import { Link } from "react-router-dom";

import { useGroups } from "../data/AirtableDB";

import { getItemURL } from "../utils/itemsUtils";
import { language } from "../utils/constants";

const renderGroups = groups => {
  const groupNames = Object.keys(groups);

  return groupNames.map(groupName => renderGroup(groupName, groups));
};

const renderGroup = (groupName, groups) => {
  return (
    <div key={groupName} className="relative">
      <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{groupName}</h3>
      </div>
      <ul className="relative z-0 divide-y divide-gray-200">
        {renderItems(groups[groupName])}
      </ul>
    </div>
  );
};

const renderItems = items => {
  return items.map(item => renderItem(item));
};

const renderItem = item => {
  return (
    <li key={item.id} className="bg-white">
      <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
        <div className="flex-shrink-0">{renderItemImage(item)}</div>
        <div className="flex-1 min-w-0">{renderItemLink(item)}</div>
      </div>
    </li>
  );
};

const renderItemImage = item => {
  return <img className="h-10 w-10 rounded-full" src={item.imageUrl} alt="" />;
};

const renderItemLink = item => {
  return (
    <Link className="focus:outline-none" to={getItemURL(item.id, item.type)}>
      {/* Extend touch target to entire panel */}
      <span className="absolute inset-0" aria-hidden="true" />
      <p className="text-sm font-medium text-gray-900">{item.title}</p>
      <p className="text-sm text-gray-500 truncate">{item.subtitle}</p>
    </Link>
  );
};

const Directory = ({ searchTerm }) => {
  const [isLoading, groups] = useGroups(searchTerm);

  return !isLoading ? (
    <nav className="h-full overflow-y-auto" aria-label="Directory">
      {renderGroups(groups)}
    </nav>
  ) : (
    <h1 className="min-h-screen flex items-center justify-center text-center bg-white">
      {language.searching}
    </h1>
  );
};

export default Directory;
