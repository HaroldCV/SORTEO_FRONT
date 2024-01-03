import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(725deg, #1565c0, #ffffff);
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
//175