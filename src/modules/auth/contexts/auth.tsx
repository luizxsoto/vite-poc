import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import { loginApplicationService } from '@/modules/auth/application-services';
import { LoginProps } from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { ValidationException } from '@/common/exceptions';
import { i18n } from '@/common/i18n';

type AuthModeStateProps = {
  loginLoading: boolean;
  loginValidations?: Record<keyof LoginProps, string>;
  loggedUser?: User;
};
type AuthModeContextProps = AuthModeStateProps & {
  login: (loginProps: LoginProps) => Promise<void>;
};

const INITIAL_STATE: AuthModeStateProps = {
  loginLoading: false,
  loginValidations: undefined,
  loggedUser: undefined,
};
const AuthContext = createContext<AuthModeContextProps>(
  INITIAL_STATE as AuthModeContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthModeStateProps>(INITIAL_STATE);

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<Partial<AuthModeStateProps>>
        | ((
            oldData: Partial<AuthModeStateProps>
          ) => Partial<Partial<AuthModeStateProps>>)
    ) => {
      if (typeof newData === 'function')
        setState(oldData => ({ ...oldData, ...newData(oldData) }));

      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const errorHandler = useCallback(
    (error: any): void => {
      if (error instanceof ValidationException) {
        setStateSafety({
          loginValidations: error.validations.reduce(
            (accumulatedValidations, currentValidation) => ({
              ...accumulatedValidations,
              [currentValidation.field]: currentValidation.message,
            }),
            {}
          ) as Record<keyof LoginProps, string>,
        });

        toast.warn(i18n().common.exceptions.validationException, {
          toastId: 'ValidationException',
        });
      } else {
        toast.warn(i18n().common.exceptions.applicationException, {
          toastId: 'ApplicationException',
        });
      }
    },
    [setStateSafety]
  );

  const login = useCallback(
    async (loginProps: LoginProps) => {
      try {
        setStateSafety({ loginLoading: true });

        const serviceResult = await loginApplicationService(loginProps);

        setStateSafety({ loggedUser: serviceResult, loginLoading: false });
      } catch (error) {
        errorHandler(error);
        setStateSafety({ loginLoading: false });
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

export function useAuth(): AuthModeContextProps {
  const context = useContext(AuthContext);

  return context;
}
