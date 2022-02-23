import firebaseDb from './initialiseApp';

const updateCountry = ({ formVals, setIsSaving, setSavedStatus }) => {
  firebaseDb
    .ref(`countries/${formVals.current.countryName}`)
    .set(formVals.current, (error) => {
      setIsSaving(false);
      setSavedStatus(error ? 'error' : 'success');
    });
};

export default updateCountry;
