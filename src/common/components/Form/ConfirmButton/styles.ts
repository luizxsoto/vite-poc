import styled from 'styled-components';
import MUIButton from '@mui/material/Button';
import MUICircularProgress from '@mui/material/CircularProgress';

export { FormGridItem as Container } from '@/common/components/Form';

export const CircularProgress = styled(MUICircularProgress).attrs({
  size: 25,
})``;

export const Button = styled(MUIButton).attrs({
  type: 'submit' as 'button' | 'submit' | 'reset' | undefined,
  fullWidth: true as boolean,
  variant: 'contained' as 'text' | 'outlined' | 'contained' | undefined,
})`
  color: white;
`;
