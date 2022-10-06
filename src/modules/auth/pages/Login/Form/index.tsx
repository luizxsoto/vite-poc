import { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';

import { useAuth } from '@/modules/auth/contexts/auth';
import { LoginProps } from '@/modules/auth/contracts/application-services';
import { loginValidationSchema } from '@/modules/auth/validations';
import { loginSanitizer } from '@/modules/auth/sanitizers';

import {
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
  FormContainer,
  FormGridContainer,
  TextInput,
  ConfirmButton,
} from './styles';
import { i18n } from '@/common/i18n';

export function LoginForm(): JSX.Element {
  const { login, loginLoading, loginValidations } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword(): void {
    setShowPassword(!showPassword);
  }

  function handleSubmit(loginProps: LoginProps): void {
    login(loginProps);
  }

  useEffect(() => {
    formRef.current?.setErrors(loginValidations || {});
  }, [loginValidations]);

  return (
    <FormContainer<LoginProps>
      formRef={formRef}
      validatorSchema={loginValidationSchema}
      sanitizer={loginSanitizer}
      onSubmit={handleSubmit}
    >
      <FormGridContainer>
        <TextInput
          label={i18n().modules.auth.pages.login.form.emailInput}
          name="email"
          inputProps={{
            autoComplete: 'email',
          }}
        />
        <TextInput
          label={i18n().modules.auth.pages.login.form.passwordInput}
          name="password"
          inputProps={{
            type: showPassword ? 'text' : 'password',
            autoComplete: 'current-password',
          }}
          endAdornment={
            <IconButton onClick={handleTogglePassword}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
        />
        <ConfirmButton loading={loginLoading} disabled={loginLoading}>
          {i18n().modules.auth.pages.login.form.confirmButton}
        </ConfirmButton>
      </FormGridContainer>
    </FormContainer>
  );
}
