import styled from 'styled-components';
import MUIAutocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import MUIGrid from '@mui/material/Grid';
import MUITypography from '@mui/material/Typography';
import MUIFormControl from '@mui/material/FormControl';

import { FormGridItem } from '@/common/components/Form';

export { default as TextField } from '@mui/material/TextField';
export { default as FormHelperText } from '@mui/material/FormHelperText';
export { FormSkeleton } from '@/common/components/Form';

export const Container = styled(FormGridItem)`
  margin-top: 0.2rem;
`;

export const Autocomplete = styled(MUIAutocomplete).attrs({
  size: 'small',
  variant: 'outlined',
  fullWidth: true,
})``;

export const FormControl = styled(MUIFormControl).attrs({
  size: 'small',
  fullWidth: true,
})``;

export const SelectorLoading = styled(CircularProgress).attrs({ size: 26 })`
  position: absolute;
  top: 7.5px;
  right: 7.5px;
`;

export const LabelContent = styled(MUIGrid)`
  display: flex;
  flex-direction: row;
`;
export const RequiredCharacter = styled(MUITypography).attrs({
  color: 'error',
})`
  margin-left: 0.2rem;
`;
