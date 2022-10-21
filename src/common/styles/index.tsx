import CssBaseline from '@mui/material/CssBaseline';

import { ResetStyle } from './reset';
import { ThemeProvider } from './theme';

export function GlobalStyles({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <ResetStyle />
      {children}
    </ThemeProvider>
  );
}
