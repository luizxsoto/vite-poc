import styled from 'styled-components';
import MUIIconButton from '@mui/material/IconButton';
import MUITypography from '@mui/material/Typography';
import MUIToolbar from '@mui/material/Toolbar';
import MUISearchIcon from '@mui/icons-material/Search';
import { FormGridContainer as FormGridContent } from '@/common/components/Form';

export { default as AddIcon } from '@mui/icons-material/Add';
export { default as SendIcon } from '@mui/icons-material/Send';
export { default as CircularProgress } from '@mui/material/CircularProgress';

export {
  FormContainer,
  FormSelector,
  FormTextInput,
  FormValueInput,
} from '@/common/components/Form';

export const Container = styled(MUIToolbar)`
  padding-top: 0.5rem;
`;

export const FormGridContainer = styled(FormGridContent)`
  align-items: flex-start;
`;

export const IconButton = styled(MUIIconButton).attrs({
  color: 'primary',
})`
  width: 50px;
  height: 50px;
`;

export const Typography = styled(MUITypography).attrs({
  variant: 'h6',
})``;

export const SearchIcon = styled(MUISearchIcon)`
  width: 30px;
  height: 30px;
`;
