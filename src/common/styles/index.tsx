import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ResetStyle } from './reset';
import { ThemeProvider } from './theme';

export function GlobalStyles({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ToastContainer />
      <ResetStyle />
      {children}
    </ThemeProvider>
  );
}
