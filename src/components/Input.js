import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: grid;
  grid-gap: 7px;
  text-align: left;
  margin: 0 5%;
`;

const StyledInput = styled.input`
  padding: 4px 8px;
  border: 0;
  border-bottom: 2px solid #545454;
  width: 300px;
  margin-bottom: 15px;
  outline: none;
  font-size: 20px;
`;

const Input = ({ defaultValue, labelText, name, type, ...htmlAttributes }) => (
  <StyledLabel>
    {!!labelText && labelText}
    <StyledInput
      defaultValue={defaultValue}
      name={name}
      type={type}
      step={type === 'number' ? 'any' : undefined}
      required
      {...htmlAttributes}
    />
  </StyledLabel>
);

export default Input;
