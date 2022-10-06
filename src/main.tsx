import React from 'react';
import ReactDOM from 'react-dom/client';

import { Contexts } from './common/contexts';
import { Routes } from './common/routes';
import { GlobalStyles } from './common/styles';
import { ThemeProvider } from './common/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Contexts>
      <GlobalStyles>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </GlobalStyles>
    </Contexts>
  </React.StrictMode>
);
