import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: auto;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
