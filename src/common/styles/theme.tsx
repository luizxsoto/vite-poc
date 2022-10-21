import {
  createTheme,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material/styles';

import { useTheme } from '@/common/contexts/theme';
import { ThemeButton } from '@/common/components/ThemeButton';

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
