import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useLocation, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';
import Input from '../components/Input';

const JoinGame = ({
  gamePin,
  requestToJoinGame,
  setPlayerName,
  setCurrentGameId,
  setHasGameStarted,
}) => {
  const location = useLocation();
  const playerName = useRef('');
  const userEnteredGamePin = useRef('');
  const [redirectTo, setRedirectTo] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // TODO: clear gamePin when redirected from home page

  const { shouldReset } = location.state || {};

  useEffect(() => {
    if (shouldReset) {
      setCurrentGameId(undefined);
      setHasGameStarted(false);
      setPlayerName(undefined);
    }
  }, [shouldReset, setCurrentGameId, setHasGameStarted, setPlayerName]);

  const updateUserEnteredGamePin = (event) => {
    userEnteredGamePin.current = event.target.value;
  };

  const joinGame = (event) => {
    event.preventDefault();

    if (userEnteredGamePin.current.length === 6) {
      setErrorMessage(undefined);
      requestToJoinGame({ gamePin: userEnteredGamePin.current });
    } else {
      setErrorMessage('Invalid pin, please try again.');
    }
  };

  const updatePlayerNames = (event) => {
    playerName.current = event.target.value;
  };

  const saveName = (event) => {
    event.preventDefault();
    setPlayerName(playerName.current);
    setRedirectTo('/waiting-room');
  };

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <>
      <ButtonPanel>
        <Button as={Link} to="/">
          Go to Home
        </Button>
      </ButtonPanel>
      <h2>Game pin: {gamePin && gamePin}</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onSubmit={gamePin ? saveName : joinGame}>
        {gamePin ? (
          <Input
            key="playerName"
            labelText="Enter your name"
            onChange={updatePlayerNames}
            name="playerName"
          />
        ) : (
          <>
            <Input
              key="gamePin"
              labelText="Enter the game pin"
              name="gamePin"
              onChange={updateUserEnteredGamePin}
              type="number"
            />
            {errorMessage && <div>{errorMessage}</div>}
          </>
        )}
        <Button type="submit">{gamePin ? 'Save Name' : 'Join Game'}</Button>
      </form>
    </>
  );
};

export default withRouter(JoinGame);
