import { MANTRA, PRAYER } from "./constants";

export const formatGroups = records => {
  if (!records || records.length <= 0) return [];

  return records.map(record => getItemByGroupName(record));
};

export const getGroupsObject = (formattedGroups, searchTerm) => {
  if (!formattedGroups) return {};

  const items = {};

  formattedGroups.forEach(g => {
    items[g.groupName] = filterItemsByTerm(g.items, searchTerm);
  });

  return items;
};

const checkTerm = (item, term) => {
  if (!item || !item.title || !term) return false;

  const regex = new RegExp(term, "i");

  return regex.test(item.title) || regex.test(item.text);
};

const filterItemsByTerm = (items, term) => {
  if (!items || !term) return items;

  const filteredItems = items.filter(item => checkTerm(item, term));

  return filteredItems;
};

const formatItems = ({
  imageUrl,
  slug,
  subtitle,
  text,
  title,
  transliteration,
  type,
}) => {
  if (!title || !slug) return [];

  const items = title.map((title, index) => {
    return {
      id: slug[index],
      imageUrl,
      subtitle: subtitle && subtitle[index] ? subtitle[index] : "",
      text: text && text[index] ? text[index] : undefined,
      title,
      transliteration:
        transliteration && transliteration[index]
          ? transliteration[index]
          : undefined,
      type,
    };
  });

  return items;
};

const getGroupImageURL = imagesArray => {
  return imagesArray && imagesArray[0] && imagesArray[0].url
    ? imagesArray[0].url
    : "";
};

const getItemByGroupName = record => {
  // console.group("RECORD", record.get("groupName"));
  // console.log("Retrieved record >", record);

  const {
    image,
    mantrasName,
    mantrasSanskrit,
    mantrasTransliteration,
    mantrasURLSlug,
    groupName,
    prayersBy,
    prayersName,
    prayersURLSlug,
    text,
  } = record.fields;

  const imageUrl = getGroupImageURL(image);

  const mantras = formatItems({
    imageUrl,
    slug: mantrasURLSlug,
    subtitle: mantrasSanskrit,
    title: mantrasName ? mantrasName : mantrasTransliteration,
    transliteration: mantrasTransliteration,
    type: MANTRA,
  });
  // console.log("mantras", mantras);

  const prayers = formatItems({
    imageUrl,
    slug: prayersURLSlug,
    subtitle: prayersBy,
    title: prayersName,
    type: PRAYER,
    text,
  });
  // console.log("prayers", prayers);

  const items = [...mantras, ...prayers].sort(sortByItemTitle);
  // console.log("items", items);
  // console.groupEnd();

  return { groupName, items };
};

const sortByItemTitle = ({ title: a }, { title: b }) => {
  var titleA = a.toUpperCase();
  var titleB = b.toUpperCase();
  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
};
