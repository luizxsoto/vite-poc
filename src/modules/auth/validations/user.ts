import { i18n } from '@/common/i18n';
import * as yup from 'yup';

export const createValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, i18n().common.validators.min(6))
    .max(100, i18n().common.validators.max(100))
    .required(i18n().common.validators.required),
  email: yup
    .string()
    .min(6, i18n().common.validators.min(6))
    .max(100, i18n().common.validators.max(100))
    .required(i18n().common.validators.required),
  password: yup
    .string()
    .min(6, i18n().common.validators.min(6))
    .max(100, i18n().common.validators.max(100))
    .required(i18n().common.validators.required),
  role: yup
    .string()
    .oneOf(
      ['admin', 'normal'],
      i18n().common.validators.oneOf(['admin', 'normal'])
    )
    .required(i18n().common.validators.required),
});
