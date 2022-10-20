import { useEffect } from 'react';

import { useUser } from '@/modules/auth/contexts/user';

import { changePageTitle } from '@/common/helpers';
import { i18n } from '@/common/i18n';

import { UsersFormContent } from './Content';
import { Container } from './styles';

export function UsersForm(): JSX.Element {
  changePageTitle(i18n().modules.auth.pages.users.form.title);

  const { clearState } = useUser();

  useEffect(() => () => clearState(), [clearState]);

  return (
    <Container>
      <UsersFormContent />
    </Container>
  );
}
