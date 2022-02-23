import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';
import Card from '../components/Card';
import CardsList from '../components/CardsList';
import deleteCountry from '../api/deleteCountry';

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

const ListWrapper = styled.div`
  display: flex;
`;

export default function CountriesList({ countries, openModal, setFormValues }) {
  const deleteEntry = (countryName) => {
    openModal({
      question: `Are you sure you want to delete ${countryName}?`,
      confirmFn: () => deleteCountry(countryName),
    });
  };

  return (
    <>
      <ButtonPanel>
        <Button as={Link} to="/">
          Go to Home
        </Button>

        <Button as={Link} to="/add-country">
          Go to Add New Country
        </Button>
      </ButtonPanel>

      <ListWrapper>
        <CardsList countries={countries} setFormValues={setFormValues} />

        <CardsWrapper>
          {Object.values(countries).map((country) => (
            <Card
              deleteEntry={deleteEntry}
              cardData={country}
              key={country.countryName}
              shouldShowButtons={true}
            />
          ))}
        </CardsWrapper>
      </ListWrapper>
    </>
  );
}
