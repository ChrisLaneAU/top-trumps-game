import React, { useState } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { GOLD, GREY } from '../constants/palette';

const List = styled.ul`
  margin: 0 auto;
  margin-top: 20px;
  min-width: 300px;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 8px;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 20px;
  list-style: none;
  border: 1px solid ${GREY};
  cursor: pointer;
  border-radius: 3px;
  background: ${GOLD};

  &:active {
    opacity: 0.5;
  }
`;

const CardsList = ({ countries, setFormValues }) => {
  const [redirectTo, setRedirectTo] = useState();

  const onClickCountry = (event) => {
    const countryName = event.target.innerText;
    const countryData = countries[countryName];
    setFormValues(countryData);
    setRedirectTo('/add-country');
  };

  const listItems = Object.values(countries).map(({ countryName, flag }) => (
    <ListItem key={countryName} onClick={onClickCountry}>
      {countryName}
    </ListItem>
  ));

  return redirectTo ? (
    <Redirect to={redirectTo} />
  ) : (
    <List>{!!listItems.length && listItems}</List>
  );
};

export default CardsList;
