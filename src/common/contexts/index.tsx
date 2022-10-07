import { AuthProvider } from '@/modules/auth/contexts/auth';
import { ErrorHandlerProvider } from './error-handler';
import { ThemeProvider } from './theme';

export function Contexts({ children }: { children: React.ReactNode }) {
  return [ErrorHandlerProvider, ThemeProvider, AuthProvider].reduce(
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
