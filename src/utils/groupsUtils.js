import { MANTRA, PRAYER } from "./constants";

export const formatGroups = records => {
  if (!records || records.length <= 0) return [];

  return records.map(record => getItemByGroupName(record));
};

export const getGroupsObject = (formattedGroups, searchTerm) => {
  if (!formattedGroups) return {};

  const items = {};

  formattedGroups.forEach(g => {
    items[g.name] = filterItemsByTerm(g.items, searchTerm);
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

const formatItems = ({ subtitle, imageUrl, title, slug, type, text }) => {
  if (!title || !slug) return [];

  const items = title.map((title, index) => {
    return {
      id: slug[index],
      imageUrl,
      subtitle: subtitle && subtitle[index] ? subtitle[index] : "",
      title,
      type,
      text: text && text[index] ? text[index] : undefined,
    };
  });

  return items;
};

const getGroupImageURL = imagesArray => {
  return imagesArray && imagesArray[0] && imagesArray[0].url
    ? imagesArray[0].url
    : "";
};

/* 
  TODO: This is where I should start lookin in the future to implement
  the mantra name in the front end

  https://github.com/isaacluy/mi-librito-digital/issues/4
*/
const getItemByGroupName = record => {
  // console.group("RECORD", record.get("name"));
  // console.log("Retrieved record >", record);

  const {
    name,
    image,
    mantrasSanskrit,
    mantrasTransliteration,
    mantrasURLSlug,
    prayersName,
    prayersBy,
    prayersURLSlug,
    text,
  } = record.fields;

  const imageUrl = getGroupImageURL(image);

  const mantras = formatItems({
    imageUrl,
    slug: mantrasURLSlug,
    subtitle: mantrasSanskrit,
    title: mantrasTransliteration,
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

  return { name, items };
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
