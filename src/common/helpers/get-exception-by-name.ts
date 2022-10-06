import { ApplicationException, ValidationException } from '@/common/exceptions';

export function getExceptionByName(error?: Error): ApplicationException {
  switch (error?.name) {
    case 'ValidationException':
      const parsedError = error as ValidationException;
      return new ValidationException(parsedError.validations);
    default:
      return new ApplicationException({ originalError: error });
  }
}
