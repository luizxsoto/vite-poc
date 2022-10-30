import { useEffect, useMemo } from 'react';

import { useUser } from '@/modules/auth/contexts/user';

import { changePageTitle } from '@/common/helpers';
import { i18n } from '@/common/i18n';

import { UsersFormContent } from './Content';
import { Container } from './styles';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export function UsersForm(): JSX.Element {
  changePageTitle(i18n().modules.auth.pages.users.form.title);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { show, clearState } = useUser();

  const canEdit = useMemo<boolean>(() => {
    const method = new URLSearchParams(location.search).get('method');
    return method === 'update' || !method;
  }, [location]);

  useEffect(() => {
    if (params.id) {
      show({ model: { id: params.id }, onError: () => navigate('/') });
    }
  }, [show]);

  useEffect(() => () => clearState(), [clearState]);

  return (
    <Container>
      <UsersFormContent canEdit={canEdit} />
    </Container>
  );
}
