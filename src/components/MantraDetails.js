import React from "react";
import { useParams } from "react-router";

import { useAirtableItem } from "../data/AirtableDB";
import { MANTRAS_TABLE, language } from "../utils/constants";

import BackButton from "./BackButton";
import Subtitle from "./Subtitle";
import Title from "./Title";

const renderDefinitions = mantra => {
  const words = mantra.word ? mantra.word : [];
  const definitions = mantra.meaning ? mantra.meaning : [];

  return words.map((word, index) =>
    renderDefinition(word, definitions[index], index)
  );
};

const renderDefinition = (word, definition, key) => {
  return (
    <dl className="flex flex-wrap p-3 md:p-4 text-lg md:text-xl" key={key}>
      <dt className="flex-initial font-bold capitalize">{`${word}: `}</dt>
      <dd className="flex-1 ml-2 italic">{definition}</dd>
    </dl>
  );
};

const renderTranslation = mantra => {
  return mantra.translation ? (
    <>
      <h3 className="font-bold">{`${language.translation}:`}</h3>
      <p>{`"${mantra.translation}"`}</p>
    </>
  ) : null;
};

const MantraDetails = () => {
  const { id } = useParams();
  const [isLoading, mantra] = useAirtableItem(id, MANTRAS_TABLE);

  return !isLoading && mantra ? (
    <main className="container mx-auto p-8">
      <Title
        title={mantra.transliteration}
        missingMsg={language.missingMantraTransliteration}
      />
      <Subtitle subtitle={mantra.sanskrit} />
      {/* SIGNIFICADO POR PALABRAS */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2">
        {renderDefinitions(mantra)}
      </div>
      {/* TRADUCCIÓN */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2 text-center text-xl md:text-2xl">
        {renderTranslation(mantra, language)}
      </div>
      <div className="mx-auto mt-8 w-14">
        <BackButton />
      </div>
    </main>
  ) : null;
};

export default MantraDetails;
