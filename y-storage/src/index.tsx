import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './assets/styles/globalStyle'
import { theme } from './assets/styles/theme'
import { ThemeProvider } from 'styled-components';

ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
