import styled from 'styled-components';
import MUIIconButton from '@mui/material/IconButton';
import MUITypography from '@mui/material/Typography';
import MUIToolbar from '@mui/material/Toolbar';
import MUISearchIcon from '@mui/icons-material/Search';

export { default as AddIcon } from '@mui/icons-material/Add';
export { default as SendIcon } from '@mui/icons-material/Send';
export { default as CircularProgress } from '@mui/material/CircularProgress';

export {
  FormContainer,
  FormGridContainer,
  FormSelector,
  FormTextInput,
  FormValueInput,
} from '@/common/components/Form';

export const Container = styled(MUIToolbar)`
  padding-top: 0.5rem;
`;

export const IconButton = styled(MUIIconButton).attrs({
  color: 'primary',
})``;

export const Typography = styled(MUITypography).attrs({
  variant: 'h6',
})``;

export const SearchIcon = styled(MUISearchIcon)`
  width: 36px;
  height: 36px;
`;
