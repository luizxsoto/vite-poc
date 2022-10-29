export const commonPt = {
  components: {
    table: {
      body: {
        attention: 'Atenção!',
        confirm: 'Sim',
        cancel: 'Não',
      },
      head: {
        actions: 'Ações',
      },
      header: {
        selectAField: 'Selecione um campo',
        atField: 'No campo:',
        searchFor: 'Buscar por:',
      },
    },
  },
  exceptions: {
    applicationException: 'Ocorreu um erro inesperado',
    unauthorizedException: 'Sessão expirada',
    validationException: 'Ocorreu um erro de validação',
  },
  pages: {
    notFound: {
      message: 'Página não encontrada',
    },
  },
  validators: {
    oneOf: (values: (string | number)[]) =>
      `Selecione algum dos valores: ${values.join(', ')}`,
    max: (value: number) =>
      `Este campo deve conter no máximo ${value} caracteres`,
    min: (value: number) =>
      `Este campo deve conter no mínimo ${value} caracteres`,
    required: 'Este campo é obrigatório',
  },
};
