import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

type TThemeModeState = {
  mode: 'dark' | 'light';
};
type TThemeModeContext = TThemeModeState & {
  setTheme: (newData: TThemeModeState) => void;
};

const INITIAL_STATE: TThemeModeState = {
  mode: 'light',
};
const ThemeContext = createContext<TThemeModeContext>(
  INITIAL_STATE as TThemeModeContext
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TThemeModeState>(INITIAL_STATE);

  const setTheme = useCallback(
    (newData: TThemeModeState) => {
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

export function useTheme(): TThemeModeContext {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useThemeMode must be used within an ThemeProvider');

  return context;
}
