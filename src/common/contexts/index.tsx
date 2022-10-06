import { AuthProvider } from '@/modules/auth/contexts/auth';
import { ThemeProvider } from './theme';

export function Contexts({ children }: { children: React.ReactNode }) {
  return [ThemeProvider, AuthProvider].reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children: currentChildren }: { children: React.ReactNode }) => {
        return (
          <AccumulatedProviders>
            <CurrentProvider>{currentChildren}</CurrentProvider>
          </AccumulatedProviders>
        );
      },
    ({ children: currentChildren }) => <>{currentChildren}</>
  )({ children });
}
