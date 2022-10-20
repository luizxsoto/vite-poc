import { createContext, useContext, useState, useCallback } from 'react';

import { loginApplicationService } from '@/modules/auth/application-services';
import { LoginParams } from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';

type AuthStateProps = {
  loginLoading: boolean;
  validations?: Record<string, string>;
  loggedUser?: User;
};
type AuthContextProps = AuthStateProps & {
  login: (params: LoginParams) => Promise<void>;
};

const INITIAL_STATE: AuthStateProps = {
  loginLoading: false,
  validations: undefined,
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
        | Partial<AuthStateProps>
        | ((oldData: AuthStateProps) => Partial<AuthStateProps>)
    ) => {
      if (typeof newData === 'function')
        setState(oldData => ({ ...oldData, ...newData(oldData) }));

      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const login = useCallback(
    async (params: LoginParams) => {
      try {
        setStateSafety({ loginLoading: true });

        const serviceResult = await loginApplicationService(params);

        setStateSafety({ loggedUser: serviceResult, loginLoading: false });
      } catch (error) {
        setStateSafety({ loginLoading: false });
        errorHandler({
          error: error as Error,
          setValidations: validations => setStateSafety({ validations }),
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
