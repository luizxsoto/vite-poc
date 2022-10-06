import { i18n } from '@/common/i18n';
import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
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
});
