import { createContext, useContext, useState, useCallback } from 'react';

import {
  userCreateApplicationService,
  userListApplicationService,
  userShowApplicationService,
  userUpdateApplicationService,
} from '@/modules/auth/application-services';
import {
  UserCreateParams,
  UserListParams,
  UserListResult,
  UserShowParams,
  UserUpdateParams,
} from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';
import { ContextHandlers } from '@/common/contracts';
import { ApplicationException } from '@/common/exceptions';

type UserStateProps = {
  formLoading: boolean;
  listLoading: boolean;
  listData: UserListResult;
  showData?: User;
  showLoading: boolean;
};
type UserCreateParamsContext = {
  model: UserCreateParams;
} & ContextHandlers<User>;
type UserShowParamsContext = {
  model: UserShowParams;
} & ContextHandlers<User>;
type UserUpdateParamsContext = {
  model: UserUpdateParams;
} & ContextHandlers<User>;
type UserContextProps = UserStateProps & {
  list: (params: UserListParams) => Promise<void>;
  create: (params: UserCreateParamsContext) => Promise<void>;
  show: (params: UserShowParamsContext) => Promise<void>;
  update: (params: UserUpdateParamsContext) => Promise<void>;
  clearState: () => void;
};

const INITIAL_STATE: UserStateProps = {
  formLoading: false,
  listLoading: false,
  listData: {
    page: 1,
    perPage: 25,
    lastPage: 1,
    total: 1,
    order: 'desc',
    orderBy: 'createdAtFormated',
    data: [],
  },
  showData: undefined,
  showLoading: false,
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

        setStateSafety({ listLoading: false, listData: serviceResult });
      } catch (error) {
        setStateSafety({ listLoading: false });
        errorHandler({ error: error as ApplicationException });
      }
    },
    [setStateSafety]
  );

  const create = useCallback(
    async ({ model, onSuccess, onError }: UserCreateParamsContext) => {
      try {
        setStateSafety({ formLoading: true });

        const serviceResult = await userCreateApplicationService(model);

        setStateSafety(oldState => ({
          formLoading: false,
          listData: {
            ...oldState.listData,
            data: [serviceResult, ...oldState.listData.data],
          },
        }));
        onSuccess?.(serviceResult);
      } catch (error) {
        setStateSafety({ formLoading: false });
        const parsedError = error as ApplicationException;
        errorHandler({
          error: parsedError,
          setValidations: validations =>
            onError?.({ error: parsedError, validations }),
        });
      }
    },
    [setStateSafety]
  );

  const show = useCallback(
    async ({ model, onSuccess, onError }: UserShowParamsContext) => {
      try {
        setStateSafety({ showLoading: true });

        const serviceResult = await userShowApplicationService(model);

        setStateSafety({ showLoading: false, showData: serviceResult });
        onSuccess?.(serviceResult);
      } catch (error) {
        setStateSafety({ showLoading: false });
        const parsedError = error as ApplicationException;
        onError?.({ error: parsedError });
        errorHandler({ error: parsedError });
      }
    },
    [setStateSafety]
  );

  const update = useCallback(
    async ({ model, onSuccess, onError }: UserUpdateParamsContext) => {
      try {
        setStateSafety({ formLoading: true });

        const serviceResult = await userUpdateApplicationService(model);

        setStateSafety(oldState => ({
          formLoading: false,
          listData: {
            ...oldState.listData,
            data: [
              serviceResult,
              ...oldState.listData.data.filter(item => item.id !== model.id),
            ],
          },
        }));
        onSuccess?.(serviceResult);
      } catch (error) {
        setStateSafety({ formLoading: false });
        const parsedError = error as ApplicationException;
        errorHandler({
          error: parsedError,
          setValidations: validations =>
            onError?.({ error: parsedError, validations }),
        });
      }
    },
    [setStateSafety]
  );

  const clearState = useCallback((): void => {
    setStateSafety(oldState => ({
      ...oldState,
      formLoading: false,
      showData: undefined,
      showLoading: false,
    }));
  }, [setState]);

  return (
    <UserContext.Provider
      value={{ ...state, list, create, show, update, clearState }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextProps {
  return useContext(UserContext);
}
