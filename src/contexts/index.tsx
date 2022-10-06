import { ThemeProvider } from './theme';

export function Contexts({ children }: { children: React.ReactNode }) {
  return [ThemeProvider].reduce(
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
