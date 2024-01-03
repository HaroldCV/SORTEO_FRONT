import React from 'react';
import styled from 'styled-components';

const ChangeMessageContainer = styled.div`
  background-color: #fdba1d;
  padding: 5px;
  border-radius: 5px;
  margin-top: 80px;
  transform: skew(-10deg);
`;

const ChangeMessageText = styled.p`
  font-size: 2.0em;
  color: #000000;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
`;

const ChangeMessage = () => (
  <ChangeMessageContainer>
    <ChangeMessageText>EL CAMBIO NO LO HACE UNO, ¡LO HACEMOS TODOS!</ChangeMessageText>
  </ChangeMessageContainer>
);

export default ChangeMessage;
