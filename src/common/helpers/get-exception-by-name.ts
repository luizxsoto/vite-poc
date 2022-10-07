import {
  ApplicationException,
  UnprocessableEntityException,
  ValidationException,
} from '@/common/exceptions';

export function getExceptionByName(error?: Error): ApplicationException {
  switch (error?.name || '') {
    case 'ValidationException':
      const validationException = error as ValidationException;
      return new ValidationException(validationException.validations);
    case 'UnprocessableEntityException':
      const unprocessableEntityException =
        error as UnprocessableEntityException;
      return new UnprocessableEntityException(
        unprocessableEntityException.message
      );
    default:
      return new ApplicationException({ originalError: error });
  }
}
