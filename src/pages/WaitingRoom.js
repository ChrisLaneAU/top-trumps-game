import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';
import shuffleCards from '../utils/shuffleCards';

const Players = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
`;

const PlayerNames = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Player = styled.p``;

export default function WaitingRoom({
  countries,
  currentGameData,
  currentGameId,
  gameDataConnection,
  gamePin,
  hasGameStarted,
  playerName,
  playerNames,
  playersDataConnection,
  setCardsPerPlayer,
  setHasGameStarted,
}) {
  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [redirectTo, setRedirectTo] = useState();
  const hasOpenedgameDataConnectionConnection = useRef(false);

  const isDealer = playerNames.indexOf(playerName) === 0; // dealer is player 1

  useEffect(() => {
    if (!currentGameId) {
      setRedirectTo('/join-game');
      return;
    }

    const { open, close } = playersDataConnection({
      gameId: currentGameId,
    });
    open();

    return () => {
      close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      playerNames.length >= 2 &&
      hasOpenedgameDataConnectionConnection.current
    ) {
      setIsReadyToStart(true);
    }
  }, [playerNames]);

  useEffect(() => {
    if (currentGameData?.hasGameStarted && !isDealer) {
      setHasGameStarted(true);
    }
  }, [currentGameData?.hasGameStarted, isDealer, setHasGameStarted]);

  useEffect(() => {
    if (!currentGameId || hasOpenedgameDataConnectionConnection.current) {
      return;
    }

    const { open, close } = gameDataConnection({
      gameId: currentGameId,
    });
    open();

    hasOpenedgameDataConnectionConnection.current = true;

    return () => {
      close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dealToPlayers = (cards) => {
    const { player1Cards, player2Cards } = cards.reduce(
      (acc, card, index) => {
        const dealToPlayerNumber = index % 2 ? 1 : 2;

        return dealToPlayerNumber === 1
          ? {
              ...acc,
              player1Cards: [...acc.player1Cards, card],
            }
          : {
              ...acc,
              player2Cards: [...acc.player2Cards, card],
            };
      },
      {
        player1Cards: [],
        player2Cards: [],
      },
    );

    setCardsPerPlayer({
      player1: player1Cards,
      player2: player2Cards,
    });
  };

  useEffect(() => {
    if (hasGameStarted) {
      setRedirectTo(`/game/${currentGameId}`);
    }
  }, [hasGameStarted, currentGameId]);

  // this function will deal the cards to all players
  const onDealCards = () => {
    const shuffledCards = shuffleCards(countries);
    dealToPlayers(shuffledCards);
    setHasGameStarted(true);
  };

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <>
      <ButtonPanel>
        <Button as={Link} to="/">
          Go to Home
        </Button>

        {isReadyToStart && isDealer && (
          <Button bgColor="green" onClick={onDealCards}>
            Shuffle & Deal
          </Button>
        )}
      </ButtonPanel>

      {gamePin && <p>Game pin: {gamePin}</p>}

      <Players>
        {playerNames && (
          <PlayerNames>
            {playerNames.map((playerName) => (
              <Player key={playerName}>{playerName}</Player>
            ))}
          </PlayerNames>
        )}
      </Players>
    </>
  );
}
