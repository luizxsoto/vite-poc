import styled from 'styled-components';
import MUIButton from '@mui/material/Button';
import MUICircularProgress from '@mui/material/CircularProgress';

export { FormGridItem as Container } from '@/common/components/Form';

export const CircularProgress = styled(MUICircularProgress).attrs({
  size: 25,
  color: 'error' as
    | 'inherit'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined,
})``;

export const Button = styled(MUIButton).attrs({
  type: 'button' as 'button' | 'submit' | 'reset' | undefined,
  fullWidth: true as boolean,
  variant: 'outlined' as 'text' | 'outlined' | 'contained' | undefined,
  color: 'error' as
    | 'inherit'
    | 'error'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined,
})``;
