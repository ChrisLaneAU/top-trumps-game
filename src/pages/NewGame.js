import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Button from '../components/Button';

export default function NewGame({ saveGamePin }) {
  const [redirectTo, setRedirectTo] = useState();

  const startNewGame = () => {
    saveGamePin();
    setRedirectTo('/join-game');
  };

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <>
      <h2>Choose a game</h2>
      <Button name="countries" onClick={startNewGame}>
        Countries
      </Button>
    </>
  );
}
