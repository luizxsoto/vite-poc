import { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';

import { useAuth } from '@/modules/auth/contexts/auth';
import { LoginParams } from '@/modules/auth/contracts/application-services';
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
  const { login, loginLoading, validations } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword(): void {
    setShowPassword(!showPassword);
  }

  function handleSubmit(params: LoginParams): void {
    login(params);
  }

  useEffect(() => {
    formRef.current?.setErrors(validations || {});
  }, [validations]);

  return (
    <FormContainer<LoginParams>
      formRef={formRef}
      validatorSchema={loginValidationSchema}
      sanitizer={loginSanitizer}
      onSubmit={handleSubmit}
    >
      <FormGridContainer>
        <TextInput
          label={i18n().modules.auth.pages.login.form.inputs.email}
          name="email"
          inputProps={{
            autoComplete: 'email',
          }}
          disabled={loginLoading}
        />
        <TextInput
          label={i18n().modules.auth.pages.login.form.inputs.password}
          name="password"
          inputProps={{
            type: showPassword ? 'text' : 'password',
            autoComplete: 'current-password',
          }}
          endAdornment={
            <IconButton onClick={handleTogglePassword} disabled={loginLoading}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          }
          disabled={loginLoading}
        />
        <ConfirmButton loading={loginLoading} disabled={loginLoading}>
          {i18n().modules.auth.pages.login.form.buttons.confirm}
        </ConfirmButton>
      </FormGridContainer>
    </FormContainer>
  );
}
