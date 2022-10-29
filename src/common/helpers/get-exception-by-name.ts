import {
  ApplicationException,
  UnauthorizedException,
  UnprocessableEntityException,
  ValidationException,
} from '@/common/exceptions';
import { StatusCodes } from '@/common/constants';

export function getParsedException(
  error?: ApplicationException
): ApplicationException {
  if (!error) return new ApplicationException({});
  if (error.name === 'ValidationException') {
    const validationException = error as ValidationException;
    return new ValidationException(validationException.validations);
  }
  if (
    error.name === 'UnauthorizedException' ||
    error.statusCode === StatusCodes.UNAUTHORIZED
  ) {
    return new UnauthorizedException();
  }
  if (error.name === 'UnprocessableEntityException') {
    return new UnprocessableEntityException(error.message);
  }
  return new ApplicationException({ originalError: error });
}
