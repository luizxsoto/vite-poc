import styled from 'styled-components';
import MUIGrid from '@mui/material/Grid';
import MUIFormControl from '@mui/material/FormControl';
import MUIInputLabel from '@mui/material/InputLabel';
import MUITextField from '@mui/material/TextField';
import MUITypography from '@mui/material/Typography';

import { FormGridItem } from '@/common/components/Form';

export { default as FormHelperText } from '@mui/material/FormHelperText';
export { default as InputAdornment } from '@mui/material/InputAdornment';
export { NumericFormat } from 'react-number-format';
export { FormSkeleton } from '@/common/components/Form';

export const Container = styled(FormGridItem)`
  margin-top: 0.2rem;
`;

export const FormControl = styled(MUIFormControl).attrs({
  fullWidth: true,
})``;

export const LabelContent = styled(MUIGrid)`
  display: flex;
  flex-direction: row;
`;

export const TextField = styled(MUITextField).attrs({
  size: 'small',
})``;

export const RequiredCharacter = styled(MUITypography).attrs({
  color: 'error',
})`
  margin-left: 0.2rem;
`;
