import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NumberDisplay from './NumberDisplay';
import ControlButtons from './ControlButtons';
import Confetti from 'react-confetti';
import muniRimacLogo from '../images/muni_rimac_logo.png';
import muniRimacLogo2 from '../images/ecn nestor de la rosa alcalde.png';
import WinnerDisplay from './WinnerDisplay';
import ChangeMessage from './ChangeMessage';

const Container = styled.div`
  text-align: center;
  margin-top: 10px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  color: #fdbd1d;
  -webkit-text-stroke: 3.5px #000000;
  padding: 10px;
  display: inline-block;
  font-size: 5.7em;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  margin: 0;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 80px;
`;

const NumbersContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const LogoImage2 = styled.img`
  position: absolute;
  top: 20px;
  right: 23px;
  max-width:140px; 
`;

const LogoImage = styled.img`
  position: absolute;
  top: 24px;
  right: 1325px;
  max-width:190px; 
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
        const max = 28596;
        const excludedNumbers = []; // Aquí ubicamos las exclusiones
  
        // Generar un número ganador dentro del rango deseado
        let winningNumber;
        do {
          winningNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (excludedNumbers.includes(winningNumber) || winningNumber > max);
  
        console.log("Número generado:", winningNumber);
        setRandomNumber(winningNumber.toString().padStart(5, '0')); // Longitud fija de 5 dígitos
      }, 150); // Duración del intervalo: 150 milisegundos
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [spinning]);
  
  
  
  const startSpinning = () => {
    setSpinning(true);
    setWinnerNumber('');
    setConfettiActive(false); // Reset the confetti state
  };

  const stopSpinning = () => {
    setSpinning(false);
    setWinnerNumber(randomNumber);
    setConfettiActive(true); // Activate confetti when spinning stops
    setTimeout(() => setConfettiActive(false), 20000); // Deactivate confetti after 15 seconds
  };

  return (
    <Container>
      <Header>SORTEO RÍMAC-2023</Header>
      <LogoImage2 src={muniRimacLogo2} alt="Muni Rimac Logo" />
      <LogoImage src={muniRimacLogo} alt="Muni Rimac Logo" />
      <NumbersContainer>
        {Array.from(randomNumber.padStart(5, '0')).map((digit, index) => (
          <NumberDisplay key={index} digit={digit} spinning={spinning} />
        ))}
        {confettiActive && <Confetti />}
      </NumbersContainer>
      {winnerNumber && <WinnerDisplay winnerNumber={winnerNumber} />}
      <ControlButtons startSpinning={startSpinning} stopSpinning={stopSpinning} spinning={spinning} />  
      <ChangeMessage />
    </Container>
  );
};

export default RandomNumberGenerator;
