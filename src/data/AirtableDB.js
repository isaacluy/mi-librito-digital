import React from "react";
import Airtable from "airtable";

import { formatGroups, getGroupsObject } from "../utils/groupsUtils";
import { findMantraRecordBySlug, getRecordFields } from "../utils/mantrasUtils";

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
// eslint-disable-next-line no-undef
const BASE_KEY = process.env.REACT_APP_AIRTABLE_BASE_KEY;
const GROUPS_TABLE = "Groups";
const MANTRAS_TABLE = "Mantras";
const AIRTABLE_GRID_VIEW = "Grid view";

export const useGroups = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

    base(GROUPS_TABLE)
      .select({ view: AIRTABLE_GRID_VIEW })
      .eachPage(
        (records, fetchNextPage) => {
          const formattedGroups = formatGroups(records);
          const groupsByName = getGroupsObject(formattedGroups);

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

export const useMantra = mantraSlug => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [mantra, setMantra] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

    base(MANTRAS_TABLE)
      .select({ view: AIRTABLE_GRID_VIEW })
      .eachPage(
        (records, fetchNextPage) => {
          const mantraRecord = findMantraRecordBySlug(records, mantraSlug);
          const mantra = getRecordFields(mantraRecord);

          setMantra(mantra);

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
  }, [mantraSlug]);

  return [isLoading, mantra];
};
