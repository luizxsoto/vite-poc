import { createContext, useContext, useState, useCallback } from 'react';

import {
  userCreateApplicationService,
  userListApplicationService,
} from '@/modules/auth/application-services';
import {
  UserCreateParams,
  UserListParams,
} from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';

type UserStateProps = {
  formLoading: boolean;
  listLoading: boolean;
  userList: User[];
};
type ContextHandlers = {
  onSuccess: (serviceResult: User) => void;
  onError: (error: { validations?: Record<string, string> }) => void;
};
type UserContextProps = UserStateProps & {
  list: (params: UserListParams) => Promise<void>;
  create: (params: UserCreateParams & ContextHandlers) => Promise<void>;
  clearState: () => void;
};

const INITIAL_STATE: UserStateProps = {
  formLoading: false,
  listLoading: false,
  userList: [],
};
const UserContext = createContext<UserContextProps>(
  INITIAL_STATE as UserContextProps
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { errorHandler } = useErrorHandler();
  const [state, setState] = useState<UserStateProps>(INITIAL_STATE);

  const setStateSafety = useCallback(
    (
      newData:
        | Partial<UserStateProps>
        | ((oldData: UserStateProps) => Partial<UserStateProps>)
    ) => {
      if (typeof newData === 'function')
        setState(oldData => ({ ...oldData, ...newData(oldData) }));

      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const list = useCallback(
    async (params: UserListParams) => {
      try {
        setStateSafety({ listLoading: true });

        const serviceResult = await userListApplicationService(params);

        setStateSafety({ listLoading: false, userList: serviceResult });
      } catch (error) {
        setStateSafety({ listLoading: false });
        errorHandler({ error: error as Error });
      }
    },
    [setStateSafety]
  );

  const create = useCallback(
    async ({
      onSuccess,
      onError,
      ...params
    }: UserCreateParams & ContextHandlers) => {
      try {
        setStateSafety({ formLoading: true });

        const serviceResult = await userCreateApplicationService(params);

        setStateSafety(oldState => ({
          formLoading: false,
          userList: [serviceResult, ...oldState.userList],
        }));

        onSuccess(serviceResult);
      } catch (error) {
        setStateSafety({ formLoading: false });
        errorHandler({
          error: error as Error,
          setValidations: validations => onError({ validations }),
        });
      }
    },
    [setStateSafety]
  );

  const clearState = useCallback((): void => {
    setStateSafety(oldState => ({
      ...oldState,
      formLoading: false,
      // TODO: Remove comments when implemented
      // showLoading: false,
      // registerShow: undefined,
    }));
  }, [setState]);

  return (
    <UserContext.Provider value={{ ...state, list, create, clearState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextProps {
  const context = useContext(UserContext);

  return context;
}
