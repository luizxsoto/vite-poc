import { createContext, useContext, useState, useCallback } from 'react';

import { listUserApplicationService } from '@/modules/auth/application-services';
import { UserListProps } from '@/modules/auth/contracts/application-services';
import { User } from '@/modules/auth/contracts/models';
import { useErrorHandler } from '@/common/contexts/error-handler';

type UserStateProps = {
  listLoading: boolean;
  userList: User[];
};
type UserContextProps = UserStateProps & {
  list: (listProps: UserListProps) => Promise<void>;
};

const INITIAL_STATE: UserStateProps = {
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
        | Partial<Partial<UserStateProps>>
        | ((
            oldData: Partial<UserStateProps>
          ) => Partial<Partial<UserStateProps>>)
    ) => {
      if (typeof newData === 'function')
        setState(oldData => ({ ...oldData, ...newData(oldData) }));

      setState(oldData => ({ ...oldData, ...newData }));
    },
    [setState]
  );

  const list = useCallback(
    async (listProps: UserListProps) => {
      try {
        setStateSafety({ listLoading: true });

        const serviceResult = await listUserApplicationService(listProps);

        setStateSafety({ listLoading: false, userList: serviceResult });
      } catch (error) {
        setStateSafety({ listLoading: false });
        errorHandler({ error: error as Error });
      }
    },
    [setStateSafety]
  );

  return (
    <UserContext.Provider value={{ ...state, list }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextProps {
  const context = useContext(UserContext);

  return context;
}
