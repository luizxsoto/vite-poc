import { AuthProvider } from '@/modules/auth/contexts/auth';
import { UserProvider } from '@/modules/auth/contexts/user';
import { ErrorHandlerProvider } from './error-handler';
import { ThemeProvider } from './theme';

export function Contexts({ children }: { children: React.ReactNode }) {
  return [
    ErrorHandlerProvider,
    ThemeProvider,
    AuthProvider,
    UserProvider,
  ].reduce(
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
