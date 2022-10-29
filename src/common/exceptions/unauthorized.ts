import { StatusCodes } from '@/common/constants';
import { i18n } from '@/common/i18n';

import { ApplicationException } from './application';

export class UnauthorizedException extends ApplicationException {
  constructor() {
    super({
      name: 'UnauthorizedException',
      statusCode: StatusCodes.UNAUTHORIZED,
      message: i18n().common.exceptions.unauthorizedException,
    });
  }
}
