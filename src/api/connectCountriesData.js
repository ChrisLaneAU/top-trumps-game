import firebaseDb from './initialiseApp';

const connectCountriesData = (setCountries) => {
  const countriesRef = firebaseDb.ref('countries');
  const onLoadCountries = (snapshot) => {
    const countries = snapshot.val();
    setCountries(countries);
  };

  return {
    open: () => {
      countriesRef.on('value', onLoadCountries);
    },
    close: () => {
      countriesRef.off('value', onLoadCountries);
    },
  };
};

export default connectCountriesData;
