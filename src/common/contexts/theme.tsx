import { createContext, useContext, useState, useCallback } from 'react';

type ThemeStateProps = {
  mode: 'dark' | 'light';
};
type ThemeContextProps = ThemeStateProps & {
  setTheme: (newData: ThemeStateProps) => void;
};

const INITIAL_STATE: ThemeStateProps = {
  mode: 'dark',
};
const ThemeContext = createContext<ThemeContextProps>(
  INITIAL_STATE as ThemeContextProps
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeStateProps>(INITIAL_STATE);

  const setTheme = useCallback(
    (newData: ThemeStateProps) => {
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

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}
