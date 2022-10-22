import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import {
  FormCancelButton,
  FormConfirmButton,
  FormContainer,
  FormGridContainer,
  FormTextInput,
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
} from './styles';

import { createValidationSchema } from '@/modules/auth/validations';
import { createSanitizer } from '@/modules/auth/sanitizers';
import { UserCreateParams } from '@/modules/auth/contracts/application-services';
import { useUser } from '@/modules/auth/contexts/user';
import { i18n } from '@/common/i18n';

export function UsersFormContent(): JSX.Element {
  const { create, formLoading } = useUser();

  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleTogglePassword(): void {
    setShowPassword(!showPassword);
  }

  function handleCancel(): void {
    navigate(-1);
  }

  function handleSubmit(model: UserCreateParams): void {
    create({
      model,
      onSuccess: handleCancel,
      onError: error => {
        formRef.current?.setErrors(error.validations || {});
      },
    });
  }

  return (
    <FormContainer<UserCreateParams>
      formRef={formRef}
      validatorSchema={createValidationSchema}
      sanitizer={createSanitizer}
      onSubmit={handleSubmit}
    >
      <FormGridContainer>
        <FormGridContainer gap={1}>
          <FormTextInput
            label={i18n().modules.auth.pages.users.form.content.inputs.email}
            name="email"
            disabled={formLoading}
          />
          <FormTextInput
            label={i18n().modules.auth.pages.users.form.content.inputs.password}
            name="password"
            disabled={formLoading}
            inputProps={{ type: showPassword ? 'text' : 'password' }}
            endAdornment={
              <IconButton onClick={handleTogglePassword} disabled={formLoading}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
          />
        </FormGridContainer>

        <FormGridContainer gap={1}>
          <FormCancelButton
            loading={formLoading}
            disabled={formLoading}
            gridProps={{ xs: 7, sm: 4 }}
            onClick={handleCancel}
          >
            CANCELAR
          </FormCancelButton>
          <FormConfirmButton
            loading={formLoading}
            disabled={formLoading}
            gridProps={{ xs: 7, sm: 4 }}
          >
            SALVAR
          </FormConfirmButton>
        </FormGridContainer>
      </FormGridContainer>
    </FormContainer>
  );
}
