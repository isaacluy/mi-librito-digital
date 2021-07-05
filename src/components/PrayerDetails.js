import React from "react";
import { useParams } from "react-router-dom";

import { useAirtableItem } from "../data/AirtableDB";
import { PRAYERS_TABLE, language } from "../utils/constants";

import BackButton from "./BackButton";
import Subtitle from "./Subtitle";
import Title from "./Title";

const renderPrayerText = prayer => {
  const frases = prayer.text ? prayer.text.split("*") : [];

  return frases.map((frase, index) => <p key={index}>{frase}</p>);
};

const renderAmen = prayer => {
  return prayer.amen ? (
    <div className="mt-4 mx-auto w-32">
      <p>{language.amen}</p>
    </div>
  ) : null;
};

const renderAfirmation = prayer => {
  return prayer.afirmation ? (
    <>
      <h3 className="font-bold">{`${language.afirmation}:`}</h3>
      <p>{prayer.afirmation}</p>
    </>
  ) : null;
};

const PrayerDetails = () => {
  const { id } = useParams();
  const [isLoading, prayer] = useAirtableItem(id, PRAYERS_TABLE);

  return !isLoading && prayer ? (
    <main className="container mx-auto p-8">
      <Title title={prayer.name} missingMsg={language.missingPrayerName} />
      <Subtitle subtitle={prayer.by} />
      {/* CUERPO DE LA ORACIÓN */}
      <div className="mx-auto mt-8 text-center text-xl md:text-2xl lg:w-3/4 xl:w-1/2">
        {renderPrayerText(prayer)}
        {renderAmen(prayer)}
      </div>
      {/* AFIRMACIÓN */}
      <div className="mx-auto mt-8 lg:w-3/4 xl:w-1/2 text-center text-xl md:text-2xl uppercase">
        {renderAfirmation(prayer)}
      </div>
      <div className="mx-auto mt-8 w-14">
        <BackButton />
      </div>
    </main>
  ) : null;
};

export default PrayerDetails;
