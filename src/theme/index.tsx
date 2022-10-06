import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/contexts/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode, setTheme } = useTheme();
  const theme = createTheme({ palette: { mode } });

  function handleSwitchTheme() {
    setTheme({ mode: mode === 'light' ? 'dark' : 'light' });
  }

  return (
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={handleSwitchTheme}>switch theme</button>
      {children}
    </MaterialThemeProvider>
  );
}
