import { useEffect } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { SchemaOf } from 'yup';
import { toast } from 'react-toastify';

import { i18n } from '@/common/i18n';
import { clearFormErrors, debounceEvent } from '@/common/helpers';
import { validateYupSchema } from '@/common/validators';

import { Container } from './styles';

type FormContainerProps<Model> = {
  formRef: React.MutableRefObject<FormHandles | null>;
  validatorSchema: SchemaOf<Model>;
  sanitizer: (model: Model) => Model;
  onSubmit: (model: Model) => void;
  children: React.ReactNode;
  initialData?: Model;
};

export function FormContainer<Model>({
  formRef,
  validatorSchema,
  sanitizer,
  onSubmit,
  children,
  initialData,
  ...rest
}: FormContainerProps<Model>): JSX.Element {
  async function handleSubmit(formData: Model): Promise<void> {
    const { parsedData, errorMessages } = await validateYupSchema<Model>({
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
