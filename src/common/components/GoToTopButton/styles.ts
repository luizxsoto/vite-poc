import styled from 'styled-components';

import MUIIconButton from '@mui/material/IconButton';
import MUIArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const ArrowUpwardIcon = styled(MUIArrowUpwardIcon).attrs({
  fontSize: 'small',
})``;

export const Container = styled(MUIIconButton)`
  z-index: 999;
  position: sticky;
  left: 90%;
  top: 85%;
  background: ${({ theme }) => theme.palette.primary.main};
  color: white;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main};
    opacity: 80%;
  }
`;
