import firebaseDb from './initialiseApp';

const deleteCountry = (countryName) =>
  firebaseDb.ref(`countries/${countryName}`).remove();

export default deleteCountry;
