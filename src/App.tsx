import { Contexts } from './contexts';
import { Routes } from './routes';
import { ThemeProvider } from './theme';

export function App() {
  return (
    <Contexts>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </Contexts>
  );
}
