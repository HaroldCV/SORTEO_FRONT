import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
font-size: 1em;
padding: 10px 20px;
cursor: pointer;
background-color: #2196F3; // Color azul inicial
color: #fff;
border: none;
border-radius: 5px;
margin-right: 10px;
transition: background-color 0.3s ease, transform 0.3s ease;

&:hover {
  background-color: #1565c0; // Cambia de color al pasar el mouse
}

&:active {
  transform: scale(1.1); // Efecto de agrandamiento al hacer clic
}
`;


const ControlButtons = ({ startSpinning, stopSpinning, spinning }) => (
  <>
    {!spinning && <Button onClick={startSpinning}>Iniciar</Button>}
    {spinning && <Button onClick={stopSpinning}>Detener</Button>}
  </>
);

export default ControlButtons;
