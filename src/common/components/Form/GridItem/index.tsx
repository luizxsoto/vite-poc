import { GridProps } from '@mui/material/Grid';

import { Container } from './styles';

type FormGridItemProps = GridProps;

export function FormGridItem({ children, ...rest }: FormGridItemProps) {
  return <Container {...rest}>{children}</Container>;
}
