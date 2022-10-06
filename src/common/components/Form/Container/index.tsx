import { useEffect } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { SchemaOf } from 'yup';
import { toast } from 'react-toastify';

import { i18n } from '@/common/i18n';
import { clearFormErrors, debounceEvent } from '@/common/helpers';
import { validateYupSchema } from '@/common/validators';

import { Container } from './styles';

type FormContainerProps<Register> = {
  formRef: React.MutableRefObject<FormHandles | null>;
  validatorSchema: SchemaOf<Register>;
  sanitizer: (register: Register) => Register;
  onSubmit: (register: Register) => void;
  children: React.ReactNode;
  initialData?: Register;
};

export function FormContainer<Register>({
  formRef,
  validatorSchema,
  sanitizer,
  onSubmit,
  children,
  initialData,
  ...rest
}: FormContainerProps<Register>): JSX.Element {
  async function handleSubmit(formData: Register): Promise<void> {
    const { parsedData, errorMessages } = await validateYupSchema<Register>({
      formData,
      sanitizer,
      validatorSchema,
    });

    if (errorMessages) {
      toast.warn(i18n().common.exceptions.validationException, {
        toastId: 'ValidationException',
      });

      formRef.current?.setErrors(errorMessages);
    } else {
      clearFormErrors({ formData: parsedData || {}, formRef });

      if (parsedData) onSubmit(parsedData);
    }
  }

  useEffect(() => {
    formRef.current?.setData(initialData || {});
  }, [formRef, initialData]);

  return (
    <Container
      initialData={initialData as Record<string, any>}
      ref={formRef}
      onSubmit={
        debounceEvent(handleSubmit, 200) as unknown as SubmitHandler<unknown>
      }
      {...rest}
    >
      {children}
    </Container>
  );
}
