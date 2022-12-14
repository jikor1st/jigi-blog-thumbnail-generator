import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';

import { globalTheme } from '@/lib/theme';
// styles
import { resetCss, globalCss, fontCss } from '@/lib/styles';

const root = ReactDOM.createRoot(
  document.getElementById('app-root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <Global styles={[resetCss, globalCss, fontCss]} />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
