import { createContext, useContext, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';

import {
  ApplicationException,
  UnauthorizedException,
  ValidationException,
} from '@/common/exceptions';
import { i18n } from '@/common/i18n';

type ErrorHandlerStateProps = {};
type ErrorHandlerProps = {
  error: ApplicationException;
  setValidations?: (validations: Record<string, string>) => void;
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
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState<ErrorHandlerStateProps>(INITIAL_STATE);

  const errorHandler = useCallback(
    ({ error, setValidations }: ErrorHandlerProps) => {
      switch (error?.name || '') {
        case 'ValidationException':
          setValidations?.(
            (error as ValidationException).validations.reduce(
              (accumulatedValidations, currentValidation) => ({
                ...accumulatedValidations,
                [currentValidation.field]: currentValidation.message,
              }),
              {}
            ) as Record<string, string>
          );

          enqueueSnackbar(i18n().common.exceptions.validationException, {
            variant: 'warning',
          });
          break;
        case 'UnauthorizedException':
          enqueueSnackbar(i18n().common.exceptions.unauthorizedException, {
            variant: 'warning',
          });
          break;
        case 'UnprocessableEntityException':
          enqueueSnackbar((error as ApplicationException).message, {
            variant: 'warning',
          });
          break;
        default:
          enqueueSnackbar(i18n().common.exceptions.applicationException, {
            variant: 'warning',
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
