import { createContext, useContext, useState, useCallback } from 'react';

import { loginApplicationService } from '@/modules/auth/application-services';
import { LoginProps } from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';

type AuthStateProps = {
  loginLoading: boolean;
  loginValidations?: Record<string, string>;
  loggedUser?: User;
};
type AuthContextProps = AuthStateProps & {
  login: (loginProps: LoginProps) => Promise<void>;
};

const INITIAL_STATE: AuthStateProps = {
  loginLoading: false,
  loginValidations: undefined,
  loggedUser: undefined,
};
const AuthContext = createContext<AuthContextProps>(
  INITIAL_STATE as AuthContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { errorHandler } = useErrorHandler();
  const [state, setState] = useState<AuthStateProps>(INITIAL_STATE);

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<Partial<AuthStateProps>>
        | ((
            oldData: Partial<AuthStateProps>
          ) => Partial<Partial<AuthStateProps>>)
    ) => {
      if (typeof newData === 'function')
        setState(oldData => ({ ...oldData, ...newData(oldData) }));

      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const login = useCallback(
    async (loginProps: LoginProps) => {
      try {
        setStateSafety({ loginLoading: true });

        const serviceResult = await loginApplicationService(loginProps);

        setStateSafety({ loggedUser: serviceResult, loginLoading: false });
      } catch (error) {
        setStateSafety({ loginLoading: false });
        errorHandler({
          error: error as Error,
          setValidations: validations =>
            setStateSafety({ loginValidations: validations }),
        });
      }
    },
    [setStateSafety]
  );

  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  return context;
}
