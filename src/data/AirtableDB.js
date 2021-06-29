import React from "react";
import Airtable from "airtable";

import { formatGroups, getGroupsObject } from "../utils/groupsUtils";

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
// eslint-disable-next-line no-undef
const BASE_KEY = process.env.REACT_APP_AIRTABLE_BASE_KEY;

export const useGroups = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

    base("Groups")
      .select({ view: "Grid view" })
      .eachPage(
        (records, fetchNextPage) => {
          const formattedGroups = formatGroups(records);
          // console.group("Formatted Groups");
          // console.log("formattedGroups", formattedGroups);
          // console.groupEnd();

          const groupsByName = getGroupsObject(formattedGroups);
          // console.group("Groups By Name");
          // console.log("groupsByName", groupsByName);
          // console.groupEnd();

          setGroups(groupsByName);
          fetchNextPage();
          setIsLoading(false);
        },
        err => {
          setIsLoading(false);
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  return [isLoading, groups];
};
