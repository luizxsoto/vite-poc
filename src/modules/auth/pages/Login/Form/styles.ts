import styled from 'styled-components';
import MUIIconButton from '@mui/material/IconButton';

import { FormTextInput, FormConfirmButton } from '@/common/components/Form';

export { default as VisibilityIcon } from '@mui/icons-material/Visibility';
export { default as VisibilityOffIcon } from '@mui/icons-material/VisibilityOff';

export { FormContainer, FormGridContainer } from '@/common/components/Form';

export const IconButton = styled(MUIIconButton).attrs({
  color: 'primary',
})``;

export const TextInput = styled(FormTextInput).attrs({
  gridProps: { xs: 12 },
  required: true,
})``;

export const ConfirmButton = styled(FormConfirmButton).attrs({
  gridProps: { xs: 12 },
})``;
