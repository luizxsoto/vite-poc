export const commonPt = {
  exceptions: {
    applicationException: 'Ocorreu um erro inesperado',
    validationException: 'Ocorreu um erro de validação',
  },
  pages: {
    notFound: {
      message: 'Página não encontrada',
    },
  },
  validators: {
    max: (value: number) =>
      `Este campo deve conter no máximo ${value} caracteres`,
    min: (value: number) =>
      `Este campo deve conter no mínimo ${value} caracteres`,
    required: 'Este campo é obrigatório',
  },
};
