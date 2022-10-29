import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import {
  loginAuthApplicationService,
  infoAuthApplicationService,
  signOutAuthApplicationService,
} from '@/modules/auth/application-services';
import {
  LoginParams,
  LoginResult,
} from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { getToken } from '@/modules/auth/repositories';
import { useErrorHandler } from '@/common/contexts/error-handler';
import { ContextHandlers } from '@/common/contracts';

type AuthStateProps = {
  loginLoading: boolean;
  isSigned: boolean;
  loggedUser?: User;
};
type LoginParamsContext = { model: LoginParams } & ContextHandlers<LoginResult>;
type AuthContextProps = AuthStateProps & {
  login: (params: LoginParamsContext) => Promise<void>;
  info: () => Promise<void>;
  signOut: () => Promise<void>;
};

const INITIAL_STATE: AuthStateProps = {
  loginLoading: false,
  isSigned: false,
  loggedUser: undefined,
};
const AuthContext = createContext<AuthContextProps>(
  INITIAL_STATE as AuthContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { errorHandler } = useErrorHandler();
  const [state, setState] = useState<AuthStateProps>(() => {
    const token = getToken();

    return { ...INITIAL_STATE, isSigned: Boolean(token) };
  });

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

        const serviceResult = await loginAuthApplicationService(model);

        setStateSafety({
          loggedUser: serviceResult,
          isSigned: true,
          loginLoading: false,
        });
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

  const info = useCallback(async () => {
    try {
      setStateSafety({ loginLoading: true });

      const serviceResult = await infoAuthApplicationService();

      setStateSafety({ loggedUser: serviceResult, loginLoading: false });
    } catch (error) {
      signOut();
      errorHandler({ error: error as Error });
    }
  }, [setStateSafety]);

  const signOut = useCallback(async () => {
    signOutAuthApplicationService();

    setStateSafety({
      loggedUser: undefined,
      isSigned: false,
      loginLoading: false,
    });
  }, [setStateSafety]);

  useEffect(() => {
    info();
  }, [info]);

  return (
    <AuthContext.Provider value={{ ...state, login, info, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  return context;
}
