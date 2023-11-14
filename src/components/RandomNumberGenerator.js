import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NumberDisplay from './NumberDisplay';
import ControlButtons from './ControlButtons';
import Confetti from 'react-confetti';
import muniRimacLogo from '../images/muni_rimac_logo.png';

const Container = styled.div`
  text-align: center;
  margin-top: 10px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  color: #1565c0;
  -webkit-text-stroke: 1px #FFEB3B;
  padding: 10px;
  display: inline-block;
  font-size: 7.5em;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  margin: 0;
`;

const NumbersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const WinnerText = styled.p`
  font-size: 3.5em;
  color: #1565c0;
  margin-top: 20px;
`;

const LogoImage = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: 120px; 
`;

const RandomNumberGenerator = () => {
  const [randomNumber, setRandomNumber] = useState('');
  const [winnerNumber, setWinnerNumber] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    let intervalId;
  
    if (spinning) {
      intervalId = setInterval(() => {
        const min = 1;
        const max = 200;
        const excludedNumbers = [2, 3, 5]; //Aqui ubicaremos las exclusiones
  
        let winningNumber;
  
        do {
          winningNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (excludedNumbers.includes(winningNumber));
  
        setRandomNumber(winningNumber.toString());
      }, 250); // Duración del intervalo: 250 milisegundos
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [spinning]);

  const startSpinning = () => {
    setSpinning(true);
    setWinnerNumber('');
    setConfettiActive(false); // Reiniciar el estado del confeti
  };

  const stopSpinning = () => {
    setSpinning(false);
    setWinnerNumber(randomNumber);
    setConfettiActive(true); // Activar el confeti al detener el giro
    setTimeout(() => setConfettiActive(false), 15000); // Desactivar el confeti después de 15 segundos
  };

  return (
    <Container>
      <Header>SORTEO</Header>
      <LogoImage src={muniRimacLogo} alt="Muni Rimac Logo" />
      <NumbersContainer>
        {Array.from(randomNumber).map((digit, index) => (
          <NumberDisplay key={index} digit={digit} spinning={spinning} />
        ))}
        {confettiActive && <Confetti />}
      </NumbersContainer>
      {winnerNumber && <WinnerText>Código Predio Ganador: {winnerNumber}</WinnerText>}
      <ControlButtons startSpinning={startSpinning} stopSpinning={stopSpinning} spinning={spinning} />
    </Container>
  );
};

export default RandomNumberGenerator;
