import firebaseDb from './initialiseApp';

const setGame =
  (setCurrentGameId, setGamePin) =>
  ({ gamePin }) => {
    firebaseDb
      .ref(`pins/${gamePin}`)
      .once('value')
      .then((snapshot) => {
        const gameId = snapshot.val();

        if (!gameId) return;

        setCurrentGameId(gameId);
        setGamePin(gamePin);
      });
  };

export default setGame;
