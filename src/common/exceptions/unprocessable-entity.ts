import { StatusCodes } from '@/common/constants';

import { ApplicationException } from './application';

export class UnprocessableEntityException extends ApplicationException {
  constructor(message: string) {
    super({
      name: 'UnprocessableEntityException',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      message,
    });
  }
}
