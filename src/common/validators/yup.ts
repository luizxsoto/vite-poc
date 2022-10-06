import * as yup from 'yup';

type ValidateProps<Register> = {
  formData: Register;
  sanitizer: (register: Register) => Register;
  validatorSchema: yup.SchemaOf<Register>;
};

export async function validateYupSchema<Register>({
  formData,
  sanitizer,
  validatorSchema,
}: ValidateProps<Register>): Promise<{
  parsedData?: Register;
  errorMessages?: { [Prop in keyof Register]: string };
}> {
  try {
    const parsedData = sanitizer(formData);

    await validatorSchema.validate(parsedData, { abortEarly: false });

    return { parsedData };
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error;

    const errorMessages = {} as { [Prop in keyof Register]: string };

    error.inner.forEach(err => {
      if (err.path) errorMessages[err.path as keyof Register] = err.message;
    });

    return { errorMessages };
  }
}
