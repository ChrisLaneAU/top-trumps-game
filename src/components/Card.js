import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  BLACK,
  GOLD,
  MEDIUM_GREY,
  ORANGE_RED,
  RED,
  WHITE,
} from '../constants/palette';
import toSentence from '../utils/to-sentence';
import Button from './Button';

const CardContainer = styled.div`
  perspective: 150em;
  position: relative;
  justify-self: center;
  display: grid;
  width: 250px;
  height: 400px;
  margin: 50px auto;
  border-radius: 10px;
  border: 1px solid ${MEDIUM_GREY};
  overflow: hidden;
`;

const BaseCardSideStyles = css`
  height: 100%;
  transition: transform 0.8s ease;
  width: 100%;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1.5em 4em rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

const CardFront = styled.div`
  ${BaseCardSideStyles}
  background-color: ${GOLD};
  color: ${BLACK};
  font-size: 16px;
  ${({ isRotated }) => (isRotated ? 'transform: rotateY(-180deg)' : '')}
`;

const BackgroundFront = styled.img`
  width: 100%;
`;

const Heading = styled.div``;

const StatButton = styled(Button)`
  color: ${WHITE};
  margin: 5px;
`;

const StatName = styled.span`
  font-weight: normal;
`;

const StatValue = styled.span`
  font-weight: bold;
`;

const CardBack = styled.div`
  ${BaseCardSideStyles}
  position: absolute;
  transform: rotateY(180deg);
  background-color: ${ORANGE_RED};
  ${({ isRotated }) => (isRotated ? 'transform: rotateY(0)' : '')}
`;

const Card = ({
  bgImgSrc,
  cardData = {},
  className,
  deleteEntry,
  shouldShowButtons,
  ...htmlAttributes
}) => {
  const [isRotated, setIsRotated] = useState(false);
  const [activeStatName, setActiveStatName] = useState();

  const { countryName, flag } = cardData;

  const onClickCard = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated);
  };

  const onClickStat = (event, statName) => {
    event.stopPropagation();
    setActiveStatName(statName);
  };

  return (
    <CardContainer
      className={className}
      onClick={onClickCard}
      {...htmlAttributes}>
      <CardFront isRotated={isRotated}>
        <BackgroundFront src={bgImgSrc} />
        <Heading>
          {countryName} {flag} {countryName === 'China' && 'Top Trump!'}
        </Heading>
        <br />
        {Object.entries(cardData).map(([statName, statValue]) =>
          ['countryName', 'flag'].includes(statName) ? null : (
            <StatButton
              onClick={(event) => onClickStat(event, statName)}
              bgColor={activeStatName === statName ? ORANGE_RED : BLACK}
              key={statName}>
              <StatName>{toSentence(statName)}:</StatName>{' '}
              <StatValue>{statValue}</StatValue>
            </StatButton>
          ),
        )}
        {shouldShowButtons && (
          <Button
            bgColor={`${RED}`}
            onClick={(event) => {
              event.stopPropagation();
              deleteEntry(cardData.countryName);
            }}>
            Delete Card
          </Button>
        )}
      </CardFront>

      <CardBack isRotated={isRotated}>
        BACK
        <br />
        <br />
        Top Trumps Countries
        <br />
        <br />
        Click to rotate card
      </CardBack>
    </CardContainer>
  );
};

export default Card;
