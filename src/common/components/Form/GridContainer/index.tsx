import { GridProps } from '@mui/material/Grid';

import { Container } from './styles';

type FormGridContainerProps = GridProps;

export function FormGridContainer({
  children,
  ...rest
}: FormGridContainerProps) {
  return <Container {...rest}>{children}</Container>;
}
