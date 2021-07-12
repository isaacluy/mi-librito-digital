import React from "react";
import Airtable from "airtable";

import { MANTRAS_TABLE, PRAYERS_TABLE, KEYS_TABLE } from "../utils/constants";
import { formatGroups, getGroupsObject } from "../utils/groupsUtils";
import { findRecordBySlug, getRecordFields } from "../utils/itemsUtils";
import { getDbKeys } from "../utils/keysUtils";

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY; // eslint-disable-line no-undef
const BASE_KEY = process.env.REACT_APP_AIRTABLE_BASE_KEY; // eslint-disable-line no-undef
const GRID_VIEW = "Grid view";
const GROUPS_TABLE = "Groups";
const GROUPS_SEARCH_TIMEOUT_DELAY = 500;

export const useGroups = searchTerm => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [groups, setGroups] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    if (!searchTerm && !groups.length) {
      getGroupsFromAirtable(searchTerm, setIsLoading, setGroups);
    } else {
      const timeoutId = setTimeout(
        () => getGroupsFromAirtable(searchTerm, setIsLoading, setGroups),
        GROUPS_SEARCH_TIMEOUT_DELAY
      );

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  return [isLoading, groups];
};

export const useAirtableItem = (mantraSlug, table) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const verifiedTable = table === PRAYERS_TABLE ? PRAYERS_TABLE : MANTRAS_TABLE;

  React.useEffect(() => {
    setIsLoading(true);
    const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

    base(verifiedTable)
      .select({ view: GRID_VIEW })
      .eachPage(
        (records, fetchNextPage) => {
          const itemRecord = findRecordBySlug(records, mantraSlug);
          const cleanItem = getRecordFields(itemRecord);

          setItem(cleanItem);

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

  return [isLoading, item];
};

export const useKeys = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [keys, setKeys] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

    base(KEYS_TABLE)
      .select({ view: GRID_VIEW })
      .eachPage(
        (records, fetchNextPage) => {
          const dbKeys = records ? getDbKeys(records) : [];

          setKeys(dbKeys);

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

  return [isLoading, keys];
};

const getGroupsFromAirtable = (searchTerm, setIsLoading, setGroups) => {
  const base = new Airtable({ apiKey: API_KEY }).base(BASE_KEY);

  base(GROUPS_TABLE)
    .select({ view: GRID_VIEW })
    .eachPage(
      (records, fetchNextPage) => {
        const formattedGroups = formatGroups(records);
        const groupsByName = getGroupsObject(formattedGroups, searchTerm);

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
};
