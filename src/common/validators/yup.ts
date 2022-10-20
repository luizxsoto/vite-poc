import * as yup from 'yup';

type ValidateParams<Model> = {
  formData: Model;
  sanitizer: (model: Model) => Model;
  validatorSchema: yup.SchemaOf<Model>;
};

export async function validateYupSchema<Model>({
  formData,
  sanitizer,
  validatorSchema,
}: ValidateParams<Model>): Promise<{
  parsedData?: Model;
  errorMessages?: { [Prop in keyof Model]: string };
}> {
  try {
    const parsedData = sanitizer(formData);

    await validatorSchema.validate(parsedData, { abortEarly: false });

    return { parsedData };
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) throw error;

    const errorMessages = {} as { [Prop in keyof Model]: string };

    error.inner.forEach(err => {
      if (err.path) errorMessages[err.path as keyof Model] = err.message;
    });

    return { errorMessages };
  }
}
