import React from "react";
import { useParams } from "react-router-dom";

import { useAirtableItem } from "../data/AirtableDB";
import { PRAYERS_TABLE, language } from "../utils/constants";

import BackButton from "./BackButton";

const PrayerDetails = () => {
  const { id } = useParams();
  const [isLoading, prayer] = useAirtableItem(id, PRAYERS_TABLE);

  const renderPrayerText = () => {
    const frases = prayer.text.split("*");

    return frases.map((frase, index) => <p key={index}>{frase}</p>);
  };

  const renderAmen = amen => {
    return amen ? (
      <div className="mt-4 mx-auto w-32">
        <p>{language.amen}</p>
      </div>
    ) : null;
  };

  return !isLoading && prayer ? (
    <main className="container mx-auto p-8">
      <h1 className=" text-center text-3xl md:text-4xl">{prayer.name}</h1>
      <h2 className=" text-center text-2xl md:text-3xl">{prayer.by}</h2>
      {/* CUERPO DE LA ORACIÓN */}
      <div className="mx-auto mt-8 text-center text-xl md:text-2xl lg:w-3/4 xl:w-1/2">
        {renderPrayerText()}
        {renderAmen(prayer.amen)}
      </div>
      {/* AFIRMACIÓN */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2 text-center text-xl md:text-2xl uppercase">
        <h3 className="font-bold">{`${language.afirmation}:`}</h3>
        <p>{prayer.afirmation}</p>
      </div>
      <div className="mx-auto mt-8 w-14">
        <BackButton />
      </div>
    </main>
  ) : null;
};

export default PrayerDetails;
