import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
`;

const AlertBox = styled.div`
  z-index: 2;
  border-radius: 5px;
  height: 170px;
  width: 300px;
  padding: 20px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  gap: 30px;
`;

const Question = styled.p`
  grid-column: 1 / 3;
`;

const StyledButton = styled(Button)`
  grid-row: 2;
`;

const Modal = ({ hideModal, confirmFn, question }) => (
  <Overlay>
    <AlertBox>
      <Question>{question && question}</Question>
      <StyledButton
        onClick={() => {
          confirmFn();
          hideModal();
        }}>
        Yes
      </StyledButton>
      <StyledButton onClick={() => hideModal()}>No</StyledButton>
    </AlertBox>
  </Overlay>
);

export default Modal;
