export const findMantraRecordBySlug = (records, slug) => {
  return records.filter(record => record.fields.urlSlug === slug);
};

export const getRecordFields = record => {
  return record && record[0] && record[0].fields ? record[0].fields : null;
};
