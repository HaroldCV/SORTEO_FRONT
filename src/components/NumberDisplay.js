// NumberDisplay.js
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(360deg);
  }
`;

const NumberBox = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #3498db;
  margin: 5px;
  font-size: 5.5em;
  font-weight: bold;
  border-radius: 5%; 
  overflow: hidden; 
  animation: ${({ spinning }) => (spinning ? css`${spinAnimation} 2s linear infinite` : 'none')};
`;


const SpinningNumberDisplay = styled(NumberBox).withConfig({
  shouldForwardProp: (prop) => prop !== 'spinning',
})``;

const NumberDisplay = ({ digit, spinning }) => (
  <SpinningNumberDisplay spinning={spinning}>
    {digit}
  </SpinningNumberDisplay>
);

export default NumberDisplay;
