import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import updateCountry from '../api/updateCountry';
import Button from '../components/Button';
import ButtonPanel from '../components/ButtonPanel';
import Form from '../components/Form';
import { ORANGE } from '../constants/palette';
import isFormValid from '../utils/isFormValid';

export default function AddCountry({ formValues, isSaving, setIsSaving }) {
  const formVals = useRef(formValues);
  const [savedStatus, setSavedStatus] = useState();

  const onSubmitForm = (event) => {
    event.preventDefault();
    setIsSaving(true);

    if (!isFormValid(formVals.current)) {
      setIsSaving(false);
      return;
    }

    updateCountry({ formVals, setIsSaving, setSavedStatus });
  };

  const onChangeForm = (event) => {
    const { name, value } = event.target;
    formVals.current[name] = value.trim();
  };

  const clearForm = () => {
    [...document.querySelector('form').elements].forEach((el) => {
      if (formValues[el.name] === undefined) return;
      el.type === 'number' ? (el.value = 0) : (el.value = '');
    });
  };

  return (
    <>
      <ButtonPanel>
        <Button as={Link} to="/">
          Go to Home
        </Button>

        <Button as={Link} to="/cards">
          Go to List
        </Button>
      </ButtonPanel>

      <Form
        formValues={formValues}
        onChange={onChangeForm}
        onSubmit={onSubmitForm}
        isSaving={isSaving}
        savedStatus={savedStatus}
        submitBtnText="Save country"
      />

      <Button bgColor={ORANGE} onClick={clearForm}>
        New country
      </Button>
    </>
  );
}
