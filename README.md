# SORTEO TRIBUTARIO- RÍMAC 2023
 Simulador de sorteo para la Municipalidad Distrital del Rímac.
# TABLA DE CONTENIDO
- [Descripción del dominio de datos](#Descripción-del-dominio-de-datos)
- [Frontend](#Frontend)
  * [Principales funciones](#Principales-funciones)
  * [Screenshots de la GUI](#Screenshots-de-la-GUI)

## Descripcion del dominio de datos:

Este conjunto de datos es un espejo de la data original de la data relacionada a los pagos tributarios del 2023 por cada contribuyente y a su vez está relacionada  a la cantidad de tickets que se le atribuye a cada contribuyente para el SORTEO DEL RÍMAC. Este conjunto de datos solo proporciona un archivo de xlsx. Este archivo contiene una entrada para cada papel, que contiene:

* **ticket_id**: Es el identificador único de cada ticket ligado a cada codigo de contribuyente.
* **codigo**: Es el código de contribuyente ligado a cada ticket ID dependiendo de las opciones.
* **nombre**: Es el nombre del contribuyente de la Municipalidad Distrital del Rímac.

### Principales funciones:
- WinnerDisplay()
 ```javascript
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
 ```
- RandomNumberGenerator()
   ```javascript
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
    
          //console.log("Número generado:", winningNumber);
          setRandomNumber(winningNumber.toString().padStart(5, '0')); // Longitud fija de 5 dígitos
        }, 150); // Duración del intervalo: 150 milisegundos
      }
    
      return () => {
        clearInterval(intervalId);
      };
     }, [spinning]);
    ```

### Screenshots de la GUI:

![](CAPTURA1.jpg)

### Ejecución de la GUI

![](CAPTURA2.jpg)


