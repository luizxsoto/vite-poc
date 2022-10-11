import { ButtonProps } from '@mui/material/Button';
import { GridProps } from '@mui/material/Grid';

import { Container, Button, CircularProgress } from './styles';

type FormCancelButtonProps = ButtonProps & {
  gridProps?: GridProps;
  loading?: boolean;
};

export function FormCancelButton({
  children,
  gridProps,
  loading,
  ...rest
}: FormCancelButtonProps): JSX.Element {
  return (
    <Container {...gridProps}>
      <Button {...rest}>{loading ? <CircularProgress /> : children}</Button>
    </Container>
  );
}
