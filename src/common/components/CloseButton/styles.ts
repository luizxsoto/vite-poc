import styled from 'styled-components';

import MUIIconButton from '@mui/material/IconButton';
import MUICloseIcon from '@mui/icons-material/Close';

export { default as Brightness7Icon } from '@mui/icons-material/Brightness7';

export const Container = styled(MUIIconButton).attrs({
  size: 'small' as 'small' | 'medium' | 'large' | undefined,
})``;

export const CloseIcon = styled(MUICloseIcon).attrs({ size: 'small' })``;
