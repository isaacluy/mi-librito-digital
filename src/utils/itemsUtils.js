import { MANTRA, PRAYER } from "../utils/constants";

export const findRecordBySlug = (records, slug) => {
  return records.filter(record => record.fields.urlSlug === slug);
};

export const getItemURL = (id, type) => {
  let url = "/404";

  if (!id) return url;

  switch (type) {
    case MANTRA:
      url = `/mantra/${id}`;
      break;
    case PRAYER:
      url = `/prayer/${id}`;
      break;
    default:
      console.warn(`Invalid item type: ${type}`);
      break;
  }

  return url;
};

export const getRecordFields = record => {
  return record && record[0] && record[0].fields ? record[0].fields : null;
};
