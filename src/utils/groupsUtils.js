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
    const prayers = formatItems({
      imageUrl,
      slug: prayersURLSlug,
      subtitle: prayersBy,
      title: prayersName,
      type: PRAYER,
    });
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
  if (!subtitle || !title || !slug) return [];

  const items = subtitle.map((subtitle, index) => {
    return {
      id: slug[index],
      imageUrl,
      subtitle,
      title: title[index],
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
