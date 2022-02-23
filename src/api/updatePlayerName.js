import firebaseDb from './initialiseApp';

const updatePlayerName = ({ currentGameId, playerName }) =>
  firebaseDb
    .ref(`players/${currentGameId}`)
    .update({ [playerName]: 1 }, (error) => {
      if (!error) return;
      console.error(`Unable to update playerName ${playerName}`, error);
    });

export default updatePlayerName;
