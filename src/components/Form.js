import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  DARK_GREY,
  DARK_RED,
  LIGHT_GREEN,
  MEDIUM_GREEN,
  RED,
} from '../constants/palette';
import toSentence from '../utils/to-sentence';
import Button from './Button';
import Input from './Input';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const SavedStatusAlert = styled.div`
  border: 1px solid
    ${({ savedStatus }) => (savedStatus === 'success' ? LIGHT_GREEN : RED)};
  background: ${({ savedStatus }) =>
    savedStatus === 'success' ? MEDIUM_GREEN : DARK_RED};
  padding: 10px 80px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  color: ${DARK_GREY};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const Form = ({
  formValues,
  isSaving,
  onChange,
  onSubmit,
  savedStatus,
  submitBtnText,
}) => {
  const hasSubmitted = useRef(false);
  useEffect(() => {
    if (isSaving) {
      hasSubmitted.current = true;
    }
  }, [isSaving]);

  const inputs = Object.keys(formValues).map((formName) => (
    <Input
      key={`${formName}-${formValues.countryName}`}
      labelText={toSentence(formName)}
      name={formName}
      defaultValue={formValues[formName]}
      type={typeof formValues[formName]}
    />
  ));

  return (
    <StyledForm {...{ onSubmit, onChange }}>
      {inputs}
      <SavedStatusAlert
        isVisible={
          !isSaving && hasSubmitted.current && !!formValues.countryName
        }
        savedStatus={savedStatus}>
        {`${formValues.countryName} ${
          savedStatus === 'error'
            ? 'has not saved, please try again'
            : 'saved successfully'
        }`}
      </SavedStatusAlert>

      <Button disabled={isSaving} type="submit">
        {submitBtnText}
      </Button>
    </StyledForm>
  );
};

export default Form;
