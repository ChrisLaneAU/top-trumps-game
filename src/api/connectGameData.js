import firebaseDb from './initialiseApp';

const connectGameData =
  (setCurrentGameData) =>
  ({ gameId }) => {
    if (!gameId) return;

    const gameRef = firebaseDb.ref(`games/${gameId}`);

    const onLoadGame = (snapshot) => {
      const currentGameData = snapshot.val();
      setCurrentGameData(currentGameData);
    };

    return {
      open: () => {
        gameRef.on('value', onLoadGame);
      },
      close: () => {
        gameRef.off('value', onLoadGame);
      },
    };
  };

export default connectGameData;
