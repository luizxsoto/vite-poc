import { IconButtonProps } from '@mui/material/IconButton';

import { Container, CloseIcon } from './styles';

export function CloseButton(props: IconButtonProps) {
  return (
    <Container {...props}>
      <CloseIcon />
    </Container>
  );
}
