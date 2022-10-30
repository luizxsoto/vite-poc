import styled from 'styled-components';
import MUIIconButton from '@mui/material/IconButton';

export { default as VisibilityIcon } from '@mui/icons-material/Visibility';
export { default as VisibilityOffIcon } from '@mui/icons-material/VisibilityOff';

export {
  FormContainer,
  FormGridContainer,
  FormTextInput,
  FormSelector,
  FormCancelButton,
  FormConfirmButton,
} from '@/common/components/Form';

export const IconButton = styled(MUIIconButton).attrs({
  color: 'primary',
})``;
