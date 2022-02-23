import firebaseDb from './initialiseApp';

const setStartGame = ({ currentGameId, cardsPerPlayer, hasGameStarted }) =>
  firebaseDb
    .ref(`games/${currentGameId}`)
    .set({ cards: cardsPerPlayer, hasGameStarted }, (error) => {
      if (!error) return;
      console.error(`Unable to save game id ${currentGameId}`, error);
    });

export default setStartGame;
