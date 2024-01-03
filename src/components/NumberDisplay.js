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
  border: 7px solid #000000;
  margin: 10px;
  font-size: 8.5em;
  font-weight: bold;
  border-radius: 5%; 
  overflow: hidden; 
  font-family: 'Orbitron', sans-serif; 
  animation: ${({ spinning }) => (spinning ? css`${spinAnimation} 2s linear infinite` : 'none')};
  color: ${({ textColor }) => textColor || '#fdba1d'}; 
  text-shadow: 6px 2px 2px black;
  -webkit-text-stroke: 3.5px black; 
  text-stroke: 2px black;
  margin-top:150px;
`;
//text-shadow: 8px 2px 2px black;

const SpinningNumberDisplay = styled(NumberBox).withConfig({
  shouldForwardProp: (prop) => prop !== 'spinning',
})``;

const NumberDisplay = ({ digit, spinning, textColor }) => (
  <SpinningNumberDisplay spinning={spinning} textColor={textColor}>
    {digit}
  </SpinningNumberDisplay>
);

export default NumberDisplay;
