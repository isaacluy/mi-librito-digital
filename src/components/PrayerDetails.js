import BackButton from './BackButton';

const prayer = {
  id: 2,
  name: 'Amanece y la Luz se expande',
  by: 'Mataji Shaktiananda',
  text: 'Amanece y la Luz se expande*siento que mi verdad*está sujeta a lo que soy,*un ser de luz*recuerdo siempre de mi*la manifestación más pura*para hacerla presente hoy*nadie deja en mi rastros de su inconciencia*y me apruebo en todo*lo que soy y digo*comprendo que nadie podrá,*así mismo, desviar lo que soy*Bendigo mi ser*en el camino que hoy*he trazado para seguir.',
  amen: true,
  afirmation: 'BENDIGO MI SER',
};

const PrayerDetails = () => {

  const renderPrayerText = () => {
    const frases = prayer.text.split('*');

    return frases.map((frase, index) => (<p key={index}>{frase}</p>));
  }

  const renderAmen = amen => {
    return amen ? (
      <div
        className="mt-4 mx-auto w-32"
      >
        <p>
          Que así sea
        </p>
      </div>
    ) : null;
  }

  return (
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
        <h3 className="font-bold">Afirmación:</h3>
        <p>{prayer.afirmation}</p>
      </div>
      <div className="mx-auto mt-8 w-14">
        <BackButton />
      </div>
    </main>
  );
}

export default PrayerDetails;