import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';
import { GREEN, ORANGE_RED } from '../constants/palette';
import { StateContext } from '../App';

export default function Home({
  setCurrentGameId,
  setGamePin,
  setHasGameStarted,
}) {
  useEffect(() => {
    setGamePin(undefined);
    setCurrentGameId(undefined);
    setHasGameStarted(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h2>Welcome to Top Trumps Countries :)</h2>
      <ButtonPanel>
        <Button as={Link} to="/cards">
          Go to List
        </Button>

        <Button as={Link} to="/add-country">
          Go to Add a Country
        </Button>

        <Button as={Link} to="/new-game" bgColor={ORANGE_RED}>
          Start a New Game
        </Button>

        <Button
          as={Link}
          to={{
            pathname: '/join-game',
            state: {
              shouldReset: true,
            },
          }}
          bgColor={GREEN}>
          Join a Game
        </Button>
      </ButtonPanel>
    </>
  );
}
