import firebaseDb from './initialiseApp';

const connectPlayersData =
  (setPlayerNames) =>
  ({ gameId }) => {
    if (!gameId) return;

    const playersRef = firebaseDb.ref(`players/${gameId}`);

    const onGame = (snapshot) => {
      const currentGamePlayers = snapshot.val();
      setPlayerNames(Object.keys(currentGamePlayers));
    };

    return {
      open: () => {
        playersRef.on('value', onGame);
      },
      close: () => {
        playersRef.off('value', onGame);
      },
    };
  };

export default connectPlayersData;
