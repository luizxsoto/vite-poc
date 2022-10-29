const formIputs = {
  name: 'Nome',
  email: 'E-mail',
  password: 'Senha',
  role: 'Papel/Cargo',
};

export const authPt = {
  pages: {
    login: {
      title: 'Entrar',
      form: {
        inputs: {
          email: 'Informe seu email',
          password: 'Informe seu senha',
        },
        buttons: {
          confirm: 'ENTRAR',
        },
      },
      forgotPasswordButton: 'Esqueceu sua senha?',
      copyright: 'Positivo Tecnologia ™',
    },
    users: {
      form: {
        title: 'Usuários',
        content: {
          inputs: formIputs,
        },
      },
      list: {
        title: 'Usuários',
        tableColumn: {
          id: 'Código',
          createdAt: 'Criado em',
          ...formIputs,
        },
        action: {
          show: 'Detalhes',
          update: 'Atualizar',
          remove: 'Remover',
          confirmRemove: 'Deseja mesmo remover este registro?',
        },
      },
    },
  },
};
