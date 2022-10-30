import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import {
  FormCancelButton,
  FormConfirmButton,
  FormContainer,
  FormGridContainer,
  FormTextInput,
  FormSelector,
  IconButton,
  VisibilityIcon,
  VisibilityOffIcon,
} from './styles';

import { createValidationSchema } from '@/modules/auth/validations';
import { createSanitizer } from '@/modules/auth/sanitizers';
import { UserCreateParams } from '@/modules/auth/contracts/application-services';
import { useUser } from '@/modules/auth/contexts/user';
import { i18n } from '@/common/i18n';

interface UsersFormContentProps {
  canEdit?: boolean;
}

export function UsersFormContent({
  canEdit,
}: UsersFormContentProps): JSX.Element {
  const { create, update, formLoading, showingData } = useUser();

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
    const params = {
      model,
      onSuccess: handleCancel,
      onError: ({ validations }: { validations?: Record<string, string> }) => {
        formRef.current?.setErrors(validations || {});
      },
    };
    if (canEdit && showingData) {
      update({ ...params, model: { ...params.model, id: showingData.id } });
    } else {
      create(params);
    }
  }

  return (
    <FormContainer<UserCreateParams>
      formRef={formRef}
      validatorSchema={createValidationSchema}
      sanitizer={createSanitizer}
      onSubmit={handleSubmit}
      initialData={(showingData || {}) as UserCreateParams}
    >
      <FormGridContainer>
        <FormGridContainer gap={1}>
          <FormTextInput
            label={i18n().modules.auth.pages.users.form.content.inputs.name}
            name="name"
            disabled={formLoading || !canEdit}
            loading={formLoading}
          />
          <FormTextInput
            label={i18n().modules.auth.pages.users.form.content.inputs.email}
            name="email"
            disabled={formLoading || !canEdit}
            loading={formLoading}
          />
        </FormGridContainer>
        <FormGridContainer gap={1}>
          <FormTextInput
            label={i18n().modules.auth.pages.users.form.content.inputs.password}
            name="password"
            disabled={formLoading || !canEdit}
            loading={formLoading}
            inputProps={{ type: showPassword ? 'text' : 'password' }}
            endAdornment={
              <IconButton
                onClick={handleTogglePassword}
                disabled={formLoading || !canEdit}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
          />
          <FormSelector
            name="role"
            label={i18n().modules.auth.pages.users.form.content.inputs.role}
            idColumn="id"
            nameColumn="name"
            disabled={formLoading || !canEdit}
            loading={formLoading}
            options={[
              { id: 'admin', name: 'Administrador' },
              { id: 'normal', name: 'Normal' },
            ]}
          />
        </FormGridContainer>

        <FormGridContainer gap={1}>
          <FormCancelButton
            disabled={formLoading}
            loading={formLoading}
            gridProps={{ xs: 7, sm: 4 }}
            onClick={handleCancel}
          >
            CANCELAR
          </FormCancelButton>
          <FormConfirmButton
            disabled={formLoading || !canEdit}
            loading={formLoading}
            gridProps={{ xs: 7, sm: 4 }}
          >
            SALVAR
          </FormConfirmButton>
        </FormGridContainer>
      </FormGridContainer>
    </FormContainer>
  );
}
