import { toast } from 'react-toastify';

import { i18n } from '@/common/i18n';
import { changePageTitle } from '@/common/helpers';

import { LoginForm } from './Form';

import {
  Container,
  ImageContent,
  FormContent,
  Divider,
  Button,
  Link,
  Copyright,
  Title,
  Avatar,
  GroupIcon,
  SwipeableBox,
} from './styles';

export function Login(): JSX.Element {
  changePageTitle(i18n().modules.auth.pages.login.title);

  return (
    <Container>
      <ImageContent />

      <FormContent>
        <Divider />

        <SwipeableBox>
          <Avatar>
            <GroupIcon />
          </Avatar>

          <Title>{i18n().modules.auth.pages.login.title}</Title>

          <LoginForm />

          <Button onClick={() => toast('Não implementado')}>
            {i18n().modules.auth.pages.login.forgotPasswordButton}
          </Button>

          <Copyright>
            <Link color="inherit" href="https://site.educacional.com.br/">
              {i18n().modules.auth.pages.login.copyright}
            </Link>{' '}
            {new Date().getFullYear()}
          </Copyright>
        </SwipeableBox>
      </FormContent>
    </Container>
  );
}
