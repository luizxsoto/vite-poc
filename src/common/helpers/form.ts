import { FormHandles } from '@unform/core';

export function clearFormErrors({
  formData,
  formRef,
}: {
  formData: Record<string, string>;
  formRef: React.MutableRefObject<FormHandles | null>;
}): void {
  const formFields = Object.keys(formData || {});

  formFields.forEach(formField =>
    formRef.current?.setFieldError(formField, '')
  );
}

export function setFormData({
  formRef,
  formData,
}: {
  formData: Record<string, string>;
  formRef: React.MutableRefObject<FormHandles | null>;
}): void {
  formRef.current?.setData(formData);

  Object.keys(formData).forEach(fieldName => {
    if (!formRef.current) return;

    const fieldRef = formRef.current?.getFieldRef(fieldName);
    fieldRef.handleChange(formData[fieldName] || '');
  });
}
