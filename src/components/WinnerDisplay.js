import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';

const WinnerContainer = styled.div`
  background-color: #fdba1d;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  display: inline-block;
  margin-right: 40px;
`;

// const CupIcon = styled.span`
//   font-size: 3.5em;
//   margin-right: 10px;
// `;

const CelebrationIcon = styled.span`
  font-size: 2.2em;
  margin-right: 10px;
`;

const WinnerText = styled.p`
  font-size: 1.9em;
  color: #000000;
  font-family: 'Orbitron', sans-serif;
  margin: 0;
  display: inline-block;
`;

const WinnerDisplay = ({ winnerNumber }) => {
  const [cleanedWinnerNumber, setCleanedWinnerNumber] = useState('');
  const [contribuyente, setContribuyente] = useState('');

  useEffect(() => {
    const cleanedNumber = winnerNumber.replace(/^0+/, '');
    //console.log('cleanedWinnerNumber (converted to integer):', cleanedNumber);
    setCleanedWinnerNumber(cleanedNumber);
  }, [winnerNumber]);

  useEffect(() => {
    const fetchWinnerName = async () => {
      try {
        // Limpiar el número y convertirlo a entero
        const cleanedNumber = parseInt(winnerNumber.replace(/^0+/, ''), 10);
        //console.log('cleanedWinnerNumber (converted to integer):', cleanedNumber);

        // Fetch del archivo CSV
        const response = await fetch('/TICKETS_RESULTADO_TEST.csv');
        const csvData = await response.text();

        // Parsear CSV
        Papa.parse(csvData, {
          header: true,
          delimiter: ',',
          complete: (result) => {
            //console.log('Parsed data:', result.data);

            // Encontrar el ticket con el ticket_id correspondiente
            const ticket = result.data.find(entry => entry.ticket_id && parseInt(entry.ticket_id, 10) === cleanedNumber);

            console.log('Ticket encontrado:', ticket);

            // Actualizar el estado si se encuentra el ticket
            if (ticket) {
              setContribuyente(ticket.nombre);
            } else {
              console.error('Ticket no encontrado');
            }
          },
        });
      } catch (error) {
        console.error('Error durante la carga del archivo:', error);
      }
    };

    fetchWinnerName();
  }, [winnerNumber]);
  

  return (
    <WinnerContainer>
    {contribuyente && <WinnerText>GANADOR:{contribuyente}</WinnerText>}
    <CelebrationIcon>🎉</CelebrationIcon>
    <CelebrationIcon>🎉</CelebrationIcon>
  </WinnerContainer>
  );
};

export default WinnerDisplay;

//<CupIcon>🏆</CupIcon>
