import React from 'react';
import ReactDOM from 'react-dom/client';

import { Contexts } from './common/contexts';
import { Routes } from './common/routes';
import { GlobalStyles } from './common/styles';
import { SnackbarProvider } from './common/styles/snack-bar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Contexts>
        <GlobalStyles>
          <Routes />
        </GlobalStyles>
      </Contexts>
    </SnackbarProvider>
  </React.StrictMode>
);
