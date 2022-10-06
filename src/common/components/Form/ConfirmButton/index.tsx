import { ButtonProps } from '@mui/material/Button';
import { GridProps } from '@mui/material/Grid';

import { Container, Button, CircularProgress } from './styles';

type FormConfirmButtonProps = ButtonProps & {
  gridProps?: GridProps;
  loading?: boolean;
};

export function FormConfirmButton({
  children,
  gridProps,
  loading,
  ...rest
}: FormConfirmButtonProps): JSX.Element {
  return (
    <Container {...gridProps}>
      <Button {...rest}>{loading ? <CircularProgress /> : children}</Button>
    </Container>
  );
}
