import { MANTRA, PRAYER } from "./constants";

export const formatGroups = records => {
  if (!records || records.length <= 0) return [];

  const groups = records.map(record => {
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
    } = record.fields;
    const imageUrl = getImageURL(image);
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
    });
    // console.log("prayers", prayers);
    // console.groupEnd();

    return { name, items: [...mantras, ...prayers] };
    // return null;
  });

  return groups;
};

export const getGroupsObject = formattedGroups => {
  if (!formattedGroups) return {};

  const items = {};

  formattedGroups.forEach(g => {
    items[g.name] = g.items;
  });

  return items;
};

const formatItems = ({ subtitle, imageUrl, title, slug, type }) => {
  if (!title || !slug) return [];

  const items = title.map((title, index) => {
    return {
      id: slug[index],
      imageUrl,
      subtitle: subtitle && subtitle[index] ? subtitle[index] : "",
      title,
      type,
    };
  });

  return items;
};

const getImageURL = imagesArray => {
  return imagesArray && imagesArray[0] && imagesArray[0].url
    ? imagesArray[0].url
    : "";
};
