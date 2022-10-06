import { createContext, useContext, useState, useCallback } from 'react';

type ThemeModeStateProps = {
  mode: 'dark' | 'light';
};
type ThemeModeContextProps = ThemeModeStateProps & {
  setTheme: (newData: ThemeModeStateProps) => void;
};

const INITIAL_STATE: ThemeModeStateProps = {
  mode: 'dark',
};
const ThemeContext = createContext<ThemeModeContextProps>(
  INITIAL_STATE as ThemeModeContextProps
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeModeStateProps>(INITIAL_STATE);

  const setTheme = useCallback(
    (newData: ThemeModeStateProps) => {
      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  return (
    <ThemeContext.Provider value={{ ...state, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeModeContextProps {
  const context = useContext(ThemeContext);

  return context;
}
