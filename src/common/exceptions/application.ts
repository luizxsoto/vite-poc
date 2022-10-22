import { envConfig } from '@/common/config';
import { StatusCodes } from '@/common/constants';
import { i18n } from '@/common/i18n';

export class ApplicationException extends Error {
  public name = 'ApplicationException';
  public code = StatusCodes.INTERNAL;
  public details?: Record<string, unknown> | string;
  public originalError?: Error;

  constructor({
    originalError,
    ...error
  }: Partial<ApplicationException> & { originalError?: Error }) {
    super(i18n().common.exceptions.applicationException);
    const details =
      envConfig.NODE_ENV === 'production'
        ? undefined
        : {
            ...(typeof error.details === 'string' ? {} : error.details),
            name: originalError?.name,
            message: originalError?.message,
            stack: originalError?.stack
              ?.split('\n')
              .map((line: string) => line.trim()),
          };

    Object.assign(
      this,
      error,
      {
        originalError:
          envConfig.NODE_ENV === 'production' ? undefined : originalError,
      },
      Object.values(details ?? {}).filter(value => Boolean(value)).length
        ? { details }
        : {}
    );

    if (envConfig.NODE_ENV !== 'production') console.warn(this);
  }
}
