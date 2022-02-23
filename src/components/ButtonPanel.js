import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const ButtonPanel = ({ children }) => <Panel>{children}</Panel>;

ButtonPanel.displayName = 'ButtonPanel';

export default ButtonPanel;
