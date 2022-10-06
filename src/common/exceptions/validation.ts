import { StatusCodes } from '@/common/constants';
import { i18n } from '@/common/i18n';

import { ApplicationException } from './application';

export interface ValidationItem {
  field: string;
  rule: string;
  message: string;
}

export class ValidationException extends ApplicationException {
  constructor(public readonly validations: ValidationItem[]) {
    super({
      name: 'ValidationException',
      code: StatusCodes.BAD_REQUEST,
      message: i18n().common.exceptions.validationException,
    });
  }
}
