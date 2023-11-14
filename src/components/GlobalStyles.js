import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(850deg, #3498db, #ffffff);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
