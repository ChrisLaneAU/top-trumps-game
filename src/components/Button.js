import React from 'react';
import styled from 'styled-components';
import { BLUE } from '../constants/palette';

const StyledButton = styled.button`
  appearance: none;
  text-decoration: none;
  margin: 20px 0;
  border-radius: 3px;
  padding: 10px 20px;
  background: ${({ bgColor }) => bgColor};
  color: white;
  font-weight: bold;

  &:active {
    opacity: 0.5;
  }
`;

const Button = React.forwardRef(
  ({ children, bgColor = BLUE, onClick = noop, type, ...rest }, ref) => (
    <StyledButton {...{ type, bgColor, onClick, ref, ...rest }}>
      {children}
    </StyledButton>
  ),
);

export default Button;

const noop = () => undefined;
