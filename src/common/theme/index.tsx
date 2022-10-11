import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';

import { useTheme } from '@/common/contexts/theme';

function ThemeButton() {
  const { mode, setTheme } = useTheme();

  function handleSwitchTheme() {
    setTheme({ mode: mode === 'light' ? 'dark' : 'light' });
  }

  return (
    <IconButton
      onClick={handleSwitchTheme}
      style={{ position: 'absolute', zIndex: 999, top: 8, right: 8 }}
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme();
  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#8f52a1' },
      secondary: { main: '#f89b1b' },
    },
  });

  return (
    <MaterialThemeProvider theme={theme}>
      <ThemeButton />
      {children}
    </MaterialThemeProvider>
  );
}
