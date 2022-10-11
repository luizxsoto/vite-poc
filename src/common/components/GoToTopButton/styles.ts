import styled from 'styled-components';

import MUIIconButton from '@mui/material/IconButton';

export { default as ArrowUpwardIcon } from '@mui/icons-material/ArrowUpward';

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
