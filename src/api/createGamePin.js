import genSixDigitPin from '../utils/genSixDigitPin';
import firebaseDb from './initialiseApp';

const createGamePin = (setCurrentGameId, setGamePin) => () => {
  const newGameId = firebaseDb.ref('games').push().key;
  const newGamePin = genSixDigitPin();

  firebaseDb.ref(`pins/${newGamePin}`).set(newGameId, (error) => {
    if (!error) {
      setGamePin(newGamePin);
      return;
    }

    console.error(
      `Unable to save game pin ${newGamePin} for ${newGameId}`,
      error,
    );
  });

  setCurrentGameId(newGameId);
};

export default createGamePin;
