import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

import {
  ApplicationException,
  UnprocessableEntityException,
  ValidationException,
} from '@/common/exceptions';
import { i18n } from '@/common/i18n';

type ErrorHandlerStateProps = {};
type ErrorHandlerProps = {
  error: Error;
  setValidations: (validations: Record<string, string>) => void;
};
type ErrorHandlerContextProps = ErrorHandlerStateProps & {
  errorHandler: (data: ErrorHandlerProps) => void;
};

const INITIAL_STATE: ErrorHandlerStateProps = {};
const ErrorHandlerContext = createContext<ErrorHandlerContextProps>(
  INITIAL_STATE as ErrorHandlerContextProps
);

export function ErrorHandlerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ErrorHandlerStateProps>(INITIAL_STATE);

  const errorHandler = useCallback(
    ({ error, setValidations }: ErrorHandlerProps) => {
      switch ((error as ValidationException).name || '') {
        case 'ValidationException':
          setValidations(
            (error as ValidationException).validations.reduce(
              (accumulatedValidations, currentValidation) => ({
                ...accumulatedValidations,
                [currentValidation.field]: currentValidation.message,
              }),
              {}
            ) as Record<string, string>
          );

          toast.warn(i18n().common.exceptions.validationException, {
            toastId: 'ValidationException',
          });
          break;
        case 'UnprocessableEntityException':
        case 'ApplicationException':
          toast.warn((error as ApplicationException).message, {
            toastId: (error as ApplicationException).name,
          });
          break;
        default:
          toast.warn(i18n().common.exceptions.applicationException, {
            toastId: 'ApplicationException',
          });
          break;
      }
    },
    [setState]
  );

  return (
    <ErrorHandlerContext.Provider value={{ ...state, errorHandler }}>
      {children}
    </ErrorHandlerContext.Provider>
  );
}

export function useErrorHandler(): ErrorHandlerContextProps {
  const context = useContext(ErrorHandlerContext);

  return context;
}
