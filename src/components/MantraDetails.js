import React from "react";
import { useParams } from "react-router";

import { useAirtableItem } from "../data/AirtableDB";
import { MANTRAS_TABLE } from "../utils/constants";

import BackButton from "./BackButton";

const MantraDetails = () => {
  const { id } = useParams();
  const [isLoading, mantra] = useAirtableItem(id, MANTRAS_TABLE);

  const renderDefinitions = () => {
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

  return !isLoading && mantra ? (
    <main className="container mx-auto p-8">
      <h1 className=" text-center text-3xl md:text-4xl">
        {mantra.transliteration}
      </h1>
      <h2 className=" text-center text-2xl md:text-3xl">{mantra.sanskrit}</h2>
      {/* SIGNIFICADO POR PALABRAS */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2">
        {renderDefinitions()}
      </div>
      {/* TRADUCCIÓN */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2 text-center text-xl md:text-2xl">
        <h3 className="font-bold">Traducción:</h3>
        <p>{`"${mantra.translation}"`}</p>
      </div>
      <div className="mx-auto mt-8 w-14">
        <BackButton />
      </div>
    </main>
  ) : null;
};

export default MantraDetails;
