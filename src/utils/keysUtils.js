export const getDbKeys = records => {
  return records.map(record => getKey(record));
};

const getKey = record => {
  return record.fields && record.fields.active
    ? record.fields.password
    : undefined;
};
