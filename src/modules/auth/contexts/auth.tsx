import { createContext, useContext, useState, useCallback } from 'react';

import { loginApplicationService } from '@/modules/auth/application-services';
import {
  LoginParams,
  LoginResult,
} from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';
import { ContextHandlers } from '@/common/contracts';

type AuthStateProps = {
  loginLoading: boolean;
  loggedUser?: User;
};
type LoginParamsContext = { model: LoginParams } & ContextHandlers<LoginResult>;
type AuthContextProps = AuthStateProps & {
  login: (params: LoginParamsContext) => Promise<void>;
};

const INITIAL_STATE: AuthStateProps = {
  loginLoading: false,
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
    async ({ model, onSuccess, onError }: LoginParamsContext) => {
      try {
        setStateSafety({ loginLoading: true });

        const serviceResult = await loginApplicationService(model);

        setStateSafety({ loggedUser: serviceResult, loginLoading: false });
        onSuccess?.(serviceResult);
      } catch (error) {
        setStateSafety({ loginLoading: false });
        errorHandler({
          error: error as Error,
          setValidations: validations => onError?.({ validations }),
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
