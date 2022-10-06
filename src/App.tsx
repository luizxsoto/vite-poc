import { Contexts } from './common/contexts';
import { Routes } from './common/routes';
import { ThemeProvider } from './modules/organization/theme';

export function App() {
  return (
    <Contexts>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </Contexts>
  );
}
