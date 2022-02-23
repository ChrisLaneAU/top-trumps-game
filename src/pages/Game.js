import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';

const StyledCard = styled(Card)`
  position: absolute;
  top: 0;
  left: -125px;
`;

const CardsContainer = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
`;

export default function Game({
  playerName,
  playerNames,
  currentGameData,
  gameDataConnection,
}) {
  const [redirectTo, setRedirectTo] = useState();
  const gameId = useLocation().pathname.replace('/game/', '');
  const isPlayer1 = playerNames.indexOf(playerName) === 0;

  useEffect(() => {
    const { open, close } = gameDataConnection({ gameId });
    open();

    return () => {
      close();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!playerName) {
      setRedirectTo('/join-game');
    }
  }, [playerName]);

  const renderCards = ({ playerNumber }) =>
    currentGameData?.cards?.[`player${playerNumber}`].map(
      ([countryName, cardData], index) => (
        <StyledCard
          key={countryName}
          style={{ left: `${index * 2 - 125}px`, top: `${index + 2}px` }}
          cardData={cardData}
        />
      ),
    );

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <>
      <ButtonPanel>
        <Button as={Link} to="/home">
          Quit game
        </Button>
      </ButtonPanel>
      {`Name: ${playerName}`}
      <br />
      <br />
      {gameId ? (
        <CardsContainer>
          {isPlayer1 ? (
            <>
              {currentGameData?.playerNames?.player1Name}
              {renderCards({ playerNumber: 1 })}
            </>
          ) : (
            <>
              {currentGameData?.playerNames?.player2Name}
              {renderCards({ playerNumber: 2 })}
            </>
          )}
        </CardsContainer>
      ) : (
        <div>No game id found</div>
      )}
    </>
  );
}
