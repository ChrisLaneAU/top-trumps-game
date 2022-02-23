import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AddCountry from './pages/AddCountry';
import CountriesList from './pages/CountriesList';
import Home from './pages/Home';
import JoinGame from './pages/JoinGame';
import Modal from './components/Modal';
import NewGame from './pages/NewGame';
import Game from './pages/Game';
import WaitingRoom from './pages/WaitingRoom';
import connectGameData from './api/connectGameData';
import connectPlayersData from './api/connectPlayersData';
import createGamePin from './api/createGamePin';
import setGame from './api/setGame';
import setStartGame from './api/setStartGame';
import updatePlayerName from './api/updatePlayerName';
import connectCountriesData from './api/connectCountriesData';

const initialFormVals = {
  countryName: '',
  flag: '',
  population: 0,
  percentOfWorldLandMass: 0,
  migrants: 0,
  numberOfStates: 0,
  liveabilityScore: 0,
  topTrumpsRating: 0,
};

function App() {
  const [formValues, setFormValues] = useState(initialFormVals);
  const [isSaving, setIsSaving] = useState(false);
  const [countries, setCountries] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({
    question: '',
    confirmFn: () => undefined,
  });
  const [currentGameId, setCurrentGameId] = useState();
  const [gamePin, setGamePin] = useState();
  const [cardsPerPlayer, setCardsPerPlayer] = useState({
    player1: [],
    player2: [],
  });
  const [playerName, setPlayerName] = useState('');
  const [playerNames, setPlayerNames] = useState([]);
  const [currentGameData, setCurrentGameData] = useState({});
  const [hasGameStarted, setHasGameStarted] = useState(false);

  useEffect(() => {
    if (!currentGameId) {
      return;
    }

    if (cardsPerPlayer.player1.length) {
      setStartGame({ currentGameId, cardsPerPlayer, hasGameStarted });
    }

    if (playerName) {
      updatePlayerName({ currentGameId, playerName });
    }
  }, [cardsPerPlayer, currentGameId, hasGameStarted, playerName]);

  useEffect(() => {
    const { open, close } = connectCountriesData(setCountries);
    open();

    return () => {
      close();
    };
  }, []);

  const openModal = ({ question, confirmFn }) => {
    setIsModalVisible(true);
    setModalProps({ question, confirmFn });
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const gameDataConnection = connectGameData(setCurrentGameData);
  const playersDataConnection = connectPlayersData(setPlayerNames);
  const saveGamePin = createGamePin(setCurrentGameId, setGamePin);
  const requestToJoinGame = setGame(setCurrentGameId, setGamePin);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Top Trumps</h1>
        </header>

        <main>
          {isModalVisible && <Modal {...modalProps} hideModal={hideModal} />}

          <Switch>
            <Route path="/add-country">
              <AddCountry
                formValues={formValues}
                isSaving={isSaving}
                setIsSaving={setIsSaving}
              />
            </Route>

            <Route path="/cards">
              <CountriesList
                countries={countries}
                openModal={openModal}
                setFormValues={setFormValues}
              />
            </Route>

            <Route path="/new-game">
              <NewGame saveGamePin={saveGamePin} />
            </Route>

            <Route path="/join-game">
              <JoinGame
                currentGameId={currentGameId}
                gamePin={gamePin}
                requestToJoinGame={requestToJoinGame}
                setGamePin={setGamePin}
                setPlayerName={setPlayerName}
                setCurrentGameId={setCurrentGameId}
                setHasGameStarted={setHasGameStarted}
              />
            </Route>

            <Route path="/waiting-room">
              <WaitingRoom
                cardsPerPlayer={cardsPerPlayer}
                countries={countries}
                currentGameData={currentGameData}
                currentGameId={currentGameId}
                gameDataConnection={gameDataConnection}
                gamePin={gamePin}
                hasGameStarted={hasGameStarted}
                playerName={playerName}
                playerNames={playerNames}
                setCardsPerPlayer={setCardsPerPlayer}
                setHasGameStarted={setHasGameStarted}
                playersDataConnection={playersDataConnection}
              />
            </Route>

            <Route path="/game/">
              <Game
                playerName={playerName}
                playerNames={playerNames}
                currentGameData={currentGameData}
                gameDataConnection={gameDataConnection}
              />
            </Route>

            <Route path="/">
              <Home
                setCurrentGameId={setCurrentGameId}
                setGamePin={setGamePin}
                setHasGameStarted={setHasGameStarted}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
